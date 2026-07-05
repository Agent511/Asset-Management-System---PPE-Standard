// pages/assests/transfers.tsx
import { useState } from 'react';
import Navbar from '../../components/navbar';
import { 
  ArrowRightLeft, 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Filter,
  ChevronDown,
  Download,
  User,
  MapPin,
  Calendar,
  FileText
} from 'lucide-react';

interface Transfer {
  id: number;
  assetName: string;
  assetCode: string;
  fromLocation: string;
  toLocation: string;
  fromDepartment: string;
  toDepartment: string;
  fromAssignedTo: string;
  toAssignedTo: string;
  transferDate: string;
  transferType: 'Permanent' | 'Temporary';
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed';
  reason: string;
  approvedBy: string | null;
  approvalDate: string | null;
}

const Transfers = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([
    {
      id: 1,
      assetName: 'Dell Latitude 7450',
      assetCode: 'IT_EQ_00043',
      fromLocation: 'Head Office - Floor 3',
      toLocation: 'Branch Office - Floor 1',
      fromDepartment: 'IT Department',
      toDepartment: 'Finance Department',
      fromAssignedTo: 'John Doe',
      toAssignedTo: 'Jane Smith',
      transferDate: '2024-06-20',
      transferType: 'Permanent',
      status: 'Approved',
      reason: 'Department reorganization',
      approvedBy: 'Sarah Johnson',
      approvalDate: '2024-06-21'
    },
    {
      id: 2,
      assetName: 'Toyota Prado',
      assetCode: 'VEH_00012',
      fromLocation: 'Main Garage',
      toLocation: 'Field Office',
      fromDepartment: 'Administration',
      toDepartment: 'Operations',
      fromAssignedTo: 'Mike Chen',
      toAssignedTo: 'David Wilson',
      transferDate: '2024-06-18',
      transferType: 'Temporary',
      status: 'Pending',
      reason: 'Field project assignment for 3 months',
      approvedBy: null,
      approvalDate: null
    },
    {
      id: 3,
      assetName: 'HP LaserJet Pro',
      assetCode: 'OFF_EQ_00089',
      fromLocation: 'Head Office - Floor 2',
      toLocation: 'Head Office - Floor 5',
      fromDepartment: 'HR Department',
      toDepartment: 'Marketing Department',
      fromAssignedTo: 'Alice Brown',
      toAssignedTo: 'Robert Taylor',
      transferDate: '2024-06-15',
      transferType: 'Permanent',
      status: 'Completed',
      reason: 'Department relocation',
      approvedBy: 'Sarah Johnson',
      approvalDate: '2024-06-16'
    },
    {
      id: 4,
      assetName: 'Industrial Conveyor Belt',
      assetCode: 'MCH_00056',
      fromLocation: 'Warehouse A',
      toLocation: 'Warehouse B',
      fromDepartment: 'Production',
      toDepartment: 'Logistics',
      fromAssignedTo: 'Tom Harris',
      toAssignedTo: 'Emily Davis',
      transferDate: '2024-06-12',
      transferType: 'Permanent',
      status: 'Rejected',
      reason: 'Transfer not approved by management',
      approvedBy: 'Sarah Johnson',
      approvalDate: '2024-06-13'
    },
    {
      id: 5,
      assetName: 'MacBook Pro 16"',
      assetCode: 'IT_EQ_00123',
      fromLocation: 'Head Office - Floor 1',
      toLocation: 'Remote Office',
      fromDepartment: 'Software Development',
      toDepartment: 'Project Management',
      fromAssignedTo: 'Chris Anderson',
      toAssignedTo: 'Maria Garcia',
      transferDate: '2024-06-10',
      transferType: 'Temporary',
      status: 'Approved',
      reason: 'Temporary assignment for project',
      approvedBy: 'Sarah Johnson',
      approvalDate: '2024-06-11'
    },
    {
      id: 6,
      assetName: 'Office Desk #45',
      assetCode: 'FUR_00034',
      fromLocation: 'Head Office - Floor 4',
      toLocation: 'Head Office - Floor 2',
      fromDepartment: 'Finance',
      toDepartment: 'HR',
      fromAssignedTo: 'James Wilson',
      toAssignedTo: 'Lisa Chen',
      transferDate: '2024-06-08',
      transferType: 'Permanent',
      status: 'Pending',
      reason: 'New employee assignment',
      approvedBy: null,
      approvalDate: null
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTransfers, setFilteredTransfers] = useState<Transfer[]>(transfers);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null);

  // Filter transfers
  const filterTransfers = () => {
    let filtered = transfers;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(t =>
        t.assetName.toLowerCase().includes(term) ||
        t.assetCode.toLowerCase().includes(term) ||
        t.fromLocation.toLowerCase().includes(term) ||
        t.toLocation.toLowerCase().includes(term) ||
        t.fromDepartment.toLowerCase().includes(term) ||
        t.toDepartment.toLowerCase().includes(term)
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === statusFilter);
    }
    
    setFilteredTransfers(filtered);
  };

  useState(() => {
    filterTransfers();
  }, [searchTerm, statusFilter, transfers]);

  // Get status color
  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Approved': 'bg-blue-100 text-blue-800 border-blue-200',
      'Rejected': 'bg-red-100 text-red-800 border-red-200',
      'Completed': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Pending': return <Clock size={16} className="text-yellow-600" />;
      case 'Approved': return <CheckCircle size={16} className="text-blue-600" />;
      case 'Rejected': return <XCircle size={16} className="text-red-600" />;
      case 'Completed': return <CheckCircle size={16} className="text-green-600" />;
      default: return null;
    }
  };

  // Calculate statistics
  const totalTransfers = transfers.length;
  const pendingTransfers = transfers.filter(t => t.status === 'Pending').length;
  const approvedTransfers = transfers.filter(t => t.status === 'Approved').length;
  const completedTransfers = transfers.filter(t => t.status === 'Completed').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="p-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <ArrowRightLeft size={24} className="text-blue-600" />
              Asset Transfers
            </h1>
            <p className="text-gray-600 mt-1">Manage asset transfers between locations and departments</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={filterTransfers}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <Plus size={18} />
              New Transfer
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Transfers</p>
                <p className="text-2xl font-bold text-gray-800">{totalTransfers}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ArrowRightLeft size={20} className="text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingTransfers}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock size={20} className="text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-2xl font-bold text-blue-600">{approvedTransfers}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle size={20} className="text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedTransfers}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle size={20} className="text-green-600" />
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
                placeholder="Search transfers by asset, location, or department..."
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

        {/* Transfers Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Asset
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    From
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    To
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransfers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12">
                      <ArrowRightLeft size={48} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-600">No transfers found</h3>
                      <p className="text-gray-400 mt-1">Try adjusting your search or create a new transfer</p>
                    </td>
                  </tr>
                ) : (
                  filteredTransfers.map((transfer) => (
                    <tr key={transfer.id} className="hover:bg-blue-50/50 transition-colors duration-150 border-b border-gray-100">
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{transfer.assetName}</p>
                          <p className="text-xs text-gray-500 font-mono">{transfer.assetCode}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm">
                          <p className="text-gray-800 font-medium">{transfer.fromDepartment}</p>
                          <p className="text-gray-500 text-xs">{transfer.fromLocation}</p>
                          <p className="text-gray-400 text-xs flex items-center gap-1">
                            <User size={12} /> {transfer.fromAssignedTo}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm">
                          <p className="text-gray-800 font-medium">{transfer.toDepartment}</p>
                          <p className="text-gray-500 text-xs">{transfer.toLocation}</p>
                          <p className="text-gray-400 text-xs flex items-center gap-1">
                            <User size={12} /> {transfer.toAssignedTo}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(transfer.transferDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transfer.transferType === 'Permanent' 
                            ? 'bg-purple-100 text-purple-600' 
                            : 'bg-orange-100 text-orange-600'
                        }`}>
                          {transfer.transferType}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full border ${getStatusColor(transfer.status)}`}>
                          {getStatusIcon(transfer.status)}
                          {transfer.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedTransfer(transfer);
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
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {filteredTransfers.length} of {transfers.length} transfers
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">Previous</button>
              <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</span>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Transfer Details Modal */}
      {selectedTransfer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Transfer Details</h2>
                <p className="text-sm text-gray-500">{selectedTransfer.assetCode}</p>
              </div>
              <button
                onClick={() => setSelectedTransfer(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Asset Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Asset Name</label>
                  <p className="text-sm font-medium text-gray-800">{selectedTransfer.assetName}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Asset Code</label>
                  <p className="text-sm font-mono text-blue-600">{selectedTransfer.assetCode}</p>
                </div>
              </div>

              {/* Transfer Details */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <ArrowRightLeft size={16} className="text-blue-600" />
                  Transfer Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Transfer Type</label>
                    <p className="text-sm font-medium text-gray-800">{selectedTransfer.transferType}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Transfer Date</label>
                    <p className="text-sm font-medium text-gray-800">
                      {new Date(selectedTransfer.transferDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Status</label>
                    <span className={`mt-1 px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full border ${getStatusColor(selectedTransfer.status)}`}>
                      {getStatusIcon(selectedTransfer.status)}
                      {selectedTransfer.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Reason</label>
                    <p className="text-sm font-medium text-gray-800">{selectedTransfer.reason}</p>
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <MapPin size={16} className="text-blue-600" />
                  Location & Department
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <label className="text-xs font-medium text-gray-500 uppercase">From</label>
                    <p className="text-sm font-medium text-gray-800">{selectedTransfer.fromDepartment}</p>
                    <p className="text-xs text-gray-500">{selectedTransfer.fromLocation}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <User size={12} /> {selectedTransfer.fromAssignedTo}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <label className="text-xs font-medium text-gray-500 uppercase">To</label>
                    <p className="text-sm font-medium text-gray-800">{selectedTransfer.toDepartment}</p>
                    <p className="text-xs text-gray-500">{selectedTransfer.toLocation}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <User size={12} /> {selectedTransfer.toAssignedTo}
                    </p>
                  </div>
                </div>
              </div>

              {/* Approval Info */}
              {selectedTransfer.approvedBy && (
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <CheckCircle size={16} className="text-blue-600" />
                    Approval Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">Approved By</label>
                      <p className="text-sm font-medium text-gray-800">{selectedTransfer.approvedBy}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">Approval Date</label>
                      <p className="text-sm font-medium text-gray-800">
                        {selectedTransfer.approvalDate ? new Date(selectedTransfer.approvalDate).toLocaleDateString() : '-'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3 rounded-b-2xl">
              <button
                onClick={() => setSelectedTransfer(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                Close
              </button>
              <button className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition flex items-center gap-2">
                <Edit size={18} />
                Edit Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Transfer Modal (Placeholder) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-800">Create New Transfer</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle size={20} />
              </button>
            </div>
            <div className="p-8 text-center">
              <ArrowRightLeft size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-600">Coming Soon</h3>
              <p className="text-gray-400 mt-2">Transfer creation form will be implemented here</p>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transfers;