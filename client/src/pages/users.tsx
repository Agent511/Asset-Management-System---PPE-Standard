// pages/users.tsx
import { useState } from 'react';
import Navbar from '../components/navbar';
import { 
  Users as UsersIcon,
  UserPlus,
  Search,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Filter,
  ChevronDown,
  Download,
  Shield,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Save,
  X
} from 'lucide-react';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'Admin' | 'Manager' | 'User' | 'Viewer';
  department: string;
  phone: string;
  status: 'Active' | 'Inactive' | 'Pending';
  lastLogin: string;
  createdAt: string;
  permissions: string[];
  avatar?: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      username: 'sjohnson',
      email: 'sarah.johnson@company.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: 'Admin',
      department: 'IT',
      phone: '+1 (555) 123-4567',
      status: 'Active',
      lastLogin: '2024-06-30 14:30',
      createdAt: '2024-01-15',
      permissions: ['Full Access', 'User Management', 'Asset Management'],
    },
    {
      id: 2,
      username: 'mchen',
      email: 'mike.chen@company.com',
      firstName: 'Mike',
      lastName: 'Chen',
      role: 'Manager',
      department: 'Operations',
      phone: '+1 (555) 234-5678',
      status: 'Active',
      lastLogin: '2024-06-29 11:20',
      createdAt: '2024-02-01',
      permissions: ['Asset Management', 'Report Generation'],
    },
    {
      id: 3,
      username: 'taylorr',
      email: 'robert.taylor@company.com',
      firstName: 'Robert',
      lastName: 'Taylor',
      role: 'User',
      department: 'Marketing',
      phone: '+1 (555) 345-6789',
      status: 'Active',
      lastLogin: '2024-06-28 09:45',
      createdAt: '2024-03-10',
      permissions: ['View Assets', 'Request Transfers'],
    },
    {
      id: 4,
      username: 'lchen',
      email: 'lisa.chen@company.com',
      firstName: 'Lisa',
      lastName: 'Chen',
      role: 'User',
      department: 'HR',
      phone: '+1 (555) 456-7890',
      status: 'Pending',
      lastLogin: 'Never',
      createdAt: '2024-06-25',
      permissions: ['View Assets'],
    },
    {
      id: 5,
      username: 'tharris',
      email: 'tom.harris@company.com',
      firstName: 'Tom',
      lastName: 'Harris',
      role: 'Manager',
      department: 'Production',
      phone: '+1 (555) 567-8901',
      status: 'Inactive',
      lastLogin: '2024-05-15 16:30',
      createdAt: '2023-11-01',
      permissions: ['Asset Management', 'Maintenance Management'],
    },
    {
      id: 6,
      username: 'edavis',
      email: 'emily.davis@company.com',
      firstName: 'Emily',
      lastName: 'Davis',
      role: 'Viewer',
      department: 'Finance',
      phone: '+1 (555) 678-9012',
      status: 'Active',
      lastLogin: '2024-06-28 13:15',
      createdAt: '2024-04-20',
      permissions: ['View Reports'],
    },
    {
      id: 7,
      username: 'jwilson',
      email: 'james.wilson@company.com',
      firstName: 'James',
      lastName: 'Wilson',
      role: 'User',
      department: 'Facilities',
      phone: '+1 (555) 789-0123',
      status: 'Active',
      lastLogin: '2024-06-27 10:00',
      createdAt: '2024-05-05',
      permissions: ['View Assets', 'Maintenance Requests'],
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [newUser, setNewUser] = useState<Partial<User>>({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    role: 'User',
    department: '',
    phone: '',
    status: 'Active',
  });

  const filterUsers = () => {
    let filtered = users;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(u =>
        u.firstName.toLowerCase().includes(term) ||
        u.lastName.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.username.toLowerCase().includes(term) ||
        u.department.toLowerCase().includes(term)
      );
    }
    
    if (roleFilter !== 'all') {
      filtered = filtered.filter(u => u.role === roleFilter);
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(u => u.status === statusFilter);
    }
    
    setFilteredUsers(filtered);
  };

  useState(() => {
    filterUsers();
  }, [searchTerm, roleFilter, statusFilter, users]);

  const getRoleColor = (role: string) => {
    const colors: { [key: string]: string } = {
      'Admin': 'bg-red-100 text-red-800',
      'Manager': 'bg-blue-100 text-blue-800',
      'User': 'bg-green-100 text-green-800',
      'Viewer': 'bg-purple-100 text-purple-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Active': 'bg-green-100 text-green-800 border-green-200',
      'Inactive': 'bg-red-100 text-red-800 border-red-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Active': return <CheckCircle size={14} className="text-green-600" />;
      case 'Inactive': return <XCircle size={14} className="text-red-600" />;
      case 'Pending': return <Clock size={14} className="text-yellow-600" />;
      default: return null;
    }
  };

  const handleSaveUser = () => {
    if (editingUser) {
      setUsers(prev => prev.map(u => 
        u.id === editingUser.id ? { ...u, ...newUser } as User : u
      ));
    } else {
      const newId = users.length + 1;
      const user: User = {
        id: newId,
        username: newUser.username || '',
        email: newUser.email || '',
        firstName: newUser.firstName || '',
        lastName: newUser.lastName || '',
        role: newUser.role as 'Admin' | 'Manager' | 'User' | 'Viewer' || 'User',
        department: newUser.department || '',
        phone: newUser.phone || '',
        status: newUser.status as 'Active' | 'Inactive' | 'Pending' || 'Active',
        lastLogin: 'Never',
        createdAt: new Date().toISOString().split('T')[0],
        permissions: ['View Assets'],
      };
      setUsers(prev => [...prev, user]);
    }
    setShowModal(false);
    setEditingUser(null);
    setNewUser({ username: '', email: '', firstName: '', lastName: '', role: 'User', department: '', phone: '', status: 'Active' });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setNewUser({
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      department: user.department,
      phone: user.phone,
      status: user.status,
    });
    setShowModal(true);
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const pendingUsers = users.filter(u => u.status === 'Pending').length;
  const adminUsers = users.filter(u => u.role === 'Admin').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="p-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <UsersIcon size={24} className="text-blue-600" />
              User Management
            </h1>
            <p className="text-gray-600 mt-1">Manage system users and permissions</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={filterUsers}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
            <button
              onClick={() => {
                setEditingUser(null);
                setNewUser({ username: '', email: '', firstName: '', lastName: '', role: 'User', department: '', phone: '', status: 'Active' });
                setShowModal(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <UserPlus size={18} />
              Add User
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <UsersIcon size={20} className="text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Users</p>
                <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle size={20} className="text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingUsers}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock size={20} className="text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Administrators</p>
                <p className="text-2xl font-bold text-red-600">{adminUsers}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Shield size={20} className="text-red-600" />
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
                placeholder="Search users by name, email, username, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
              >
                <option value="all">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
                <option value="Viewer">Viewer</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
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

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Department
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Last Login
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12">
                      <UsersIcon size={48} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-600">No users found</h3>
                      <p className="text-gray-400 mt-1">Try adjusting your search or add a new user</p>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-blue-50/50 transition-colors duration-150 border-b border-gray-100">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                            {user.firstName[0]}{user.lastName[0]}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{user.firstName} {user.lastName}</p>
                            <p className="text-xs text-gray-500">@{user.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm">
                          <p className="text-gray-800">{user.email}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Phone size={12} /> {user.phone}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{user.department}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full border ${getStatusColor(user.status)}`}>
                          {getStatusIcon(user.status)}
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {user.lastLogin}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowDetailsModal(true);
                            }}
                            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-1.5 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors" title="More">
                            <MoreVertical size={16} />
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
              Showing {filteredUsers.length} of {users.length} users
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">Previous</button>
              <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</span>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-800">
                {editingUser ? 'Edit User' : 'Add New User'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newUser.firstName || ''}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                    placeholder="First name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newUser.lastName || ''}
                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                    placeholder="Last name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newUser.username || ''}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  placeholder="Username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={newUser.email || ''}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={newUser.phone || ''}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  placeholder="Phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newUser.role || 'User'}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'Admin' | 'Manager' | 'User' | 'Viewer' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="User">User</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Status
                  </label>
                  <select
                    value={newUser.status || 'Active'}
                    onChange={(e) => setNewUser({ ...newUser, status: e.target.value as 'Active' | 'Inactive' | 'Pending' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={newUser.department || ''}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                  placeholder="Department"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3 rounded-b-2xl">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUser}
                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition flex items-center gap-2"
              >
                <Save size={18} />
                {editingUser ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && showDetailsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-xl font-bold text-gray-800">User Details</h2>
                <p className="text-sm text-gray-500">@{selectedUser.username}</p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{selectedUser.firstName} {selectedUser.lastName}</h3>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                  <span className={`mt-1 px-2 py-0.5 inline-flex items-center gap-1 text-xs font-semibold rounded-full border ${getStatusColor(selectedUser.status)}`}>
                    {getStatusIcon(selectedUser.status)}
                    {selectedUser.status}
                  </span>
                </div>
              </div>

              {/* User Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Username</label>
                  <p className="text-sm font-medium text-gray-800">@{selectedUser.username}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Role</label>
                  <p className="text-sm font-medium text-gray-800">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(selectedUser.role)}`}>
                      {selectedUser.role}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Department</label>
                  <p className="text-sm font-medium text-gray-800">{selectedUser.department}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Phone</label>
                  <p className="text-sm font-medium text-gray-800">{selectedUser.phone}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Last Login</label>
                  <p className="text-sm font-medium text-gray-800">{selectedUser.lastLogin}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Joined</label>
                  <p className="text-sm font-medium text-gray-800">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Permissions */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Permissions</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.permissions.map((perm, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3 rounded-b-2xl">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  handleEdit(selectedUser);
                }}
                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition flex items-center gap-2"
              >
                <Edit size={18} />
                Edit User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;