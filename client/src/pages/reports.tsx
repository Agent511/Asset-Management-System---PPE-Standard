// pages/reports.tsx
import { useState } from 'react';
import Navbar from '../components/navbar';
import { 
  FileText, 
  Search, 
  RefreshCw,
  Download,
  Calendar,
  PieChart,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Printer,
  Eye,
  Filter
} from 'lucide-react';

interface Report {
  id: number;
  name: string;
  type: 'Asset Summary' | 'Depreciation' | 'Maintenance' | 'Disposal' | 'Verification';
  generatedDate: string;
  generatedBy: string;
  format: 'PDF' | 'Excel' | 'CSV';
  status: 'Generated' | 'Scheduled' | 'Failed';
  description: string;
  size: string;
}

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      name: 'Asset Summary Report - June 2024',
      type: 'Asset Summary',
      generatedDate: '2024-06-30',
      generatedBy: 'Sarah Johnson',
      format: 'PDF',
      status: 'Generated',
      description: 'Complete summary of all assets with values and status',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'Depreciation Schedule - Q2 2024',
      type: 'Depreciation',
      generatedDate: '2024-06-28',
      generatedBy: 'John Doe',
      format: 'Excel',
      status: 'Generated',
      description: 'Quarterly depreciation report for all assets',
      size: '1.8 MB'
    },
    {
      id: 3,
      name: 'Maintenance Cost Analysis',
      type: 'Maintenance',
      generatedDate: '2024-06-25',
      generatedBy: 'Mike Johnson',
      format: 'PDF',
      status: 'Generated',
      description: 'Analysis of maintenance costs by asset category',
      size: '3.1 MB'
    },
    {
      id: 4,
      name: 'Asset Disposal Report - 2024',
      type: 'Disposal',
      generatedDate: '2024-06-20',
      generatedBy: 'Tom Harris',
      format: 'CSV',
      status: 'Generated',
      description: 'Report of all disposed assets with financial impact',
      size: '0.9 MB'
    },
    {
      id: 5,
      name: 'Monthly Verification Summary',
      type: 'Verification',
      generatedDate: '2024-06-18',
      generatedBy: 'Lisa Chen',
      format: 'PDF',
      status: 'Generated',
      description: 'Summary of asset verification results for June',
      size: '1.2 MB'
    },
    {
      id: 6,
      name: 'Asset Utilization Report',
      type: 'Asset Summary',
      generatedDate: '2024-06-15',
      generatedBy: 'Robert Taylor',
      format: 'Excel',
      status: 'Scheduled',
      description: 'Report on asset utilization rates and efficiency',
      size: '-'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReports, setFilteredReports] = useState<Report[]>(reports);
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filterReports = () => {
    let filtered = reports;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(term) ||
        r.type.toLowerCase().includes(term) ||
        r.generatedBy.toLowerCase().includes(term)
      );
    }
    if (typeFilter !== 'all') {
      filtered = filtered.filter(r => r.type === typeFilter);
    }
    setFilteredReports(filtered);
  };

  useState(() => {
    filterReports();
  }, [searchTerm, typeFilter, reports]);

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Generated': 'bg-green-100 text-green-800',
      'Scheduled': 'bg-yellow-100 text-yellow-800',
      'Failed': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Asset Summary': 'bg-blue-100 text-blue-800',
      'Depreciation': 'bg-purple-100 text-purple-800',
      'Maintenance': 'bg-orange-100 text-orange-800',
      'Disposal': 'bg-red-100 text-red-800',
      'Verification': 'bg-green-100 text-green-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getFormatIcon = (format: string) => {
    const icons: { [key: string]: string } = {
      'PDF': '📄',
      'Excel': '📊',
      'CSV': '📋'
    };
    return icons[format] || '📄';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FileText size={24} className="text-blue-600" />
              Reports
            </h1>
            <p className="text-gray-600 mt-1">Generate and manage asset reports</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
              <RefreshCw size={18} />
              Refresh
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-600/20">
              <FileText size={18} />
              Generate Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-500">Total Reports</p><p className="text-2xl font-bold text-gray-800">{reports.length}</p></div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><FileText size={20} className="text-blue-600" /></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-500">Generated</p><p className="text-2xl font-bold text-green-600">{reports.filter(r => r.status === 'Generated').length}</p></div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><FileText size={20} className="text-green-600" /></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-500">Scheduled</p><p className="text-2xl font-bold text-yellow-600">{reports.filter(r => r.status === 'Scheduled').length}</p></div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center"><Calendar size={20} className="text-yellow-600" /></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-500">Report Types</p><p className="text-2xl font-bold text-purple-600">{new Set(reports.map(r => r.type)).size}</p></div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"><PieChart size={20} className="text-purple-600" /></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search reports..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
            </div>
            <div className="flex items-center gap-2">
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white">
                <option value="all">All Types</option>
                <option value="Asset Summary">Asset Summary</option>
                <option value="Depreciation">Depreciation</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Disposal">Disposal</option>
                <option value="Verification">Verification</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"><Filter size={18} />Filter</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.length === 0 ? (
            <div className="col-span-3 text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-600">No reports found</h3>
            </div>
          ) : (
            filteredReports.map((report) => (
              <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getFormatIcon(report.format)}</div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">{report.name}</h3>
                      <p className="text-xs text-gray-500">{report.description}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
                <div className="space-y-2 mt-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Type</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                      {report.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Date</span>
                    <span className="text-gray-800">{new Date(report.generatedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Generated By</span>
                    <span className="text-gray-800">{report.generatedBy}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Size</span>
                    <span className="text-gray-800">{report.size}</span>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
                  <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                    <Eye size={16} />
                  </button>
                  <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Download">
                    <Download size={16} />
                  </button>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="Print">
                    <Printer size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;