import { Bell, Search, Menu } from 'lucide-react';
function Navbar(){

     return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Page title / breadcrumbs could go here */}
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Menu size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Right side - Search, Notifications, Profile */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search assets..."
                className="bg-transparent border-none outline-none ml-2 text-sm text-gray-700 w-48 focus:w-64 transition-all duration-300"
              />
            </div>

            {/* Notification Button */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell size={22} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Profile Button */}
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                JD
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">John Doe</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;