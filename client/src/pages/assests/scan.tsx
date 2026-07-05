// pages/assests/scan.tsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Package, 
  QrCode, 
  Calendar, 
  Tag, 
  FileText,
  Layers,
  Clock,
  Info
} from 'lucide-react';
import axios from 'axios';

interface Asset {
  id: string;
  asset_code: string;
  asset_name: string;
  asset_description: string;
  category_name: string;
  subcategory_name: string;
  status_name: string;
  created_at: string;
  qr_code?: string;
  details?: any;
}

const ScanQR = () => {
  const [searchParams] = useSearchParams();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const qrData = searchParams.get('data');
    if (qrData) {
      try {
        const parsed = JSON.parse(decodeURIComponent(qrData));
        fetchAssetDetails(parsed.id);
      } catch (err) {
        setError('Invalid QR code data');
        setLoading(false);
      }
    } else {
      setError('No QR code data found');
      setLoading(false);
    }
  }, [searchParams]);

  const fetchAssetDetails = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/assets/${id}`);
      if (response.data.success) {
        setAsset(response.data.data);
      } else {
        setError('Asset not found');
      }
    } catch (err) {
      setError('Failed to fetch asset details');
    } finally {
      setLoading(false);
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Active': 'bg-green-100 text-green-800 border-green-200',
      'InActive': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Out-of-stock': 'bg-red-100 text-red-800 border-red-200',
      'Under Repair': 'bg-purple-100 text-purple-800 border-purple-200',
      'Disposed': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[status] || 'bg-blue-100 text-blue-800 border-blue-200';
  };

  // Get category-specific columns
  const getCategoryColumns = (category: string) => {
    const columns: { [key: string]: { key: string; label: string }[] } = {
      'IT Equipment': [
        { key: 'model_number', label: 'Model Number' },
        { key: 'serial_number', label: 'Serial Number' },
        { key: 'asset_type', label: 'Asset Type' },
        { key: 'processor', label: 'Processor' },
        { key: 'ram', label: 'RAM' },
        { key: 'storage', label: 'Storage' },
        { key: 'operating_system', label: 'OS' },
        { key: 'monitor_size', label: 'Monitor Size' },
        { key: 'connectivity', label: 'Connectivity' },
        { key: 'warranty_expiry_date', label: 'Warranty Expiry' }
      ],
      'Vehicle': [
        { key: 'registration_number', label: 'Registration' },
        { key: 'make', label: 'Make' },
        { key: 'model', label: 'Model' },
        { key: 'manufacturing_year', label: 'Year' },
        { key: 'engine_number', label: 'Engine Number' },
        { key: 'vin_number', label: 'VIN Number' },
        { key: 'fuel_type', label: 'Fuel Type' },
        { key: 'engine_capacity', label: 'Engine CC' },
        { key: 'transmission', label: 'Transmission' },
        { key: 'seating_capacity', label: 'Seating' },
        { key: 'insurance_policy_number', label: 'Insurance Policy' },
        { key: 'insurance_expiry_date', label: 'Insurance Expiry' },
        { key: 'registration_expiry_date', label: 'Registration Expiry' }
      ],
      'Machinery': [
        { key: 'machinery_type', label: 'Type' },
        { key: 'power_rating', label: 'Power Rating' },
        { key: 'voltage', label: 'Voltage' },
        { key: 'phase', label: 'Phase' },
        { key: 'weight', label: 'Weight (kg)' },
        { key: 'dimensions', label: 'Dimensions' },
        { key: 'operating_temperature', label: 'Temperature' },
        { key: 'safety_certification', label: 'Safety Cert' },
        { key: 'last_inspection_date', label: 'Last Inspection' },
        { key: 'next_inspection_date', label: 'Next Inspection' }
      ],
      'Furniture': [
        { key: 'material', label: 'Material' },
        { key: 'color', label: 'Color' },
        { key: 'dimensions', label: 'Dimensions' },
        { key: 'weight_capacity', label: 'Weight Capacity' },
        { key: 'assembly_required', label: 'Assembly Required' },
        { key: 'warranty_period', label: 'Warranty' }
      ],
      'Building': [
        { key: 'building_type', label: 'Type' },
        { key: 'floor_area', label: 'Floor Area' },
        { key: 'number_of_floors', label: 'Floors' },
        { key: 'construction_year', label: 'Year Built' },
        { key: 'building_material', label: 'Material' },
        { key: 'occupancy_type', label: 'Occupancy' },
        { key: 'utilities', label: 'Utilities' },
        { key: 'parking_available', label: 'Parking' },
        { key: 'security_features', label: 'Security' }
      ],
      'Land': [
        { key: 'land_area', label: 'Area' },
        { key: 'land_use', label: 'Land Use' },
        { key: 'zoning', label: 'Zoning' },
        { key: 'soil_type', label: 'Soil Type' },
        { key: 'topography', label: 'Topography' },
        { key: 'utilities_available', label: 'Utilities' },
        { key: 'accessibility', label: 'Accessibility' }
      ],
      'Office Equipment': [
        { key: 'equipment_type', label: 'Type' },
        { key: 'power_consumption', label: 'Power (W)' },
        { key: 'connectivity', label: 'Connectivity' },
        { key: 'paper_capacity', label: 'Paper Capacity' },
        { key: 'print_speed', label: 'Print Speed' },
        { key: 'functions', label: 'Functions' }
      ]
    };
    return columns[category] || [];
  };

  // Render category-specific cell
  const renderCategoryCell = (asset: Asset, columnKey: string) => {
    if (!asset.details) return '-';
    const value = asset.details[columnKey];
    if (value === null || value === undefined) return '-';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (columnKey === 'warranty_expiry_date' || 
        columnKey === 'insurance_expiry_date' || 
        columnKey === 'registration_expiry_date' ||
        columnKey === 'last_inspection_date' ||
        columnKey === 'next_inspection_date') {
      return value ? new Date(value).toLocaleDateString() : '-';
    }
    return value;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500">Loading asset details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode size={32} className="text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Scan Failed</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.close()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package size={32} className="text-yellow-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Asset Not Found</h2>
          <p className="text-gray-600">The asset you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => window.close()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const categoryColumns = getCategoryColumns(asset.category_name);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with QR Code Icon */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <QrCode size={24} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">Asset Details</h1>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full">
              <span className="text-white font-mono text-sm">{asset.asset_code}</span>
            </div>
          </div>

          <div className="p-6">
            {/* Core Information */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <label className="text-xs font-medium text-gray-500 uppercase flex items-center gap-1">
                  <Tag size={14} />
                  Asset Code
                </label>
                <p className="text-sm font-medium text-gray-800 font-mono mt-1">{asset.asset_code}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <label className="text-xs font-medium text-gray-500 uppercase flex items-center gap-1">
                  <FileText size={14} />
                  Asset Name
                </label>
                <p className="text-sm font-medium text-gray-800 mt-1">{asset.asset_name}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <label className="text-xs font-medium text-gray-500 uppercase flex items-center gap-1">
                  <Layers size={14} />
                  Category
                </label>
                <p className="text-sm font-medium text-gray-800 mt-1">{asset.category_name}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <label className="text-xs font-medium text-gray-500 uppercase flex items-center gap-1">
                  <Layers size={14} />
                  Subcategory
                </label>
                <p className="text-sm font-medium text-gray-800 mt-1">{asset.subcategory_name || '-'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <label className="text-xs font-medium text-gray-500 uppercase flex items-center gap-1">
                  <Clock size={14} />
                  Status
                </label>
                <span className={`mt-1 px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(asset.status_name)}`}>
                  {asset.status_name}
                </span>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <label className="text-xs font-medium text-gray-500 uppercase flex items-center gap-1">
                  <Calendar size={14} />
                  Created At
                </label>
                <p className="text-sm font-medium text-gray-800 mt-1">
                  {asset.created_at ? new Date(asset.created_at).toLocaleDateString() : '-'}
                </p>
              </div>
            </div>

            {/* Category-Specific Details */}
            {categoryColumns.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Info size={16} className="text-blue-600" />
                  Category-Specific Details
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {categoryColumns.map((col) => (
                    <div key={col.key} className="bg-gray-50 rounded-lg p-3">
                      <label className="text-xs font-medium text-gray-500 uppercase">{col.label}</label>
                      <p className="text-sm font-medium text-gray-800 mt-1">
                        {renderCategoryCell(asset, col.key)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {asset.asset_description && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{asset.asset_description}</p>
              </div>
            )}

            {/* Footer */}
            <div className="border-t border-gray-200 mt-6 pt-4 flex justify-between items-center">
              <p className="text-xs text-gray-400">
                Scanned from QR Code • {new Date().toLocaleString()}
              </p>
              <button
                onClick={() => window.close()}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanQR;