import { useState, useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { FiLinkedin, FiGithub, FiGlobe, FiPlus, FiUploadCloud, FiChevronDown } from 'react-icons/fi';
import axios from 'axios';

function Fresher_Profile() {
 const [activeTab, setActiveTab] = useState('overview');
 const [switchToPro, setSwitchToPro] = useState(false);
 const [isProfileEditing, setIsProfileEditing] = useState(false);
 const [hasOnboardingData, setHasOnboardingData] = useState(true);

 const [profileData, setProfileData] = useState({
   profileImageUrl: '',
   backgroundImageUrl: '',
   resumeUrl: '',
   fullName: '',
   email: '',
   phone: '',
   about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique...',
    college: '',
    degree: '',
    yearOfGraduation: '',
    cgpa: '',
    degreeCertificateUrl: '',
    industry: [],
    jobRoles: [],
    locations: [],
    lookingFor: '',
    employmentType: '',
    expectedSalaryCurrency: '',
    expectedSalaryAmount: '',
    currentSalaryCurrency: '',
    currentSalaryAmount: '',
    skills: [],
    linkedin: '',
    github: '',
    portfolio: '',
    certifications: [],
    experiences: [],
    project: '',
   referralSource: '',
 });

  //  Add the missing state declarations back.
  // These are still needed for the UI logic, even with immediate uploads.
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [backgroundImageFile, setBackgroundImageFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

 // State for files that are part of the main "Save Changes" button
 const [degreeCertificateFile, setDegreeCertificateFile] = useState(null);
 const [projectFile, setProjectFile] = useState(null);

 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 const [isJobRolesDropdownOpen, setIsJobRolesDropdownOpen] = useState(false);
 const [isLocationsDropdownOpen, setIsLocationsDropdownOpen] = useState(false);

 const jobRolesDropdownRef = useRef(null);
 const locationsDropdownRef = useRef(null);

const predefinedJobRoles = ['Software Engineer', 'Data Analyst', 'Product Manager', 'UX Designer', 'DevOps Engineer', 'Full Stack Developer'];
const predefinedLocations = ['Noida', 'Delhi', 'Gurgaon', 'Bangalore', 'Pune', 'Mumbai', 'Hyderabad', 'Chennai', 'Kolkata', 'Remote'];
 const predefinedEmploymentTypes = ['part time', 'full time', 'contract'];
 const predefinedLookingFor = ['Job', 'Internship', 'Both'];
 const predefinedIndustries = ['IT Industry', 'Finance', 'Healthcare', 'Education', 'Marketing', 'Retail', 'Manufacturing', 'Automotive'];

 useEffect(() => {
 const fetchUserProfileData = async () => {
 setLoading(true);
 setError(null);
 try {
 const backendUrl = import.meta.env.VITE_Backend_URL;
 const response = await axios.get(`${backendUrl}/api/onboarding/me`, {
withCredentials: true,
 });

 if (response.data) {
 const fetchedData = response.data;
 setHasOnboardingData(true);

 setProfileData(prevData => ({
    ...prevData,
    ...fetchedData,
    fullName: fetchedData.name || '',
    profileImageUrl: fetchedData.profileImage || '',
 backgroundImageUrl: fetchedData.backgroundImage || '',
 resumeUrl: fetchedData.resume || '',
 degreeCertificateUrl: fetchedData.degreeCertificate || '',
 projectUrl: fetchedData.project || '',
 expectedSalaryCurrency: fetchedData.expectedSalaryCurrency || '',
expectedSalaryAmount: fetchedData.expectedSalaryAmount || '',
currentSalaryCurrency: fetchedData.currentSalaryCurrency || '',
 currentSalaryAmount: fetchedData.currentSalaryAmount || '',
 certifications: (fetchedData.certifications && typeof fetchedData.certifications === 'string')
 ? fetchedData.certifications.split('; ').map(name => ({ name, url: '' }))
 : [],
 experiences: fetchedData.experiences ? fetchedData.experiences.map(exp => ({
 ...exp,
 experienceCertificateUrl: exp.experienceCertificate || ''
 })) : []
 }));
 }
 } catch (err) {
 if (err.response && err.response.status === 404) {
setHasOnboardingData(false);
 }
 setError('Failed to load profile data. Please fill out your profile.');
 } finally {
 setLoading(false);
 }
 };
 fetchUserProfileData();
 }, []);

 useEffect(() => {
 function handleClickOutside(event) {
 if (jobRolesDropdownRef.current && !jobRolesDropdownRef.current.contains(event.target)) setIsJobRolesDropdownOpen(false);
 if (locationsDropdownRef.current && !locationsDropdownRef.current.contains(event.target)) setIsLocationsDropdownOpen(false);
 }
 document.addEventListener('mousedown', handleClickOutside); return () => document.removeEventListener('mousedown', handleClickOutside);
 }, []);

 const handleImmediateFileUpload = async (file, fieldName) => {
if (!file) return;

 setLoading(true);
 setError(null);

 const formData = new FormData();
 formData.append(fieldName, file);

 try {
 const backendUrl = import.meta.env.VITE_Backend_URL;
 const endpoint = `${backendUrl}/api/onboarding/update`;

 const response = await axios.put(endpoint, formData, {
 withCredentials: true,
 headers: { 'Content-Type': 'multipart/form-data' },
 });

 if (response.data && response.data.data) {
const savedData = response.data.data;
 const urlFieldMap = { profileImage: 'profileImageUrl', backgroundImage: 'backgroundImageUrl', resume: 'resumeUrl' };
 const urlStateField = urlFieldMap[fieldName];

if (urlStateField && savedData[fieldName]) {
setProfileData(prevData => ({ ...prevData, [urlStateField]: savedData[fieldName] }));
 }
 }
} catch (err) {
console.error(`Error uploading ${fieldName}:`, err);
setError(`Failed to upload ${fieldName}. Please try again.`);
 } finally {
      //  **FIX 2**: Clear the temporary file state after the upload attempt.
      if (fieldName === 'profileImage') setProfileImageFile(null);
      if (fieldName === 'backgroundImage') setBackgroundImageFile(null);
      if (fieldName === 'resume') setResumeFile(null);
 setLoading(false);
 }
 };

 const handleFileChange = async (event, fileType, index = null) => {
 const file = event.target.files[0];
 if (!file) return;
 if (fileType === 'profileImage') {
 setProfileImageFile(file);
 setProfileData(prev => ({ ...prev, profileImageUrl: URL.createObjectURL(file) }));
 await handleImmediateFileUpload(file, 'profileImage');
 } else if (fileType === 'backgroundImage') {
 setBackgroundImageFile(file);
 setProfileData(prev => ({ ...prev, backgroundImageUrl: URL.createObjectURL(file) }));
 await handleImmediateFileUpload(file, 'backgroundImage');
 } else if (fileType === 'resume') {
 setResumeFile(file);
 setProfileData(prev => ({ ...prev, resumeUrl: file.name }));
 await handleImmediateFileUpload(file, 'resume');
 } else {
 if (fileType === 'degreeCertificate') {
 setDegreeCertificateFile(file);
 setProfileData(prev => ({ ...prev, degreeCertificateUrl: URL.createObjectURL(file) }));
} else if (fileType === 'project') {
 setProjectFile(file);
 setProfileData(prev => ({ ...prev, projectUrl: URL.createObjectURL(file) }));
 } else if (fileType === 'experienceCertificate' && index !== null) {
 const updatedExperiences = [...profileData.experiences];
 updatedExperiences[index].experienceCertificateFile = file;
  updatedExperiences[index].experienceCertificateUrl = URL.createObjectURL(file);
setProfileData(prev => ({ ...prev, experiences: updatedExperiences }));
 }
 }
 };

  useEffect(() => {
       const urlParams = new URLSearchParams(window.location.search);
       const fromEditProfile = urlParams.get('editProfile');
       
       if (fromEditProfile === 'true') {
         setActiveTab('profile');
         // Clean up the URL
         const newUrl = window.location.pathname;
         window.history.replaceState({}, '', newUrl);
       }
  }, []);

 const handleSaveChanges = async () => {
setLoading(true);
 setError(null);
 try {
 const backendUrl = import.meta.env.VITE_Backend_URL;
 const formData = new FormData();

for (const key in profileData) {
 if (['profileImageUrl', 'backgroundImageUrl', 'resumeUrl', 'degreeCertificateUrl', 'projectUrl', 'about', '_id'].includes(key)) {
 continue;
 }
 if (key === 'experiences') {
 formData.append(key, JSON.stringify(profileData[key].map(exp => {  const { experienceCertificateUrl, experienceCertificateFile, ...rest } = exp;
 return rest;
 })));
 } else if (Array.isArray(profileData[key]) && key !== 'certifications') {  formData.append(key, profileData[key].join(','));
 } else if (key === 'certifications') {
 formData.append(key, Array.isArray(profileData.certifications) ? profileData.certifications.map(cert => cert.name).join('; ') : '');
 } else if (profileData[key] !== null) {
 formData.append(key, profileData[key]);
 }
 }

 if (degreeCertificateFile) formData.append('degreeCertificate', degreeCertificateFile);
 if (projectFile) formData.append('project', projectFile);

 profileData.experiences.forEach((exp) => {
if (exp.experienceCertificateFile) {
 formData.append('experienceCertificate', exp.experienceCertificateFile);
 }
});

 const endpoint = `${backendUrl}/api/onboarding/update`;
 const response = await axios.put(endpoint, formData, {
 withCredentials: true,
 headers: { 'Content-Type': 'multipart/form-data' },
 });

 if (response.data && response.data.data) {
 const saved = response.data.data;
 setProfileData(prev => ({ ...prev, ...saved }));
 }

 setIsProfileEditing(false);
 setHasOnboardingData(true);
setDegreeCertificateFile(null);
setProjectFile(null);

 } catch (err) {
 console.error('Error saving profile changes:', err.response ? err.response.data : err.message);
setError(`Failed to save changes: ${err.response?.data?.details || err.message}`);
 } finally {
 setLoading(false);
 }
 };
  
  // --- Helper and render functions (no changes from here down) ---
  
  const handleProfileDataChange = (field, value) => setProfileData(prev => ({ ...prev, [field]: value }));
  const handleWorkExperienceChange = (index, field, value) => {
    const newExperiences = [...profileData.experiences];
    newExperiences[index][field] = value;
    handleProfileDataChange('experiences', newExperiences);
  };
  const addWorkExperience = () => handleProfileDataChange('experiences', [...profileData.experiences, { company: '', role: '', startDate: '', endDate: '', description: '', experienceCertificateUrl: '', }]);
  const removeWorkExperience = (index) => handleProfileDataChange('experiences', profileData.experiences.filter((_, i) => i !== index));
  const handleProfileImageClick = () => document.getElementById('profileImageUpload').click();
  const handleBackgroundImageClick = () => document.getElementById('backgroundImageUpload').click();
  const handleResumeClick = () => document.getElementById('resume-upload').click();
  const handleCustomMultiSelectToggle = (field, item) => {
    setProfileData(prev => {
      const current = prev[field] || [];
      return { ...prev, [field]: current.includes(item) ? current.filter(i => i !== item) : [...current, item] };
    });
  };

  const renderContent = () => {
    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error && !hasOnboardingData) return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <Button variant="primary" className="bg-black hover:bg-gray-900" onClick={() => { setIsProfileEditing(true); setError(null); setActiveTab('profile'); }}>
          Go to Profile Section to Fill Data
        </Button>
      </div>
    );
    if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

    
    if (switchToPro) {
        return (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Upload your recent resume or CV</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
                </p>
              </div>
    
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Switch to Professional Dashboard!
                </h3>
                <p className="text-gray-600 mb-6">
                  Let us know your job interests and preferred locations so we can recommend the best opportunities for you.
                </p>
    
                <div className="space-y-6">
                  {profileData.experiences.map((exp, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
                      <h4 className="font-medium text-gray-900 mb-4">Work Experience {index + 1}</h4>
                      {profileData.experiences.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-red-600 hover:bg-red-50"
                          onClick={() => removeWorkExperience(index)}
                        >
                          Remove
                        </Button>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter company name"
                          value={exp.company}
                          onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                          disabled={!isProfileEditing}
                        />
                      </div>
    
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Job Role
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter job role"
                          value={exp.role}
                          onChange={(e) => handleWorkExperienceChange(index, 'role', e.target.value)}
                          disabled={!isProfileEditing}
                        />
                      </div>
    
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                          </label>
                          <input
                            type="date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            value={exp.startDate}
                            onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                            disabled={!isProfileEditing}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Date (or Current)
                          </label>
                          <input
                            type="date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            value={exp.endDate}
                            onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                            disabled={!isProfileEditing}
                          />
                        </div>
                      </div>
    
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                          rows="3"
                          placeholder="Enter job description"
                          value={exp.description}
                          onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                          disabled={!isProfileEditing}
                        ></textarea>
                      </div>
    
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Experience Certificate (Optional)
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor={`experience-certificate-upload-${index}`}
                                className={`relative cursor-pointer bg-white rounded-md font-medium text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 ${isProfileEditing ? 'hover:text-gray-700' : 'opacity-50 cursor-not-allowed'}`}
                              >
                                <span>Upload a file</span>
                                <input
                                  id={`experience-certificate-upload-${index}`}
                                  name="experienceCertificate"
                                  type="file"
                                  className="sr-only"
                                  accept=".pdf,.doc,.docx"
                                  onChange={(e) => handleFileChange(e, 'experienceCertificate', index)}
                                  disabled={!isProfileEditing}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PDF, DOCX, DOC up to 10MB</p>
                            {(exp.experienceCertificateUrl || (exp.experienceCertificateFile && URL.createObjectURL(exp.experienceCertificateFile))) && (
                              <p className="text-sm text-green-600 mt-2">
                                File uploaded: <a href={exp.experienceCertificateUrl || URL.createObjectURL(exp.experienceCertificateFile)} target="_blank" rel="noopener noreferrer" className="underline">View Certificate</a>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addWorkExperience} className="w-full" disabled={!isProfileEditing}>
                    <FiPlus className="w-4 h-4 mr-2" /> Add More Experience
                  </Button>
    
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Salary
                    </label>
                    <div className="flex">
                      <select
                        className="inline-flex items-center px-3 text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md"
                        value={profileData.currentSalaryCurrency}
                        onChange={(e) => handleProfileDataChange('currentSalaryCurrency', e.target.value)}
                        disabled={!isProfileEditing}
                      >
                        <option>USD</option>
                        <option>INR</option>
                        <option>EUR</option>
                      </select>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-none rounded-r-md focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Enter amount"
                        value={profileData.currentSalaryAmount}
                        onChange={(e) => handleProfileDataChange('currentSalaryAmount', e.target.value)}
                        disabled={!isProfileEditing}
                      />
                    </div>
                  </div>
    
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expected Salary
                    </label>
                    <div className="flex">
                      <select
                        className="inline-flex items-center px-3 text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md"
                        value={profileData.expectedSalaryCurrency}
                        onChange={(e) => handleProfileDataChange('expectedSalaryCurrency', e.target.value)}
                        disabled={!isProfileEditing}
                      >
                        <option>USD</option>
                        <option>INR</option>
                        <option>EUR</option>
                      </select>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-none rounded-r-md focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Enter amount"
                        value={profileData.expectedSalaryAmount}
                        onChange={(e) => handleProfileDataChange('expectedSalaryAmount', e.target.value)}
                        disabled={!isProfileEditing}
                      />
                    </div>
                  </div>
    
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <Button
                      variant="outline"
                      onClick={() => setSwitchToPro(false)}
                      className="border-black text-black hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      className="bg-black hover:bg-gray-900"
                      onClick={handleSaveChanges}
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Switch'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
    
    const displayFieldStyle = "w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-900 min-h-[40px] flex items-center";
    const displayFieldWrapperStyle = "relative mt-1";
    
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">What recruiters will see</h3>
              <div className="border-2 border-gray-200 rounded-lg divide-y divide-gray-200">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar size="lg" name={profileData.fullName} src={profileData.profileImageUrl} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{profileData.fullName || 'N/A'}</h4>
                          <p className="text-sm text-gray-600">
                            {profileData.degree || 'N/A'} at {profileData.college || 'N/A'}, {profileData.yearOfGraduation || 'N/A'}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {profileData.linkedin && (
                            <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm" className="border-black text-black hover:bg-gray-50">
                                <FiLinkedin className="w-4 h-4" />
                              </Button>
                            </a>
                          )}
                          {profileData.github && (
                            <a href={profileData.github} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm" className="border-black text-black hover:bg-gray-50">
                                <FiGithub className="w-4 h-4" />
                              </Button>
                            </a>
                          )}
                          {profileData.portfolio && (
                            <a href={profileData.portfolio} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm" className="border-black text-black hover:bg-gray-50">
                                <FiGlobe className="w-4 h-4" />
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
    
                      <div className="space-y-6">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">About</h5>
                          <p className="text-gray-600">{profileData.about || 'No information provided.'}</p>
                        </div>
    
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">Contact Information</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Email address</p>
                              <p className="text-gray-900">{profileData.email || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Mobile Number</p>
                              <p className="text-gray-900">{profileData.phone || 'N/A'}</p>
                            </div>
                          </div>
                        </div>
    
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">Education</h5>
                          <p className="text-gray-900">{profileData.degree || 'N/A'}</p>
                          <p className="text-gray-600">{profileData.college || 'N/A'}, {profileData.yearOfGraduation || 'N/A'}</p>
                        </div>
    
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">Skills</h5>
                          <div className="flex flex-wrap gap-2">
                            {profileData.skills && profileData.skills.length > 0 ? (
                              profileData.skills.map((skill) => (
                                <Badge key={skill} variant="primary" size="md" className="bg-gray-100 text-gray-800">
                                  {skill}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-gray-600">N/A</span>
                            )}
                          </div>
                        </div>
    
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">Interested Industry Type</h5>
                          <Badge variant="primary" size="md" className="bg-gray-100 text-gray-800">{profileData.industry && profileData.industry.length > 0 ? profileData.industry[0] : 'N/A'}</Badge>
                        </div>
    
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">Interested Job Roles</h5>
                          <div className="flex flex-wrap gap-2">
                            {profileData.jobRoles && profileData.jobRoles.length > 0 ? (
                              profileData.jobRoles.map((role) => (
                                <Badge key={role} variant="primary" size="md" className="bg-gray-100 text-gray-800">{role}</Badge>
                              ))
                            ) : (
                              <span className="text-gray-600">N/A</span>
                            )}
                          </div>
                        </div>
    
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">Preferred Job Locations</h5>
                          <div className="flex flex-wrap gap-2">
                            {profileData.locations && profileData.locations.length > 0 ? (
                              profileData.locations.map((location) => (
                                <Badge key={location} variant="primary" size="md" className="bg-gray-100 text-gray-800">
                                  {location}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-gray-600">N/A</span>
                            )}
                          </div>
                        </div>
    
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">Looking for</h5>
                          <Badge variant="primary" size="md" className="bg-gray-100 text-gray-800">{profileData.lookingFor || 'N/A'}</Badge>
                        </div>
    
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">Employment Type</h5>
                          <div className="flex gap-2">
                            {profileData.employmentType ? (
                              <Badge variant="primary" size="md" className="bg-gray-100 text-gray-800">{profileData.employmentType}</Badge>
                            ) : (
                              <span className="text-gray-600">N/A</span>
                            )}
                          </div>
                        </div>
    
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">Expected Salary</h5>
                          <p className="text-gray-900">{profileData.expectedSalaryCurrency || 'N/A'} {profileData.expectedSalaryAmount || ''}</p>
                        </div>
    
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">Work Experience</h5>
                          {profileData.experiences && profileData.experiences.length > 0 ? (
                            profileData.experiences.map((exp, idx) => (
                              <div key={idx} className="mb-4 border-b pb-2 last:border-b-0">
                                <p className="font-medium text-gray-900">{exp.role || 'N/A'} at {exp.company || 'N/A'}</p>
                                <p className="text-sm text-gray-600">{exp.startDate || ''} - {exp.endDate || 'Present'}</p>
                                <p className="text-sm text-gray-700">{exp.description || 'No description provided.'}</p>
                                {exp.experienceCertificateUrl && (
                                  <p className="text-sm text-blue-600 mt-1">
                                    <a href={exp.experienceCertificateUrl} target="_blank" rel="noopener noreferrer" className="underline">View Certificate</a>
                                  </p>
                                )}
                              </div>
                            ))
                          ) : (
                            <span className="text-gray-600">No work experience added.</span>
                          )}
                        </div>
    
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">Certifications</h5>
                          {profileData.certifications && profileData.certifications.length > 0 ? (
                            <ul className="list-disc list-inside text-gray-600">
                              {profileData.certifications.map((cert, idx) => (
                                <li key={idx}>
                                  {cert.name || 'N/A'}
                                  {cert.url && (
                                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">
                                      (Link)
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-gray-600">No certifications added.</span>
                          )}
                        </div>
    
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">Referral Source</h5>
                          <p className="text-gray-900">{profileData.referralSource || 'N/A'}</p>
                        </div>
    
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
            <div className="space-y-6">
              {/* About Section */}
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">About</h3>
                    <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enter your name *
                    </label>
                    {isProfileEditing ? (
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter your name"
                        value={profileData.fullName}
                        onChange={(e) => handleProfileDataChange('fullName', e.target.value)}
                        required
                      />
                    ) : (
                      <div className={displayFieldStyle}>
                        {profileData.fullName || "N/A"}
                      </div>
                    )}
                  </div>
        
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enter your email *
                    </label>
                    <div className={displayFieldWrapperStyle}>
                      {isProfileEditing && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                      )}
                      {isProfileEditing ? (
                        <input
                          type="email"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="hello@xyz.com"
                          value={profileData.email}
                          onChange={(e) => handleProfileDataChange('email', e.target.value)}
                          required
                        />
                      ) : (
                        <div className={displayFieldStyle + (profileData.email ? " pl-10" : "")}>
                          {profileData.email && (
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                              </svg>
                            </div>
                          )}
                          {profileData.email || "N/A"}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enter your mobile no. *
                    </label>
                    <div className={displayFieldWrapperStyle}>
                      {isProfileEditing && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 1.485A1 1 0 017.5 7H4a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1v-3.5a1 1 0 011-1h1.485a1 1 0 01.836.986l1.485.74a1 1 0 01.52.879V17a1 1 0 01-1 1H3a1 1 0 01-1-1V3z" />
                          </svg>
                        </div>
                      )}
                      {isProfileEditing ? (
                        <input
                          type="tel"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="1234567890"
                          value={profileData.phone}
                          onChange={(e) => handleProfileDataChange('phone', e.target.value)}
                          required
                        />
                      ) : (
                        <div className={displayFieldStyle + (profileData.phone ? " pl-10" : "")}>
                          {profileData.phone && (
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 1.485A1 1 0 017.5 7H4a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1v-3.5a1 1 0 011-1h1.485a1 1 0 01.836.986l1.485.74a1 1 0 01.52.879V17a1 1 0 01-1 1H3a1 1 0 01-1-1V3z" />
                              </svg>
                            </div>
                          )}
                          {profileData.phone || "N/A"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
    
              {/* Educational Background Section */}
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Educational Background</h3>
                    <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      College/University
                    </label>
                    {isProfileEditing ? (
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Placeholder"
                        value={profileData.college}
                        onChange={(e) => handleProfileDataChange('college', e.target.value)}
                      />
                    ) : (
                      <div className={displayFieldStyle}>
                        {profileData.college || "N/A"}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Degree
                    </label>
                    {isProfileEditing ? (
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Placeholder"
                        value={profileData.degree}
                        onChange={(e) => handleProfileDataChange('degree', e.target.value)}
                      />
                    ) : (
                      <div className={displayFieldStyle}>
                        {profileData.degree || "N/A"}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year of Graduation
                    </label>
                    {isProfileEditing ? (
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Placeholder"
                        value={profileData.yearOfGraduation}
                        onChange={(e) => handleProfileDataChange('yearOfGraduation', e.target.value)}
                      />
                    ) : (
                      <div className={displayFieldStyle}>
                        {profileData.yearOfGraduation || "N/A"}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current CGPA/Percentage
                    </label>
                    {isProfileEditing ? (
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Placeholder"
                        value={profileData.cgpa}
                        onChange={(e) => handleProfileDataChange('cgpa', e.target.value)}
                      />
                    ) : (
                      <div className={displayFieldStyle}>
                        {profileData.cgpa || "N/A"}
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Degree Certificate (Optional)
                    </label>
                    {isProfileEditing ? (
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="degree-certificate-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="degree-certificate-upload"
                                name="degree-certificate-upload"
                                type="file"
                                className="sr-only"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => handleFileChange(e, 'degreeCertificate')}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PDF, DOCX, DOC up to 10MB</p>
                          {profileData.degreeCertificateUrl && (
                            <p className="text-sm text-green-600 mt-2">
                              File uploaded: <a href={profileData.degreeCertificateUrl} target="_blank" rel="noopener noreferrer" className="underline">View Certificate</a>
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className={displayFieldStyle}>
                        {profileData.degreeCertificateUrl ? (
                          <a href={profileData.degreeCertificateUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            View Certificate
                          </a>
                        ) : (
                          "No certificate uploaded"
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
    
              {/* Career Goals Section */}
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Career Goals</h3>
                    <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Interested Industry Type
                    </label>
                    {isProfileEditing ? (
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={profileData.industry && profileData.industry.length > 0 ? profileData.industry[0] : ''} // Get first item if array
                        onChange={(e) => handleProfileDataChange('industry', [e.target.value])} // Convert to array for schema
                      >
                        <option value="">Select Industry</option>
                        {predefinedIndustries.map(industry => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                    ) : (
                      <div className={displayFieldStyle}>
                        {profileData.industry && profileData.industry.length > 0 ? profileData.industry[0] : "N/A"}
                      </div>
                    )}
                  </div>
    
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Interested Job Roles
                    </label>
                    {isProfileEditing ? (
                      <div className="relative" ref={jobRolesDropdownRef}>
                        <div
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
                          onClick={() => setIsJobRolesDropdownOpen(!isJobRolesDropdownOpen)}
                        >
                          <div className="flex flex-wrap gap-2 pr-6">
                            {profileData.jobRoles.length > 0 ? (
                              profileData.jobRoles.map(role => (
                                <Badge key={role} variant="primary" size="sm" className="bg-gray-200 text-gray-800">
                                  {role}
                                  <span
                                    className="ml-1 cursor-pointer text-gray-600 hover:text-gray-900"
                                    onClick={(e) => {
                                      e.stopPropagation(); 
                                      handleCustomMultiSelectToggle('jobRoles', role);
                                    }}
                                  >x</span>
                                </Badge>
                              ))
                            ) : (
                              <span className="text-gray-500">Multiple-select</span>
                            )}
                          </div>
                          <FiChevronDown className="w-5 h-5 text-gray-400 absolute right-3" />
                        </div>
                        {isJobRolesDropdownOpen && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {predefinedJobRoles.map((role) => (
                              <div
                                key={role}
                                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${profileData.jobRoles.includes(role) ? 'bg-blue-50 text-blue-800' : ''
                                  }`}
                                onClick={() => handleCustomMultiSelectToggle('jobRoles', role)}
                              >
                                {role}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={displayFieldStyle}>
                        {profileData.jobRoles && profileData.jobRoles.length > 0 ? (
                          <div className="flex flex-wrap gap-2 py-1">
                            {profileData.jobRoles.map(role => (
                              <Badge key={role} variant="primary" size="md" className="bg-gray-100 text-gray-800">
                                {role}
                              </Badge>
                            ))}
                          </div>
                        ) : "N/A"}
                      </div>
                    )}
                  </div>
    
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Job Locations
                    </label>
                    {isProfileEditing ? (
                      <div className="relative" ref={locationsDropdownRef}>
                        <div
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
                          onClick={() => setIsLocationsDropdownOpen(!isLocationsDropdownOpen)}
                        >
                          <div className="flex flex-wrap gap-2 pr-6">
                            {profileData.locations.length > 0 ? (
                              profileData.locations.map(location => (
                                <Badge key={location} variant="primary" size="sm" className="bg-gray-200 text-gray-800">
                                  {location}
                                  <span
                                    className="ml-1 cursor-pointer text-gray-600 hover:text-gray-900"
                                    onClick={(e) => {
                                      e.stopPropagation(); 
                                      handleCustomMultiSelectToggle('locations', location);
                                    }}
                                  >x</span>
                                </Badge>
                              ))
                            ) : (
                              <span className="text-gray-500">Multiple-select</span>
                            )}
                          </div>
                          <FiChevronDown className="w-5 h-5 text-gray-400 absolute right-3" />
                        </div>
                        {isLocationsDropdownOpen && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {predefinedLocations.map((location) => (
                              <div
                                key={location}
                                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${profileData.locations.includes(location) ? 'bg-blue-50 text-blue-800' : ''
                                  }`}
                                onClick={() => handleCustomMultiSelectToggle('locations', location)}
                              >
                                {location}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={displayFieldStyle}>
                        {profileData.locations && profileData.locations.length > 0 ? (
                          <div className="flex flex-wrap gap-2 py-1">
                            {profileData.locations.map(location => (
                              <Badge key={location} variant="primary" size="md" className="bg-gray-100 text-gray-800">
                                {location}
                              </Badge>
                            ))}
                          </div>
                        ) : "N/A"}
                      </div>
                    )}
                  </div>
    
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Looking for
                    </label>
                    {isProfileEditing ? (
                      <div className="flex flex-wrap gap-3">
                        {predefinedLookingFor.map((option) => (
                          <Button
                            key={option}
                            variant={profileData.lookingFor === option ? 'primary' : 'outline'}
                            className={profileData.lookingFor === option ? 'bg-black text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}
                            onClick={() => handleProfileDataChange('lookingFor', option)}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className={displayFieldStyle}>
                        {profileData.lookingFor || "N/A"}
                      </div>
                    )}
                  </div>
    
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employment type
                    </label>
                    {isProfileEditing ? (
                      <div className="flex flex-wrap gap-3">
                        {predefinedEmploymentTypes.map((type) => (
                          <Button
                            key={type}
                            variant={profileData.employmentType === type ? 'primary' : 'outline'}
                            className={profileData.employmentType === type ? 'bg-black text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}
                            onClick={() => handleProfileDataChange('employmentType', type)}
                          >
                            {type}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className={displayFieldStyle}>
                        {profileData.employmentType || "N/A"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
    
              {/* Skills Section */}
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Skills</h3>
                    <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Skills
                  </label>
                  {isProfileEditing ? (
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows="3"
                      placeholder="Enter your skills (comma separated)"
                      value={profileData.skills.join(', ')}
                      onChange={(e) => handleProfileDataChange('skills', e.target.value.split(',').map(s => s.trim()))}
                    ></textarea>
                  ) : (
                    <div className={displayFieldStyle + " h-24 overflow-auto"}>
                      {profileData.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-2 py-1">
                          {profileData.skills.map(skill => (
                            <Badge key={skill} variant="primary" size="md" className="bg-gray-100 text-gray-800">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      ) : "N/A"}
                    </div>
                  )}
                </div>
              </div>
    
              {/* Social Profiles Section */}
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Social Profiles</h3>
                    <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                        http://
                      </span>
                      {isProfileEditing ? (
                        <input
                          type="text"
                          className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm border border-gray-300"
                          placeholder="www.linkedin.com/in/yourprofile"
                          value={profileData.linkedin.replace(/^(https?:\/\/)?(www\.)?/i, '')}
                          onChange={(e) => handleProfileDataChange('linkedin', `http://${e.target.value}`)}
                        />
                      ) : (
                        <div className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md bg-gray-50 border border-gray-200 text-gray-900">
                          {profileData.linkedin ? (
                            <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {profileData.linkedin}
                            </a>
                          ) : "N/A"}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Github
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                        http://
                      </span>
                      {isProfileEditing ? (
                        <input
                          type="text"
                          className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm border border-gray-300"
                          placeholder="github.com/yourprofile"
                          value={profileData.github.replace(/^(https?:\/\/)?(www\.)?/i, '')}
                          onChange={(e) => handleProfileDataChange('github', `http://${e.target.value}`)}
                        />
                      ) : (
                        <div className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md bg-gray-50 border border-gray-200 text-gray-900">
                          {profileData.github ? (
                            <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {profileData.github}
                            </a>
                          ) : "N/A"}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Portfolio Website
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                        http://
                      </span>
                      {isProfileEditing ? (
                        <input
                          type="text"
                          className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm border border-gray-300"
                          placeholder="www.yourwebsite.com"
                          value={profileData.portfolio.replace(/^(https?:\/\/)?(www\.)?/i, '')}
                          onChange={(e) => handleProfileDataChange('portfolio', `http://${e.target.value}`)}
                        />
                      ) : (
                        <div className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md bg-gray-50 border border-gray-200 text-gray-900">
                          {profileData.portfolio ? (
                            <a href={profileData.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {profileData.portfolio}
                            </a>
                          ) : "N/A"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
    
              {/* Certifications Section */}
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Certifications</h3>
                    <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
                  </div>
                </div>
                {profileData.certifications.map((cert, index) => (
                  <div key={index} className="space-y-4 mb-4 p-4 border border-gray-200 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Certification Name
                      </label>
                      {isProfileEditing ? (
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          value={cert.name}
                          onChange={(e) => {
                            const newCerts = [...profileData.certifications];
                            newCerts[index].name = e.target.value;
                            handleProfileDataChange('certifications', newCerts);
                          }}
                        />
                      ) : (
                        <div className={displayFieldStyle}>
                          {cert.name || "N/A"}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Certification URL
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                          http://
                        </span>
                        {isProfileEditing ? (
                          <input
                            type="text"
                            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm border border-gray-300"
                            placeholder="www.example.com"
                            value={cert.url.replace(/^(https?:\/\/)?(www\.)?/i, '')}
                            onChange={(e) => {
                              const newCerts = [...profileData.certifications];
                              newCerts[index].url = `http://${e.target.value}`;
                              handleProfileDataChange('certifications', newCerts);
                            }}
                          />
                        ) : (
                          <div className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md bg-gray-50 border border-gray-200 text-gray-900">
                            {cert.url ? (
                              <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {cert.url}
                              </a>
                            ) : "N/A"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isProfileEditing && (
                  <Button variant="outline" size="sm" onClick={() => handleProfileDataChange('certifications', [...profileData.certifications, { name: '', url: '' }])}>
                    <FiPlus className="w-4 h-4 mr-2" /> Add Certification
                  </Button>
                )}
              </div>
    
              {/* Project Section */}
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Project</h3>
                    <p className="text-sm text-gray-600">Upload a project file or portfolio.</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project File (Optional)
                  </label>
                  {isProfileEditing ? (
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="project-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="project-upload"
                              name="project-upload"
                              type="file"
                              className="sr-only"
                              accept=".pdf,.zip,.rar"
                              onChange={(e) => handleFileChange(e, 'project')}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF, ZIP, RAR up to 25MB</p>
                        {profileData.projectUrl && (
                          <p className="text-sm text-green-600 mt-2">
                            File uploaded: <a href={profileData.projectUrl} target="_blank" rel="noopener noreferrer" className="underline">View Project</a>
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className={displayFieldStyle}>
                      {profileData.projectUrl ? (
                        <a href={profileData.projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          View Project
                        </a>
                      ) : (
                        "No project file uploaded"
                      )}
                    </div>
                  )}
                </div>
              </div>
    
              {/* Other Section (Referral Source) */}
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Other Information</h3>
                    <p className="text-sm text-gray-600">Additional details.</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Referral Source
                  </label>
                  {isProfileEditing ? (
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="How did you hear about us?"
                      value={profileData.referralSource}
                      onChange={(e) => handleProfileDataChange('referralSource', e.target.value)}
                    />
                  ) : (
                    <div className={displayFieldStyle}>
                      {profileData.referralSource || "N/A"}
                    </div>
                  )}
                </div>
              </div>
    
              {/* Save Changes / Edit Profile Button for Profile Tab */}
              <div className="flex justify-end p-6 bg-white border border-gray-200 rounded-lg shadow-sm mt-6">
                <Button
                  variant="primary"
                  className="bg-black hover:bg-gray-900"
                  onClick={isProfileEditing ? handleSaveChanges : () => setIsProfileEditing(true)}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : (isProfileEditing ? 'Save Changes' : 'Edit Profile')}
                </Button>
              </div>
            </div>
          );
      case 'resume':
        return (
            <div className="space-y-6">
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Upload your resume/CV</h3>
      
                {(profileData.resumeUrl || resumeFile) && (
                  <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {resumeFile ? 'New Resume' : 'Current Resume'}
                      </p>
                      {resumeFile ? (
                        <p className="text-sm text-gray-600">{resumeFile.name}</p>
                      ) : (
                        <a
                          href={profileData.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View Resume
                        </a>
                      )}
                    </div>
                    <button
                      onClick={handleResumeClick}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Replace
                    </button>
                  </div>
                )}
      
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={handleResumeClick}
                >
                  <input
                    type="file"
                    className="hidden"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, 'resume')}
                  />
                  <div className="flex flex-col items-center justify-center">
                    <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      {profileData.resumeUrl || resumeFile ? 'Click to upload new resume' : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Supported formats: PDF, DOC, DOCX
                    </p>
                  </div>
                </div>
      
                {/* Save Changes Button appears only when a new file is selected */}
                {(resumeFile || backgroundImageFile || profileImageFile) && (
                  <div className="mt-6 flex justify-end">
                    <Button
                      variant="primary"
                      onClick={handleSaveChanges}
                      disabled={loading}
                      className="bg-black hover:bg-gray-900"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full bg-gray-100 min-h-screen">
      <div
        className="w-full h-32 bg-gray-300 relative bg-cover bg-center cursor-pointer"
        style={{ backgroundImage: `url(${profileData.backgroundImageUrl})` }}
        onClick={handleBackgroundImageClick}
      >
        <input id="backgroundImageUpload" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'backgroundImage')} />
        {!profileData.backgroundImageUrl && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gray-200 bg-opacity-50">
            <FiUploadCloud className="w-8 h-8 mr-2" />
            <span>Upload Background Image</span>
          </div>
        )}
      </div>
      <div className="bg-white pb-4">
        <div className="relative px-4">
          <div className="absolute -top-16 left-4 cursor-pointer" onClick={handleProfileImageClick}>
            <div className="relative w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white overflow-hidden">
              {profileData.profileImageUrl ? (
                <img src={profileData.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <FiUploadCloud className="h-8 w-8 mb-1" />
                  <span className="text-xs">Upload</span>
                </div>
              )}
            </div>
            <input id="profileImageUpload" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'profileImage')} />
          </div>
        </div>
        <div className="px-6 pt-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{profileData.fullName || 'Name Surname'}</h2>
            <p className="text-gray-600">{profileData.email || 'hello@gmail.com'}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Switch to Professional</span>
            <button className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${switchToPro ? 'bg-black' : 'bg-gray-200'}`} role="switch" aria-checked={switchToPro} onClick={() => setSwitchToPro(!switchToPro)}>
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${switchToPro ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
        <div className="flex border-b mt-4">
          {['overview', 'profile', 'resume'].map((tab) => (
            <button key={tab} className={`px-6 py-2 ${activeTab === tab ? 'border-b-2 border-black font-medium' : 'text-gray-500'}`} onClick={() => setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace('resume', 'Resume / CV')}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 flex-1">
        {renderContent()} {/* This renderContent will now display your unchanged UI */}
      </div>
    </div>
  );
}

export default Fresher_Profile;
