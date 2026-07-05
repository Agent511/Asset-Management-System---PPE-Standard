// components/Sidebar.tsx
import { NavLink, useNavigate } from 'react-router-dom';
import ovid_logo from '../assets/ovid_logo.png'
import { 
  Settings,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { useState } from 'react';
import { menuItems } from '../App'; // ✅ IMPORT from App

function Sidebar() {
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['assets']);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(item => item !== menuName)
        : [...prev, menuName]
    );
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // ✅ Handle Assets click - navigate to /assets and expand dropdown
  const handleAssetClick = (e: React.MouseEvent, path: string, label: string) => {
    e.preventDefault();
    navigate(path);
    // Expand the assets dropdown if collapsed
    if (!expandedMenus.includes(label.toLowerCase())) {
      setExpandedMenus(prev => [...prev, label.toLowerCase()]);
    }
  };

  return (
    <div className={`sidebar h-screen bg-linear-to-b from-blue-900 to-blue-800 text-white shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-20' : 'w-70'
    }`}>
      {/* Header */}
      <div className="sidebar-header p-6 border-b border-blue-700/50 flex items-center justify-between">
        <div className={`logo-container flex items-center gap-3 ${isCollapsed ? 'justify-center w-full' : ''}`}>
          <div className="logo-icon bg-white p-3 rounded-xl shadow-lg backdrop-blur-sm ">
            <span className="text-2xl"><img className='' src={ovid_logo} alt="Ovid Logo" /></span>
          </div>
          <span className={`logo-text text-lg font-bold tracking-tight bg-linear-to-b from-white bg-clip-text text-transparent transition-all duration-300 ${
            isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
          }`}>
            Asset Managment System
          </span>
        </div>
        
        <button
          onClick={toggleSidebar}
          className={`collapse-btn p-1.5 rounded-lg hover:bg-blue-700/50 transition-all duration-200 flex-shrink-0 ${
            isCollapsed ? 'ml-0' : 'ml-2'
          }`}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight size={20} className="text-blue-200" />
          ) : (
            <ChevronLeft size={20} className="text-blue-200" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            if (item.subItems) {
              const isExpanded = expandedMenus.includes(item.label.toLowerCase());
              const isActive = window.location.pathname.startsWith('/assets');
              
              return (
                <div key={item.label} className="mb-1">
                  <button
                    onClick={(e) => {
                      if (!isCollapsed) {
                        handleAssetClick(e, item.path, item.label);
                      }
                    }}
                    className={`nav-link group w-full flex items-center justify-between px-4 py-3 rounded-xl 
                               transition-all duration-200 ease-in-out text-blue-200 
                               hover:bg-blue-700/30 hover:text-white hover:shadow-md
                               ${isCollapsed ? 'justify-center' : ''}
                               ${isActive ? 'bg-blue-700/60 text-white shadow-lg shadow-blue-900/30 backdrop-blur-sm' : ''}`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                      <item.icon 
                        className={`nav-icon transition-transform duration-200 group-hover:scale-110 flex-shrink-0 ${
                          isCollapsed ? 'mx-0' : ''
                        }`} 
                        size={20} 
                      />
                      <span className={`nav-label font-medium transition-all duration-300 ${
                        isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                    {!isCollapsed && (
                      <ChevronRight 
                        className={`nav-arrow transition-all duration-300 flex-shrink-0 ${
                          isExpanded ? 'rotate-90' : ''
                        }`} 
                        size={16} 
                      />
                    )}
                  </button>
                  
                  {!isCollapsed && (
                    <div className={`ml-6 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      {item.subItems.map((subItem) => (
                        <NavLink
                          key={subItem.path}
                          to={subItem.path}
                          className={({ isActive }) => 
                            `nav-link group flex items-center gap-3 px-4 py-2.5 rounded-xl 
                             transition-all duration-200 ease-in-out text-sm
                             ${isActive 
                               ? 'bg-blue-700/60 text-white shadow-lg shadow-blue-900/30 backdrop-blur-sm' 
                               : 'text-blue-300 hover:bg-blue-700/30 hover:text-white hover:shadow-md'
                             }`
                          }
                        >
                          <subItem.icon 
                            className="nav-icon transition-transform duration-200 group-hover:scale-110" 
                            size={16} 
                          />
                          <span className="nav-label font-medium">{subItem.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `nav-link group flex items-center px-4 py-3 rounded-xl 
                   transition-all duration-200 ease-in-out 
                   ${isActive 
                     ? 'bg-blue-700/60 text-white shadow-lg shadow-blue-900/30 backdrop-blur-sm' 
                     : 'text-blue-200 hover:bg-blue-700/30 hover:text-white hover:shadow-md'
                   }
                   ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? item.label : ''}
              >
                <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                  <item.icon 
                    className={`nav-icon transition-transform duration-200 group-hover:scale-110 flex-shrink-0 ${
                      isCollapsed ? 'mx-0' : ''
                    }`} 
                    size={20} 
                  />
                  <span className={`nav-label font-medium transition-all duration-300 ${
                    isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                  }`}>
                    {item.label}
                  </span>
                </div>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Footer with Settings and Logout */}
      <div className="sidebar-footer border-t border-blue-700/50 p-4">
        <div className="space-y-1">
          <NavLink
            to="/settings"
            className={({ isActive }) => 
              `nav-link group flex items-center px-4 py-3 rounded-xl 
               transition-all duration-200 ease-in-out
               ${isActive 
                 ? 'bg-blue-700/60 text-white shadow-lg shadow-blue-900/30 backdrop-blur-sm' 
                 : 'text-blue-200 hover:bg-blue-700/30 hover:text-white hover:shadow-md'
               }
               ${isCollapsed ? 'justify-center' : ''}`
            }
            title={isCollapsed ? 'Settings' : ''}
          >
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <Settings 
                className={`nav-icon transition-transform duration-200 group-hover:scale-110 flex-shrink-0 ${
                  isCollapsed ? 'mx-0' : ''
                }`} 
                size={20} 
              />
              <span className={`nav-label font-medium transition-all duration-300 ${
                isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
              }`}>
                Settings
              </span>
            </div>
          </NavLink>

          <button 
            className={`logout-btn group w-full flex items-center px-4 py-3 rounded-xl 
                       hover:bg-blue-700/60 text-white hover:text-white hover:shadow-md 
                       transition-all duration-200 hover:shadow-red-500/10
                       ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? 'Logout' : ''}
          >
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;