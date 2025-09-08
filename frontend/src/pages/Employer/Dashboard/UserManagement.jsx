// import { useState, useEffect, useMemo } from 'react';
// import { Search, ChevronDown, Check } from 'lucide-react';
// import axios from 'axios';

// export default function EmployerUserManagement() {
//     // --- STATE MANAGEMENT ---
//     const [users, setUsers] = useState([]); // Start with an empty array
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
    
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedGroup, setSelectedGroup] = useState('all');

//     // --- DATA FETCHING ---
//     useEffect(() => {
//         const fetchTeamMembers = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 const response = await axios.get(
//                     // Ensure this matches the backend URL from your .env file
//                     `${import.meta.env.VITE_Backend_URL}/api/team-member/companies-member`, 
//                     { withCredentials: true }
//                 );
//                 setUsers(response.data);
//             } catch (err) {
//                 console.error("Failed to fetch team members:", err);
//                 setError("Could not load user data. Please try again later.");
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchTeamMembers();
//     }, []); // Empty dependency array means this runs once on component mount

//     // --- DYNAMIC COUNTS & FILTERING ---
//     // Calculate user counts for the sidebar dynamically
//     const groupCounts = useMemo(() => {
//         return {
//             all: users.length,
//             // The roles are 'Admin', 'Owner', etc. in your backend model
//             owner: users.filter(u => u.userType === 'Owner').length,
//             admin: users.filter(u => u.userType === 'Admin').length,
//             recruiter: users.filter(u => u.userType === 'Recruiter').length,
//         };
//     }, [users]);

//     // Filter users based on search term and selected group
//     const filteredUsers = users.filter(user => {
//         const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                               user.email.toLowerCase().includes(searchTerm.toLowerCase());
        
//         if (selectedGroup === 'all') return matchesSearch;
//         // The key 'recruiter' must match the value 'Recruiter' in your data
//         return matchesSearch && user.userType.toLowerCase().includes(selectedGroup);
//     });
    
//     // --- RENDER LOGIC ---
//     if (isLoading) {
//         return <div className="flex items-center justify-center h-screen"><p>Loading users...</p></div>;
//     }

//     if (error) {
//         return <div className="flex items-center justify-center h-screen"><p className="text-red-500">{error}</p></div>;
//     }

//     // Main component render
//     return (
//         <div className="flex h-screen bg-gray-100">
//             {/* Sidebar */}
//             <div className="w-64 bg-white border-r border-gray-200 p-6 flex-shrink-0">
//                 <div className="mb-8">
//                     <h1 className="text-xl font-semibold text-gray-800">Manage Users</h1>
//                     <p className="text-sm text-gray-500 mt-1">Add, remove, or edit permissions for team members.</p>
//                 </div>
                
//                 <div className="mb-6">
//                     <div className="flex justify-between items-center mb-2">
//                         <h2 className="text-sm font-medium text-gray-700">Filters</h2>
//                         <button onClick={() => { setSearchTerm(''); setSelectedGroup('all'); }} className="text-xs text-blue-600 hover:text-blue-800">
//                             Clear all
//                         </button>
//                     </div>
//                     <p className="text-xs text-gray-500 mb-4">Showing {filteredUsers.length} of {users.length}</p>
//                 </div>
                
//                 <div>
//                     <h2 className="text-sm font-medium text-gray-700 mb-2">Groups</h2>
//                     <div className="space-y-2">
//                         {/* Checkbox Group is now dynamic */}
//                         {['all', 'owner', 'admin', 'recruiter'].map(group => (
//                            groupCounts[group] > 0 || group === 'all' ? (
//                             <div key={group} className="flex items-center">
//                                 <input 
//                                     type="radio" // Radio buttons are better for single-choice filters
//                                     id={`group-${group}`}
//                                     name="group-filter"
//                                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
//                                     checked={selectedGroup === group}
//                                     onChange={() => setSelectedGroup(group)} 
//                                 />
//                                 <label htmlFor={`group-${group}`} className="ml-2 block text-sm text-gray-700 capitalize">
//                                     {group === 'all' ? 'All Users' : group} ({groupCounts[group]})
//                                 </label>
//                             </div>
//                            ) : null
//                         ))}
//                     </div>
//                 </div>
//             </div>
            
//             {/* Main Content */}
//             <div className="flex-1 overflow-auto">
//                 <div className="p-6">
//                     <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
//                         <div className="p-4 border-b border-gray-200">
//                             <h2 className="text-lg font-semibold text-gray-800">All Users ({users.length})</h2>
//                             <p className="text-sm text-gray-500 mt-1">Manage your team's access and roles.</p>
//                         </div>
                        
//                         <div className="p-4 flex space-x-2">
//                             <div className="relative flex-1">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <Search className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     type="text"
//                                     placeholder="Search by name or email"
//                                     className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                 />
//                             </div>
//                         </div>
                        
//                         {/* Conditional Table Display */}
//                         {users.length === 0 ? (
//                             <div className="text-center py-12 px-4">
//                                 <h3 className="text-lg font-medium text-gray-800">No Team Members Found</h3>
//                                 <p className="text-sm text-gray-500 mt-2">
//                                     You are currently in "Independent" mode. To manage a team,
//                                     <br />
//                                     please switch to a company profile from your user menu.
//                                 </p>
//                             </div>
//                         ) : (
//                             <div className="overflow-x-auto">
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                     <thead className="bg-gray-50">
//                                         <tr>
//                                             <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                             <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                                             <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                                             <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User type</th>
//                                             {/* Add other headers if needed */}
//                                         </tr>
//                                     </thead>
//                                     <tbody className="bg-white divide-y divide-gray-200">
//                                         {filteredUsers.map((user) => (
//                                             <tr key={user.id} className="hover:bg-gray-50">
//                                                 <td className="px-4 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{user.name}</div></td>
//                                                 <td className="px-4 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{user.email}</div></td>
//                                                 <td className="px-4 py-4 whitespace-nowrap">
//                                                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
//                                                         {user.status}
//                                                     </span>
//                                                 </td>
//                                                 <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{user.userType}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }




import { useState, useEffect, useMemo } from 'react';
import { Search, Trash2, X } from 'lucide-react'; // ✅ ADDED: Trash2 and X icons
import axios from 'axios';
// You might want a toast library for user feedback, e.g., react-toastify
// import { toast } from 'react-toastify';

export default function EmployerUserManagement() {
    // --- STATE MANAGEMENT ---
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('all');

    // ✅ ADDED: State for delete confirmation modal
    const [userToDelete, setUserToDelete] = useState(null); // Stores the user object to be deleted
    const [isDeleting, setIsDeleting] = useState(false); // Tracks the deletion API call status

    // --- DATA FETCHING ---
    useEffect(() => {
        const fetchTeamMembers = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_Backend_URL}/api/team-member/companies-member`,
                    { withCredentials: true }
                );
                setUsers(response.data);
            } catch (err) {
                console.error("Failed to fetch team members:", err);
                setError("Could not load user data. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeamMembers();
    }, []);

    //  ADDED: DELETE LOGIC
    const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);
    try {
        // API call to the backend
        await axios.delete(
            `${import.meta.env.VITE_Backend_URL}/api/team-member/remove/${userToDelete.id}`,
            { withCredentials: true }
        );

        // SUCCESS: This part only runs if the API call was successful (returned a 2xx status)
        console.log("Successfully removed user.");
        // Update the UI by removing the user from the state
        setUsers(currentUsers => currentUsers.filter(u => u.id !== userToDelete.id));
        
        // Close the modal on success
        setUserToDelete(null);

    } catch (err) {
        // ERROR: This part runs if the API call fails (returned a 4xx or 5xx status)
        const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
        console.error("Failed to delete user:", errorMessage);
        
        // Show the error to the user!
        alert(`Error: ${errorMessage}`); 
        // For a better user experience, replace alert with a toast notification library.
    } finally {
        // This runs regardless of success or failure
        setIsDeleting(false);
    }
};

    //  DYNAMIC COUNTS & FILTERING 
    const groupCounts = useMemo(() => {
        return {
            all: users.length,
            owner: users.filter(u => u.userType === 'Owner').length,
            admin: users.filter(u => u.userType === 'Admin').length,
            recruiter: users.filter(u => u.userType === 'Recruiter').length,
        };
    }, [users]);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              user.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (selectedGroup === 'all') return matchesSearch;
        return matchesSearch && user.userType.toLowerCase().includes(selectedGroup);
    });
    
    // --- RENDER LOGIC ---
    if (isLoading) {
        return <div className="flex items-center justify-center h-screen"><p>Loading users...</p></div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen"><p className="text-red-500">{error}</p></div>;
    }

    return (
        <> {/*  ADDED: Fragment to wrap component and modal */}
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <div className="w-64 bg-white border-r border-gray-200 p-6 flex-shrink-0">
                    {/* ... (sidebar code remains unchanged) ... */}
                     <div className="mb-8">
                         <h1 className="text-xl font-semibold text-gray-800">Manage Users</h1>
                         <p className="text-sm text-gray-500 mt-1">Add, remove, or edit permissions for team members.</p>
                     </div>
                     
                     <div className="mb-6">
                         <div className="flex justify-between items-center mb-2">
                             <h2 className="text-sm font-medium text-gray-700">Filters</h2>
                             <button onClick={() => { setSearchTerm(''); setSelectedGroup('all'); }} className="text-xs text-blue-600 hover:text-blue-800">
                                 Clear all
                             </button>
                         </div>
                         <p className="text-xs text-gray-500 mb-4">Showing {filteredUsers.length} of {users.length}</p>
                     </div>
                     
                     <div>
                         <h2 className="text-sm font-medium text-gray-700 mb-2">Groups</h2>
                         <div className="space-y-2">
                             {['all', 'owner', 'admin', 'recruiter'].map(group => (
                               groupCounts[group] > 0 || group === 'all' ? (
                                 <div key={group} className="flex items-center">
                                     <input 
                                         type="radio"
                                         id={`group-${group}`}
                                         name="group-filter"
                                         className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                         checked={selectedGroup === group}
                                         onChange={() => setSelectedGroup(group)} 
                                     />
                                     <label htmlFor={`group-${group}`} className="ml-2 block text-sm text-gray-700 capitalize">
                                         {group === 'all' ? 'All Users' : group} ({groupCounts[group]})
                                     </label>
                                 </div>
                               ) : null
                             ))}
                         </div>
                     </div>
                </div>
                
                {/* Main Content */}
                <div className="flex-1 overflow-auto">
                    <div className="p-6">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div className="p-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-800">All Users ({users.length})</h2>
                                <p className="text-sm text-gray-500 mt-1">Manage your team's access and roles.</p>
                            </div>
                            
                            {/* ... (search bar remains unchanged) ... */}
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
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            
                            {users.length === 0 ? (
                                <div className="text-center py-12 px-4">
                                    {/* ... (no team members message remains unchanged) ... */}
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User type</th>
                                                {/* ADDED: Actions column header */}
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredUsers.map((user) => (
                                                <tr key={user.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{user.name}</div></td>
                                                    <td className="px-4 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{user.email}</div></td>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                            {user.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{user.userType}</td>
                                                    {/*  ADDED: Actions cell with Delete button */}
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {user.userType !== 'Owner' && ( // Prevent deleting the owner
                                                            <button 
                                                                onClick={() => setUserToDelete(user)} 
                                                                className="text-red-600 hover:text-red-800"
                                                                aria-label={`Remove ${user.name}`}
                                                            >
                                                                <Trash2 className="h-5 w-5" />
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/*  ADDED: Confirmation Modal */}
            {userToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
                            <button onClick={() => setUserToDelete(null)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to remove <strong className="font-medium">{userToDelete.name}</strong> from the team? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button 
                                onClick={() => setUserToDelete(null)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400 flex items-center"
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}