// pages/settings.tsx
import { useState } from 'react';
import Navbar from '../components/navbar';
import { 
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  Database,
  Mail,
  Globe,
  Lock,
  Palette,
  Save,
  RefreshCw,
  ChevronRight,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface SettingSection {
  id: string;
  title: string;
  icon: any;
  description: string;
}

const Settings = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    companyName: 'Asset Management Inc.',
    companyEmail: 'admin@assetmanagement.com',
    companyPhone: '+1 (555) 123-4567',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    maintenanceAlerts: true,
    verificationReminders: true,
    depreciationNotifications: true,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    ipWhitelist: '192.168.1.0/24, 10.0.0.0/8',
    
    // Appearance Settings
    theme: 'light',
    primaryColor: '#2563EB',
    sidebarCollapsed: false,
    compactView: false,
    
    // Integration Settings
    emailServer: 'smtp.gmail.com',
    emailPort: '587',
    emailUsername: 'notifications@assetmanagement.com',
    backupFrequency: 'daily',
    backupTime: '02:00'
  });

  const sections: SettingSection[] = [
    { id: 'general', title: 'General', icon: SettingsIcon, description: 'Basic company settings' },
    { id: 'notifications', title: 'Notifications', icon: Bell, description: 'Alert and notification preferences' },
    { id: 'security', title: 'Security', icon: Shield, description: 'Security and access control' },
    { id: 'appearance', title: 'Appearance', icon: Palette, description: 'UI theme and layout' },
    { id: 'integrations', title: 'Integrations', icon: Database, description: 'External service connections' },
  ];

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Company Name</label>
          <input type="text" value={settings.companyName} onChange={(e) => setSettings({...settings, companyName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Company Email</label>
          <input type="email" value={settings.companyEmail} onChange={(e) => setSettings({...settings, companyEmail: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Company Phone</label>
          <input type="text" value={settings.companyPhone} onChange={(e) => setSettings({...settings, companyPhone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Timezone</label>
          <select value={settings.timezone} onChange={(e) => setSettings({...settings, timezone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                <option value="Africa/Addis_Ababa">Addis_Ababa</option>
                <option value="Asmara">Asmara</option>
                <option value="Dire_Dawa">Dire_Dawa</option>
                <option value="Gondar">Gondar</option>
                <option value="Harar">Harar</option>
                <option value="Jijiga">Jijiga</option>
                <option value="Mekele">Mekele</option>
                <option value="Nazret">Nazret</option>
            </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Date Format</label>
          <select value={settings.dateFormat} onChange={(e) => setSettings({...settings, dateFormat: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-800">Email Notifications</p>
            <p className="text-sm text-gray-500">Receive notifications via email</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={settings.emailNotifications} onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-800">Push Notifications</p>
            <p className="text-sm text-gray-500">Receive push notifications in browser</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={settings.pushNotifications} onChange={(e) => setSettings({...settings, pushNotifications: e.target.checked})} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-800">Maintenance Alerts</p>
            <p className="text-sm text-gray-500">Get alerts for upcoming maintenance</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={settings.maintenanceAlerts} onChange={(e) => setSettings({...settings, maintenanceAlerts: e.target.checked})} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-800">Verification Reminders</p>
            <p className="text-sm text-gray-500">Get reminders for asset verification</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={settings.verificationReminders} onChange={(e) => setSettings({...settings, verificationReminders: e.target.checked})} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-800">Depreciation Notifications</p>
            <p className="text-sm text-gray-500">Get notifications for depreciation events</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={settings.depreciationNotifications} onChange={(e) => setSettings({...settings, depreciationNotifications: e.target.checked})} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Session Timeout (minutes)</label>
          <input type="number" value={settings.sessionTimeout} onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Password Expiry (days)</label>
          <input type="number" value={settings.passwordExpiry} onChange={(e) => setSettings({...settings, passwordExpiry: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-700 block mb-1">IP Whitelist</label>
          <input type="text" value={settings.ipWhitelist} onChange={(e) => setSettings({...settings, ipWhitelist: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
          <p className="text-xs text-gray-400 mt-1">Comma-separated IP ranges (CIDR notation)</p>
        </div>
        <div className="col-span-2 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-800">Two-Factor Authentication</p>
            <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={settings.twoFactorAuth} onChange={(e) => setSettings({...settings, twoFactorAuth: e.target.checked})} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Theme</label>
          <select value={settings.theme} onChange={(e) => setSettings({...settings, theme: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Primary Color</label>
          <input type="color" value={settings.primaryColor} onChange={(e) => setSettings({...settings, primaryColor: e.target.value})} className="w-full h-10 px-2 py-1 border border-gray-300 rounded-lg cursor-pointer" />
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg col-span-2">
          <div>
            <p className="font-medium text-gray-800">Collapsed Sidebar</p>
            <p className="text-sm text-gray-500">Keep sidebar collapsed by default</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={settings.sidebarCollapsed} onChange={(e) => setSettings({...settings, sidebarCollapsed: e.target.checked})} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg col-span-2">
          <div>
            <p className="font-medium text-gray-800">Compact View</p>
            <p className="text-sm text-gray-500">Display more content with tighter spacing</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={settings.compactView} onChange={(e) => setSettings({...settings, compactView: e.target.checked})} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Email Server</label>
          <input type="text" value={settings.emailServer} onChange={(e) => setSettings({...settings, emailServer: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Email Port</label>
          <input type="text" value={settings.emailPort} onChange={(e) => setSettings({...settings, emailPort: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-700 block mb-1">Email Username</label>
          <input type="text" value={settings.emailUsername} onChange={(e) => setSettings({...settings, emailUsername: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Backup Frequency</label>
          <select value={settings.backupFrequency} onChange={(e) => setSettings({...settings, backupFrequency: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Backup Time</label>
          <input type="time" value={settings.backupTime} onChange={(e) => setSettings({...settings, backupTime: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeSection) {
      case 'general': return renderGeneralSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
      case 'appearance': return renderAppearanceSettings();
      case 'integrations': return renderIntegrationsSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <SettingsIcon size={24} className="text-gray-600" />
              Settings
            </h1>
            <p className="text-gray-600 mt-1">Manage system configuration and preferences</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
              <RefreshCw size={18} />
              Reset
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-600/20">
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-6">
              <div className="p-4 border-b border-gray-200">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Settings</p>
              </div>
              <nav className="p-2 space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <section.icon size={18} className={activeSection === section.id ? 'text-blue-600' : 'text-gray-400'} />
                      <span className="text-sm font-medium">{section.title}</span>
                    </div>
                    <ChevronRight size={16} className={activeSection === section.id ? 'text-blue-600' : 'text-gray-300'} />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;