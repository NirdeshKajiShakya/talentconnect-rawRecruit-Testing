// import { useState } from 'react';
// import { Mail, Phone, Upload, Globe, Linkedin } from 'lucide-react';

// export default function CompanyProfileForm() {
//   const [activeTab, setActiveTab] = useState('Profile');
  
//   return (
//     <div className="flex flex-col w-full bg-gray-50 min-h-screen">
  
      
//       {/* Main Content */}
//       <div className="container mx-auto py-6 px-4">
//         {/* About Section */}
//         <div className="mb-6">
//           <h2 className="text-xl font-bold mb-2">About</h2>
//           <p className="text-gray-600 mb-6">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
//           </p>
//         </div>
        
//         {/* Main Form Sections */}
//         <div className="bg-white border rounded-md">
//           {/* Company Details Section */}
//           <div className="border-b">
//             <div className="grid md:grid-cols-12 gap-4 p-6">
//               <div className="md:col-span-3">
//                 <h3 className="font-bold mb-2">Company Details</h3>
//                 <p className="text-sm text-gray-600">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
//                 </p>
//               </div>
              
//               <div className="md:col-span-9">
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block mb-1 text-sm font-medium">
//                       Company Name <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <select className="w-full border border-gray-300 p-2 pr-8 rounded appearance-none">
//                         <option>Placeholder</option>
//                       </select>
//                       <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                         <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                         </svg>
//                       </div>
//                     </div>
//                     <div className="mt-1">
//                       <a href="#" className="text-indigo-600 text-sm">Register Your Company</a>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block mb-1 text-sm font-medium">
//                       Description <span className="text-red-500">*</span>
//                     </label>
//                     <textarea 
//                       className="w-full border border-gray-300 p-2 rounded" 
//                       rows="4"
//                       placeholder="Type your message..."
//                     ></textarea>
//                   </div>
                  
//                   <div>
//                     <label className="block mb-1 text-sm font-medium">
//                       Company Type <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <select className="w-full border border-gray-300 p-2 pr-8 rounded appearance-none">
//                         <option>Placeholder</option>
//                       </select>
//                       <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                         <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block mb-1 text-sm font-medium">
//                       Industry Type <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <select className="w-full border border-gray-300 p-2 pr-8 rounded appearance-none">
//                         <option>Placeholder</option>
//                       </select>
//                       <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                         <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block mb-1 text-sm font-medium">
//                       Number of Employees <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <select className="w-full border border-gray-300 p-2 pr-8 rounded appearance-none">
//                         <option>Placeholder</option>
//                       </select>
//                       <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                         <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block mb-1 text-sm font-medium">
//                       Established Year <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <select className="w-full border border-gray-300 p-2 pr-8 rounded appearance-none">
//                         <option>Placeholder</option>
//                       </select>
//                       <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                         <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block mb-1 text-sm font-medium">
//                       Contact Number <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                         <Phone size={16} className="text-gray-500" />
//                       </div>
//                       <input 
//                         type="text" 
//                         className="w-full border border-gray-300 p-2 pl-10 rounded"
//                         placeholder="1234567890"
//                       />
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block mb-1 text-sm font-medium">
//                       Alternate Number <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                         <Phone size={16} className="text-gray-500" />
//                       </div>
//                       <input 
//                         type="text" 
//                         className="w-full border border-gray-300 p-2 pl-10 rounded"
//                         placeholder="1234567890"
//                       />
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block mb-1 text-sm font-medium">
//                       Company Location <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <select className="w-full border border-gray-300 p-2 pr-8 rounded appearance-none">
//                         <option>Placeholder</option>
//                       </select>
//                       <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                         <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block mb-1 text-sm font-medium">State</label>
//                       <div className="relative">
//                         <select className="w-full border border-gray-300 p-2 pr-8 rounded appearance-none">
//                           <option>Placeholder</option>
//                         </select>
//                         <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                           <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                           </svg>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <label className="block mb-1 text-sm font-medium">City</label>
//                       <div className="relative">
//                         <select className="w-full border border-gray-300 p-2 pr-8 rounded appearance-none">
//                           <option>Placeholder</option>
//                         </select>
//                         <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                           <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                           </svg>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <label className="block mb-1 text-sm font-medium">Country</label>
//                       <div className="relative">
//                         <select className="w-full border border-gray-300 p-2 pr-8 rounded appearance-none">
//                           <option>Placeholder</option>
//                         </select>
//                         <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                           <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                           </svg>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <label className="block mb-1 text-sm font-medium">Pincode</label>
//                       <input 
//                         type="text" 
//                         className="w-full border border-gray-300 p-2 rounded"
//                         placeholder="Placeholder"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-end p-4 ">
//               <button className="bg-black text-white px-6 py-2">Edit</button>
//             </div>
//           </div>
          
//           {/* Employer Details Section */}
        
          
//           {/* Hiring Preferences Section */}
//           <div className="border-b">
//             <div className="grid md:grid-cols-12 gap-4 p-6">
//               <div className="md:col-span-3">
//                 <h3 className="font-bold mb-2">Hiring Preferences</h3>
//                 <p className="text-sm text-gray-600">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
//                 </p>
//               </div>
              
//               <div className="md:col-span-9">
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block mb-1 text-sm font-medium">Job Roles You Hire For</label>
//                     <div className="relative">
//                       <select className="w-full border border-gray-300 p-2 pr-8 rounded appearance-none">
//                         <option>Multiple-select</option>
//                       </select>
//                       <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                         <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block mb-1 text-sm font-medium">Preferred Hiring Locations</label>
//                     <div className="relative">
//                       <select className="w-full border border-gray-300 p-2 pr-8 rounded appearance-none">
//                         <option>Multiple-select</option>
//                       </select>
//                       <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                         <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block mb-1 text-sm font-medium">Looking for</label>
//                     <div className="flex gap-2">
//                       <button className="border border-gray-300 px-4 py-1 text-sm">Job</button>
//                       <button className="bg-black text-white px-4 py-1 text-sm">Internship</button>
//                       <button className="border border-gray-300 px-4 py-1 text-sm">Both</button>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block mb-1 text-sm font-medium">Employment type</label>
//                     <div className="flex gap-2">
//                       <button className="border border-gray-300 px-4 py-1 text-sm">Part-time</button>
//                       <button className="bg-black text-white px-4 py-1 text-sm">Full-time</button>
//                       <button className="border border-gray-300 px-4 py-1 text-sm">Contract</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-end p-4 ">
//               <button className="bg-black text-white px-6 py-2">Edit</button>
//             </div>
//           </div>
          
//           {/* Company Verification & KYC Section */}
//           <div className="border-b">
//             <div className="grid md:grid-cols-12 gap-4 p-6">
//               <div className="md:col-span-3">
//                 <h3 className="font-bold mb-2">Company Verification & KYC</h3>
//                 <p className="text-sm text-gray-600">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
//                 </p>
//               </div>
              
//               <div className="md:col-span-9">
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block mb-1 text-sm font-medium">Upload Verification Documents (Choose any one for verification)</label>
//                     <div className="relative">
//                       <select className="w-full border border-gray-300 p-2 pr-8 rounded appearance-none">
//                         <option>Multiple-select</option>
//                       </select>
//                       <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                         <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                         </svg>
//                       </div>
//                     </div>
//                     <div className="mt-2 flex justify-center">
//                       <button className="border border-gray-300 px-4 py-1 text-sm flex items-center gap-1">
//                         <Upload size={14} />
//                         Upload Document
//                       </button>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block mb-1 text-sm font-medium">TAN (Tax Deduction and Collection Account Number)</label>
//                     <input 
//                       type="text" 
//                       className="w-full border border-gray-300 p-2 rounded"
//                       placeholder="10-digit alphanumeric"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block mb-1 text-sm font-medium">GST Number</label>
//                     <input 
//                       type="text" 
//                       className="w-full border border-gray-300 p-2 rounded"
//                       placeholder="15-digit alphanumeric"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block mb-1 text-sm font-medium">Company Registration Number (CIN/LLPIN)</label>
//                     <input 
//                       type="text" 
//                       className="w-full border border-gray-300 p-2 rounded"
//                       placeholder="21-digit alphanumeric"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-end p-4 ">
//               <button className="bg-black text-white px-6 py-2">Edit</button>
//             </div>
//           </div>
          
//           {/* Company Profiles Section */}
//           <div>
//             <div className="grid md:grid-cols-12 gap-4 p-6">
//               <div className="md:col-span-3">
//                 <h3 className="font-bold mb-2">Company Profiles</h3>
//                 <p className="text-sm text-gray-600">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
//                 </p>
//               </div>
              
//               <div className="md:col-span-9">
//                 <div className="space-y-4">
//                   <div>
//                     <label className="flex items-center gap-2 mb-1 text-sm font-medium">
//                       <Linkedin size={18} className="text-blue-700" />
//                       LinkedIn
//                     </label>
//                     <div className="flex">
//                       <div className="bg-gray-100 border border-gray-300 p-2 rounded-l">https://</div>
//                       <input 
//                         type="text" 
//                         className="w-full border border-gray-300 p-2 rounded-r"
//                         placeholder="www.resume.io"
//                       />
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="flex items-center gap-2 mb-1 text-sm font-medium">
//                       <Globe size={18} className="text-gray-700" />
//                       Website
//                     </label>
//                     <div className="flex">
//                       <div className="bg-gray-100 border border-gray-300 p-2 rounded-l">https://</div>
//                       <input 
//                         type="text" 
//                         className="w-full border border-gray-300 p-2 rounded-r"
//                         placeholder="www.resume.io"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-end p-4">
//               <button className="bg-black text-white px-6 py-2">Edit</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Upload, Globe, Linkedin, X } from 'lucide-react'; // Added X for remove tag icon
import axios from 'axios';

export default function CompanyProfileForm({ profileData, onProfileUpdate }) {
  const [formData, setFormData] = useState({
    companyDetails: {
      companyName: '',
      description: '',
      companyType: '',
      industryType: '',
      numberOfEmployees: '',
      establishedYear: '',
      companyLinkedin: '',
      websiteUrl: '',
      phoneNumber: '',
      alternatePhoneNumber: '',
      companyLocation: '',
      state: '',
      city: '',
      country: '',
      pincode: '',
      collegeWebsite: '',
      linkedinUrl: ''
    },
    hiringPreferences: {
      hiringPara: '',
      jobRoles: [],
      hiringLocations: [],
      lookingFor: '',
      employmentType: []
    },
    kycDetails: {
      kycDocuments: [],
      TAN: '',
      GSTNumber: '',
      companyRegistrationNumber: '',
      kycStatus: '',
      photoVerificationStatus: '',
      aadharNumber: '',
      nameOnAadharCard: '',
      addressLabel: '',
      address: '',
      country: '',
      state: '',
      city: '',
      pincode: '',
      GSTIN: ''
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [kycFiles, setKycFiles] = useState([]);

  // Refs for custom file input to trigger click programmatically
  const kycFileInputRef = useRef(null);

  useEffect(() => {
    if (profileData) {
      setFormData({
        companyDetails: profileData.companyDetails || {},
        hiringPreferences: profileData.hiringPreferences || {},
        kycDetails: {
          ...profileData.kycDetails || {},
          kycDocuments: profileData.kycDetails?.kycDocuments || [] // Ensure kycDocuments is an array
        }
      });
    }
  }, [profileData]);

  const handleChange = (e, section, field) => {
    const { value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: checked
            ? [...(prev[section][field] || []), value]
            : (prev[section][field] || []).filter(item => item !== value)
        }
      }));
    } else if (type === 'select-multiple') {
      const selectedOptions = Array.from(e.target.options)
        .filter(option => option.selected)
        .map(option => option.value);
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: selectedOptions
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    }
  };

  const handleKycFileChange = (e) => {
    setKycFiles(Array.from(e.target.files));
  };

  const handleRemoveKycFile = (indexToRemove) => {
    setKycFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleEditToggle = () => {
    setIsEditing(prev => !prev);
  };
  const backendUrl = import.meta.env.VITE_Backend_URL || 'http://localhost:5000';
  const handleSubmit = async () => {
    try {
      const dataToSubmit = new FormData();
      dataToSubmit.append('companyDetails', JSON.stringify(formData.companyDetails));
      dataToSubmit.append('hiringPreferences', JSON.stringify(formData.hiringPreferences));

      // Append KYC files
      kycFiles.forEach(file => {
        dataToSubmit.append('kycDocuments', file);
      });

      // Prepare kycDetails (excluding kycDocuments as they are handled separately)
      const kycDetailsWithoutDocs = { ...formData.kycDetails };
      delete kycDetailsWithoutDocs.kycDocuments; // Do not send old URLs back
      dataToSubmit.append('kycDetails', JSON.stringify(kycDetailsWithoutDocs));

      const response = await axios.put(`${backendUrl}/api/companyDashboard/updateInformation`, dataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Company profile updated successfully!');
      onProfileUpdate(); // Re-fetch profile data to update parent component
      setIsEditing(false); // Exit editing mode
      setKycFiles([]); // Clear selected KYC files
    } catch (error) {
      console.error('Error updating company profile:', error);
      alert('Failed to update company profile. Please try again.');
    }
  };

  const renderInputField = (section, field, label, type = 'text', placeholder = '', options = [], isRequired = false) => {
    const value = formData[section]?.[field] || '';
    const inputProps = {
      className: "w-full border border-gray-300 p-2 rounded",
      value: value,
      onChange: (e) => handleChange(e, section, field),
      readOnly: !isEditing,
      disabled: !isEditing
    };

    if (type === 'textarea') {
      return (
        <div>
          <label className="block mb-1 text-sm font-medium">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </label>
          <textarea {...inputProps} rows="4" placeholder={placeholder}></textarea>
        </div>
      );
    } else if (type === 'select') {
      return (
        <div>
          <label className="block mb-1 text-sm font-medium">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </label>
          <div className="relative">
            <select {...inputProps} className={`${inputProps.className} pr-8 appearance-none`}>
              <option value="">{placeholder}</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      );
    } else if (type === 'multiselect') {
      return (
        <div>
          <label className="block mb-1 text-sm font-medium">{label}</label>
          <div className="relative">
            <select
              {...inputProps}
              multiple
              className={`${inputProps.className} pr-8 appearance-none h-auto min-h-[40px]`}
              value={value || []} // Ensure value is an array for multiple select
              onChange={(e) => handleChange(e, section, field)}
            >
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {value && value.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">Selected: {value.join(', ')}</p>
          )}
        </div>
      );
    } else if (type === 'custom-multiselect') {
      const selectedValues = formData[section]?.[field] || [];
      return (
        <div>
          <label className="block mb-1 text-sm font-medium">{label}</label>
          <div className="relative border border-gray-300 rounded p-2 flex flex-wrap gap-2 items-center min-h-[42px]">
            {selectedValues.length > 0 ? (
              selectedValues.map((val) => {
                const optionLabel = options.find(opt => opt.value === val)?.label || val;
                return (
                  <span key={val} className="flex items-center bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">
                    {optionLabel}
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleChange({ target: { value: val, type: 'checkbox', checked: false } }, section, field)}
                        className="ml-1 text-gray-600 hover:text-gray-800"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </span>
                );
              })
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
            <select
              multiple
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              value={selectedValues}
              onChange={(e) => handleChange(e, section, field)}
              disabled={!isEditing}
            >
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }
    else if (type === 'radio-group') {
      return (
        <div>
          <label className="block mb-1 text-sm font-medium">{label}</label>
          <div className="flex gap-2">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`border border-gray-300 px-4 py-1 text-sm ${value === opt.value && isEditing ? 'bg-black text-white' : 'bg-white text-black'} ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
                onClick={() => isEditing && handleChange({ target: { value: opt.value } }, section, field)}
                disabled={!isEditing}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      );
    } else if (type === 'checkbox-group') {
      return (
        <div>
          <label className="block mb-1 text-sm font-medium">{label}</label>
          <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
              <label key={opt.value} className={`flex items-center border border-gray-300 px-4 py-1 text-sm cursor-pointer ${value.includes(opt.value) && isEditing ? 'bg-black text-white' : 'bg-white text-black'} ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}>
                <input
                  type="checkbox"
                  value={opt.value}
                  checked={(value || []).includes(opt.value)}
                  onChange={(e) => handleChange(e, section, field)}
                  className="hidden"
                  disabled={!isEditing}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <label className="block mb-1 text-sm font-medium">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </label>
          <div className="relative">
            {(label.includes('Number') || label.includes('Phone')) && (
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Phone size={16} className="text-gray-500" />
              </div>
            )}
            {label.includes('LinkedIn') && (
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Linkedin size={16} className="text-blue-700" />
              </div>
            )}
            {label.includes('Website') && (
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Globe size={16} className="text-gray-700" />
              </div>
            )}
            <input
              type={type}
              {...inputProps}
              placeholder={placeholder}
              className={`${inputProps.className} ${label.includes('Number') || label.includes('Phone') || label.includes('LinkedIn') || label.includes('Website') ? 'pl-10' : ''}`}
            />
          </div>
        </div>
      );
    }
  };

  const companyTypeOptions = [
    { value: 'TCS', label: 'TCS' },
    { value: 'Google', label: 'Google' },
    { value: 'Microsoft', label: 'Microsoft' },
  ];

  const industryTypeOptions = [
    { value: 'it', label: 'IT' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
  ];

  const employeeCountOptions = [
    { value: '1-10', label: '1-10' },
    { value: '11-50', label: '11-50' },
    { value: '51-200', label: '51-200' },
    { value: '201-500', label: '201-500' },
    { value: '500+', label: '500+' },
  ];

  const establishedYearOptions = Array.from({ length: 50 }, (_, i) => ({
    value: String(2025 - i),
    label: String(2025 - i)
  }));

  const locationOptions = [
    { value: 'delhi', label: 'Delhi' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'bangalore', label: 'Bangalore' },
  ];

  const jobRoleOptions = [
    { value: 'software_engineer', label: 'Software Engineer' },
    { value: 'data_scientist', label: 'Data Scientist' },
    { value: 'product_manager', label: 'Product Manager' },
    { value: 'hr_manager', label: 'HR Manager' },
    { value: 'marketing_specialist', label: 'Marketing Specialist' },
  ];

  const employmentTypeOptions = [
    { value: 'part-time', label: 'Part-time' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'contract', label: 'Contract' },
  ];


  return (
    <div className="flex flex-col w-full bg-gray-50 min-h-screen">
      <div className="container mx-auto py-6 px-4">
        {/* About Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">About</h2>
          <p className="text-gray-600 mb-6">
            {formData.companyDetails.description || 'No description provided.'}
          </p>
        </div>

        {/* Main Form Sections */}
        <div className="bg-white border rounded-md">
          {/* Company Details Section */}
          <div className="border-b">
            <div className="grid md:grid-cols-12 gap-4 p-6">
              <div className="md:col-span-3">
                <h3 className="font-bold mb-2">Company Details</h3>
                <p className="text-sm text-gray-600">
                  Manage your company's basic information and contact details.
                </p>
              </div>

              <div className="md:col-span-9">
                <div className="space-y-4">
                  {renderInputField('companyDetails', 'companyName', 'Company Name', 'select', 'Select Company', companyTypeOptions, true)}
                  {renderInputField('companyDetails', 'description', 'Description', 'textarea', 'Tell us about your company...', true)}
                  {renderInputField('companyDetails', 'companyType', 'Company Type', 'select', 'Select Type', companyTypeOptions, true)}
                  {renderInputField('companyDetails', 'industryType', 'Industry Type', 'select', 'Select Industry', industryTypeOptions, true)}
                  {renderInputField('companyDetails', 'numberOfEmployees', 'Number of Employees', 'select', 'Select Range', employeeCountOptions, true)}
                  {renderInputField('companyDetails', 'establishedYear', 'Established Year', 'select', 'Select Year', establishedYearOptions, true)}
                  {renderInputField('companyDetails', 'phoneNumber', 'Contact Number', 'tel', '1234567890', [], true)}
                  {renderInputField('companyDetails', 'alternatePhoneNumber', 'Alternate Number', 'tel', '1234567890', [], true)}
                  {renderInputField('companyDetails', 'companyLocation', 'Company Location', 'select', 'Select Location', locationOptions, true)}
                  <div className="grid grid-cols-2 gap-4">
                    {renderInputField('companyDetails', 'state', 'State', 'select', 'Select State', locationOptions)} {/* Use appropriate options */}
                    {renderInputField('companyDetails', 'city', 'City', 'select', 'Select City', locationOptions)} {/* Use appropriate options */}
                    {renderInputField('companyDetails', 'country', 'Country', 'select', 'Select Country', locationOptions)} {/* Use appropriate options */}
                    {renderInputField('companyDetails', 'pincode', 'Pincode', 'text', 'Pincode')}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end p-4 ">
              <button
                className="bg-black text-white px-6 py-2"
                onClick={isEditing ? handleSubmit : handleEditToggle}
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>
          </div>

          {/* Hiring Preferences Section */}

          <div className="border-b">
            <div className="grid md:grid-cols-12 gap-4 p-6">
              <div className="md:col-span-3">
                <h3 className="font-bold mb-2">Hiring Preferences</h3>
                <p className="text-sm text-gray-600">
                  Define your hiring needs and preferred candidate criteria.
                </p>
              </div>

              <div className="md:col-span-9">
                <div className="space-y-4">
                  {renderInputField('hiringPreferences', 'jobRoles', 'Job Roles You Hire For', 'custom-multiselect', 'Multiple-select', jobRoleOptions)}
                  {renderInputField('hiringPreferences', 'hiringLocations', 'Preferred Hiring Locations', 'custom-multiselect', 'Multiple-select', locationOptions)}
                  {renderInputField('hiringPreferences', 'lookingFor', 'Looking for', 'radio-group', '', [
                    { value: 'job', label: 'Job' },
                    { value: 'internship', label: 'Internship' },
                    { value: 'both', label: 'Both' },
                  ])}
                  {renderInputField('hiringPreferences', 'employmentType', 'Employment type', 'checkbox-group', '', employmentTypeOptions)}
                </div>
              </div>
            </div>
            <div className="flex justify-end p-4 ">
              <button
                className="bg-black text-white px-6 py-2"
                onClick={isEditing ? handleSubmit : handleEditToggle}
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>
          </div>

          {/* Company Verification & KYC Section */}
          <div className="border-b">
            <div className="grid md:grid-cols-12 gap-4 p-6">
              <div className="md:col-span-3">
                <h3 className="font-bold mb-2">Company Verification & KYC</h3>
                <p className="text-sm text-gray-600">
                  Upload necessary documents for company verification.
                </p>
              </div>

              <div className="md:col-span-9">
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Upload Verification Documents (Choose any one for verification)</label>
                    <div
                      className="w-full border border-gray-300 p-2 rounded flex justify-between items-center cursor-pointer"
                      onClick={() => isEditing && kycFileInputRef.current.click()}
                    >
                      <span>{kycFiles.length > 0 ? `${kycFiles.length} file(s) selected` : 'Upload Document'}</span>
                      <Upload size={20} className="text-gray-500" />
                    </div>
                    <input
                      type="file"
                      multiple
                      accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                      onChange={handleKycFileChange}
                      className="hidden"
                      ref={kycFileInputRef}
                      disabled={!isEditing}
                    />
                    <div className="mt-2 text-sm text-gray-600">
                      {kycFiles.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {kycFiles.map((file, index) => (
                            <span key={index} className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                              {file.name}
                              {isEditing && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveKycFile(index)}
                                  className="ml-1 text-blue-600 hover:text-blue-800"
                                >
                                  <X size={12} />
                                </button>
                              )}
                            </span>
                          ))}
                        </div>
                      )}
                      {formData.kycDetails.kycDocuments && formData.kycDetails.kycDocuments.length > 0 && kycFiles.length === 0 && (
                        <p>Currently uploaded: {formData.kycDetails.kycDocuments.map((doc, index) => <a key={index} href={doc} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mr-2">Document {index + 1}</a>)}</p>
                      )}
                      {kycFiles.length === 0 && (!formData.kycDetails.kycDocuments || formData.kycDetails.kycDocuments.length === 0) && (
                         <p>No documents selected.</p>
                      )}
                    </div>
                  </div>

                  {renderInputField('kycDetails', 'TAN', 'TAN (Tax Deduction and Collection Account Number)', 'text', '10-digit alphanumeric')}
                  {renderInputField('kycDetails', 'GSTNumber', 'GST Number', 'text', '15-digit alphanumeric')}
                  {renderInputField('kycDetails', 'companyRegistrationNumber', 'Company Registration Number (CIN/LLPIN)', 'text', '21-digit alphanumeric')}
                  {renderInputField('kycDetails', 'aadharNumber', 'Aadhar Number', 'text', 'XXXX-XXXX-XXXX-XXXX')}
                  {renderInputField('kycDetails', 'nameOnAadharCard', 'Name on Aadhar Card', 'text', 'Full name as per Aadhar')}
                  {renderInputField('kycDetails', 'address', 'Registered Address', 'textarea', 'Company\'s registered address')}
                  {renderInputField('kycDetails', 'GSTIN', 'GSTIN', 'text', 'GSTIN')}
                </div>
              </div>
            </div>
            <div className="flex justify-end p-4 ">
              <button
                className="bg-black text-white px-6 py-2"
                onClick={isEditing ? handleSubmit : handleEditToggle}
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>
          </div>

          {/* Company Profiles Section */}
          <div>
            <div className="grid md:grid-cols-12 gap-4 p-6">
              <div className="md:col-span-3">
                <h3 className="font-bold mb-2">Company Profiles</h3>
                <p className="text-sm text-gray-600">
                  Links to your company's social media and website profiles.
                </p>
              </div>

              <div className="md:col-span-9">
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                      <Linkedin size={18} className="text-blue-700" />
                      LinkedIn
                    </label>
                    <div className="flex">
                      <div className="bg-gray-100 border border-gray-300 p-2 rounded-l">https://</div>
                      <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded-r"
                        placeholder="www.linkedin.com/company/your-company"
                        value={formData.companyDetails.companyLinkedin || ''}
                        onChange={(e) => handleChange(e, 'companyDetails', 'companyLinkedin')}
                        readOnly={!isEditing}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                      <Globe size={18} className="text-gray-700" />
                      Website
                    </label>
                    <div className="flex">
                      <div className="bg-gray-100 border border-gray-300 p-2 rounded-l">https://</div>
                      <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded-r"
                        placeholder="www.yourcompany.com"
                        value={formData.companyDetails.websiteUrl || ''}
                        onChange={(e) => handleChange(e, 'companyDetails', 'websiteUrl')}
                        readOnly={!isEditing}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end p-4">
              <button
                className="bg-black text-white px-6 py-2"
                onClick={isEditing ? handleSubmit : handleEditToggle}
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}