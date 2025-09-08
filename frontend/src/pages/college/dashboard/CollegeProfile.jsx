
import { useState, useRef, useEffect } from 'react';
import { Globe, Users, Calendar } from 'lucide-react';
import CollegeDescription from './CollegeDescription'; // Assuming this exists
import ProfileForm from './ProfileForm'; // Your ProfileForm component
import UserManagements from './UserManagements'; // Assuming this exists
import axios from 'axios';
import {useAuth} from '@/context/AuthProvider'

// Configure axios to send cookies with requests
axios.defaults.withCredentials = true;

export default function CollegeProfile() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [profileImageFile, setProfileImageFile] = useState(null); // File object for upload
  const [backgroundImageFile, setBackgroundImageFile] = useState(null); // File object for upload
  const [profileImageUrl, setProfileImageUrl] = useState(null); // URL for display
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(null); // URL for display
  const [onboardingData, setOnboardingData] = useState(null); // This will hold the fetched profile data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {auth} = useAuth() ;

  const profileInputRef = useRef(null);
  const backgroundInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const backendUrl = import.meta.env.VITE_Backend_URL; // Ensure your backend URL is configured
        const response = await axios.get(`${backendUrl}/api/college-onboarding/profile-data`, {
          withCredentials: true,
        });
        const data = response.data.data;

        if (data) {
          setOnboardingData(data);
          // Set image URLs from fetched data for display in header
          setProfileImageUrl(data.placementCoordinatorDetails?.profilePictureUrl || null);
          setBackgroundImageUrl(data.profileAchievements?.backgroundImageUrl || null);
        } else {
          setOnboardingData(null); // No data found for this user
        }
      } catch (err) {
        console.error('Error fetching college onboarding data:', err);
        if (axios.isAxiosError(err) && err.response) {
          if (err.response.status === 404) {
            setError('No college profile data found for your account. Please complete the "Profile" tab to create one.');
          } else if (err.response.status === 401) {
            setError('Authentication required. Please log in.');
            // Optionally, redirect to login page if unauthorized
          } else {
            setError(err.response.data.message || 'Failed to load profile data.');
          }
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const handleProfileImageClick = () => {
    profileInputRef.current.click();
  };

  const handleBackgroundImageClick = () => {
    backgroundInputRef.current.click();
  };

  // This handler is for the main header images, not the coordinator's image within the form
  const handleImageChange = (e, setImageFileState, setImageUrlState) => {
    const file = e.target.files[0];
    if (file) {
      setImageFileState(file); // Store the file object for potential upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrlState(reader.result); // Set URL for immediate preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Callback to update state after ProfileForm submission
  const handleProfileUpdate = (updatedData) => {
    setOnboardingData(updatedData);
    // Update header images if new ones were uploaded/changed through the form
    setProfileImageUrl(updatedData.placementCoordinatorDetails?.profilePictureUrl || null);
    setBackgroundImageUrl(updatedData.profileAchievements?.backgroundImageUrl || null);
    setActiveTab('Overview'); // Optionally switch back to overview after update
  };


  const renderContent = () => {
    if (loading) {
      return <div className="text-center py-8 text-gray-700">Loading profile data...</div>;
    }

    if (error && !onboardingData && activeTab !== 'Profile') { // Only show global error if no data loaded at all AND not on profile tab
      return (
        <div className="text-center py-8">
          <p className="text-lg text-red-600">{error}</p>
          <p className="text-md text-gray-500 mt-2 mb-4">You can create your profile in the "Profile" tab.</p>
          <button
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
            onClick={() => setActiveTab('Profile')}
          >
            Go to Profile Form
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'Overview':
        // Ensure CollegeDescription can handle null or partial data gracefully
        return <CollegeDescription onboardingData={onboardingData} />;
      case 'Profile':
        return (
          <ProfileForm
            onboardingData={onboardingData} // Pass the fetched data
            profileImageFile={profileImageFile} // Pass the file state
            backgroundImageFile={backgroundImageFile} // Pass the file state
            setProfileImageFile={setProfileImageFile} // Pass the setter for profile image file
            setBackgroundImageFile={setBackgroundImageFile} // Pass the setter for background image file
            setProfileImageUrl={setProfileImageUrl} // Pass setter to update header profile image URL
            setBackgroundImageUrl={setBackgroundImageUrl} // Pass setter to update header background image URL
            onProfileUpdate={handleProfileUpdate} // Pass the callback for successful updates
          />
        );
      case 'Users':
        return <UserManagements />;
      default:
        return null;
    }
  };

  // Use optional chaining with defaults for display in header
  const coordinatorName = onboardingData?.placementCoordinatorDetails?.coordinatorName || 'Not Set';
  const designation = onboardingData?.placementCoordinatorDetails?.designation || 'Not Set';
  const collegeName = onboardingData?.collegeUniversityDetails?.collegeName || 'Your College Name';
  const linkedinUrl = onboardingData?.placementCoordinatorDetails?.linkedinUrl || '#';
  const collegeWebsite = onboardingData?.profileAchievements?.collegeWebsite || '#';
  const establishedYear = onboardingData?.collegeUniversityDetails?.establishedYear ?
    new Date(onboardingData.collegeUniversityDetails.establishedYear).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not Set';


  return (
    <div className="flex flex-col w-full bg-gray-100 min-h-screen">
      {/* Header Banner with upload functionality */}
      <div
        className="w-full h-32 bg-gray-300 relative cursor-pointer"
        onClick={handleBackgroundImageClick}
      >
        {backgroundImageUrl && (
          <img
            src={backgroundImageUrl}
            alt="Background"
            className="w-full h-full object-cover"
          />
        )}
        <input
          type="file"
          ref={backgroundInputRef}
          onChange={(e) => handleImageChange(e, setBackgroundImageFile, setBackgroundImageUrl)}
          accept="image/*"
          className="hidden"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white opacity-0 hover:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white pb-4">
        <div className="relative px-4">
          {/* Profile Image */}
          <div className="absolute -top-16 left-4">
            <div
              className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white cursor-pointer overflow-hidden"
              onClick={handleProfileImageClick}
            >
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={profileInputRef}
              onChange={(e) => handleImageChange(e, setProfileImageFile, setProfileImageUrl)}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Profile Info */}
          <div className="pt-16 pb-2 pl-2">
            <h1 className="text-xl font-bold">{coordinatorName}</h1>
            <p className="text-gray-500 text-sm">{designation}</p>
          </div>
        </div>

        {/* College Info */}
        <div className="px-6 pt-4">
          <h2 className="text-2xl font-bold">{collegeName}</h2>

          <div className="flex flex-wrap items-center gap-6 mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={16} className="text-gray-500" />
              <span>11-50 Employees</span> {/* Placeholder, as this isn't in your schema */}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} className="text-gray-500" />
              <span>Established Year: {establishedYear}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-between mt-4">
            <div></div>
            <div className="flex gap-2">
              {linkedinUrl && linkedinUrl !== '#' && (
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded hover:bg-gray-50">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                  </svg>
                </a>
              )}
              {collegeWebsite && collegeWebsite !== '#' && (
                <a href={collegeWebsite} target="_blank" rel="noopener noreferrer" className="border border-gray-300 rounded px-4 py-1 text-sm flex items-center hover:bg-gray-50">
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