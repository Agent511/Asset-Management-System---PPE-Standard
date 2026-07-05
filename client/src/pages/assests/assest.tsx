// pages/assests/assest.tsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar';
import { 
  Package, 
  Search, 
  Filter, 
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Printer,
  QrCode,
  Download,
  X
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

interface CategoryTab {
  id: string;
  name: string;
  icon: any;
  count: number;
}

const Assets = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrAsset, setQrAsset] = useState<Asset | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  // Category tabs configuration
  const categories: CategoryTab[] = [
    { id: 'all', name: 'All Assets', icon: Package, count: 0 },
    { id: 'IT Equipment', name: 'IT Equipment', icon: Package, count: 0 },
    { id: 'Vehicle', name: 'Vehicles', icon: Package, count: 0 },
    { id: 'Machinery', name: 'Machinery', icon: Package, count: 0 },
    { id: 'Furniture', name: 'Furniture', icon: Package, count: 0 },
    { id: 'Building', name: 'Buildings', icon: Package, count: 0 },
    { id: 'Land', name: 'Land', icon: Package, count: 0 },
    { id: 'Office Equipment', name: 'Office Equipment', icon: Package, count: 0 },
  ];

  // Fetch assets from API
  const fetchAssets = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/assets');
      if (response.data.success) {
        setAssets(response.data.data);
        setFilteredAssets(response.data.data);
        updateCategoryCounts(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // Update category counts
  const updateCategoryCounts = (assetList: Asset[]) => {
    const counts: { [key: string]: number } = {};
    assetList.forEach(asset => {
      const category = asset.category_name || 'Uncategorized';
      counts[category] = (counts[category] || 0) + 1;
    });
    categories.forEach(cat => {
      if (cat.id === 'all') {
        cat.count = assetList.length;
      } else {
        cat.count = counts[cat.id] || 0;
      }
    });
  };

  // Filter assets by category and search
  const filterAssets = () => {
    let filtered = assets;
    
    if (activeTab !== 'all') {
      filtered = filtered.filter(asset => asset.category_name === activeTab);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(asset =>
        asset.asset_name.toLowerCase().includes(term) ||
        asset.asset_code.toLowerCase().includes(term) ||
        (asset.details?.brand && asset.details.brand.toLowerCase().includes(term)) ||
        (asset.details?.model_number && asset.details.model_number.toLowerCase().includes(term))
      );
    }
    
    setFilteredAssets(filtered);
  };

  useEffect(() => {
    filterAssets();
  }, [activeTab, searchTerm, assets]);

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

  // Get category-specific columns based on the registration form data
  const getCategoryColumns = (category: string) => {
    const columns: { [key: string]: { key: string; label: string }[] } = {
      'IT Equipment': [
        { key: 'model_number', label: 'Model Number' },
        { key: 'asset_type', label: 'Asset Type' },
        { key: 'processor', label: 'Processor' },
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

  // Get all columns for the current tab
  const getColumns = () => {
    const baseColumns = [
      { key: 'asset_code', label: 'Asset Code' },
      { key: 'asset_name', label: 'Asset Name' },
      { key: 'status_name', label: 'Status' },
    ];

    if (activeTab === 'all') {
      return baseColumns;
    }

    const categoryColumns = getCategoryColumns(activeTab);
    return [...baseColumns, ...categoryColumns];
  };

  // Render table header
  const renderTableHeader = () => {
    const columns = getColumns();
    return (
      <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
              {col.label}
            </th>
          ))}
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
            QR Code
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
            Actions
          </th>
        </tr>
      </thead>
    );
  };

  // Handle QR Code print
  const handlePrintQR = (asset: Asset) => {
    setQrAsset(asset);
    setShowQRModal(true);
  };

  // Print QR Code
  const printQRCode = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>QR Code - ${qrAsset?.asset_code}</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 40px; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
                .print-container { text-align: center; }
                .qr-image { max-width: 300px; margin: 20px auto; }
                .asset-code { font-size: 18px; font-weight: bold; color: #1E3A8A; margin: 10px 0; }
                .asset-name { font-size: 14px; color: #555; }
                .footer { margin-top: 20px; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 20px; }
                img { max-width: 100%; }
                @media print {
                  body { padding: 20px; }
                  .no-print { display: none; }
                }
              </style>
            </head>
            <body>
              <div class="print-container">
                ${printContent}
                <div class="footer">Generated on ${new Date().toLocaleDateString()}</div>
              </div>
              <script>
                window.onload = function() { window.print(); window.close(); }
              <\/script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  // Render table row
  const renderTableRow = (asset: Asset) => {
    const columns = getColumns();
    return (
      <tr key={asset.id} className="hover:bg-blue-50/50 transition-colors duration-150 border-b border-gray-100">
        {columns.map((col) => {
          // Check if this is a category-specific column
          const isCategoryColumn = col.key !== 'asset_code' && col.key !== 'asset_name' && col.key !== 'status_name';
          
          return (
            <td key={col.key} className="px-4 py-3 text-sm">
              {col.key === 'status_name' ? (
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(asset.status_name)}`}>
                  {asset.status_name}
                </span>
              ) : col.key === 'asset_code' ? (
                <span className="font-mono text-blue-600 font-medium">{asset.asset_code}</span>
              ) : isCategoryColumn ? (
                renderCategoryCell(asset, col.key)
              ) : (
                asset[col.key as keyof Asset] || '-'
              )}
            </td>
          );
        })}
        <td className="px-4 py-3 text-sm">
          {asset.qr_code ? (
            <button
              onClick={() => handlePrintQR(asset)}
              className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
              title="View/Print QR Code"
            >
              <QrCode size={18} />
            </button>
          ) : (
            <span className="text-gray-400 text-xs">No QR</span>
          )}
        </td>
        <td className="px-4 py-3 text-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedAsset(asset);
                setShowDetailsModal(true);
              }}
              className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
              title="View Details"
            >
              <Eye size={16} />
            </button>
            <button
              className="p-1.5 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit size={16} />
            </button>
            <button
              className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  // Asset Details Modal
  const AssetDetailsModal = () => {
    if (!selectedAsset) return null;

    const categoryColumns = getCategoryColumns(selectedAsset.category_name);
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Asset Details</h2>
              <p className="text-sm text-gray-500">{selectedAsset.asset_code}</p>
            </div>
            <div className="flex items-center gap-2">
              {selectedAsset.qr_code && (
                <button
                  onClick={() => {
                    setQrAsset(selectedAsset);
                    setShowQRModal(true);
                    setShowDetailsModal(false);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors no-print"
                  title="View QR Code"
                >
                  <QrCode size={20} />
                </button>
              )}
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors no-print"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {/* Core Information */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Asset Code</label>
                <p className="text-sm font-medium text-gray-800 font-mono">{selectedAsset.asset_code}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Asset Name</label>
                <p className="text-sm font-medium text-gray-800">{selectedAsset.asset_name}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Category</label>
                <p className="text-sm font-medium text-gray-800">{selectedAsset.category_name}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Subcategory</label>
                <p className="text-sm font-medium text-gray-800">{selectedAsset.subcategory_name || '-'}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Status</label>
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(selectedAsset.status_name)}`}>
                  {selectedAsset.status_name}
                </span>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Created At</label>
                <p className="text-sm font-medium text-gray-800">
                  {selectedAsset.created_at ? new Date(selectedAsset.created_at).toLocaleDateString() : '-'}
                </p>
              </div>
            </div>

            {/* Category-Specific Details */}
            {categoryColumns.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Category-Specific Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {categoryColumns.map((col) => (
                    <div key={col.key}>
                      <label className="text-xs font-medium text-gray-500 uppercase">{col.label}</label>
                      <p className="text-sm font-medium text-gray-800">
                        {renderCategoryCell(selectedAsset, col.key)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {selectedAsset.asset_description && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-sm text-gray-600">{selectedAsset.asset_description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // QR Code Modal
  const QRCodeModal = () => {
    if (!qrAsset) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <h2 className="text-xl font-bold text-gray-800">QR Code</h2>
            <button
              onClick={() => setShowQRModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6" ref={printRef}>
            <div className="flex flex-col items-center">
              {qrAsset.qr_code ? (
                <>
                  <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-100">
                    <img 
                      src={qrAsset.qr_code} 
                      alt={`QR Code for ${qrAsset.asset_code}`}
                      className="w-64 h-64 object-contain"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-lg font-bold text-blue-800">{qrAsset.asset_code}</p>
                    <p className="text-sm text-gray-600">{qrAsset.asset_name}</p>
                    <p className="text-xs text-gray-400 mt-2">Scan QR code to view asset details</p>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <QrCode size={64} className="mx-auto text-gray-300" />
                  <p className="text-gray-400 mt-4">No QR code available</p>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
            <button
              onClick={() => setShowQRModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Close
            </button>
            {qrAsset.qr_code && (
              <button
                onClick={printQRCode}
                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition flex items-center gap-2"
              >
                <Printer size={18} />
                Print QR
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-10 pl-15 pr-15 mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Package size={24} className="text-blue-600" />
              Asset Management
            </h1>
            <p className="text-gray-600 mt-1">View and manage all your registered assets</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchAssets}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
            <button
              onClick={() => navigate('/assets/register')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <Plus size={18} />
              New Asset
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search assets by name, code, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                <Filter size={18} />
                Filter
                <ChevronDown size={16} />
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                <Download size={18} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 overflow-x-auto">
            <div className="flex px-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 flex items-center gap-2 whitespace-nowrap
                    ${activeTab === category.id 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <category.icon size={16} />
                  {category.name}
                  {category.count > 0 && (
                    <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
                      activeTab === category.id 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {category.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-500">Loading assets...</p>
                </div>
              </div>
            ) : filteredAssets.length === 0 ? (
              <div className="text-center py-12">
                <Package size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600">No assets found</h3>
                <p className="text-gray-400 mt-1">
                  {searchTerm ? 'Try adjusting your search' : 'Start by registering your first asset'}
                </p>
              </div>
            ) : (
              <table className="w-full">
                {renderTableHeader()}
                <tbody>
                  {filteredAssets.map(renderTableRow)}
                </tbody>
              </table>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {filteredAssets.length} of {assets.length} assets
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">Previous</button>
              <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</span>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showDetailsModal && <AssetDetailsModal />}
      {showQRModal && <QRCodeModal />}
    </div>
  );
};

export default Assets;