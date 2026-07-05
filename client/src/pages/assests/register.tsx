// pages/assests/register.tsx
import { useState } from 'react';
import Navbar from '../../components/navbar';
import { useNavigate } from 'react-router-dom';
import { 
  Save, X, Info, Hash, Tag, FileText, Box, Layers, 
  Cpu, Monitor, Wifi, Car, Fuel, Gauge, Users, 
  Building2, Sofa, Printer, HardDrive, Clock, 
  Warehouse, Trees, Home, Briefcase 
} from 'lucide-react';
import axios from 'axios';

interface FormData {
  // Core Fields
  assetId: string;
  assetName: string;
  assetDescription: string;
  category: string;
  subcategory: string;
  status: string;
  brand: string;
  
  // IT Equipment Fields
  modelNumber?: string;
  assetType?: string;
  processor?: string;
  operatingSystem?: string;
  monitorSize?: string;
  connectivity?: string;
  warrantyExpiry?: string;
  
  // Vehicle Fields
  registrationNumber?: string;
  make?: string;
  model?: string;
  manufacturingYear?: string;
  engineNumber?: string;
  vinNumber?: string;
  fuelType?: string;
  engineCapacity?: string;
  transmission?: string;
  seatingCapacity?: string;
  insurancePolicyNumber?: string;
  insuranceExpiry?: string;
  registrationExpiry?: string;

  // Machinery Fields
  machineryType?: string;
  powerRating?: string;
  voltage?: string;
  phase?: string;
  weight?: string;
  dimensions?: string;
  operatingTemperature?: string;
  safetyCertification?: string;
  lastInspection?: string;
  nextInspection?: string;

  // Furniture Fields
  material?: string;
  color?: string;
  dimensionsFurniture?: string;
  weightCapacity?: string;
  assemblyRequired?: string;
  warrantyPeriod?: string;

  // Building Fields
  buildingType?: string;
  floorArea?: string;
  numberOfFloors?: string;
  constructionYear?: string;
  buildingMaterial?: string;
  occupancyType?: string;
  utilities?: string;
  parkingAvailable?: string;
  securityFeatures?: string;

  // Land Fields
  landArea?: string;
  landUse?: string;
  zoning?: string;
  soilType?: string;
  topography?: string;
  utilitiesAvailable?: string;
  accessibility?: string;

  // Office Equipment Fields
  equipmentType?: string;
  powerConsumption?: string;
  connectivityOffice?: string;
  paperCapacity?: string;
  printSpeed?: string;
  functions?: string;
}

const Register = () => { 
  const [formData, setFormData] = useState<FormData>({
    assetId: 'IT_EQ_00043',
    assetName: '',
    assetDescription: '',
    category: '',
    subcategory: '',
    status: 'Active',
    brand: '',
  });
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Auto-generate Asset ID based on category
  const generateAssetId = (category: string) => {
    const prefixes: { [key: string]: string } = {
      'IT Equipment': 'IT_EQ',
      'Machinery': 'MCH',
      'Furniture': 'FUR',
      'Vehicle': 'VEH',
      'Building': 'BLD',
      'Land': 'LND',
      'Office Equipment': 'OFF_EQ'
    };
    
    const randomNum = String(Math.floor(Math.random() * 1000)).padStart(5, '0');
    return `${prefixes[category] || 'AST'}_${randomNum}`;
  };

  const handleCategoryChange = (category: string) => {
    const newAssetId = generateAssetId(category);
    setFormData({
      ...formData,
      category,
      assetId: newAssetId,
      // Reset all category-specific fields
      modelNumber: '',
      assetType: '',
      processor: '',
      operatingSystem: '',
      monitorSize: '',
      connectivity: '',
      warrantyExpiry: '',
      registrationNumber: '',
      make: '',
      model: '',
      manufacturingYear: '',
      engineNumber: '',
      vinNumber: '',
      fuelType: '',
      engineCapacity: '',
      transmission: '',
      seatingCapacity: '',
      insurancePolicyNumber: '',
      insuranceExpiry: '',
      registrationExpiry: '',
      machineryType: '',
      powerRating: '',
      voltage: '',
      phase: '',
      weight: '',
      dimensions: '',
      operatingTemperature: '',
      safetyCertification: '',
      lastInspection: '',
      nextInspection: '',
      material: '',
      color: '',
      dimensionsFurniture: '',
      weightCapacity: '',
      assemblyRequired: '',
      warrantyPeriod: '',
      buildingType: '',
      floorArea: '',
      numberOfFloors: '',
      constructionYear: '',
      buildingMaterial: '',
      occupancyType: '',
      utilities: '',
      parkingAvailable: '',
      securityFeatures: '',
      landArea: '',
      landUse: '',
      zoning: '',
      soilType: '',
      topography: '',
      utilitiesAvailable: '',
      accessibility: '',
      equipmentType: '',
      powerConsumption: '',
      connectivityOffice: '',
      paperCapacity: '',
      printSpeed: '',
      functions: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = () => {
    setFormData({
      assetId: generateAssetId(formData.category || ''),
      assetName: '',
      assetDescription: '',
      category: formData.category,
      subcategory: '',
      status: 'Active',
      brand: '',
    });
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    try {
      // Prepare data for API
      const apiData = {
        assetName: formData.assetName,
        assetDescription: formData.assetDescription,
        category: formData.category,
        subcategory: formData.subcategory,
        status: formData.status,
        brand: formData.brand,
        
        // IT Equipment
        modelNumber: formData.modelNumber,
        assetType: formData.assetType,
        processor: formData.processor,
        operatingSystem: formData.operatingSystem,
        monitorSize: formData.monitorSize,
        connectivity: formData.connectivity,
        warrantyExpiry: formData.warrantyExpiry,
        
        // Vehicle
        registrationNumber: formData.registrationNumber,
        make: formData.make,
        model: formData.model,
        manufacturingYear: formData.manufacturingYear,
        engineNumber: formData.engineNumber,
        vinNumber: formData.vinNumber,
        fuelType: formData.fuelType,
        engineCapacity: formData.engineCapacity,
        transmission: formData.transmission,
        seatingCapacity: formData.seatingCapacity,
        insurancePolicyNumber: formData.insurancePolicyNumber,
        insuranceExpiry: formData.insuranceExpiry,
        registrationExpiry: formData.registrationExpiry,
        
        // Machinery
        machineryType: formData.machineryType,
        powerRating: formData.powerRating,
        voltage: formData.voltage,
        phase: formData.phase,
        weight: formData.weight,
        dimensions: formData.dimensions,
        operatingTemperature: formData.operatingTemperature,
        safetyCertification: formData.safetyCertification,
        lastInspection: formData.lastInspection,
        nextInspection: formData.nextInspection,
        
        // Furniture
        material: formData.material,
        color: formData.color,
        dimensionsFurniture: formData.dimensionsFurniture,
        weightCapacity: formData.weightCapacity,
        assemblyRequired: formData.assemblyRequired,
        warrantyPeriod: formData.warrantyPeriod,
        
        // Building
        buildingType: formData.buildingType,
        floorArea: formData.floorArea,
        numberOfFloors: formData.numberOfFloors,
        constructionYear: formData.constructionYear,
        buildingMaterial: formData.buildingMaterial,
        occupancyType: formData.occupancyType,
        utilities: formData.utilities,
        parkingAvailable: formData.parkingAvailable,
        securityFeatures: formData.securityFeatures,
        
        // Land
        landArea: formData.landArea,
        landUse: formData.landUse,
        zoning: formData.zoning,
        soilType: formData.soilType,
        topography: formData.topography,
        utilitiesAvailable: formData.utilitiesAvailable,
        accessibility: formData.accessibility,
        
        // Office Equipment
        equipmentType: formData.equipmentType,
        powerConsumption: formData.powerConsumption,
        connectivityOffice: formData.connectivityOffice,
        paperCapacity: formData.paperCapacity,
        printSpeed: formData.printSpeed,
        functions: formData.functions,
      };

      console.log('Sending data to API:', apiData);

      const response = await axios.post('http://localhost:5000/api/assets/register', apiData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setSubmitSuccess(true);
        alert(`✅ Asset registered successfully!\nAsset Code: ${response.data.data.assetCode}`);
        navigate('/assets');
        handleReset();
        setSubmitted(true);
        console.log('Asset registered:', response.data);
      }

    } catch (error: any) {
      console.error('Error registering asset:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to register asset';
      setSubmitError(errorMessage);
      alert(`❌ Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Category options
  const categories = [
    'Machinery',
    'IT Equipment',
    'Furniture',
    'Vehicle',
    'Building',
    'Land',
    'Office Equipment'
  ];

  // Subcategories based on category
  const getSubcategories = () => {
    const subcategoryMap: { [key: string]: string[] } = {
      'IT Equipment': ['Laptop', 'Desktop', 'Monitor', 'Printer', 'Projector', 'Server', 'Network Device'],
      'Vehicle': ['Sedan', 'SUV', 'Truck', 'Bus', 'Motorcycle', 'Van', 'Heavy Equipment'],
      'Machinery': ['Industrial', 'Construction', 'Agricultural', 'Manufacturing', 'Medical', 'Laboratory'],
      'Furniture': ['Desk', 'Chair', 'Cabinet', 'Shelf', 'Table', 'Cubicle', 'Workstation', 'Filing Cabinet'],
      'Building': ['Office', 'Warehouse', 'Factory', 'Retail Space', 'Residential', 'Storage', 'Workshop'],
      'Land': ['Commercial', 'Residential', 'Agricultural', 'Industrial', 'Recreational', 'Vacant'],
      'Office Equipment': ['Photocopier', 'Fax Machine', 'Shredder', 'Projector', 'Telephone System', 'Scanner', 'Folding Machine']
    };
    return subcategoryMap[formData.category] || [];
  };

  // Status options
  const statuses = ['Active', 'InActive', 'Out-of-stock', 'Under Repair', 'Disposed'];

  // IT Equipment specific fields
  const renderITFields = () => {
    if (formData.category !== 'IT Equipment') return null;

    return (
      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Cpu size={20} className="text-blue-600" />
          IT Equipment Specifications
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Model Number</label>
            <input
              type="text"
              name="modelNumber"
              value={formData.modelNumber || ''}
              onChange={handleInputChange}
              placeholder="e.g., Latitude 7450"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Asset Type</label>
            <select
              name="assetType"
              value={formData.assetType || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Select Type</option>
              <option value="Laptop">Laptop</option>
              <option value="Desktop">Desktop</option>
              <option value="Monitor">Monitor</option>
              <option value="Printer">Printer</option>
              <option value="Projector">Projector</option>
              <option value="Server">Server</option>
              <option value="Network Device">Network Device</option>
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Processor / RAM / Storage</label>
            <input
              type="text"
              name="processor"
              value={formData.processor || ''}
              onChange={handleInputChange}
              placeholder="e.g., Intel i7, 16GB, 512GB SSD"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Operating System</label>
            <input
              type="text"
              name="operatingSystem"
              value={formData.operatingSystem || ''}
              onChange={handleInputChange}
              placeholder="e.g., Windows 11, macOS"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Monitor Size / Resolution</label>
            <input
              type="text"
              name="monitorSize"
              value={formData.monitorSize || ''}
              onChange={handleInputChange}
              placeholder="e.g., 24-inch, 1920x1080"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Connectivity</label>
            <input
              type="text"
              name="connectivity"
              value={formData.connectivity || ''}
              onChange={handleInputChange}
              placeholder="e.g., WiFi, Bluetooth, HDMI"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Warranty Expiry Date</label>
            <input
              type="date"
              name="warrantyExpiry"
              value={formData.warrantyExpiry || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>
      </div>
    );
  };

  // Vehicle specific fields
  const renderVehicleFields = () => {
    if (formData.category !== 'Vehicle') return null;

    return (
      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Car size={20} className="text-green-600" />
          Vehicle Specifications
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Registration / Plate Number</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber || ''}
              onChange={handleInputChange}
              placeholder="e.g., ABC-1234"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Make / Manufacturer</label>
            <input
              type="text"
              name="make"
              value={formData.make || ''}
              onChange={handleInputChange}
              placeholder="e.g., Toyota, Ford"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model || ''}
              onChange={handleInputChange}
              placeholder="e.g., Prado, F-150"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Manufacturing Year</label>
            <input
              type="number"
              name="manufacturingYear"
              value={formData.manufacturingYear || ''}
              onChange={handleInputChange}
              placeholder="e.g., 2022"
              min="1900"
              max={new Date().getFullYear()}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Engine Number</label>
            <input
              type="text"
              name="engineNumber"
              value={formData.engineNumber || ''}
              onChange={handleInputChange}
              placeholder="Stamped on engine block"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Chassis / VIN Number</label>
            <input
              type="text"
              name="vinNumber"
              value={formData.vinNumber || ''}
              onChange={handleInputChange}
              placeholder="17 characters VIN"
              maxLength={17}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Fuel Type</label>
            <select
              name="fuelType"
              value={formData.fuelType || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="CNG">CNG</option>
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Engine Capacity (CC)</label>
            <input
              type="text"
              name="engineCapacity"
              value={formData.engineCapacity || ''}
              onChange={handleInputChange}
              placeholder="e.g., 2400cc"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Transmission</label>
            <select
              name="transmission"
              value={formData.transmission || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Select Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="CVT">CVT</option>
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Seating Capacity</label>
            <input
              type="text"
              name="seatingCapacity"
              value={formData.seatingCapacity || ''}
              onChange={handleInputChange}
              placeholder="e.g., 7-seater, 45-seater bus"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Insurance Policy Number</label>
            <input
              type="text"
              name="insurancePolicyNumber"
              value={formData.insurancePolicyNumber || ''}
              onChange={handleInputChange}
              placeholder="Insurance policy number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Insurance Expiry Date</label>
            <input
              type="date"
              name="insuranceExpiry"
              value={formData.insuranceExpiry || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Registration Expiry Date</label>
            <input
              type="date"
              name="registrationExpiry"
              value={formData.registrationExpiry || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>
      </div>
    );
  };

  // Machinery specific fields
  const renderMachineryFields = () => {
    if (formData.category !== 'Machinery') return null;

    return (
      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Warehouse size={20} className="text-orange-600" />
          Machinery Specifications
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Machinery Type</label>
            <select
              name="machineryType"
              value={formData.machineryType || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Select Type</option>
              <option value="Industrial">Industrial</option>
              <option value="Construction">Construction</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Medical">Medical</option>
              <option value="Laboratory">Laboratory</option>
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Power Rating (kW/HP)</label>
            <input
              type="text"
              name="powerRating"
              value={formData.powerRating || ''}
              onChange={handleInputChange}
              placeholder="e.g., 50kW, 100HP"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Voltage</label>
            <input
              type="text"
              name="voltage"
              value={formData.voltage || ''}
              onChange={handleInputChange}
              placeholder="e.g., 220V, 440V"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Phase</label>
            <select
              name="phase"
              value={formData.phase || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Select Phase</option>
              <option value="Single">Single Phase</option>
              <option value="Three">Three Phase</option>
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Weight (kg)</label>
            <input
              type="text"
              name="weight"
              value={formData.weight || ''}
              onChange={handleInputChange}
              placeholder="e.g., 500kg"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Dimensions (LxWxH)</label>
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions || ''}
              onChange={handleInputChange}
              placeholder="e.g., 2m x 1.5m x 2m"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Operating Temperature</label>
            <input
              type="text"
              name="operatingTemperature"
              value={formData.operatingTemperature || ''}
              onChange={handleInputChange}
              placeholder="e.g., -10°C to 40°C"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Safety Certification</label>
            <input
              type="text"
              name="safetyCertification"
              value={formData.safetyCertification || ''}
              onChange={handleInputChange}
              placeholder="e.g., ISO, CE, UL"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Last Inspection Date</label>
            <input
              type="date"
              name="lastInspection"
              value={formData.lastInspection || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Next Inspection Date</label>
            <input
              type="date"
              name="nextInspection"
              value={formData.nextInspection || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>
      </div>
    );
  };

  // Furniture specific fields
  const renderFurnitureFields = () => {
    if (formData.category !== 'Furniture') return null;

    return (
      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Sofa size={20} className="text-purple-600" />
          Furniture Specifications
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Material</label>
            <input
              type="text"
              name="material"
              value={formData.material || ''}
              onChange={handleInputChange}
              placeholder="e.g., Wood, Steel, Plastic"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Color</label>
            <input
              type="text"
              name="color"
              value={formData.color || ''}
              onChange={handleInputChange}
              placeholder="e.g., Black, White, Brown"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Dimensions (LxWxH)</label>
            <input
              type="text"
              name="dimensionsFurniture"
              value={formData.dimensionsFurniture || ''}
              onChange={handleInputChange}
              placeholder="e.g., 120cm x 60cm x 75cm"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Weight Capacity (kg)</label>
            <input
              type="text"
              name="weightCapacity"
              value={formData.weightCapacity || ''}
              onChange={handleInputChange}
              placeholder="e.g., 100kg"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Assembly Required</label>
            <select
              name="assemblyRequired"
              value={formData.assemblyRequired || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Warranty Period</label>
            <input
              type="text"
              name="warrantyPeriod"
              value={formData.warrantyPeriod || ''}
              onChange={handleInputChange}
              placeholder="e.g., 2 years, 5 years"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>
      </div>
    );
  };

  // Building specific fields
  const renderBuildingFields = () => {
    if (formData.category !== 'Building') return null;

    return (
      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Building2 size={20} className="text-indigo-600" />
          Building Specifications
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Building Type</label>
            <select
              name="buildingType"
              value={formData.buildingType || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Select Type</option>
              <option value="Office">Office</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Factory">Factory</option>
              <option value="Retail Space">Retail Space</option>
              <option value="Residential">Residential</option>
              <option value="Storage">Storage</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Floor Area (sq ft)</label>
            <input
              type="text"
              name="floorArea"
              value={formData.floorArea || ''}
              onChange={handleInputChange}
              placeholder="e.g., 2500 sq ft"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Number of Floors</label>
            <input
              type="number"
              name="numberOfFloors"
              value={formData.numberOfFloors || ''}
              onChange={handleInputChange}
              placeholder="e.g., 3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Construction Year</label>
            <input
              type="number"
              name="constructionYear"
              value={formData.constructionYear || ''}
              onChange={handleInputChange}
              placeholder="e.g., 2018"
              min="1900"
              max={new Date().getFullYear()}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Building Material</label>
            <input
              type="text"
              name="buildingMaterial"
              value={formData.buildingMaterial || ''}
              onChange={handleInputChange}
              placeholder="e.g., Concrete, Steel, Wood"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Occupancy Type</label>
            <select
              name="occupancyType"
              value={formData.occupancyType || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Select Occupancy</option>
              <option value="Owner Occupied">Owner Occupied</option>
              <option value="Leased">Leased</option>
              <option value="Vacant">Vacant</option>
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Utilities Available</label>
            <input
              type="text"
              name="utilities"
              value={formData.utilities || ''}
              onChange={handleInputChange}
              placeholder="e.g., Electricity, Water, Gas"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Parking Available</label>
            <select
              name="parkingAvailable"
              value={formData.parkingAvailable || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Security Features</label>
            <input
              type="text"
              name="securityFeatures"
              value={formData.securityFeatures || ''}
              onChange={handleInputChange}
              placeholder="e.g., CCTV, Alarm, Security Guard"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>
      </div>
    );
  };

  // Land specific fields
  const renderLandFields = () => {
    if (formData.category !== 'Land') return null;

    return (
      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Trees size={20} className="text-emerald-600" />
          Land Specifications
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Land Area (Acres)</label>
            <input
              type="text"
              name="landArea"
              value={formData.landArea || ''}
              onChange={handleInputChange}
              placeholder="e.g., 5 acres"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Land Use</label>
            <select
              name="landUse"
              value={formData.landUse || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Select Land Use</option>
              <option value="Commercial">Commercial</option>
              <option value="Residential">Residential</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Industrial">Industrial</option>
              <option value="Recreational">Recreational</option>
              <option value="Vacant">Vacant</option>
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Zoning</label>
            <input
              type="text"
              name="zoning"
              value={formData.zoning || ''}
              onChange={handleInputChange}
              placeholder="e.g., Commercial, Residential"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Soil Type</label>
            <input
              type="text"
              name="soilType"
              value={formData.soilType || ''}
              onChange={handleInputChange}
              placeholder="e.g., Clay, Sandy, Loam"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Topography</label>
            <select
              name="topography"
              value={formData.topography || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Select Topography</option>
              <option value="Flat">Flat</option>
              <option value="Slight Slope">Slight Slope</option>
              <option value="Steep Slope">Steep Slope</option>
              <option value="Hilly">Hilly</option>
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Utilities Available</label>
            <input
              type="text"
              name="utilitiesAvailable"
              value={formData.utilitiesAvailable || ''}
              onChange={handleInputChange}
              placeholder="e.g., Electricity, Water, Sewer"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Accessibility</label>
            <input
              type="text"
              name="accessibility"
              value={formData.accessibility || ''}
              onChange={handleInputChange}
              placeholder="e.g., Main road, Paved access"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>
      </div>
    );
  };

  // Office Equipment specific fields
  const renderOfficeEquipmentFields = () => {
    if (formData.category !== 'Office Equipment') return null;

    return (
      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Printer size={20} className="text-cyan-600" />
          Office Equipment Specifications
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Equipment Type</label>
            <select
              name="equipmentType"
              value={formData.equipmentType || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Select Type</option>
              <option value="Photocopier">Photocopier</option>
              <option value="Printer">Printer</option>
              <option value="Scanner">Scanner</option>
              <option value="Fax Machine">Fax Machine</option>
              <option value="Shredder">Shredder</option>
              <option value="Folding Machine">Folding Machine</option>
              <option value="Telephone System">Telephone System</option>
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Power Consumption (W)</label>
            <input
              type="text"
              name="powerConsumption"
              value={formData.powerConsumption || ''}
              onChange={handleInputChange}
              placeholder="e.g., 500W"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Connectivity</label>
            <input
              type="text"
              name="connectivityOffice"
              value={formData.connectivityOffice || ''}
              onChange={handleInputChange}
              placeholder="e.g., USB, WiFi, Ethernet"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Paper Capacity</label>
            <input
              type="text"
              name="paperCapacity"
              value={formData.paperCapacity || ''}
              onChange={handleInputChange}
              placeholder="e.g., 500 sheets"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Print Speed (ppm)</label>
            <input
              type="text"
              name="printSpeed"
              value={formData.printSpeed || ''}
              onChange={handleInputChange}
              placeholder="e.g., 25 ppm"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Functions</label>
            <input
              type="text"
              name="functions"
              value={formData.functions || ''}
              onChange={handleInputChange}
              placeholder="e.g., Print, Copy, Scan, Fax"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="p-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileText size={24} className="text-blue-600" />
            PPE Asset Registration
          </h1>
          <p className="text-gray-600 mt-1">Register new Property, Plant, and Equipment assets</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="p-6">
              {/* Core Fields Section */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Info size={20} className="text-blue-600" />
                  Core Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Asset ID (Auto-generated) */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Hash size={16} className="text-gray-400" />
                      Asset Unique ID <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="assetId"
                        value={formData.assetId}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 font-mono"
                      />
                      <span className="absolute right-3 top-2 text-xs text-gray-400">Auto-generated</span>
                    </div>
                  </div>

                  {/* Asset Name */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Tag size={16} className="text-gray-400" />
                      Asset Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="assetName"
                      value={formData.assetName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter asset name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>

                  {/* Asset Description */}
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <FileText size={16} className="text-gray-400" />
                      Asset Description
                    </label>
                    <textarea
                      name="assetDescription"
                      value={formData.assetDescription}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Enter detailed asset description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-y"
                    />
                  </div>

                  {/* Asset Category */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Box size={16} className="text-gray-400" />
                      Asset Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Asset Subcategory */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Layers size={16} className="text-gray-400" />
                      Asset Subcategory <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleInputChange}
                      required
                      disabled={!formData.category}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Subcategory</option>
                      {getSubcategories().map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>

                  {/* Brand */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Tag size={16} className="text-gray-400" />
                      Brand
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      placeholder="Enter brand name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>

                  {/* Current Status */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Clock size={16} className="text-gray-400" />
                      Current Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Dynamic Category-Specific Fields */}
              {renderITFields()}
              {renderVehicleFields()}
              {renderMachineryFields()}
              {renderFurnitureFields()}
              {renderBuildingFields()}
              {renderLandFields()}
              {renderOfficeEquipmentFields()}

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium flex items-center gap-2"
                >
                  <X size={18} />
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition font-medium flex items-center gap-2 shadow-lg shadow-blue-600/20 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  <Save size={18} />
                  {isSubmitting ? 'Registering...' : 'Register Asset'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;