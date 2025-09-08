

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // Assuming you have react-hot-toast for notifications

export default function ProfileForm({
    onboardingData,
    profileImageFile: propProfileImageFile, // Renamed to avoid conflict with local state
    backgroundImageFile: propBackgroundImageFile, // Renamed to avoid conflict with local state
    setProfileImageFile, // Setter for main CollegeProfile component
    setBackgroundImageFile, // Setter for main CollegeProfile component
    setProfileImageUrl, // Setter for main CollegeProfile component
    setBackgroundImageUrl, // Setter for main CollegeProfile component
    onProfileUpdate // Callback to update parent's state
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    // Local state for form fields, initialized with fetched data or defaults
    const [collegeUniversityDetails, setCollegeUniversityDetails] = useState({
        collegeName: '',
        establishedYear: '',
        phoneNumber: '',
        alternatePhoneNumber: '',
        collegeLocation: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
    });

    const [placementCoordinatorDetails, setPlacementCoordinatorDetails] = useState({
        coordinatorName: '',
        designation: '',
        officialEmail: '',
        officialMobile: '',
        linkedinUrl: '',
        profilePictureUrl: '', // This will hold the URL for display within the form
    });

    const [placementRecruitmentDetails, setPlacementRecruitmentDetails] = useState({
        programsOffered: [],
        preferredHiringCompanies: [],
        recruitmentServicesRequired: [],
        collegeBrochureUrl: '', // This will hold the URL for display within the form
    });

    const [profileAchievements, setProfileAchievements] = useState({
        collegeWebsite: '',
        linkedinProfile: '',
        backgroundImageUrl: '', // This will hold the URL for display within the form
    });

    const [workshops, setWorkshops] = useState([]);
    const [volunteering, setVolunteering] = useState([]);
    const [awards, setAwards] = useState([]);

    // Refs for file inputs within the form for specific sections (e.g., coordinator profile, college brochure)
    const coordinatorProfileImageRef = useRef(null);
    const collegeBrochureRef = useRef(null);

    // State for files directly managed by ProfileForm for upload
    const [coordinatorProfileImageFile, setCoordinatorProfileImageFile] = useState(null);
    const [collegeBrochureFile, setCollegeBrochureFile] = useState(null);


    // Effect to populate form fields when onboardingData changes (e.g., on initial fetch or parent update)
    useEffect(() => {
        if (onboardingData) {
            setCollegeUniversityDetails(onboardingData.collegeUniversityDetails || {});
            setPlacementCoordinatorDetails(onboardingData.placementCoordinatorDetails || {});
            setPlacementRecruitmentDetails(onboardingData.placementRecruitmentDetails || {});
            setProfileAchievements(onboardingData.profileAchievements || {});
            setWorkshops(onboardingData.workshops || []);
            setVolunteering(onboardingData.volunteering || []);
            setAwards(onboardingData.awards || []);

            // Set the URLs for images within the form, if they exist
            setCoordinatorProfileImageFile(null); // Reset file input
            setCollegeBrochureFile(null); // Reset file input
        }
    }, [onboardingData]);

    // Handle changes for nested objects
    const handleDetailChange = (section, field, value) => {
        if (section === 'collegeUniversityDetails') {
            setCollegeUniversityDetails(prev => ({ ...prev, [field]: value }));
        } else if (section === 'placementCoordinatorDetails') {
            setPlacementCoordinatorDetails(prev => ({ ...prev, [field]: value }));
        } else if (section === 'placementRecruitmentDetails') {
            setPlacementRecruitmentDetails(prev => ({ ...prev, [field]: value }));
        } else if (section === 'profileAchievements') {
            setProfileAchievements(prev => ({ ...prev, [field]: value }));
        }
    };

    // Handle multi-select changes (e.g., programsOffered)
    const handleMultiSelectChange = (section, field, value, type = 'text') => {
        let parsedValue = value;
        if (type === 'array' && typeof value === 'string') {
            parsedValue = value.split(',').map(item => item.trim()).filter(item => item !== '');
        }

        if (section === 'placementRecruitmentDetails') {
            setPlacementRecruitmentDetails(prev => ({ ...prev, [field]: parsedValue }));
        }
        // Add more sections if they have multi-select arrays
    };


    // Handle file input for coordinator profile picture
    const handleCoordinatorProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoordinatorProfileImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPlacementCoordinatorDetails(prev => ({ ...prev, profilePictureUrl: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle file input for college brochure
    const handleCollegeBrochureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCollegeBrochureFile(file);
            // Optionally, display file name or a preview if it's an image
            setPlacementRecruitmentDetails(prev => ({ ...prev, collegeBrochureUrl: file.name })); // Just show file name for PDF
        }
    };

    // Handlers for repeatable sections (Workshops, Volunteering, Awards)
    const handleArrayItemChange = (setState, index, field, value) => {
        setState(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
    };

    const addArrayItem = (setState, defaultItem) => {
        setState(prev => [...prev, defaultItem]);
    };

    const removeArrayItem = (setState, index) => {
        setState(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();

            // Append JSON data as strings
            formData.append('collegeUniversityDetails', JSON.stringify(collegeUniversityDetails));
            formData.append('placementCoordinatorDetails', JSON.stringify({
                ...placementCoordinatorDetails,
                profilePictureUrl: undefined // Remove URL, send file instead if new one
            }));
            formData.append('placementRecruitmentDetails', JSON.stringify({
                ...placementRecruitmentDetails,
                collegeBrochureUrl: undefined // Remove URL, send file instead if new one
            }));
            formData.append('profileAchievements', JSON.stringify({
                ...profileAchievements,
                backgroundImageUrl: undefined // Remove URL, send file instead if new one
            }));

            formData.append('workshops', JSON.stringify(workshops));
            formData.append('volunteering', JSON.stringify(volunteering));
            formData.append('awards', JSON.stringify(awards));


            // Append file data if new files are selected
            if (propProfileImageFile) { // This is the header profile image from CollegeProfile
                formData.append('profileImage', propProfileImageFile);
            }
            if (propBackgroundImageFile) { // This is the header background image from CollegeProfile
                formData.append('backgroundImage', propBackgroundImageFile);
            }
            if (coordinatorProfileImageFile) { // This is the coordinator's image from ProfileForm
                formData.append('placementCoordinatorDetails_profileImage', coordinatorProfileImageFile);
            }
            if (collegeBrochureFile) { // This is the college brochure from ProfileForm
                formData.append('collegeBrochure', collegeBrochureFile);
            }


            const backendUrl = import.meta.env.VITE_Backend_URL;
            const response = await axios.post(`${backendUrl}/api/college-onboarding/submit-onboarding`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success(response.data.message);
            onProfileUpdate(response.data.data); // Update parent's state
            setIsEditing(false); // Exit edit mode after successful submission
        } catch (error) {
            console.error('Error submitting profile form:', error);
            const errorMessage = error.response?.data?.message || 'Failed to submit form. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white w-full min-h-screen pb-12">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="mb-10 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Manage Your College Profile</h1>
                        <p className="text-gray-600">
                            Update your college details, placement information, and achievements.
                        </p>
                    </div>
                    <div>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* College/University Details */}
                    <div className="border border-gray-300 rounded-md p-6 mb-8 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium">College/University Details</h2>
                            {isEditing && (
                                <button type="button" onClick={() => { /* Implement specific section edit if needed */ }} className="text-blue-600 text-sm hover:underline">
                                    Edit
                                </button>
                            )}
                        </div>
                        <p className="text-sm text-gray-600 mb-6">Information about your institution, its location, and contact details.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">College Name *</label>
                                <input
                                    type="text"
                                    value={collegeUniversityDetails.collegeName || ''}
                                    onChange={(e) => handleDetailChange('collegeUniversityDetails', 'collegeName', e.target.value)}
                                    placeholder="e.g., Indian Institute of Technology Bombay"
                                    className="w-full border border-gray-300 rounded p-2"
                                    readOnly={!isEditing}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Established Year *</label>
                                <input
                                    type="date"
                                    value={collegeUniversityDetails.establishedYear ? new Date(collegeUniversityDetails.establishedYear).toISOString().split('T')[0] : ''}
                                    onChange={(e) => handleDetailChange('collegeUniversityDetails', 'establishedYear', e.target.value)}
                                    className="w-full border border-gray-300 rounded p-2 bg-white"
                                    readOnly={!isEditing}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    value={collegeUniversityDetails.phoneNumber || ''}
                                    onChange={(e) => handleDetailChange('collegeUniversityDetails', 'phoneNumber', e.target.value)}
                                    placeholder="+91 XXXXXXXXXX"
                                    className="w-full border border-gray-300 rounded p-2"
                                    readOnly={!isEditing}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Alternate Phone Number</label>
                                <input
                                    type="text"
                                    value={collegeUniversityDetails.alternatePhoneNumber || ''}
                                    onChange={(e) => handleDetailChange('collegeUniversityDetails', 'alternatePhoneNumber', e.target.value)}
                                    placeholder="+91 XXXXXXXXXX"
                                    className="w-full border border-gray-300 rounded p-2"
                                    readOnly={!isEditing}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">College Location (Address Line)</label>
                                <input
                                    type="text"
                                    value={collegeUniversityDetails.collegeLocation || ''}
                                    onChange={(e) => handleDetailChange('collegeUniversityDetails', 'collegeLocation', e.target.value)}
                                    placeholder="e.g., Powai, Mumbai"
                                    className="w-full border border-gray-300 rounded p-2"
                                    readOnly={!isEditing}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">State</label>
                                <input
                                    type="text"
                                    value={collegeUniversityDetails.state || ''}
                                    onChange={(e) => handleDetailChange('collegeUniversityDetails', 'state', e.target.value)}
                                    placeholder="e.g., Maharashtra"
                                    className="w-full border border-gray-300 rounded p-2"
                                    readOnly={!isEditing}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">City</label>
                                <input
                                    type="text"
                                    value={collegeUniversityDetails.city || ''}
                                    onChange={(e) => handleDetailChange('collegeUniversityDetails', 'city', e.target.value)}
                                    placeholder="e.g., Mumbai"
                                    className="w-full border border-gray-300 rounded p-2"
                                    readOnly={!isEditing}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Country</label>
                                <input
                                    type="text"
                                    value={collegeUniversityDetails.country || ''}
                                    onChange={(e) => handleDetailChange('collegeUniversityDetails', 'country', e.target.value)}
                                    placeholder="e.g., India"
                                    className="w-full border border-gray-300 rounded p-2"
                                    readOnly={!isEditing}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Pincode</label>
                                <input
                                    type="text"
                                    value={collegeUniversityDetails.pincode || ''}
                                    onChange={(e) => handleDetailChange('collegeUniversityDetails', 'pincode', e.target.value)}
                                    placeholder="e.g., 400076"
                                    className="w-full border border-gray-300 rounded p-2"
                                    readOnly={!isEditing}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Placement Coordinator Details */}
                    <div className="border border-gray-300 rounded-md p-6 mb-8 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium">Placement Coordinator Details</h2>
                            {isEditing && (
                                <button type="button" onClick={() => { /* Implement specific section edit if needed */ }} className="text-blue-600 text-sm hover:underline">
                                    Edit
                                </button>
                            )}
                        </div>
                        <p className="text-sm text-gray-600 mb-6">Key contact information for the college's placement and recruitment activities.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Coordinator Name *</label>
                                <input
                                    type="text"
                                    value={placementCoordinatorDetails.coordinatorName || ''}
                                    onChange={(e) => handleDetailChange('placementCoordinatorDetails', 'coordinatorName', e.target.value)}
                                    placeholder="e.g., Dr. Anjali Sharma"
                                    className="w-full border border-gray-300 rounded p-2"
                                    readOnly={!isEditing}
                                />
                            </div>

                            <div className="md:col-span-2 flex justify-center">
                                <div className="mb-4 text-center">
                                    <div
                                        className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2 overflow-hidden cursor-pointer"
                                        onClick={() => isEditing && coordinatorProfileImageRef.current.click()}
                                    >
                                        {placementCoordinatorDetails.profilePictureUrl ? (
                                            <img
                                                src={placementCoordinatorDetails.profilePictureUrl}
                                                alt="Coordinator Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                        )}
                                    </div>
                                    {isEditing && (
                                        <>
                                            <button type="button" onClick={() => coordinatorProfileImageRef.current.click()} className="bg-white border border-gray-300 text-sm px-4 py-1 rounded">
                                                Upload new photo
                                            </button>
                                            <input
                                                type="file"
                                                ref={coordinatorProfileImageRef}
                                                onChange={handleCoordinatorProfileImageChange}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Designation *</label>
                                <input
                                    type="text"
                                    value={placementCoordinatorDetails.designation || ''}
                                    onChange={(e) => handleDetailChange('placementCoordinatorDetails', 'designation', e.target.value)}
                                    placeholder="e.g., Head of Placements"
                                    className="w-full border border-gray-300 rounded p-2 bg-white"
                                    readOnly={!isEditing}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Official email ID *</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                        </svg>
                                    </span>
                                    <input
                                        type="email"
                                        value={placementCoordinatorDetails.officialEmail || ''}
                                        onChange={(e) => handleDetailChange('placementCoordinatorDetails', 'officialEmail', e.target.value)}
                                        placeholder="hello@xyz.com"
                                        className="flex-1 border border-gray-300 rounded-r-md p-2"
                                        readOnly={!isEditing}
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Official Mobile No. *</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                        </svg>
                                    </span>
                                    <input
                                        type="tel"
                                        value={placementCoordinatorDetails.officialMobile || ''}
                                        onChange={(e) => handleDetailChange('placementCoordinatorDetails', 'officialMobile', e.target.value)}
                                        placeholder="1234567890"
                                        className="flex-1 border border-gray-300 rounded-r-md p-2"
                                        readOnly={!isEditing}
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">LinkedIn Profile</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                                        https://
                                    </span>
                                    <input
                                        type="text"
                                        value={placementCoordinatorDetails.linkedinUrl || ''}
                                        onChange={(e) => handleDetailChange('placementCoordinatorDetails', 'linkedinUrl', e.target.value)}
                                        placeholder="www.linkedin.com/in/yourprofile"
                                        className="flex-1 border border-gray-300 rounded-r-md p-2"
                                        readOnly={!isEditing}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Placement & Recruitment Details */}
                    <div className="border border-gray-300 rounded-md p-6 mb-8 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium">Placement & Recruitment Details</h2>
                            {isEditing && (
                                <button type="button" onClick={() => { /* Implement specific section edit if needed */ }} className="text-blue-600 text-sm hover:underline">
                                    Edit
                                </button>
                            )}
                        </div>
                        <p className="text-sm text-gray-600 mb-6">Information regarding academic programs, recruitment preferences, and services.</p>

                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Programs Offered (comma-separated)</label>
                                <input
                                    type="text"
                                    value={placementRecruitmentDetails.programsOffered?.join(', ') || ''}
                                    onChange={(e) => handleMultiSelectChange('placementRecruitmentDetails', 'programsOffered', e.target.value, 'array')}
                                    placeholder="e.g., B.Tech CSE, MBA, M.Sc. Physics"
                                    className="w-full border border-gray-300 rounded p-2 bg-white"
                                    readOnly={!isEditing}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Preferred Hiring Companies (comma-separated)</label>
                                <input
                                    type="text"
                                    value={placementRecruitmentDetails.preferredHiringCompanies?.join(', ') || ''}
                                    onChange={(e) => handleMultiSelectChange('placementRecruitmentDetails', 'preferredHiringCompanies', e.target.value, 'array')}
                                    placeholder="e.g., Google, Microsoft, Amazon"
                                    className="w-full border border-gray-300 rounded p-2 bg-white"
                                    readOnly={!isEditing}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Recruitment Services Required (comma-separated)</label>
                                <input
                                    type="text"
                                    value={placementRecruitmentDetails.recruitmentServicesRequired?.join(', ') || ''}
                                    onChange={(e) => handleMultiSelectChange('placementRecruitmentDetails', 'recruitmentServicesRequired', e.target.value, 'array')}
                                    placeholder="e.g., Job Fairs, Internship Support, Company Tie-ups"
                                    className="w-full border border-gray-300 rounded p-2 bg-white"
                                    readOnly={!isEditing}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">College Brochure</label>
                                <div className="mt-1 flex">
                                    {isEditing ? (
                                        <>
                                            <input type="file" id="college-brochure-upload" ref={collegeBrochureRef} onChange={handleCollegeBrochureChange} className="hidden" accept=".pdf,.doc,.docx" />
                                            <label htmlFor="college-brochure-upload" className="cursor-pointer flex-1 border border-gray-300 rounded p-2 bg-white flex justify-between items-center hover:bg-gray-50">
                                                <span className="text-gray-500">
                                                    {collegeBrochureFile?.name || onboardingData?.placementRecruitmentDetails?.collegeBrochureUrl?.split('/').pop() || 'Upload PDF/DOCX'}
                                                </span>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                                </svg>
                                            </label>
                                        </>
                                    ) : (
                                        <div className="flex-1 border border-gray-300 rounded p-2 bg-white flex justify-between items-center text-gray-700">
                                            {placementRecruitmentDetails.collegeBrochureUrl ? (
                                                <a href={placementRecruitmentDetails.collegeBrochureUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                    View Current Brochure
                                                </a>
                                            ) : (
                                                <span>No Brochure Uploaded</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* College Profile & Achievements */}
                    <div className="border border-gray-300 rounded-md p-6 mb-8 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium">College Profile & Achievements</h2>
                            {isEditing && (
                                <button type="button" onClick={() => { /* Implement specific section edit if needed */ }} className="text-blue-600 text-sm hover:underline">
                                    Edit
                                </button>
                            )}
                        </div>
                        <p className="text-sm text-gray-600 mb-6">Showcase your institution's key highlights, achievements, and online presence!</p>

                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">College Website *</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                                        https://
                                    </span>
                                    <input
                                        type="text"
                                        value={profileAchievements.collegeWebsite || ''}
                                        onChange={(e) => handleDetailChange('profileAchievements', 'collegeWebsite', e.target.value)}
                                        placeholder="www.institute.io"
                                        className="flex-1 border border-gray-300 rounded-r-md p-2"
                                        readOnly={!isEditing}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">LinkedIn Profile</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                                        https://
                                    </span>
                                    <input
                                        type="text"
                                        value={profileAchievements.linkedinProfile || ''}
                                        onChange={(e) => handleDetailChange('profileAchievements', 'linkedinProfile', e.target.value)}
                                        placeholder="www.linkedin.com/company/yourcollege"
                                        className="flex-1 border border-gray-300 rounded-r-md p-2"
                                        readOnly={!isEditing}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Workshop & Training Programs */}
                        <div className="mt-8">
                            <h3 className="text-md font-medium mb-4">Workshop & Training Programs</h3>
                            {workshops.map((workshop, index) => (
                                <div key={index} className="grid grid-cols-1 gap-4 border p-4 rounded-md mb-4 relative">
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem(setWorkshops, index)}
                                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                        >
                                            &times;
                                        </button>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Workshop Name *</label>
                                        <input
                                            type="text"
                                            value={workshop.workshopName || ''}
                                            onChange={(e) => handleArrayItemChange(setWorkshops, index, 'workshopName', e.target.value)}
                                            placeholder="e.g., Python for Data Science"
                                            className="w-full border border-gray-300 rounded p-2"
                                            readOnly={!isEditing}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Start Date</label>
                                            <input
                                                type="date"
                                                value={workshop.startDate ? new Date(workshop.startDate).toISOString().split('T')[0] : ''}
                                                onChange={(e) => handleArrayItemChange(setWorkshops, index, 'startDate', e.target.value)}
                                                className="w-full border border-gray-300 rounded p-2 bg-white"
                                                readOnly={!isEditing}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">End Date</label>
                                            <input
                                                type="date"
                                                value={workshop.endDate ? new Date(workshop.endDate).toISOString().split('T')[0] : ''}
                                                onChange={(e) => handleArrayItemChange(setWorkshops, index, 'endDate', e.target.value)}
                                                className="w-full border border-gray-300 rounded p-2 bg-white"
                                                readOnly={!isEditing}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Description</label>
                                        <input
                                            type="text"
                                            value={workshop.description || ''}
                                            onChange={(e) => handleArrayItemChange(setWorkshops, index, 'description', e.target.value)}
                                            placeholder="Brief description of the workshop"
                                            className="w-full border border-gray-300 rounded p-2"
                                            readOnly={!isEditing}
                                        />
                                    </div>
                                </div>
                            ))}

                            {isEditing && (
                                <div className="flex justify-end mt-2">
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem(setWorkshops, { workshopName: '', startDate: '', endDate: '', description: '' })}
                                        className="text-blue-600 text-sm hover:underline"
                                    >
                                        + Add workshop
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Volunteering & Community Engagement */}
                        <div className="mt-8">
                            <h3 className="text-md font-medium mb-4">Volunteering & Community Engagement</h3>
                            {volunteering.map((event, index) => (
                                <div key={index} className="grid grid-cols-1 gap-4 border p-4 rounded-md mb-4 relative">
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem(setVolunteering, index)}
                                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                        >
                                            &times;
                                        </button>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Event Name *</label>
                                        <input
                                            type="text"
                                            value={event.eventName || ''}
                                            onChange={(e) => handleArrayItemChange(setVolunteering, index, 'eventName', e.target.value)}
                                            placeholder="e.g., Clean-up Drive"
                                            className="w-full border border-gray-300 rounded p-2"
                                            readOnly={!isEditing}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Start Date</label>
                                            <input
                                                type="date"
                                                value={event.startDate ? new Date(event.startDate).toISOString().split('T')[0] : ''}
                                                onChange={(e) => handleArrayItemChange(setVolunteering, index, 'startDate', e.target.value)}
                                                className="w-full border border-gray-300 rounded p-2 bg-white"
                                                readOnly={!isEditing}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">End Date</label>
                                            <input
                                                type="date"
                                                value={event.endDate ? new Date(event.endDate).toISOString().split('T')[0] : ''}
                                                onChange={(e) => handleArrayItemChange(setVolunteering, index, 'endDate', e.target.value)}
                                                className="w-full border border-gray-300 rounded p-2 bg-white"
                                                readOnly={!isEditing}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Description</label>
                                        <input
                                            type="text"
                                            value={event.description || ''}
                                            onChange={(e) => handleArrayItemChange(setVolunteering, index, 'description', e.target.value)}
                                            placeholder="Brief description of the event"
                                            className="w-full border border-gray-300 rounded p-2"
                                            readOnly={!isEditing}
                                        />
                                    </div>
                                </div>
                            ))}

                            {isEditing && (
                                <div className="flex justify-end mt-2">
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem(setVolunteering, { eventName: '', startDate: '', endDate: '', description: '' })}
                                        className="text-blue-600 text-sm hover:underline"
                                    >
                                        + Add volunteering experience
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Awards & Recognitions */}
                        <div className="mt-8">
                            <h3 className="text-md font-medium mb-4">Awards & Recognitions</h3>
                            {awards.map((award, index) => (
                                <div key={index} className="grid grid-cols-1 gap-4 border p-4 rounded-md mb-4 relative">
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem(setAwards, index)}
                                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                        >
                                            &times;
                                        </button>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Award Title *</label>
                                        <input
                                            type="text"
                                            value={award.awardTitle || ''}
                                            onChange={(e) => handleArrayItemChange(setAwards, index, 'awardTitle', e.target.value)}
                                            placeholder="e.g., Best Engineering College"
                                            className="w-full border border-gray-300 rounded p-2"
                                            readOnly={!isEditing}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Start Date</label>
                                            <input
                                                type="date"
                                                value={award.startDate ? new Date(award.startDate).toISOString().split('T')[0] : ''}
                                                onChange={(e) => handleArrayItemChange(setAwards, index, 'startDate', e.target.value)}
                                                className="w-full border border-gray-300 rounded p-2 bg-white"
                                                readOnly={!isEditing}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">End Date</label>
                                            <input
                                                type="date"
                                                value={award.endDate ? new Date(award.endDate).toISOString().split('T')[0] : ''}
                                                onChange={(e) => handleArrayItemChange(setAwards, index, 'endDate', e.target.value)}
                                                className="w-full border border-gray-300 rounded p-2 bg-white"
                                                readOnly={!isEditing}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Awarding Organization *</label>
                                        <input
                                            type="text"
                                            value={award.awardingOrganization || ''}
                                            onChange={(e) => handleArrayItemChange(setAwards, index, 'awardingOrganization', e.target.value)}
                                            placeholder="e.g., Ministry of Education"
                                            className="w-full border border-gray-300 rounded p-2 bg-white"
                                            readOnly={!isEditing}
                                        />
                                    </div>
                                </div>
                            ))}

                            {isEditing && (
                                <div className="flex justify-end mt-2">
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem(setAwards, { awardTitle: '', startDate: '', endDate: '', awardingOrganization: '' })}
                                        className="text-blue-600 text-sm hover:underline"
                                    >
                                        + Add award
                                    </button>
                                </div>
                            )}
                        </div>

                        {isEditing && (
                            <div className="flex justify-end mt-8 gap-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        // Reset form to original onboardingData if user cancels edit
                                        if (onboardingData) {
                                            setCollegeUniversityDetails(onboardingData.collegeUniversityDetails || {});
                                            setPlacementCoordinatorDetails(onboardingData.placementCoordinatorDetails || {});
                                            setPlacementRecruitmentDetails(onboardingData.placementRecruitmentDetails || {});
                                            setProfileAchievements(onboardingData.profileAchievements || {});
                                            setWorkshops(onboardingData.workshops || []);
                                            setVolunteering(onboardingData.volunteering || []);
                                            setAwards(onboardingData.awards || []);
                                            // Also reset file inputs if needed
                                            setCoordinatorProfileImageFile(null);
                                            setCollegeBrochureFile(null);
                                        }
                                    }}
                                    className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg shadow hover:bg-gray-400 transition-colors duration-200"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition-colors duration-200"
                                    disabled={loading}
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}