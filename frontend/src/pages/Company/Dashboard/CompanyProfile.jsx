

import { useState, useEffect } from 'react';
import { Globe, Users, Calendar } from 'lucide-react';
import CompanyOverview from './CompanyOverview';
import CompanyProfileForm from './CompanyProfileForm';
import UserManagement from './UserManagement';
import axios from 'axios';

import { useAuth } from '@/context/AuthProvider';

export default function CompanyProfile() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {auth} = useAuth() ;

  useEffect(() => {
    fetchProfileData();
  }, []);

   const backendUrl = import.meta.env.VITE_Backend_URL || 'http://localhost:5000';

const fetchProfileData = async () => {
  setLoading(true);
  setError(null);
 
  try {
    console.log('Fetching profile data...');
    const response = await axios.get(`${backendUrl}/api/companyDashboard/getInformation`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log('Profile data fetched:', response.data);
    setProfileData(response.data.profile);
  } catch (err) {
    console.error('Error fetching profile:', err);
    setError('Failed to load profile data.');
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromEditProfile = urlParams.get('editProfile');
    
    if (fromEditProfile === 'true') {
      setActiveTab('Profile');
      // Clean up the URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  const handleImageUpload = async (event, imageType) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append(imageType === 'backgroundImage' ? 'backgroundImage' : 'profileImage', file);

    try {
      const response = await axios.put(`${backendUrl}/api/companyDashboard/updateInformation`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setProfileData(response.data.profile); // Update profile data with new image URL
      alert(`${imageType === 'backgroundImage' ? 'Background' : 'Profile'} image updated successfully!`);
    } catch (err) {
      console.error(`Error uploading ${imageType} image:`, err);
      alert(`Failed to upload ${imageType} image. Make sure it's a valid image file.`);
    }
  };

  const renderContent = () => {
    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
    if (!profileData) return <div className="text-center py-8">No company profile data available.</div>;

    switch (activeTab) {
      case 'Overview':
        return <CompanyOverview profileData={profileData} />;
      case 'Profile':
        return <CompanyProfileForm profileData={profileData} onProfileUpdate={fetchProfileData} />;
      case 'Users':
        return <UserManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full bg-gray-100 min-h-screen">
      {/* Header Banner */}
      <div
        className="w-full h-32 bg-gray-300 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${profileData?.backgroundImageUrl || ''})` }}
      >
        <label htmlFor="backgroundImageUpload" className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity">
          <span className="text-white text-sm font-bold">Upload Background Image</span>
        </label>
        <input
          id="backgroundImageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleImageUpload(e, 'backgroundImage')}
        />
      </div>

      {/* Profile Section */}
      <div className="bg-white pb-4">
        <div className="relative px-4">
          {/* Profile Image */}
          <div className="absolute -top-16 left-4">
            <label htmlFor="profileImageUpload" className="relative w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white cursor-pointer overflow-hidden">
              {profileData?.profileImageUrl ? (
                <img src={profileData.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-bold">Upload</span>
              </div>
            </label>
            <input
              id="profileImageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e, 'profileImage')}
            />
          </div>
        </div>

        {/* Company Info */}
        <div className="px-6 pt-10">
          <h2 className="text-2xl font-bold">
            {profileData?.companyDetails?.companyName || 'Company Name'}
          </h2>

          <div className="flex flex-wrap items-center gap-6 mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={16} className="text-gray-500" />
              <span>{profileData?.companyDetails?.numberOfEmployees || 'N/A'} Employees</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} className="text-gray-500" />
              <span>Established Year: {profileData?.companyDetails?.establishedYear || 'N/A'}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-between mt-4">
            <div></div>
            <div className="flex gap-2">
              {profileData?.companyDetails?.companyLinkedin && (
                <a href={profileData.companyDetails.companyLinkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                  </svg>
                </a>
              )}
              {profileData?.companyDetails?.websiteUrl && (
                <a href={profileData.companyDetails.websiteUrl} target="_blank" rel="noopener noreferrer" className="border border-gray-300 rounded px-4 py-1 text-sm flex items-center">
                  <Globe size={14} className="mr-1 text-gray-600" />
                  Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b mt-4">
          {['Overview', 'Profile', 'Users'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 ${activeTab === tab ? 'border-b-2 border-black font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {renderContent()}
      </div>
    </div>
  );
}




// import { useState, useEffect } from 'react';
// import { Globe, Users, Calendar } from 'lucide-react';
// import CompanyOverview from './CompanyOverview';
// import CompanyProfileForm from './CompanyProfileForm';
// import UserManagement from './UserManagement';
// import axios from 'axios';

// export default function CompanyProfile() {
//   const [activeTab, setActiveTab] = useState('Overview');
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showProfilePrompt, setShowProfilePrompt] = useState(false); // New state to control button visibility

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   const fetchProfileData = async () => {
//     setLoading(true);
//     setError(null);
//     setShowProfilePrompt(false); // Reset prompt visibility on new fetch
//     try {
//       const response = await axios.get('/api/companyDashboard/getInformation', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       setProfileData(response.data.profile);
//       // If profile data is successfully fetched, ensure we're not showing the prompt
//       setShowProfilePrompt(false);
//     } catch (err) {
//       console.error('Error fetching profile:', err);
//       setError('Failed to load profile data.');
//       // Show the prompt if fetching fails or no data
//       setShowProfilePrompt(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageUpload = async (event, imageType) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append(imageType === 'backgroundImage' ? 'backgroundImage' : 'profileImage', file);

//     try {
//       const response = await axios.put('/api/companyDashboard/updateInformation', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       setProfileData(response.data.profile); // Update profile data with new image URL
//       alert(`${imageType === 'backgroundImage' ? 'Background' : 'Profile'} image updated successfully!`);
//       // After image upload, re-fetch profile data to ensure all data is consistent
//       fetchProfileData();
//     } catch (err) {
//       console.error(`Error uploading ${imageType} image:`, err);
//       alert(`Failed to upload ${imageType} image. Make sure it's a valid image file.`);
//     }
//   };

//   const handleGoToProfile = () => {
//     setActiveTab('Profile');
//     setShowProfilePrompt(false); // Hide the button once they click it
//   };

//   const renderContent = () => {
//     if (loading) {
//       return <div className="text-center py-8">Loading profile...</div>;
//     }

//     // If there's an error OR no profile data AND we should show the prompt
//     if ((error || !profileData) && showProfilePrompt) {
//       return (
//         <div className="text-center py-8">
//           {error && <p className="text-red-600 mb-4">{error}</p>}
//           {!profileData && !error && <p className="text-gray-600 mb-4">No company profile data available.</p>}
//           <button
//             onClick={handleGoToProfile}
//             className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
//           >
//             Go to Profile Section
//           </button>
//         </div>
//       );
//     }

//     // If there was an error or no data, but the user clicked "Go to Profile",
//     // or if the activeTab is explicitly 'Profile'
//     if (activeTab === 'Profile') {
//         return <CompanyProfileForm profileData={profileData} onProfileUpdate={fetchProfileData} />;
//     }

//     // Normal rendering based on activeTab if data is available and no error/prompt
//     switch (activeTab) {
//       case 'Overview':
//         return <CompanyOverview profileData={profileData} />;
//       case 'Users':
//         return <UserManagement />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex flex-col w-full bg-gray-100 min-h-screen">
//       {/* Header Banner */}
//       <div
//         className="w-full h-32 bg-gray-300 relative bg-cover bg-center"
//         style={{ backgroundImage: `url(${profileData?.backgroundImageUrl || ''})` }}
//       >
//         <label htmlFor="backgroundImageUpload" className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity">
//           <span className="text-white text-sm font-bold">Upload Background Image</span>
//         </label>
//         <input
//           id="backgroundImageUpload"
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={(e) => handleImageUpload(e, 'backgroundImage')}
//         />
//       </div>

//       {/* Profile Section */}
//       <div className="bg-white pb-4">
//         <div className="relative px-4">
//           {/* Profile Image */}
//           <div className="absolute -top-16 left-4">
//             <label htmlFor="profileImageUpload" className="relative w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white cursor-pointer overflow-hidden">
//               {profileData?.profileImageUrl ? (
//                 <img src={profileData.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
//               ) : (
//                 <div className="text-gray-400">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//               )}
//               <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity">
//                 <span className="text-white text-xs font-bold">Upload</span>
//               </div>
//             </label>
//             <input
//               id="profileImageUpload"
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => handleImageUpload(e, 'profileImage')}
//             />
//           </div>
//         </div>

//         {/* Company Info */}
//         <div className="px-6 pt-10">
//           <h2 className="text-2xl font-bold">
//             {profileData?.companyDetails?.companyName || 'Company Name'}
//           </h2>

//           <div className="flex flex-wrap items-center gap-6 mt-2">
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <Users size={16} className="text-gray-500" />
//               <span>{profileData?.companyDetails?.numberOfEmployees || 'N/A'} Employees</span>
//             </div>

//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <Calendar size={16} className="text-gray-500" />
//               <span>Established Year: {profileData?.companyDetails?.establishedYear || 'N/A'}</span>
//             </div>
//           </div>

//           {/* Social Links */}
//           <div className="flex justify-between mt-4">
//             <div></div>
//             <div className="flex gap-2">
//               {profileData?.companyDetails?.companyLinkedin && (
//                 <a href={profileData.companyDetails.companyLinkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
//                   </svg>
//                 </a>
//               )}
//               {profileData?.companyDetails?.websiteUrl && (
//                 <a href={profileData.companyDetails.websiteUrl} target="_blank" rel="noopener noreferrer" className="border border-gray-300 rounded px-4 py-1 text-sm flex items-center">
//                   <Globe size={14} className="mr-1 text-gray-600" />
//                   Website
//                 </a>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b mt-4">
//           {['Overview', 'Profile', 'Users'].map((tab) => (
//             <button
//               key={tab}
//               className={`px-6 py-2 ${activeTab === tab ? 'border-b-2 border-black font-medium' : 'text-gray-500'}`}
//               onClick={() => setActiveTab(tab)}
//               // Disable tabs other than 'Profile' if data is missing/error
//               disabled={(error || !profileData) && tab !== 'Profile'}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Tab Content */}
//       <div className="p-4">
//         {renderContent()}
//       </div>
//     </div>
//   );
// }