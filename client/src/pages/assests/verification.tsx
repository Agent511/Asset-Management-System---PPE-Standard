// pages/assests/verification.tsx
import { useState } from 'react';
import Navbar from '../../components/navbar';
import { 
  CheckCircle, 
  Search, 
  Eye, 
  RefreshCw,
  Filter,
  ChevronDown,
  Download,
  Calendar,
  User,
  MapPin,
  Clock,
  AlertCircle,
  XCircle,
  Shield
} from 'lucide-react';

interface Verification {
  id: number;
  assetName: string;
  assetCode: string;
  category: string;
  verificationDate: string;
  verifiedBy: string;
  verificationMethod: 'Physical' | 'Document' | 'Remote';
  assetCondition: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Damaged';
  locationVerified: boolean;
  serialVerified: boolean;
  discrepancies: string | null;
  status: 'Passed' | 'Failed' | 'Pending' | 'Partial';
  notes: string;
}

const Verification = () => {
  const [verifications, setVerifications] = useState<Verification[]>([
    {
      id: 1,
      assetName: 'Dell Latitude 7450',
      assetCode: 'IT_EQ_00043',
      category: 'IT Equipment',
      verificationDate: '2024-06-20',
      verifiedBy: 'John Smith',
      verificationMethod: 'Physical',
      assetCondition: 'Good',
      locationVerified: true,
      serialVerified: true,
      discrepancies: null,
      status: 'Passed',
      notes: 'All items verified and accounted for'
    },
    {
      id: 2,
      assetName: 'Toyota Prado',
      assetCode: 'VEH_00012',
      category: 'Vehicle',
      verificationDate: '2024-06-18',
      verifiedBy: 'Mike Johnson',
      verificationMethod: 'Physical',
      assetCondition: 'Excellent',
      locationVerified: true,
      serialVerified: true,
      discrepancies: null,
      status: 'Passed',
      notes: 'Vehicle in excellent condition'
    },
    {
      id: 3,
      assetName: 'Industrial Conveyor Belt',
      assetCode: 'MCH_00056',
      category: 'Machinery',
      verificationDate: '2024-06-15',
      verifiedBy: 'Tom Harris',
      verificationMethod: 'Physical',
      assetCondition: 'Fair',
      locationVerified: true,
      serialVerified: false,
      discrepancies: 'Serial number mismatch - pending investigation',
      status: 'Pending',
      notes: 'Awaiting confirmation from manufacturer'
    },
    {
      id: 4,
      assetName: 'Office Desk #45',
      assetCode: 'FUR_00034',
      category: 'Furniture',
      verificationDate: '2024-06-12',
      verifiedBy: 'Lisa Chen',
      verificationMethod: 'Remote',
      assetCondition: 'Good',
      locationVerified: true,
      serialVerified: true,
      discrepancies: null,
      status: 'Passed',
      notes: 'Verified via video call'
    },
    {
      id: 5,
      assetName: 'HP LaserJet Pro',
      assetCode: 'OFF_EQ_00089',
      category: 'Office Equipment',
      verificationDate: '2024-06-10',
      verifiedBy: 'Robert Taylor',
      verificationMethod: 'Document',
      assetCondition: 'Poor',
      locationVerified: false,
      serialVerified: true,
      discrepancies: 'Asset not found at specified location',
      status: 'Failed',
      notes: 'Immediate investigation required'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVerifications, setFilteredVerifications] = useState<Verification[]>(verifications);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null);

  const filterVerifications = () => {
    let filtered = verifications;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(v =>
        v.assetName.toLowerCase().includes(term) ||
        v.assetCode.toLowerCase().includes(term) ||
        v.verifiedBy.toLowerCase().includes(term)
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(v => v.status === statusFilter);
    }
    setFilteredVerifications(filtered);
  };

  useState(() => {
    filterVerifications();
  }, [searchTerm, statusFilter, verifications]);

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Passed': 'bg-green-100 text-green-800 border-green-200',
      'Failed': 'bg-red-100 text-red-800 border-red-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Partial': 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getConditionColor = (condition: string) => {
    const colors: { [key: string]: string } = {
      'Excellent': 'bg-green-100 text-green-800',
      'Good': 'bg-blue-100 text-blue-800',
      'Fair': 'bg-yellow-100 text-yellow-800',
      'Poor': 'bg-orange-100 text-orange-800',
      'Damaged': 'bg-red-100 text-red-800'
    };
    return colors[condition] || 'bg-gray-100 text-gray-800';
  };

  const totalVerifications = verifications.length;
  const passedVerifications = verifications.filter(v => v.status === 'Passed').length;
  const pendingVerifications = verifications.filter(v => v.status === 'Pending').length;
  const failedVerifications = verifications.filter(v => v.status === 'Failed').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Shield size={24} className="text-purple-600" />
              Asset Verification
            </h1>
            <p className="text-gray-600 mt-1">Verify and audit asset physical existence</p>
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
              <div><p className="text-sm text-gray-500">Total Verifications</p><p className="text-2xl font-bold text-gray-800">{totalVerifications}</p></div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"><Shield size={20} className="text-purple-600" /></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-500">Passed</p><p className="text-2xl font-bold text-green-600">{passedVerifications}</p></div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><CheckCircle size={20} className="text-green-600" /></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-500">Pending</p><p className="text-2xl font-bold text-yellow-600">{pendingVerifications}</p></div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center"><Clock size={20} className="text-yellow-600" /></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-500">Failed</p><p className="text-2xl font-bold text-red-600">{failedVerifications}</p></div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center"><XCircle size={20} className="text-red-600" /></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search verifications..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
            </div>
            <div className="flex items-center gap-2">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white">
                <option value="all">All Status</option>
                <option value="Passed">Passed</option>
                <option value="Failed">Failed</option>
                <option value="Pending">Pending</option>
                <option value="Partial">Partial</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"><Filter size={18} />Filter<ChevronDown size={16} /></button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"><Download size={18} />Export</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Asset</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Verified By</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Condition</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVerifications.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-12"><Shield size={48} className="mx-auto text-gray-300 mb-4" /><h3 className="text-lg font-medium text-gray-600">No verifications found</h3></td></tr>
                ) : (
                  filteredVerifications.map((v) => (
                    <tr key={v.id} className="hover:bg-purple-50/50 transition-colors duration-150 border-b border-gray-100">
                      <td className="px-4 py-3"><div><p className="text-sm font-medium text-gray-800">{v.assetName}</p><p className="text-xs text-gray-500 font-mono">{v.assetCode}</p></div></td>
                      <td className="px-4 py-3 text-sm text-gray-600">{v.category}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{new Date(v.verificationDate).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{v.verifiedBy}</td>
                      <td className="px-4 py-3 text-sm"><span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(v.assetCondition)}`}>{v.assetCondition}</span></td>
                      <td className="px-4 py-3 text-sm"><span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(v.status)}`}>{v.status}</span></td>
                      <td className="px-4 py-3 text-sm"><button onClick={() => setSelectedVerification(v)} className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"><Eye size={16} /></button></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">Showing {filteredVerifications.length} of {verifications.length} verifications</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">Previous</button>
              <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</span>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">Next</button>
            </div>
          </div>
        </div>
      </div>

      {selectedVerification && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div><h2 className="text-xl font-bold text-gray-800">Verification Details</h2><p className="text-sm text-gray-500">{selectedVerification.assetCode}</p></div>
              <button onClick={() => setSelectedVerification(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-medium text-gray-500 uppercase">Asset Name</label><p className="text-sm font-medium text-gray-800">{selectedVerification.assetName}</p></div>
                <div><label className="text-xs font-medium text-gray-500 uppercase">Category</label><p className="text-sm font-medium text-gray-800">{selectedVerification.category}</p></div>
                <div><label className="text-xs font-medium text-gray-500 uppercase">Date</label><p className="text-sm font-medium text-gray-800">{new Date(selectedVerification.verificationDate).toLocaleDateString()}</p></div>
                <div><label className="text-xs font-medium text-gray-500 uppercase">Verified By</label><p className="text-sm font-medium text-gray-800">{selectedVerification.verifiedBy}</p></div>
                <div><label className="text-xs font-medium text-gray-500 uppercase">Method</label><p className="text-sm font-medium text-gray-800">{selectedVerification.verificationMethod}</p></div>
                <div><label className="text-xs font-medium text-gray-500 uppercase">Condition</label><p className="text-sm font-medium text-gray-800">{selectedVerification.assetCondition}</p></div>
                <div><label className="text-xs font-medium text-gray-500 uppercase">Location Verified</label><p className="text-sm font-medium text-gray-800">{selectedVerification.locationVerified ? 'Yes' : 'No'}</p></div>
                <div><label className="text-xs font-medium text-gray-500 uppercase">Serial Verified</label><p className="text-sm font-medium text-gray-800">{selectedVerification.serialVerified ? 'Yes' : 'No'}</p></div>
                <div className="col-span-2"><label className="text-xs font-medium text-gray-500 uppercase">Status</label><span className={`ml-2 px-3 py-1 inline-flex text-xs font-semibold rounded-full border ${getStatusColor(selectedVerification.status)}`}>{selectedVerification.status}</span></div>
                {selectedVerification.discrepancies && <div className="col-span-2"><label className="text-xs font-medium text-gray-500 uppercase">Discrepancies</label><p className="text-sm text-red-600 mt-1">{selectedVerification.discrepancies}</p></div>}
                {selectedVerification.notes && <div className="col-span-2"><label className="text-xs font-medium text-gray-500 uppercase">Notes</label><p className="text-sm text-gray-600 mt-1">{selectedVerification.notes}</p></div>}
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button onClick={() => setSelectedVerification(null)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verification;