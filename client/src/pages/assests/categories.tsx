// pages/assests/categories.tsx
import { useState } from 'react';
import Navbar from '../../components/navbar';
import { 
  FolderTree, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MoreVertical,
  ChevronDown,
  RefreshCw,
  Save,
  X,
  Package,
  Filter,
  Download
} from 'lucide-react';

interface Category {
  id: number;
  name: string;
  code: string;
  description: string;
  parentCategory: string | null;
  assetCount: number;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: 'IT Equipment',
      code: 'IT_EQ',
      description: 'Computers, servers, printers, and other IT equipment',
      parentCategory: null,
      assetCount: 45,
      status: 'Active',
      createdAt: '2024-01-15',
      updatedAt: '2024-06-20'
    },
    {
      id: 2,
      name: 'Vehicle',
      code: 'VEH',
      description: 'Company vehicles including cars, trucks, and buses',
      parentCategory: null,
      assetCount: 23,
      status: 'Active',
      createdAt: '2024-01-15',
      updatedAt: '2024-06-18'
    },
    {
      id: 3,
      name: 'Machinery',
      code: 'MCH',
      description: 'Industrial and manufacturing machinery',
      parentCategory: null,
      assetCount: 56,
      status: 'Active',
      createdAt: '2024-01-15',
      updatedAt: '2024-06-15'
    },
    {
      id: 4,
      name: 'Furniture',
      code: 'FUR',
      description: 'Office furniture and fixtures',
      parentCategory: null,
      assetCount: 89,
      status: 'Active',
      createdAt: '2024-01-15',
      updatedAt: '2024-06-10'
    },
    {
      id: 5,
      name: 'Building',
      code: 'BLD',
      description: 'Company buildings and structures',
      parentCategory: null,
      assetCount: 12,
      status: 'Active',
      createdAt: '2024-01-15',
      updatedAt: '2024-06-05'
    },
    {
      id: 6,
      name: 'Land',
      code: 'LND',
      description: 'Land owned by the company',
      parentCategory: null,
      assetCount: 8,
      status: 'Active',
      createdAt: '2024-01-15',
      updatedAt: '2024-06-01'
    },
    {
      id: 7,
      name: 'Office Equipment',
      code: 'OFF_EQ',
      description: 'Office equipment including copiers, fax machines',
      parentCategory: null,
      assetCount: 34,
      status: 'Active',
      createdAt: '2024-01-15',
      updatedAt: '2024-05-28'
    },
    {
      id: 8,
      name: 'Laptops',
      code: 'IT_LAP',
      description: 'Portable computers for employees',
      parentCategory: 'IT Equipment',
      assetCount: 28,
      status: 'Active',
      createdAt: '2024-02-01',
      updatedAt: '2024-06-22'
    },
    {
      id: 9,
      name: 'Desktop',
      code: 'IT_DES',
      description: 'Desktop computers for office use',
      parentCategory: 'IT Equipment',
      assetCount: 17,
      status: 'Active',
      createdAt: '2024-02-01',
      updatedAt: '2024-06-19'
    },
    {
      id: 10,
      name: 'Sedan',
      code: 'VEH_SED',
      description: 'Sedan cars for executive use',
      parentCategory: 'Vehicle',
      assetCount: 12,
      status: 'Active',
      createdAt: '2024-02-15',
      updatedAt: '2024-06-17'
    },
    {
      id: 11,
      name: 'SUV',
      code: 'VEH_SUV',
      description: 'SUV vehicles for field operations',
      parentCategory: 'Vehicle',
      assetCount: 8,
      status: 'Active',
      createdAt: '2024-02-15',
      updatedAt: '2024-06-14'
    },
    {
      id: 12,
      name: 'Industrial Machinery',
      code: 'MCH_IND',
      description: 'Industrial manufacturing equipment',
      parentCategory: 'Machinery',
      assetCount: 32,
      status: 'Active',
      createdAt: '2024-03-01',
      updatedAt: '2024-06-12'
    },
    {
      id: 13,
      name: 'Medical Equipment',
      code: 'MCH_MED',
      description: 'Medical diagnostic and treatment equipment',
      parentCategory: 'Machinery',
      assetCount: 24,
      status: 'Inactive',
      createdAt: '2024-03-01',
      updatedAt: '2024-06-08'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(categories);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: '',
    code: '',
    description: '',
    parentCategory: null,
    status: 'Active'
  });

  // Filter categories based on search
  const filterCategories = () => {
    let filtered = categories;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(cat =>
        cat.name.toLowerCase().includes(term) ||
        cat.code.toLowerCase().includes(term) ||
        cat.description.toLowerCase().includes(term)
      );
    }
    setFilteredCategories(filtered);
  };

  useState(() => {
    filterCategories();
  }, [searchTerm, categories]);

  // Get parent categories for dropdown
  const parentCategories = categories
    .filter(cat => cat.parentCategory === null)
    .map(cat => cat.name);

  // Get status color
  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  // Handle add/edit category
  const handleSaveCategory = () => {
    if (editingCategory) {
      // Edit existing
      setCategories(prev => prev.map(cat => 
        cat.id === editingCategory.id 
          ? { 
              ...cat, 
              ...newCategory, 
              updatedAt: new Date().toISOString().split('T')[0] 
            } as Category
          : cat
      ));
    } else {
      // Add new
      const newCat: Category = {
        id: categories.length + 1,
        name: newCategory.name || '',
        code: newCategory.code || '',
        description: newCategory.description || '',
        parentCategory: newCategory.parentCategory || null,
        assetCount: 0,
        status: (newCategory.status as 'Active' | 'Inactive') || 'Active',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setCategories(prev => [...prev, newCat]);
    }
    setShowModal(false);
    setEditingCategory(null);
    setNewCategory({ name: '', code: '', description: '', parentCategory: null, status: 'Active' });
  };

  // Handle delete category
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(prev => prev.filter(cat => cat.id !== id));
    }
  };

  // Handle edit click
  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      code: category.code,
      description: category.description,
      parentCategory: category.parentCategory,
      status: category.status
    });
    setShowModal(true);
  };

  // Calculate statistics
  const totalCategories = categories.length;
  const activeCategories = categories.filter(c => c.status === 'Active').length;
  const totalAssets = categories.reduce((sum, c) => sum + c.assetCount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="p-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FolderTree size={24} className="text-blue-600" />
              Asset Categories
            </h1>
            <p className="text-gray-600 mt-1">Manage asset categories and subcategories</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={filterCategories}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
            <button
              onClick={() => {
                setEditingCategory(null);
                setNewCategory({ name: '', code: '', description: '', parentCategory: null, status: 'Active' });
                setShowModal(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <Plus size={18} />
              New Category
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Categories</p>
                <p className="text-2xl font-bold text-gray-800">{totalCategories}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FolderTree size={20} className="text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Categories</p>
                <p className="text-2xl font-bold text-green-600">{activeCategories}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Package size={20} className="text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Assets</p>
                <p className="text-2xl font-bold text-purple-600">{totalAssets}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package size={20} className="text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Inactive Categories</p>
                <p className="text-2xl font-bold text-red-600">{totalCategories - activeCategories}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <X size={20} className="text-red-600" />
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
                placeholder="Search categories by name, code, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div className="flex items-center gap-2">
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

        {/* Categories Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Category Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Parent Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Assets
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
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12">
                      <FolderTree size={48} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-600">No categories found</h3>
                      <p className="text-gray-400 mt-1">Try adjusting your search or create a new category</p>
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-blue-50/50 transition-colors duration-150 border-b border-gray-100">
                      <td className="px-4 py-3 text-sm font-mono text-blue-600 font-medium">
                        {category.code}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">
                        {category.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                        {category.description}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {category.parentCategory || <span className="text-gray-400">—</span>}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                          {category.assetCount}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(category.status)}`}>
                          {category.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(category)}
                            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                          <button
                            className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                            title="More"
                          >
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
              Showing {filteredCategories.length} of {categories.length} categories
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">Previous</button>
              <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</span>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-800">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newCategory.name || ''}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Enter category name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Category Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newCategory.code || ''}
                  onChange={(e) => setNewCategory({ ...newCategory, code: e.target.value.toUpperCase() })}
                  placeholder="e.g., IT_EQ"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition uppercase"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Description
                </label>
                <textarea
                  value={newCategory.description || ''}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  rows={3}
                  placeholder="Enter category description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-y"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Parent Category
                </label>
                <select
                  value={newCategory.parentCategory || ''}
                  onChange={(e) => setNewCategory({ ...newCategory, parentCategory: e.target.value || null })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="">None (Top Level)</option>
                  {parentCategories.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Status
                </label>
                <select
                  value={newCategory.status || 'Active'}
                  onChange={(e) => setNewCategory({ ...newCategory, status: e.target.value as 'Active' | 'Inactive' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
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
                onClick={handleSaveCategory}
                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition flex items-center gap-2"
              >
                <Save size={18} />
                {editingCategory ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;