// pages/depreciation.tsx
import { useState } from 'react';
import Navbar from '../components/navbar';
import { 
  TrendingDown, 
  Search, 
  RefreshCw,
  Filter,
  ChevronDown,
  Download,
  DollarSign,
  Calendar,
  PieChart,
  ArrowUp,
  ArrowDown,
  Clock
} from 'lucide-react';

interface Depreciation {
  id: number;
  assetName: string;
  assetCode: string;
  category: string;
  acquisitionCost: number;
  accumulatedDepreciation: number;
  netBookValue: number;
  depreciationRate: number;
  currentYearDepreciation: number;
  usefulLifeYears: number;
  purchaseDate: string;
  method: 'Straight-Line' | 'Declining Balance' | 'Units of Production';
  status: 'Active' | 'Fully Depreciated' | 'Disposed';
}

const Depreciation = () => {
  const [depreciations, setDepreciations] = useState<Depreciation[]>([
    {
      id: 1,
      assetName: 'Dell Latitude 7450',
      assetCode: 'IT_EQ_00043',
      category: 'IT Equipment',
      acquisitionCost: 1800,
      accumulatedDepreciation: 720,
      netBookValue: 1080,
      depreciationRate: 20,
      currentYearDepreciation: 360,
      usefulLifeYears: 5,
      purchaseDate: '2023-01-15',
      method: 'Straight-Line',
      status: 'Active'
    },
    {
      id: 2,
      assetName: 'Toyota Prado',
      assetCode: 'VEH_00012',
      category: 'Vehicle',
      acquisitionCost: 45000,
      accumulatedDepreciation: 11250,
      netBookValue: 33750,
      depreciationRate: 25,
      currentYearDepreciation: 5625,
      usefulLifeYears: 4,
      purchaseDate: '2022-06-20',
      method: 'Straight-Line',
      status: 'Active'
    },
    {
      id: 3,
      assetName: 'Industrial Conveyor Belt',
      assetCode: 'MCH_00056',
      category: 'Machinery',
      acquisitionCost: 75000,
      accumulatedDepreciation: 30000,
      netBookValue: 45000,
      depreciationRate: 10,
      currentYearDepreciation: 7500,
      usefulLifeYears: 10,
      purchaseDate: '2020-03-10',
      method: 'Straight-Line',
      status: 'Active'
    },
    {
      id: 4,
      assetName: 'Office Desks (x15)',
      assetCode: 'FUR_00012',
      category: 'Furniture',
      acquisitionCost: 12000,
      accumulatedDepreciation: 9600,
      netBookValue: 2400,
      depreciationRate: 20,
      currentYearDepreciation: 2400,
      usefulLifeYears: 5,
      purchaseDate: '2019-08-01',
      method: 'Straight-Line',
      status: 'Fully Depreciated'
    },
    {
      id: 5,
      assetName: 'HP LaserJet Pro',
      assetCode: 'OFF_EQ_00089',
      category: 'Office Equipment',
      acquisitionCost: 2500,
      accumulatedDepreciation: 1250,
      netBookValue: 1250,
      depreciationRate: 20,
      currentYearDepreciation: 500,
      usefulLifeYears: 5,
      purchaseDate: '2022-11-15',
      method: 'Straight-Line',
      status: 'Active'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDepreciations, setFilteredDepreciations] = useState<Depreciation[]>(depreciations);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filterDepreciations = () => {
    let filtered = depreciations;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(d =>
        d.assetName.toLowerCase().includes(term) ||
        d.assetCode.toLowerCase().includes(term) ||
        d.category.toLowerCase().includes(term)
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(d => d.status === statusFilter);
    }
    setFilteredDepreciations(filtered);
  };

  useState(() => {
    filterDepreciations();
  }, [searchTerm, statusFilter, depreciations]);

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Active': 'bg-green-100 text-green-800',
      'Fully Depreciated': 'bg-yellow-100 text-yellow-800',
      'Disposed': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const totalAssets = depreciations.length;
  const totalCost = depreciations.reduce((sum, d) => sum + d.acquisitionCost, 0);
  const totalDepreciation = depreciations.reduce((sum, d) => sum + d.accumulatedDepreciation, 0);
  const totalBookValue = depreciations.reduce((sum, d) => sum + d.netBookValue, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <TrendingDown size={24} className="text-purple-600" />
              Depreciation Schedule
            </h1>
            <p className="text-gray-600 mt-1">Track asset depreciation and net book values</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-500">Total Assets</p><p className="text-2xl font-bold text-gray-800">{totalAssets}</p></div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><TrendingDown size={20} className="text-blue-600" /></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-500">Total Cost</p><p className="text-2xl font-bold text-gray-800">ETB {totalCost.toLocaleString()}</p></div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><DollarSign size={20} className="text-green-600" /></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-500">Total Depreciation</p><p className="text-2xl font-bold text-red-600">ETB {totalDepreciation.toLocaleString()}</p></div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center"><ArrowDown size={20} className="text-red-600" /></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-500">Net Book Value</p><p className="text-2xl font-bold text-purple-600">ETB {totalBookValue.toLocaleString()}</p></div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"><ArrowUp size={20} className="text-purple-600" /></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search depreciation records..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
            </div>
            <div className="flex items-center gap-2">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white">
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Fully Depreciated">Fully Depreciated</option>
                <option value="Disposed">Disposed</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"><Filter size={18} />Filter<ChevronDown size={16} /></button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"><Download size={18} />Export</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-50 to-blue-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Asset</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Cost</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Accum. Dep.</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Net Book Value</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Rate</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepreciations.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-12"><TrendingDown size={48} className="mx-auto text-gray-300 mb-4" /><h3 className="text-lg font-medium text-gray-600">No depreciation records found</h3></td></tr>
                ) : (
                  filteredDepreciations.map((d) => (
                    <tr key={d.id} className="hover:bg-purple-50/50 transition-colors duration-150 border-b border-gray-100">
                      <td className="px-4 py-3"><div><p className="text-sm font-medium text-gray-800">{d.assetName}</p><p className="text-xs text-gray-500 font-mono">{d.assetCode}</p></div></td>
                      <td className="px-4 py-3 text-sm text-gray-600">{d.category}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">ETB {d.acquisitionCost.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-red-600">ETB {d.accumulatedDepreciation.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm font-bold text-purple-600">ETB {d.netBookValue.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm">{d.depreciationRate}%</td>
                      <td className="px-4 py-3 text-sm"><span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(d.status)}`}>{d.status}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">Showing {filteredDepreciations.length} of {depreciations.length} records</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">Previous</button>
              <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</span>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Depreciation;