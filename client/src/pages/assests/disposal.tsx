// pages/assests/disposal.tsx
import { useState } from 'react';
import Navbar from '../../components/navbar';
import { 
  Trash2, 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  RefreshCw,
  Filter,
  ChevronDown,
  Download,
  DollarSign,
  Calendar,
  User,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface Disposal {
  id: number;
  assetName: string;
  assetCode: string;
  category: string;
  disposalDate: string;
  disposalMethod: 'Sold' | 'Scrapped' | 'Donated' | 'Exchanged';
  disposalReason: string;
  salePrice: number | null;
  scrapValue: number | null;
  buyerName: string | null;
  gainOnDisposal: number | null;
  lossOnDisposal: number | null;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed';
  approvedBy: string | null;
  approvalDate: string | null;
  notes: string;
}

const Disposal = () => {
  const [disposals, setDisposals] = useState<Disposal[]>([
    {
      id: 1,
      assetName: 'Dell OptiPlex 7070',
      assetCode: 'IT_EQ_00023',
      category: 'IT Equipment',
      disposalDate: '2024-06-15',
      disposalMethod: 'Sold',
      disposalReason: 'End of useful life',
      salePrice: 350,
      scrapValue: null,
      buyerName: 'TechBuyers Inc.',
      gainOnDisposal: 150,
      lossOnDisposal: null,
      status: 'Completed',
      approvedBy: 'Sarah Johnson',
      approvalDate: '2024-06-16',
      notes: 'Sold at auction'
    },
    {
      id: 2,
      assetName: 'Toyota Corolla 2018',
      assetCode: 'VEH_00008',
      category: 'Vehicle',
      disposalDate: '2024-06-10',
      disposalMethod: 'Sold',
      disposalReason: 'Fleet upgrade',
      salePrice: 8500,
      scrapValue: null,
      buyerName: 'CarMax Auto',
      gainOnDisposal: 1200,
      lossOnDisposal: null,
      status: 'Approved',
      approvedBy: 'Mike Chen',
      approvalDate: '2024-06-12',
      notes: 'Replaced with new fleet vehicles'
    },
    {
      id: 3,
      assetName: 'Industrial Compressor',
      assetCode: 'MCH_00045',
      category: 'Machinery',
      disposalDate: '2024-06-05',
      disposalMethod: 'Scrapped',
      disposalReason: 'Irreparable damage',
      salePrice: null,
      scrapValue: 500,
      buyerName: 'Scrap Metal Co.',
      gainOnDisposal: null,
      lossOnDisposal: 2500,
      status: 'Completed',
      approvedBy: 'Tom Harris',
      approvalDate: '2024-06-06',
      notes: 'Scrapped due to fire damage'
    },
    {
      id: 4,
      assetName: 'Office Desks (x15)',
      assetCode: 'FUR_00012',
      category: 'Furniture',
      disposalDate: '2024-05-28',
      disposalMethod: 'Donated',
      disposalReason: 'Office renovation',
      salePrice: null,
      scrapValue: null,
      buyerName: 'Charity Foundation',
      gainOnDisposal: null,
      lossOnDisposal: null,
      status: 'Completed',
      approvedBy: 'Sarah Johnson',
      approvalDate: '2024-05-29',
      notes: 'Donated to local school'
    },
    {
      id: 5,
      assetName: 'HP LaserJet Printer',
      assetCode: 'OFF_EQ_00067',
      category: 'Office Equipment',
      disposalDate: '2024-05-20',
      disposalMethod: 'Exchanged',
      disposalReason: 'Trade-in for new model',
      salePrice: 200,
      scrapValue: null,
      buyerName: 'TechTrade Solutions',
      gainOnDisposal: 50,
      lossOnDisposal: null,
      status: 'Pending',
      approvedBy: null,
      approvalDate: null,
      notes: 'Waiting for approval'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDisposals, setFilteredDisposals] = useState<Disposal[]>(disposals);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDisposal, setSelectedDisposal] = useState<Disposal | null>(null);

  const filterDisposals = () => {
    let filtered = disposals;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(d =>
        d.assetName.toLowerCase().includes(term) ||
        d.assetCode.toLowerCase().includes(term) ||
        d.category.toLowerCase().includes(term) ||
        d.buyerName?.toLowerCase().includes(term)
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(d => d.status === statusFilter);
    }
    
    setFilteredDisposals(filtered);
  };

  useState(() => {
    filterDisposals();
  }, [searchTerm, statusFilter, disposals]);

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Approved': 'bg-blue-100 text-blue-800 border-blue-200',
      'Rejected': 'bg-red-100 text-red-800 border-red-200',
      'Completed': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getMethodColor = (method: string) => {
    const colors: { [key: string]: string } = {
      'Sold': 'bg-green-100 text-green-800',
      'Scrapped': 'bg-red-100 text-red-800',
      'Donated': 'bg-purple-100 text-purple-800',
      'Exchanged': 'bg-orange-100 text-orange-800'
    };
    return colors[method] || 'bg-gray-100 text-gray-800';
  };

  const totalDisposals = disposals.length;
  const pendingDisposals = disposals.filter(d => d.status === 'Pending').length;
  const completedDisposals = disposals.filter(d => d.status === 'Completed').length;
  const totalGain = disposals.reduce((sum, d) => sum + (d.gainOnDisposal || 0), 0);
  const totalLoss = disposals.reduce((sum, d) => sum + (d.lossOnDisposal || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Trash2 size={24} className="text-red-600" />
              Asset Disposal
            </h1>
            <p className="text-gray-600 mt-1">Manage asset disposal and retirement</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
              <RefreshCw size={18} />
              Refresh
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2 shadow-lg shadow-red-600/20">
              <Plus size={18} />
              New Disposal
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Disposals</p>
                <p className="text-2xl font-bold text-gray-800">{totalDisposals}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Trash2 size={20} className="text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingDisposals}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock size={20} className="text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedDisposals}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle size={20} className="text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Gain</p>
                <p className="text-2xl font-bold text-green-600">ETB {totalGain.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign size={20} className="text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Loss</p>
                <p className="text-2xl font-bold text-red-600">ETB {totalLoss.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle size={20} className="text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search disposals by asset, code, or buyer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Completed">Completed</option>
              </select>
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

        {/* Disposals Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-red-50 to-pink-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Asset</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Method</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDisposals.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12">
                      <Trash2 size={48} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-600">No disposals found</h3>
                      <p className="text-gray-400 mt-1">Try adjusting your search</p>
                    </td>
                  </tr>
                ) : (
                  filteredDisposals.map((disposal) => (
                    <tr key={disposal.id} className="hover:bg-red-50/50 transition-colors duration-150 border-b border-gray-100">
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{disposal.assetName}</p>
                          <p className="text-xs text-gray-500 font-mono">{disposal.assetCode}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{disposal.category}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMethodColor(disposal.disposalMethod)}`}>
                          {disposal.disposalMethod}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(disposal.disposalDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {disposal.salePrice ? (
                          <span className="text-green-600 font-medium">ETB {disposal.salePrice.toLocaleString()}</span>
                        ) : disposal.scrapValue ? (
                          <span className="text-orange-600 font-medium">ETB {disposal.scrapValue.toLocaleString()}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(disposal.status)}`}>
                          {disposal.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedDisposal(disposal)}
                            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            <Eye size={16} />
                          </button>
                          <button className="p-1.5 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">Showing {filteredDisposals.length} of {disposals.length} disposals</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">Previous</button>
              <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</span>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Disposal Details Modal */}
      {selectedDisposal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Disposal Details</h2>
                <p className="text-sm text-gray-500">{selectedDisposal.assetCode}</p>
              </div>
              <button onClick={() => setSelectedDisposal(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-medium text-gray-500 uppercase">Asset Name</label><p className="text-sm font-medium text-gray-800">{selectedDisposal.assetName}</p></div>
                <div><label className="text-xs font-medium text-gray-500 uppercase">Category</label><p className="text-sm font-medium text-gray-800">{selectedDisposal.category}</p></div>
                <div><label className="text-xs font-medium text-gray-500 uppercase">Method</label><p className="text-sm font-medium text-gray-800">{selectedDisposal.disposalMethod}</p></div>
                <div><label className="text-xs font-medium text-gray-500 uppercase">Date</label><p className="text-sm font-medium text-gray-800">{new Date(selectedDisposal.disposalDate).toLocaleDateString()}</p></div>
                <div><label className="text-xs font-medium text-gray-500 uppercase">Status</label><span className={`mt-1 px-3 py-1 inline-flex text-xs font-semibold rounded-full border ${getStatusColor(selectedDisposal.status)}`}>{selectedDisposal.status}</span></div>
                <div><label className="text-xs font-medium text-gray-500 uppercase">Reason</label><p className="text-sm font-medium text-gray-800">{selectedDisposal.disposalReason}</p></div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Financial Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedDisposal.salePrice !== null && <div><label className="text-xs font-medium text-gray-500 uppercase">Sale Price</label><p className="text-sm font-medium text-green-600">${selectedDisposal.salePrice.toLocaleString()}</p></div>}
                  {selectedDisposal.scrapValue !== null && <div><label className="text-xs font-medium text-gray-500 uppercase">Scrap Value</label><p className="text-sm font-medium text-orange-600">${selectedDisposal.scrapValue.toLocaleString()}</p></div>}
                  {selectedDisposal.gainOnDisposal !== null && <div><label className="text-xs font-medium text-gray-500 uppercase">Gain</label><p className="text-sm font-medium text-green-600">${selectedDisposal.gainOnDisposal.toLocaleString()}</p></div>}
                  {selectedDisposal.lossOnDisposal !== null && <div><label className="text-xs font-medium text-gray-500 uppercase">Loss</label><p className="text-sm font-medium text-red-600">${selectedDisposal.lossOnDisposal.toLocaleString()}</p></div>}
                  {selectedDisposal.buyerName && <div className="col-span-2"><label className="text-xs font-medium text-gray-500 uppercase">Buyer</label><p className="text-sm font-medium text-gray-800">{selectedDisposal.buyerName}</p></div>}
                </div>
              </div>
              {selectedDisposal.notes && (
                <div className="border-t border-gray-200 pt-4">
                  <label className="text-xs font-medium text-gray-500 uppercase">Notes</label>
                  <p className="text-sm text-gray-600 mt-1">{selectedDisposal.notes}</p>
                </div>
              )}
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button onClick={() => setSelectedDisposal(null)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Disposal;