

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/context/AuthProvider';
import { 
    FiUser, FiSettings, FiLogOut, FiBriefcase, FiCheck,
    FiBell, FiHelpCircle, FiXCircle, FiLoader
} from 'react-icons/fi';
import Avatar from '../ui/Avatar';
import LeaveCompanyModal from './LeaveCompanyModal';

function ProfileSwitchDropdown() {
   
    const [authuser, setAuthuser] = useAuth();
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSwitching, setIsSwitching] = useState(false);
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
    const [companyToLeave, setCompanyToLeave] = useState(null);
    const [isSubmittingLeave, setIsSubmittingLeave] = useState(false);


    useEffect(() => {
        const fetchCompanies = async () => {
            if (!authuser?.user) return;
            setIsLoading(true);
            setError(null);
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_Backend_URL}/api/team-member/my-companies`,
                    { withCredentials: true }
                );
                setCompanies(data);
            } catch (err) {
                console.error("Failed to fetch companies:", err);
                setError("Could not load companies.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchCompanies();
    }, [authuser]); 


    const handleStateUpdate = (updatedUser) => {
        const updatedAuthUser = { ...authuser, user: updatedUser };
        setAuthuser(updatedAuthUser);
        
    };

    const handleSwitchProfile = async (profileId) => {
        if (authuser.user.activeCompanyId === profileId) return;
        setIsSwitching(true);
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_Backend_URL}/api/team-member/switch-profile`,
                { profileId }, { withCredentials: true }
            );
            //  Update state correctly without reloading
            handleStateUpdate(data.user);
        } catch (error) {
            console.error('Failed to switch profile:', error);
            alert('Could not switch profile. Please try again.');
        } finally {
            setIsSwitching(false);
        }
    };
    
    const handleLogout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_Backend_URL}/api/auth/logout`, {}, { withCredentials: true });
            setAuthuser(null); // This will trigger the AuthProvider to clear localStorage
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    console.log("Aa rha hu mai")

    const handleOpenLeaveModal = (company) => {
        setCompanyToLeave(company);
        setIsLeaveModalOpen(true);
    };

    const handleConfirmLeave = async () => {
        if (!companyToLeave) return;
        setIsSubmittingLeave(true);
        try {
            const { data } = await axios.delete(
                `${import.meta.env.VITE_Backend_URL}/api/team-member/leave/${companyToLeave._id}`,
                { withCredentials: true }
            );
            //  Update state correctly without reloading
            handleStateUpdate(data.user);
            setIsLeaveModalOpen(false);
            setCompanyToLeave(null);
        } catch (error) {
            console.error("Failed to leave company:", error);
            alert(error.response?.data?.message || "Could not leave the company.");
        } finally {
            setIsSubmittingLeave(false);
        }
    };


    const activeCompanyProfile = companies.find(c => c._id === authuser?.user?.activeCompanyId);

    const renderProfileList = () => {
        if (isLoading) return <div className="flex items-center p-2 text-gray-500"><FiLoader className="mr-2 animate-spin" /> Loading...</div>;
        if (error) return <div className="p-2 text-red-500">{error}</div>;
        return (
            <>
                <button onClick={() => handleSwitchProfile(null)} className="dropdown-switch-item group">
                    <FiUser className="w-5 h-5 mr-3 text-gray-400" />
                    <span className="flex-1 text-left">Work as Independent</span>
                    {!authuser?.user?.activeCompanyId && <FiCheck className="w-5 h-5 text-black" />}
                </button>
                {companies.map(company => (
                    <div key={company._id} className="dropdown-switch-item group !p-0">
                        <button onClick={() => handleSwitchProfile(company._id)} className="flex items-center flex-grow h-full px-4 py-2 text-left">
                            <FiBriefcase className="w-5 h-5 mr-3 text-gray-400" />
                            <span className="flex-1">Work for {company.name}</span>
                            {authuser?.user?.activeCompanyId === company._id && <FiCheck className="w-5 h-5 text-black" />}
                        </button>
                        <button 
                            onClick={() => handleOpenLeaveModal(company)} 
                            title={`Leave ${company.name}`}
                            className="px-3 py-2 text-gray-400 transition-opacity duration-150 opacity-0 group-hover:opacity-100 hover:text-red-600"
                        >
                            <FiXCircle className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </>
        );
    };

    return (
        <>
            <div className="absolute right-0 z-50 w-64 mt-2 origin-top-right bg-white rounded-md shadow-lg dropdown-menu ring-1 ring-black ring-opacity-5">
                {/* ... Main dropdown structure ... */}
                <div className="py-1">
                    <div className="px-4 py-3">
                        <p className="text-xs text-gray-500">Currently working as</p>
                        <div className="flex items-center mt-1">
                            <Avatar src={activeCompanyProfile?.logo} name={activeCompanyProfile?.name || authuser?.user?.name} className="w-8 h-8 mr-2" />
                            <span className="font-semibold text-gray-800 truncate">{activeCompanyProfile?.name || 'Independent'}</span>
                        </div>
                    </div>
                    <div className="border-t border-gray-100">
                        <div className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase">Switch Profile</div>
                        <div className="py-1">{renderProfileList()}</div>
                    </div>
                    <div className="border-t border-gray-100">
                        <div className="py-1">
                            <Link to="/employer-profile?editProfile=true" className="dropdown-item"><FiUser className="mr-3 text-gray-400" /> Edit Profile</Link>
                              <Link to="/settings" className="dropdown-item">
                                      <FiSettings className="mr-3 text-gray-400" />
                                      Settings
                                    </Link>
                                    <Link to="/notifications" className="dropdown-item">
                                      <FiBell className="mr-3 text-gray-400" />
                                      Notifications
                                    </Link>
                                    <Link to="/faq" className="dropdown-item">
                                      <FiHelpCircle className="mr-3 text-gray-400" />
                                      FAQs
                                    </Link>
                        </div>
                    </div>
                    <div className="border-t border-gray-100">
                        <div className="py-1">
                            <button onClick={handleLogout} className="dropdown-item w-full text-left"><FiLogOut className="mr-3 text-gray-400" /> Logout</button>
                        </div>
                    </div>
                </div>
                {isSwitching && <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75"><p>Switching...</p></div>}
            </div>
            <LeaveCompanyModal isOpen={isLeaveModalOpen} onClose={() => setIsLeaveModalOpen(false)} onConfirm={handleConfirmLeave} companyName={companyToLeave?.name} isSubmitting={isSubmittingLeave} />
        </>
    );
}

export default ProfileSwitchDropdown;