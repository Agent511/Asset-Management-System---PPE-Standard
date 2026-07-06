// pages/maintenance.tsx
import { useState } from 'react';
import Navbar from '../components/navbar';
import { 
  Wrench, 
  Search, 
  Eye, 
  RefreshCw,
  Filter,
  ChevronDown,
  Download,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  User
} from 'lucide-react';

interface Maintenance {
  id: number;
  assetName: string;
  assetCode: string;
  maintenanceDate: string;
  maintenanceType: 'Preventive' | 'Corrective' | 'Emergency';
  description: string;
  cost: number;
  vendor: string;
  performedBy: string;
  nextMaintenanceDate: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  downtimeHours: number;
}

const Maintenance = () => {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([
    {
      id: 1,
      assetName: 'Dell Latitude 7450',
      assetCode: 'IT_EQ_00043',
      maintenanceDate: '2024-06-20',
      maintenanceType: 'Preventive',
      description: 'Regular system update and cleaning',
      cost: 150,
      vendor: 'Dell Services',
      performedBy: 'John Doe',
      nextMaintenanceDate: '2024-12-20',
      status: 'Completed',
      priority: 'Medium',
      downtimeHours: 1
    },
    {
      id: 2,
      assetName: 'Toyota Prado',
      assetCode: 'VEH_00012',
      maintenanceDate: '2024-06-15',
      maintenanceType: 'Corrective',
      description: 'Oil change and brake inspection',
      cost: 450,
      vendor: 'Toyota Service Center',
      performedBy: 'Mike Johnson',
      nextMaintenanceDate: '2024-09-15',
      status: 'Completed',
      priority: 'High',
      downtimeHours: 3
    },
    {
      id: 3,
      assetName: 'Industrial Conveyor Belt',
      assetCode: 'MCH_00056',
      maintenanceDate: '2024-06-10',
      maintenanceType: 'Emergency',
      description: 'Motor replacement due to failure',
      cost: 2500,
      vendor: 'ConveyorTech Solutions',
      performedBy: 'Tom Harris',
      nextMaintenanceDate: '2024-07-10',
      status: 'In Progress',
      priority: 'Critical',
      downtimeHours: 8
    },
    {
      id: 4,
      assetName: 'Office Desks (x15)',
      assetCode: 'FUR_00012',
      maintenanceDate: '2024-06-05',
      maintenanceType: 'Preventive',
      description: 'Tightening and adjusting all desk components',
      cost: 300,
      vendor: 'Office Solutions Inc.',
      performedBy: 'Lisa Chen',
      nextMaintenanceDate: '2024-12-05',
      status: 'Scheduled',
      priority: 'Low',
      downtimeHours: 2
    },
    {
      id: 5,
      assetName: 'HP LaserJet Pro',
      assetCode: 'OFF_EQ_00089',
      maintenanceDate: '2024-05-28',
      maintenanceType: 'Corrective',
      description: 'Fuser unit replacement',
      cost: 350,
      vendor: 'HP Support',
      performedBy: 'Robert Taylor',
      nextMaintenanceDate: '2024-08-28',
      status: 'Completed',
      priority: 'High',
      downtimeHours: 1.5
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMaintenances, setFilteredMaintenances] = useState<Maintenance[]>(maintenances);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedMaintenance, setSelectedMaintenance] = useState<Maintenance | null>(null);

  const filterMaintenances = () => {
    let filtered = maintenances;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(m =>
        m.assetName.toLowerCase().includes(term) ||
        m.assetCode.toLowerCase().includes(term) ||
        m.vendor.toLowerCase().includes(term)
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(m => m.status === statusFilter);
    }
    setFilteredMaintenances(filtered);
  };

  useState(() => {
    filterMaintenances();
  }, [searchTerm, statusFilter, maintenances]);

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Scheduled': 'bg-blue-100 text-blue-800',
      'In Progress': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      'Low': 'bg-gray-100 text-gray-600',
      'Medium': 'bg-blue-100 text-blue-600',
      'High': 'bg-orange-100 text-orange-600',
      'Critical': 'bg-red-100 text-red-600'
    };
    return colors[priority] || 'bg-gray-100 text-gray-600';
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Preventive': 'bg-green-100 text-green-800',
      'Corrective': 'bg-orange-100 text-orange-800',
      'Emergency': 'bg-red-100 text-red-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Wrench size={24} className="text-orange-600" />
              Maintenance Records
            </h1>
            <p className="text-gray-600 mt-1">Track asset maintenance history and schedule</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
              <RefreshCw size={18} />
              Refresh
            </button>
            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center gap-2 shadow-lg shadow-orange-600/20">
              <Plus size={18} />
              New Maintenance
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search maintenance records..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
            </div>
            <div className="flex items-center gap-2">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white">
                <option value="all">All Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"><Filter size={18} />Filter<ChevronDown size={16} /></button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"><Download size={18} />Export</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-50 to-yellow-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Asset</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Priority</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Cost</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaintenances.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-12"><Wrench size={48} className="mx-auto text-gray-300 mb-4" /><h3 className="text-lg font-medium text-gray-600">No maintenance records found</h3></td></tr>
                ) : (
                  filteredMaintenances.map((m) => (
                    <tr key={m.id} className="hover:bg-orange-50/50 transition-colors duration-150 border-b border-gray-100">
                      <td className="px-4 py-3"><div><p className="text-sm font-medium text-gray-800">{m.assetName}</p><p className="text-xs text-gray-500 font-mono">{m.assetCode}</p></div></td>
                      <td className="px-4 py-3 text-sm"><span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(m.maintenanceType)}`}>{m.maintenanceType}</span></td>
                      <td className="px-4 py-3 text-sm text-gray-600">{new Date(m.maintenanceDate).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-sm"><span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(m.priority)}`}>{m.priority}</span></td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">${m.cost.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm"><span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(m.status)}`}>{m.status}</span></td>
                      <td className="px-4 py-3 text-sm"><button onClick={() => setSelectedMaintenance(m)} className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"><Eye size={16} /></button></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">Showing {filteredMaintenances.length} of {maintenances.length} records</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">Previous</button>
              <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</span>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">Next</button>
            </div>
          </div>
        </div>
      </div>

      {selectedMaintenance && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div><h2 className="text-xl font-bold text-gray-800">Maintenance Details</h2><p className="text-sm text-gray-500">{selectedMaintenance.assetCode}</p></div>
              <button onClick={() => setSelectedMaintenance(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-medium text-gray-500 uppercase">Asset</label><p className="text-sm font-medium text-gray-800">{selectedMaintenance.assetName}</p></div>
                <div><label className="text-xs font-medium text-gray-500 uppercase">Type</label><p className="text-sm font-medium text-gray-800">{selectedMaintenance.maintenanceType}</p></div>
                <div><label className="text-xs font-medium text-gray-500 uppercase">Date</label><p className="text-sm font-medium text-gray-800">{new Date(selectedMaintenance.maintenanceDate).toLocaleDateString()}</p></div>
                <div><label className="text-xs font-medium text-gray-500 uppercase">Priority</label><p className="text-sm font-medium text-gray-800">{selectedMaintenance.priority}</p></div>
                <div><label className="text-xs font-medium text-gray-500 uppercase">Cost</label><p className="text-sm font-medium text-gray-800">${selectedMaintenance.cost.toLocaleString()}</p></div>
                <div><label className="text-xs font-medium text-gray-500 uppercase">Downtime</label><p className="text-sm font-medium text-gray-800">{selectedMaintenance.downtimeHours} hours</p></div>
                <div><label className="text-xs font-medium text-gray-500 uppercase">Vendor</label><p className="text-sm font-medium text-gray-800">{selectedMaintenance.vendor}</p></div>
                <div><label className="text-xs font-medium text-gray-500 uppercase">Performed By</label><p className="text-sm font-medium text-gray-800">{selectedMaintenance.performedBy}</p></div>
                <div className="col-span-2"><label className="text-xs font-medium text-gray-500 uppercase">Description</label><p className="text-sm text-gray-600 mt-1">{selectedMaintenance.description}</p></div>
                <div className="col-span-2"><label className="text-xs font-medium text-gray-500 uppercase">Next Maintenance</label><p className="text-sm font-medium text-gray-800">{new Date(selectedMaintenance.nextMaintenanceDate).toLocaleDateString()}</p></div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button onClick={() => setSelectedMaintenance(null)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maintenance;