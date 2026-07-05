import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Dashboard from './pages/dashboard';
import Assets from './pages/assests/assest';
import Register from './pages/assests/register';
import Categories from './pages/assests/categories.tsx';
import Transfers from './pages/assests/transfers';
import Disposal from './pages/assests/disposal';
import Verification from './pages/assests/verification';
import Depreciation from './pages/depreciation';
import Maintenance from './pages/maintenance';
import Reports from './pages/reports';
import Users from './pages/users';
import Settings from './pages/settings';
import ScanQR from './pages/assests/scan.tsx';
import { 
  LayoutDashboard, 
  Package, 
  Settings as SettingsIcon,
  TrendingDown,
  Wrench,
  FileText,
  UserCog,
  PlusCircle,
  FolderTree,
  ArrowRightLeft,
  Trash2,
  CheckCircle,
} from 'lucide-react';
import './App.css';

// ✅ MOVED menuItems here
export const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { 
    path: '/assets',
    label: 'Assets',
    icon: Package,
    subItems: [
      { path: '/assets/register', icon: PlusCircle, label: 'Register' },
      { path: '/assets/categories', icon: FolderTree, label: 'Categories' },
      { path: '/assets/transfers', icon: ArrowRightLeft, label: 'Transfers' },
      { path: '/assets/disposal', icon: Trash2, label: 'Disposal' },
      { path: '/assets/verification', icon: CheckCircle, label: 'Verification' },
    ]
  },
  { path: '/depreciation', icon: TrendingDown, label: 'Depreciation' },
  { path: '/maintenance', icon: Wrench, label: 'Maintenance' },
  { path: '/reports', icon: FileText, label: 'Reports' },
  { path: '/users', icon: UserCog, label: 'Users' },
];

function App() {
  return (
    <Router>
      <div className="app-container flex h-screen overflow-hidden">
        <Sidebar />
        
        <div className="main-content flex-1 overflow-y-auto h-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Asset Management Routes */}
            <Route path="/assets" element={<Assets />} />
            <Route path="/assets/register" element={<Register />} />
            <Route path="/assets/categories" element={<Categories />} />
            <Route path="/assets/transfers" element={<Transfers />} />
            <Route path="/assets/disposal" element={<Disposal />} />
            <Route path="/assets/verification" element={<Verification />} />
            <Route path="/scan" element={<ScanQR />} />
            
            {/* Other Routes */}
            <Route path="/depreciation" element={<Depreciation />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;