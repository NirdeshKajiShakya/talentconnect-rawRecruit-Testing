import { useState } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';

export default function UserManagements() {
  // Sample data based on the images
  const initialUsers = [
    { id: 1, name: 'Lynn Tanner', email: 'lynn.tanner@gmail.com', status: 'Active', userType: 'Owner', jobRole: 'Product Manager', jobPosts: true, resumeAccess: true },
    { id: 2, name: 'Willie Tanner', email: 'willie.tanner@gmail.com', status: 'Active', userType: 'Admin', jobRole: 'Assistant Product Manager', jobPosts: true, resumeAccess: true },
    { id: 3, name: 'Dori Doreau', email: 'dori.doreau@gmail.com', status: 'Active', userType: 'Admin', jobRole: 'HR', jobPosts: true, resumeAccess: true },
    { id: 4, name: 'Devon Miles', email: 'devon.miles@gmail.com', status: 'Active', userType: 'Regular User', jobRole: 'Product Designer', jobPosts: true, resumeAccess: true },
    { id: 5, name: 'Angela Bower', email: 'angela.bower@gmail.com', status: 'Active', userType: 'Regular User', jobRole: 'Software Developer', jobPosts: true, resumeAccess: true },
    { id: 6, name: 'Angela MacGyer', email: 'angela.macgyer@gmail.com', status: 'Active', userType: 'Regular User', jobRole: 'Project Manager', jobPosts: true, resumeAccess: true },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFullTable, setShowFullTable] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('all');

  // Filter users based on search term and selected group
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedGroup === 'all') return matchesSearch;
    if (selectedGroup === 'owner') return matchesSearch && user.userType === 'Owner';
    if (selectedGroup === 'admin') return matchesSearch && user.userType === 'Admin';
    if (selectedGroup === 'regular') return matchesSearch && user.userType === 'Regular User';
    
    return matchesSearch;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGroupChange = (group) => {
    setSelectedGroup(group);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedGroup('all');
  };

  const clearGroupFilter = () => {
    setSelectedGroup('all');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-800">Manage Users</h1>
          <p className="text-sm text-gray-500 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium text-gray-700">Filters</h2>
            <button 
              onClick={clearAllFilters}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Clear all
            </button>
          </div>
          <p className="text-xs text-gray-500 mb-4">Showing {filteredUsers.length} of {users.length}</p>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium text-gray-700">Groups ({selectedGroup === 'all' ? '0' : '1'})</h2>
            {selectedGroup !== 'all' && (
              <button 
                onClick={clearGroupFilter}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Clear
              </button>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={selectedGroup === 'all'}
                onChange={() => handleGroupChange('all')} 
              />
              <label className="ml-2 block text-sm text-gray-700">All users(6)</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={selectedGroup === 'owner'}
                onChange={() => handleGroupChange('owner')} 
              />
              <label className="ml-2 block text-sm text-gray-700">Owner(1)</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={selectedGroup === 'admin'}
                onChange={() => handleGroupChange('admin')} 
              />
              <label className="ml-2 block text-sm text-gray-700">Admin(2)</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={selectedGroup === 'regular'}
                onChange={() => handleGroupChange('regular')} 
              />
              <label className="ml-2 block text-sm text-gray-700">Regular Users(3)</label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">All Users ({users.length})</h2>
              <p className="text-sm text-gray-500 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
            </div>
            
            {/* Search and Filters */}
            <div className="p-4 flex space-x-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name or email"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center space-x-2 bg-white hover:bg-gray-50">
                <span className="text-sm text-gray-700">Filters</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            
            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 w-8">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8"></th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    {showFullTable && (
                      <>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User type</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job role</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job posts</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume access</th>
                      </>
                    )}
                    {!showFullTable && (
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User type</th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                      </td>
                      <td className="px-4 py-4">
                        <button className="flex items-center justify-center">
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {user.status}
                        </span>
                      </td>
                      {showFullTable ? (
                        <>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{user.userType}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{user.jobRole}</td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {user.jobPosts && <Check className="h-5 w-5 text-green-500" />}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {user.resumeAccess && <Check className="h-5 w-5 text-green-500" />}
                          </td>
                        </>
                      ) : (
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{user.userType}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Toggle view button */}
            <div className="p-4 flex justify-center">
              <button 
                className="text-sm text-blue-600 hover:text-blue-800"
                onClick={() => setShowFullTable(!showFullTable)}
              >
                {showFullTable ? 'Show Simple View' : 'Show Detailed View'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}