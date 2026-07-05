// pages/Dashboard.tsx
import { 
  Package, 
  CheckCircle,
  Clock,
  DollarSign,
  MoreVertical
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import Navbar from '../components/navbar';

// Sample data
const monthlyData = [
  { month: 'Jan', assets: 65, value: 45000, maintenance: 12 },
  { month: 'Feb', assets: 72, value: 52000, maintenance: 8 },
  { month: 'Mar', assets: 78, value: 58000, maintenance: 15 },
  { month: 'Apr', assets: 85, value: 62000, maintenance: 10 },
  { month: 'May', assets: 92, value: 71000, maintenance: 18 },
  { month: 'Jun', assets: 105, value: 85000, maintenance: 14 },
  { month: 'Jul', assets: 112, value: 92000, maintenance: 20 },
  { month: 'Aug', assets: 120, value: 98000, maintenance: 16 },
  { month: 'Sep', assets: 128, value: 105000, maintenance: 22 },
  { month: 'Oct', assets: 135, value: 112000, maintenance: 19 },
  { month: 'Nov', assets: 142, value: 118000, maintenance: 24 },
  { month: 'Dec', assets: 150, value: 125000, maintenance: 21 },
];

const assetStatusData = [
  { name: 'Active', value: 98, color: '#3B82F6' },
  { name: 'In Maintenance', value: 32, color: '#F59E0B' },
  { name: 'Available', value: 15, color: '#10B981' },
  { name: 'Disposed', value: 5, color: '#EF4444' },
];

const departmentData = [
  { name: 'IT', assets: 45, value: 32000 },
  { name: 'HR', assets: 28, value: 15000 },
  { name: 'Finance', assets: 35, value: 28000 },
  { name: 'Operations', assets: 52, value: 42000 },
  { name: 'Marketing', assets: 20, value: 12000 },
];

const recentActivities = [
  { id: 1, asset: 'MacBook Pro 2023', action: 'Assigned to', user: 'Sarah Johnson', time: '2 min ago', status: 'success' },
  { id: 2, asset: 'Office Desk #45', action: 'Returned', user: 'Mike Chen', time: '15 min ago', status: 'info' },
  { id: 3, asset: 'Projector X300', action: 'Under Maintenance', user: 'Tech Team', time: '1 hour ago', status: 'warning' },
  { id: 4, asset: 'Dell Monitor', action: 'Disposed', user: 'Admin', time: '3 hours ago', status: 'danger' },
  { id: 5, asset: 'iPhone 15 Pro', action: 'Verified', user: 'Alice Brown', time: '5 hours ago', status: 'success' },
];

const Dashboard = () => {
  const totalAssets = 150;
  const activeAssets = 98;
  const maintenanceAssets = 32;
  const totalValue = '$125,000';
  const growthRate = '+12.5%';

  const stats = [
    {
      title: 'Total Assets',
      value: totalAssets,
      change: '+12%',
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Assets',
      value: activeAssets,
      change: '+8%',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'In Maintenance',
      value: maintenanceAssets,
      change: '+5%',
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Total Value',
      value: totalValue,
      change: growthRate,
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
  ];

  return (
    <div className="min-h-screen  bg-gray-50">
      <Navbar />
      
      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Asset Growth Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Asset Growth</h3>
                <p className="text-sm text-gray-500">Monthly asset acquisition trend</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical size={18} className="text-gray-400" />
              </button>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorAssets" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="assets" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    fill="url(#colorAssets)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Asset Status Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Asset Status</h3>
                <p className="text-sm text-gray-500">Current distribution</p>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {assetStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Department Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Assets by Department</h3>
                <p className="text-sm text-gray-500">Distribution across departments</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                  <YAxis yAxisId="left" stroke="#9CA3AF" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB'
                    }}
                  />
                  <Bar yAxisId="left" dataKey="assets" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                  <Bar yAxisId="right" dataKey="value" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Maintenance & Value Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Maintenance & Value</h3>
                <p className="text-sm text-gray-500">Monthly maintenance vs asset value</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                  <YAxis yAxisId="left" stroke="#9CA3AF" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB'
                    }}
                  />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2 }}
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="maintenance" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    dot={{ fill: '#F59E0B', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
              <p className="text-sm text-gray-500">Latest asset transactions</p>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Asset</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Action</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">User</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((activity) => (
                  <tr key={activity.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-gray-800">{activity.asset}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{activity.action}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{activity.user}</td>
                    <td className="py-3 px-4 text-sm text-gray-400">{activity.time}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${activity.status === 'success' ? 'bg-green-100 text-green-800' : 
                          activity.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          activity.status === 'danger' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'}`}>
                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;