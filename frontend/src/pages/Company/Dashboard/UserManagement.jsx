// import { useState } from 'react';
// import { Search, ChevronDown, Check, Plus, Edit, Trash2, X, Mail, AlertTriangle } from 'lucide-react';

// export default function UserManagement() {
//   // Sample data updated to match the image, including new fields
//   const initialUsers = [
//     { id: 1, name: 'Lynn Tanner', email: 'lynn.tanner@gmail.com', status: 'Active', userType: 'Admin', isCurrentUser: true, jobRole: 'Product Manager', jobPosts: true, resumeAccess: true },
//     { id: 2, name: 'Willie Tanner', email: 'willie.tanner@gmail.com', status: 'Pending', userType: 'Admin', isCurrentUser: false, jobRole: 'Assistant Product Manager', jobPosts: true, resumeAccess: true },
//     { id: 3, name: 'Dori Doreau', email: 'dori.doreau@gmail.com', status: 'Inactive', userType: 'Recruiter', isCurrentUser: false, jobRole: 'HR', jobPosts: true, resumeAccess: true },
//     { id: 4, name: 'Devon Miles', email: 'devon.miles@gmail.com', status: 'Active', userType: 'Recruiter', isCurrentUser: false, jobRole: 'Product Designer', jobPosts: true, resumeAccess: true },
//     { id: 5, name: 'Angela Bower', email: 'angela.bower@gmail.com', status: 'Pending', userType: 'Recruiter', isCurrentUser: false, jobRole: 'Software Developer', jobPosts: true, resumeAccess: true },
//     { id: 6, name: 'Angus MacGyer', email: 'angus.macgyver@gmail.com', status: 'Inactive', userType: 'Viewer', isCurrentUser: false, jobRole: 'Project Manager', jobPosts: true, resumeAccess: true },
//   ];

//   const [users, setUsers] = useState(initialUsers);
//   const [searchTerm, setSearchTerm] = useState('');
  
//   // Updated filter states to match the image's filter categories
//   const [selectedRoles, setSelectedRoles] = useState([]); // Array to hold multiple selected roles
//   const [selectedStatuses, setSelectedStatuses] = useState([]); // Array to hold multiple selected statuses

//   // Modal states
//   const [showAddEmployerModal, setShowAddEmployerModal] = useState(false);
//   const [showAssignRoleModal, setShowAssignRoleModal] = useState(false);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [employerEmail, setEmployerEmail] = useState('');
//   const [selectedRole, setSelectedRole] = useState('');
//   const [emailNotFound, setEmailNotFound] = useState(false);

//   // Function to calculate counts for sidebar filters
//   const getRoleCount = (role) => {
//     if (role === 'all') return users.length;
//     return users.filter(user => user.userType === role).length;
//   };

//   const getStatusCount = (status) => {
//     return users.filter(user => user.status === status).length;
//   };

//   // Filter users based on search term, selected roles, and selected statuses
//   const filteredUsers = users.filter(user => {
//     const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
//     // Ensure that if "All users" is selected, it effectively means no role filter is applied,
//     // otherwise filter by selected roles.
//     const matchesRole = selectedRoles.length === 0 || selectedRoles.includes('all') || 
//                         selectedRoles.map(role => role.toLowerCase()).includes(user.userType.toLowerCase());
    
//     const matchesStatus = selectedStatuses.length === 0 || 
//                           selectedStatuses.map(status => status.toLowerCase()).includes(user.status.toLowerCase());
    
//     return matchesSearch && matchesRole && matchesStatus;
//   });

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Handle checkbox change for Roles
//   const handleRoleChange = (role) => {
//     if (role === 'all') {
//       setSelectedRoles(selectedRoles.includes('all') ? [] : ['all']);
//     } else {
//       setSelectedRoles(prev => {
//         const newRoles = prev.filter(r => r !== 'all'); // Deselect 'all' if another role is selected
//         if (newRoles.includes(role)) {
//           return newRoles.filter(r => r !== role);
//         } else {
//           return [...newRoles, role];
//         }
//       });
//     }
//   };

//   // Handle checkbox change for Statuses
//   const handleStatusChange = (status) => {
//     setSelectedStatuses(prev => {
//       if (prev.includes(status)) {
//         return prev.filter(s => s !== status);
//       } else {
//         return [...prev, status];
//       }
//     });
//   };

//   const clearAllFilters = () => {
//     setSearchTerm('');
//     setSelectedRoles([]);
//     setSelectedStatuses([]);
//   };

//   const clearRoleFilters = () => {
//     setSelectedRoles([]);
//   };

//   const clearStatusFilters = () => {
//     setSelectedStatuses([]);
//   };

//   const handleAddExistingEmployer = () => {
//     setShowAddEmployerModal(true);
//   };

//   // Modal handler functions
//   const handleSearchEmployer = () => {
//     if (!employerEmail.trim()) return;
    
//     // Simulate search - for demo, we'll show "not found" for any email
//     setEmailNotFound(true);
//   };

//   const handleInviteEmployer = () => {
//     setShowAddEmployerModal(false);
//     setShowAssignRoleModal(true);
//     setEmailNotFound(false);
//   };

//   const handleRoleSelection = (role) => {
//     setSelectedRole(role);
//   };

//   const handleAssignRole = () => {
//     if (!selectedRole) return;
//     setShowAssignRoleModal(false);
//     setShowConfirmModal(true);
//   };

//   const handleConfirmAssignment = () => {
//     // Here you would typically make an API call to assign the role
//     console.log(`Assigning ${selectedRole} role to ${employerEmail}`);
    
//     // Reset all states and close modals
//     setShowConfirmModal(false);
//     setEmployerEmail('');
//     setSelectedRole('');
//     setEmailNotFound(false);
//   };

//   const closeAllModals = () => {
//     setShowAddEmployerModal(false);
//     setShowAssignRoleModal(false);
//     setShowConfirmModal(false);
//     setEmployerEmail('');
//     setSelectedRole('');
//     setEmailNotFound(false);
//   };

//   const handleEditUser = (userId) => {
//     console.log("Edit user:", userId);
//     // Implement edit logic (e.g., open a modal, navigate to edit page)
//   };

//   const handleDeleteUser = (userId) => {
//     console.log("Delete user:", userId);
//     // Implement delete logic (e.g., confirmation dialog, then remove from state)
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       setUsers(users.filter(user => user.id !== userId));
//     }
//   };

//   return (
//     <>
//       {/* Outer container for the entire page, including the top bar */}
//       <div className="flex flex-col h-screen bg-gray-100">
//         {/* Top Header Bar */}
//         <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
//           <div className="flex items-center">
//             <h1 className="text-xl font-semibold text-gray-800">Manage Users</h1>
//             <p className="text-sm text-gray-500 ml-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
//           </div>
//           <button 
//             onClick={handleAddExistingEmployer}
//             className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 flex items-center"
//           >
//             <Plus className="h-4 w-4 mr-2" /> Add Existing Employer
//           </button>
//         </div>

//         {/* Main Content Area (Sidebar + Table) */}
//         <div className="flex flex-1 overflow-hidden">
//           {/* Sidebar */}
//           <div className="w-64 bg-white border-r border-gray-200 p-6 flex-shrink-0">
//             <div className="mb-6">
//               <div className="flex justify-between items-center mb-2">
//                 <h2 className="text-sm font-medium text-gray-700">Filters</h2>
//                 <button 
//                   onClick={clearAllFilters}
//                   className="text-xs text-blue-600 hover:text-blue-800"
//                 >
//                   Clear all
//                 </button>
//               </div>
//               <p className="text-xs text-gray-500 mb-4">Showing {filteredUsers.length} of {users.length}</p>
//             </div>
            
//             {/* Roles Filter */}
//             <div className="mb-6">
//               <div className="flex justify-between items-center mb-2">
//                 <h2 className="text-sm font-medium text-gray-700">Role ({selectedRoles.length})</h2>
//                 {selectedRoles.length > 0 && (
//                   <button 
//                     onClick={clearRoleFilters}
//                     className="text-xs text-blue-600 hover:text-blue-800"
//                   >
//                     Clear
//                   </button>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <div className="flex items-center">
//                   <input 
//                     type="checkbox" 
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     checked={selectedRoles.includes('all')}
//                     onChange={() => handleRoleChange('all')} 
//                   />
//                   <label className="ml-2 block text-sm text-gray-700">All users({getRoleCount('all')})</label>
//                 </div>
//                 <div className="flex items-center">
//                   <input 
//                     type="checkbox" 
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     checked={selectedRoles.includes('admin')}
//                     onChange={() => handleRoleChange('admin')} 
//                   />
//                   <label className="ml-2 block text-sm text-gray-700">Admin({getRoleCount('Admin')})</label>
//                 </div>
//                 <div className="flex items-center">
//                   <input 
//                     type="checkbox" 
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     checked={selectedRoles.includes('recruiter')}
//                     onChange={() => handleRoleChange('recruiter')} 
//                   />
//                   <label className="ml-2 block text-sm text-gray-700">Recruiter({getRoleCount('Recruiter')})</label>
//                 </div>
//                 <div className="flex items-center">
//                   <input 
//                     type="checkbox" 
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     checked={selectedRoles.includes('viewer')}
//                     onChange={() => handleRoleChange('viewer')} 
//                   />
//                   <label className="ml-2 block text-sm text-gray-700">Viewer({getRoleCount('Viewer')})</label>
//                 </div>
//               </div>
//             </div>

//             {/* Status Filter */}
//             <div>
//               <div className="flex justify-between items-center mb-2">
//                 <h2 className="text-sm font-medium text-gray-700">Status ({selectedStatuses.length})</h2>
//                 {selectedStatuses.length > 0 && (
//                   <button 
//                     onClick={clearStatusFilters}
//                     className="text-xs text-blue-600 hover:text-blue-800"
//                   >
//                     Clear
//                   </button>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <div className="flex items-center">
//                   <input 
//                     type="checkbox" 
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     checked={selectedStatuses.includes('active')}
//                     onChange={() => handleStatusChange('active')} 
//                   />
//                   <label className="ml-2 block text-sm text-gray-700">Active({getStatusCount('Active')})</label>
//                 </div>
//                 <div className="flex items-center">
//                   <input 
//                     type="checkbox" 
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     checked={selectedStatuses.includes('pending')}
//                     onChange={() => handleStatusChange('pending')} 
//                   />
//                   <label className="ml-2 block text-sm text-gray-700">Pending({getStatusCount('Pending')})</label>
//                 </div>
//                 <div className="flex items-center">
//                   <input 
//                     type="checkbox" 
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     checked={selectedStatuses.includes('inactive')}
//                     onChange={() => handleStatusChange('inactive')} 
//                   />
//                   <label className="ml-2 block text-sm text-gray-700">Inactive({getStatusCount('Inactive')})</label>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content (Table Area) */}
//           <div className="flex-1 p-6">
//             <div className="bg-white border border-gray-200 rounded-lg shadow-sm h-full flex flex-col">
//               {/* Header for the table */}
//               <div className="p-4 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-gray-800">All Users ({users.length})</h2>
//                 <p className="text-sm text-gray-500 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Susuppendisse varius enim in eros.</p>
//               </div>
              
//               {/* Search and Filters within the table card */}
//               <div className="p-4 flex items-center">
//                 <div className="relative flex-1 mr-2">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Search className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     placeholder="Search by name or email"
//                     className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                   />
//                 </div>
//                 <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center space-x-2 bg-white hover:bg-gray-50">
//                   <span className="text-sm text-gray-700">Filters</span>
//                   <ChevronDown className="h-4 w-4 text-gray-500" />
//                 </button>
//               </div>
              
//               {/* Users Table */}
//               <div className="overflow-x-auto flex-1">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th scope="col" className="px-4 py-3 w-8">
//                         <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
//                       </th>
//                       <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
//                         Team Members <ChevronDown className="h-3 w-3 ml-1 text-gray-400" />
//                       </th>
//                       <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                       <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                       <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User type</th>
//                       <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job role</th>
//                       <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job posts</th>
//                       <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume access</th>
//                       <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {filteredUsers.map((user) => (
//                       <tr key={user.id} className="hover:bg-gray-50">
//                         <td className="px-4 py-4">
//                           <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             {user.name} {user.isCurrentUser && <span className="text-gray-500 text-xs">(You)</span>}
//                           </div>
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-500">{user.email}</div>
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap">
//                           <span 
//                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                               user.status === 'Active' ? 'bg-green-100 text-green-800' :
//                               user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                               'bg-gray-100 text-gray-800'
//                             }`}
//                           >
//                             {user.status}
//                           </span>
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{user.userType}</td>
//                         <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{user.jobRole}</td>
//                         <td className="px-4 py-4 whitespace-nowrap text-center">
//                           {user.jobPosts && <Check className="h-5 w-5 text-green-500 mx-auto" />}
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap text-center">
//                           {user.resumeAccess && <Check className="h-5 w-5 text-green-500 mx-auto" />}
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <div className="flex items-center space-x-2">
//                             <button onClick={() => handleEditUser(user.id)} className="text-gray-600 hover:text-gray-900">
//                               <Edit className="h-4 w-4" />
//                             </button>
//                             <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900">
//                               <Trash2 className="h-4 w-4" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal 1: Add Existing Employer */}
//       {showAddEmployerModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl w-96 max-w-md">
//             {/* Modal Header */}
//             <div className="flex items-center justify-between p-4 border-b border-gray-200">
//               <h3 className="text-lg font-medium text-gray-900">Add Existing Employer</h3>
//               <button 
//                 onClick={closeAllModals}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
            
//             {/* Modal Body */}
//             <div className="p-6">
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Employer's Work Email
//                 </label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="email"
//                     placeholder="Enter work email address"
//                     className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={employerEmail}
//                     onChange={(e) => setEmployerEmail(e.target.value)}
//                   />
//                   <button
//                     onClick={handleSearchEmployer}
//                     className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
//                   >
//                     Search
//                   </button>
//                 </div>
//               </div>
              
//               {emailNotFound && (
//                 <div className="text-center py-8">
//                   <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-sm text-gray-600 mb-6">No employer found with this email address</p>
//                   <button
//                     onClick={handleInviteEmployer}
//                     className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
//                   >
//                     Invite Employer
//                   </button>
//                 </div>
//               )}
//             </div>
            
//             {/* Modal Footer */}
//             <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200">
//               <button
//                 onClick={closeAllModals}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleInviteEmployer}
//                 disabled={!employerEmail.trim()}
//                 className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Add Employer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal 2: Assign Role */}
//       {showAssignRoleModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl w-96 max-w-md">
//             {/* Modal Header */}
//             <div className="flex items-center justify-between p-4 border-b border-gray-200">
//               <h3 className="text-lg font-medium text-gray-900">Assign Role</h3>
//               <button 
//                 onClick={closeAllModals}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
            
//             {/* Modal Body */}
//             <div className="p-6">
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Select Role
//                 </label>
//                 <div className="relative">
//                   <select
//                     value={selectedRole}
//                     onChange={(e) => handleRoleSelection(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
//                   >
//                     <option value="">Choose a role...</option>
//                     <option value="Admin">Admin</option>
//                     <option value="Recruiter">Recruiter</option>
//                     <option value="Viewer">Viewer</option>
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
              
//               {selectedRole === 'Admin' && (
//                 <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
//                   <div className="flex items-start">
//                     <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
//                     <div>
//                       <h4 className="text-sm font-medium text-yellow-800">Admin Role Selected</h4>
//                       <p className="text-sm text-yellow-700 mt-1">
//                         This role grants full access and control over all system features, including user management and security settings.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
            
//             {/* Modal Footer */}
//             <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200">
//               <button
//                 onClick={closeAllModals}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAssignRole}
//                 disabled={!selectedRole}
//                 className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Assign Role
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal 3: Confirm Admin Assignment */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl w-96 max-w-md">
//             {/* Modal Header */}
//             <div className="flex items-center justify-between p-4 border-b border-gray-200">
//               <h3 className="text-lg font-medium text-gray-900">Confirm Admin Assignment</h3>
//               <button 
//                 onClick={closeAllModals}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
            
//             {/* Modal Body */}
//             <div className="p-6">
//               <p className="text-sm text-gray-700 mb-6">
//                 Are you sure you want to assign Admin rights to John Miller?
//               </p>
              
//               <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
//                 <div className="flex items-start">
//                   <div className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></div>
//                   <p className="text-sm text-gray-700">
//                     Admins can manage jobs, users, settings, and branding.
//                   </p>
//                 </div>
//               </div>
//             </div>
            
//             {/* Modal Footer */}
//             <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200">
//               <button
//                 onClick={closeAllModals}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleConfirmAssignment}
//                 className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
//               >
//                 Confirm and Assign
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Search, ChevronDown, Check, Plus, Edit, Trash2, X, Mail, AlertTriangle } from 'lucide-react';

// Use the backend URL you provided. In a real Vite app, this would be in a .env file.
const VITE_Backend_URL = 'http://localhost:5000';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  // Modal states
  const [showAddEmployerModal, setShowAddEmployerModal] = useState(false);
  const [showAssignRoleModal, setShowAssignRoleModal] = useState(false);
  
  // State for the invitation flow
  const [inviteEmail, setInviteEmail] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUserToInvite, setSelectedUserToInvite] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [isSearching, setIsSearching] = useState(false);


  // Fetch all team members for the company
  const fetchTeamMembers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${VITE_Backend_URL}/api/team-member/list-members`, {
        credentials: 'include', // Sends cookies (like the jwt token) with the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch team members.');
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching team members:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);
  
  // Search for an employer by email
  const handleSearchEmployer = async (email) => {
      setInviteEmail(email);
      if (email.length < 3) { // Don't search for very short strings
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const response = await fetch(`${VITE_Backend_URL}/api/team-member/search-employers?email=${email}`, {
          credentials: 'include',
        });
        if (!response.ok) {
           throw new Error('Search failed');
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (err) {
        console.error('Error searching employers:', err);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
  };

  const handleSelectUserToInvite = (user) => {
    setSelectedUserToInvite(user);
    setInviteEmail(user.email);
    setShowAddEmployerModal(false);
    setShowAssignRoleModal(true);
  };
  
  const handleSendInvitation = async () => {
    if (!selectedUserToInvite || !selectedRole) {
      alert('Please select a user and a role.');
      return;
    }

    try {
        const response = await fetch(`${VITE_Backend_URL}/api/team-member/invite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email: selectedUserToInvite.email,
                role: selectedRole,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to send invitation.');
        }

        alert('Invitation sent successfully!');
        closeAllModals();
        fetchTeamMembers(); // Refresh the list to show the new pending member

    } catch (err) {
        console.error('Error sending invitation:', err);
        alert(`Error: ${err.message}`);
    }
  };


  const getRoleCount = (role) => {
    if (role === 'all') return users.length;
    return users.filter(user => user.userType.toLowerCase() === role.toLowerCase()).length;
  };

  const getStatusCount = (status) => {
    return users.filter(user => user.status.toLowerCase() === status.toLowerCase()).length;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRoles.length === 0 || selectedRoles.includes('all') || 
                        selectedRoles.map(role => role.toLowerCase()).includes(user.userType.toLowerCase());
    
    const matchesStatus = selectedStatuses.length === 0 || 
                          selectedStatuses.map(status => status.toLowerCase()).includes(user.status.toLowerCase());
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleRoleChange = (role) => {
    setSelectedRoles(prev => {
        const newRoles = prev.includes('all') || role === 'all' ? [] : [...prev];
        if (role === 'all') {
            return prev.includes('all') ? [] : ['all'];
        }
        if (newRoles.includes(role)) {
            return newRoles.filter(r => r !== role);
        } else {
            return [...newRoles, role];
        }
    });
  };

  const handleStatusChange = (status) => {
    setSelectedStatuses(prev => {
      if (prev.includes(status)) {
        return prev.filter(s => s !== status);
      } else {
        return [...prev, status];
      }
    });
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedRoles([]);
    setSelectedStatuses([]);
  };
  
  const closeAllModals = () => {
    setShowAddEmployerModal(false);
    setShowAssignRoleModal(false);
    setInviteEmail('');
    setSearchResults([]);
    setSelectedUserToInvite(null);
    setSelectedRole('');
  };
  
  const handleDeleteUser = (userId) => {
    // Note: You should implement a backend endpoint for deleting users
    console.log("Delete user:", userId);
    if (window.confirm("Are you sure you want to delete this user? This is a mock action.")) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };
  
  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100">
        {/* Top Header Bar */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800">Manage Users</h1>
          <button 
            onClick={() => setShowAddEmployerModal(true)}
            className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Existing Employer
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 p-6 flex-shrink-0">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-medium text-gray-700">Filters</h2>
                <button onClick={clearAllFilters} className="text-xs text-blue-600 hover:text-blue-800">Clear all</button>
              </div>
              <p className="text-xs text-gray-500 mb-4">Showing {filteredUsers.length} of {users.length}</p>
            </div>
            
            {/* Filters sections (Roles, Status) - No change needed here */}
             {/* Roles Filter */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-medium text-gray-700">Role ({selectedRoles.length})</h2>
              </div>
              <div className="space-y-2">
                {['all', 'Admin', 'Recruiter', 'Viewer'].map(role => (
                    <div key={role} className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={selectedRoles.includes(role.toLowerCase()) || (role === 'all' && selectedRoles.includes('all'))}
                          onChange={() => handleRoleChange(role.toLowerCase())} 
                        />
                        <label className="ml-2 block text-sm text-gray-700">{role === 'all' ? 'All users' : role}({getRoleCount(role)})</label>
                    </div>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-medium text-gray-700">Status ({selectedStatuses.length})</h2>
              </div>
              <div className="space-y-2">
                {['Active', 'Pending', 'Inactive'].map(status => (
                  <div key={status} className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={selectedStatuses.includes(status.toLowerCase())}
                      onChange={() => handleStatusChange(status.toLowerCase())} 
                    />
                    <label className="ml-2 block text-sm text-gray-700">{status}({getStatusCount(status)})</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content (Table Area) */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm h-full flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">All Users ({users.length})</h2>
              </div>
              
              <div className="p-4 flex items-center">
                <div className="relative flex-1 mr-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="h-5 w-5 text-gray-400" /></div>
                  <input type="text" placeholder="Search by name or email" className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full" value={searchTerm} onChange={handleSearchChange} />
                </div>
              </div>
              
              {/* Users Table */}
              <div className="overflow-x-auto flex-1">
                {loading && <p className="p-4 text-center">Loading users...</p>}
                {error && <p className="p-4 text-center text-red-500">{error}</p>}
                {!loading && !error && (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 w-8"><input type="checkbox" className="h-4 w-4" /></th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team Members</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User type</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4"><input type="checkbox" className="h-4 w-4" /></td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.status === 'Active' ? 'bg-green-100 text-green-800' :
                                user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>{user.status}</span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{user.userType}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                               <button className="text-gray-600 hover:text-gray-900"><Edit className="h-4 w-4" /></button>
                               <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /></button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                            <td colSpan="6" className="text-center py-8 text-gray-500">No team members found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal 1: Add Existing Employer */}
      {showAddEmployerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-medium">Add Existing Employer</h3>
              <button onClick={closeAllModals}><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Employer's Work Email</label>
              <input
                type="email"
                placeholder="Start typing to search by email..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={inviteEmail}
                onChange={(e) => handleSearchEmployer(e.target.value)}
              />
              {isSearching && <p className="text-sm text-gray-500 mt-2">Searching...</p>}
              {searchResults.length > 0 && (
                <ul className="border border-gray-200 rounded-md mt-2 max-h-40 overflow-y-auto">
                    {searchResults.map(user => (
                        <li 
                            key={user._id} 
                            onClick={() => handleSelectUserToInvite(user)}
                            className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                        >
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </li>
                    ))}
                </ul>
              )}
              {searchResults.length === 0 && inviteEmail.length > 2 && !isSearching && (
                 <div className="text-center py-8">
                    <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600">No employer found with this email address.</p>
                 </div>
              )}
            </div>
             <div className="flex items-center justify-end space-x-3 p-4 border-t">
                 <button onClick={closeAllModals} className="px-4 py-2 text-sm font-medium">Cancel</button>
             </div>
          </div>
        </div>
      )}

      {/* Modal 2: Assign Role */}
      {showAssignRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-medium">Assign Role</h3>
              <button onClick={closeAllModals}><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                 <p className="text-sm text-gray-500">Assigning role to:</p>
                 <p className="font-medium text-gray-900">{selectedUserToInvite?.name} ({selectedUserToInvite?.email})</p>
              </div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Role</label>
              <div className="relative">
                <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none">
                  <option value="">Choose a role...</option>
                  <option value="Admin">Admin</option>
                  <option value="Recruiter">Recruiter</option>
                  <option value="Viewer">Viewer</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
              </div>
               {selectedRole === 'Admin' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-4">
                    <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                        <div>
                            <h4 className="text-sm font-medium text-yellow-800">Admin Role Selected</h4>
                            <p className="text-sm text-yellow-700 mt-1">This role grants full access and control.</p>
                        </div>
                    </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-end space-x-3 p-4 border-t">
              <button onClick={closeAllModals} className="px-4 py-2 text-sm font-medium">Cancel</button>
              <button onClick={handleSendInvitation} disabled={!selectedRole} className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md disabled:opacity-50">Confirm and Assign</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}