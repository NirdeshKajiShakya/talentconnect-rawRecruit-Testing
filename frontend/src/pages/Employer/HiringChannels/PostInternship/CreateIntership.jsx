// import { useState } from 'react';
// import { ChevronDown } from 'lucide-react';

// export default function EmployerPostIntership() {
//   const [formData, setFormData] = useState({
//     employmentType: 'full-time',
//     jobTitle: '',
//     location: '',
//     openings: '',
//     salary: '',
//     jobDescription: '',
//     minEducation: '',
//     fieldOfStudy: '',
//     experience: '',
//     skills: [],
//     certifications: '',
//     workAuthorization: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleOptionSelect = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handlePostJob = () => {
//     console.log('Job Posted:', formData);
//     // Implementation for job posting
//   };

//   const handleCancel = () => {
//     console.log('Form Cancelled');
//     // Implementation for cancel
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-3xl mx-auto p-4">
//         {/* Basic Job Details Section */}
//         <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
//           <h2 className="text-lg font-bold mb-1">Basic Internship Details</h2>
//           <p className="text-sm text-gray-600 mb-4">Help candidates connect with the right recruiter in your company.</p>
          
//           {/* Employment Type */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Employment type <span className="text-red-500">*</span></label>
//             <div className="flex gap-2 flex-wrap">
//               <button
//                 type="button"
//                 className={`px-4 py-1 border rounded-full text-sm transition-colors ${
//                   formData.employmentType === 'full-time' 
//                     ? 'bg-black text-white border-black' 
//                     : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
//                 }`}
//                 onClick={() => handleOptionSelect('employmentType', 'full-time')}
//               >
//                 Full-time
//               </button>
//               <button
//                 type="button"
//                 className={`px-4 py-1 border rounded-full text-sm transition-colors ${
//                   formData.employmentType === 'part-time' 
//                     ? 'bg-black text-white border-black' 
//                     : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
//                 }`}
//                 onClick={() => handleOptionSelect('employmentType', 'part-time')}
//               >
//                 Part-time
//               </button>
//               <button
//                 type="button"
//                 className={`px-4 py-1 border rounded-full text-sm transition-colors ${
//                   formData.employmentType === 'contract' 
//                     ? 'bg-black text-white border-black' 
//                     : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
//                 }`}
//                 onClick={() => handleOptionSelect('employmentType', 'contract')}
//               >
//                 Contract
//               </button>
//             </div>
//           </div>
          
//           {/* Job Title */}
//           <div className="mb-4">
//             <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">Job Title <span className="text-red-500">*</span></label>
//             <input
//               type="text"
//               id="jobTitle"
//               name="jobTitle"
//               placeholder="Enter the Job Title"
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
//               value={formData.jobTitle}
//               onChange={handleInputChange}
//             />
//           </div>
          
//           {/* Preferred Hiring Location */}
//           <div className="mb-4">
//             <label htmlFor="location" className="block text-sm font-medium mb-2">Preferred Hiring Location <span className="text-red-500">*</span></label>
//             <div className="relative">
//               <select 
//                 id="location" 
//                 name="location"
//                 className="w-full p-2 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:ring-2 focus:ring-black focus:border-transparent"
//                 value={formData.location}
//                 onChange={handleInputChange}
//               >
//                 <option value="" disabled>Select location type</option>
//                 <option value="remote">Remote</option>
//                 <option value="onsite">On-site</option>
//                 <option value="hybrid">Hybrid</option>
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//             </div>
//           </div>
          
//           {/* No. of Openings */}
//           <div className="mb-4">
//             <label htmlFor="openings" className="block text-sm font-medium mb-2">No. of Openings <span className="text-red-500">*</span></label>
//             <input
//               type="number"
//               id="openings"
//               name="openings"
//               placeholder="Ex. 5"
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
//               value={formData.openings}
//               onChange={handleInputChange}
//               min="1"
//             />
//           </div>
          
//           {/* Monthly In-hand Salary */}
//           <div className="mb-4">
//             <label htmlFor="salary" className="block text-sm font-medium mb-2">Monthly In-hand Salary <span className="text-red-500">*</span></label>
//             <div className="flex">
//               <div className="relative w-20">
//                 <select 
//                   id="currency" 
//                   name="currency"
//                   className="w-full h-full pl-3 pr-6 py-2 border border-gray-300 rounded-l-md appearance-none bg-white focus:ring-2 focus:ring-black focus:border-transparent"
//                 >
//                   <option value="USD">USD</option>
//                   <option value="EUR">EUR</option>
//                   <option value="GBP">GBP</option>
//                 </select>
//                 <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={12} />
//               </div>
//               <input
//                 type="text"
//                 name="salary"
//                 placeholder="Enter amount"
//                 className="flex-1 p-2 border border-l-0 border-gray-300 rounded-r-md focus:ring-2 focus:ring-black focus:border-transparent"
//                 value={formData.salary}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
          
//           {/* Job Info / Job Description */}
//           <div className="mb-4">
//             <label htmlFor="jobDescription" className="block text-sm font-medium mb-2">Job Info / Job Description <span className="text-red-500">*</span></label>
//             <textarea
//               id="jobDescription"
//               name="jobDescription"
//               placeholder="Describe the job responsibilities and requirements..."
//               className="w-full p-2 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-black focus:border-transparent"
//               value={formData.jobDescription}
//               onChange={handleInputChange}
//             ></textarea>
//           </div>
//         </div>
        
//         {/* Selection Criteria Section */}
//         <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
//           <h2 className="text-lg font-bold mb-1">Selection Criteria</h2>
//           <p className="text-sm text-gray-600 mb-4">Outline the steps involved in assessing applicants to ensure the best fit for the role.</p>
          
//           {/* Minimum Education */}
//           <div className="mb-4">
//             <label htmlFor="minEducation" className="block text-sm font-medium mb-2">Minimum Education</label>
//             <div className="relative">
//               <select 
//                 id="minEducation" 
//                 name="minEducation"
//                 className="w-full p-2 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:ring-2 focus:ring-black focus:border-transparent"
//                 value={formData.minEducation}
//                 onChange={handleInputChange}
//               >
//                 <option value="" disabled>Select education level</option>
//                 <option value="high-school">High School</option>
//                 <option value="bachelors">Bachelor's Degree</option>
//                 <option value="masters">Master's Degree</option>
//                 <option value="phd">PhD</option>
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//             </div>
//           </div>
          
//           {/* Preferred Field of Study */}
//           <div className="mb-4">
//             <label htmlFor="fieldOfStudy" className="block text-sm font-medium mb-2">Preferred Field of Study</label>
//             <div className="relative">
//               <select 
//                 id="fieldOfStudy" 
//                 name="fieldOfStudy"
//                 className="w-full p-2 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:ring-2 focus:ring-black focus:border-transparent"
//                 value={formData.fieldOfStudy}
//                 onChange={handleInputChange}
//               >
//                 <option value="" disabled>Select field of study</option>
//                 <option value="computer-science">Computer Science</option>
//                 <option value="engineering">Engineering</option>
//                 <option value="business">Business</option>
//                 <option value="arts">Arts</option>
//                 <option value="sciences">Sciences</option>
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//             </div>
//           </div>
          
//           {/* Years of Experience */}
//           <div className="mb-4">
//             <label htmlFor="experience" className="block text-sm font-medium mb-2">Years of Experience</label>
//             <div className="relative">
//               <select 
//                 id="experience" 
//                 name="experience"
//                 className="w-full p-2 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:ring-2 focus:ring-black focus:border-transparent"
//                 value={formData.experience}
//                 onChange={handleInputChange}
//               >
//                 <option value="" disabled>Select experience range</option>
//                 <option value="0-1">0-1 years</option>
//                 <option value="1-3">1-3 years</option>
//                 <option value="3-5">3-5 years</option>
//                 <option value="5-10">5-10 years</option>
//                 <option value="10+">10+ years</option>
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//             </div>
//           </div>
          
//           {/* Skills */}
//           <div className="mb-4">
//           <label htmlFor="skills" className="block text-sm font-medium mb-2">Skills <span className="text-red-500">*</span></label>
//           <div className="relative">
//             <select 
//               id="skills" 
//               name="skills"
//               className="w-full p-2 border border-gray-300 rounded appearance-none bg-white pr-10"
//               value={formData.skills}
//               onChange={handleInputChange}
//             >
//               <option value="" disabled>Multiple select</option>
//               <option value="javascript">JavaScript</option>
//               <option value="react">React</option>
//               <option value="vue">Vue</option>
//               <option value="angular">Angular</option>
//               <option value="node">Node.js</option>
//             </select>
//             <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//           </div>
//         </div>
          
//           {/* Certifications */}
//           <div className="mb-4">
//             <label htmlFor="certifications" className="block text-sm font-medium mb-2">Certifications (if any)</label>
//             <div className="relative">
//               <select 
//                 id="certifications" 
//                 name="certifications"
//                 className="w-full p-2 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:ring-2 focus:ring-black focus:border-transparent"
//                 value={formData.certifications}
//                 onChange={handleInputChange}
//               >
//                 <option value="" disabled>Select certification</option>
//                 <option value="aws">AWS Certified</option>
//                 <option value="azure">Microsoft Azure</option>
//                 <option value="google-cloud">Google Cloud</option>
//                 <option value="cisco">Cisco</option>
//                 <option value="pmp">PMP</option>
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//             </div>
//           </div>
          
//           {/* Work Authorization Requirement */}
//           <div className="mb-4">
//             <label htmlFor="workAuthorization" className="block text-sm font-medium mb-2">Work Authorization Requirement</label>
//             <div className="relative">
//               <select 
//                 id="workAuthorization" 
//                 name="workAuthorization"
//                 className="w-full p-2 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:ring-2 focus:ring-black focus:border-transparent"
//                 value={formData.workAuthorization}
//                 onChange={handleInputChange}
//               >
//                 <option value="" disabled>Select authorization type</option>
//                 <option value="citizens">Citizens Only</option>
//                 <option value="permanent-residents">Permanent Residents</option>
//                 <option value="work-visa">Work Visa Holders</option>
//                 <option value="any">Any</option>
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//             </div>
//           </div>
//         </div>
        
//         {/* Action Buttons */}
//         <div className="flex justify-end gap-4 pb-6">
//           <button
//             type="button"
//             onClick={handleCancel}
//             className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             onClick={handlePostJob}
//             className="px-6 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
//           >
//             Post Your Job
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import axios from 'axios';

export default function EmployerPostIntership() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    description: '',
    
    employmentType: 'Full-time', 
    workMode: 'On-site',
    location: [],
    minPackage: {
      currency: 'USD',
      amount: ''
    },
    numberOfOpenings: '',
    minEducation: '',
    yearsOfExperience: '',
    skills: [],
    certifications: [],
    workAuthorization: '',
    studentStreams: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const skillsDropdownRef = useRef(null);

  const educationOptions = ["High School", "Bachelor's Degree", "Master's Degree", "PhD", "Diploma", "Other"];
  const fieldOfStudyOptions = ["Computer Science", "Engineering", "Business", "Arts", "Sciences", "Mathematics", "Medicine", "Law", "Other"];
  const experienceOptions = ["0-1 years", "1-3 years", "3-5 years", "5-10 years", "10+ years"];
  const certificationOptions = ["AWS Certified", "Microsoft Certified", "Google Cloud Certified", "Cisco Certified", "PMP", "Other"];
  const workAuthOptions = ["Citizens Only", "Permanent Residents", "Work Visa Holders", "Any"];
  const allSkills = ["JavaScript", "React", "Vue", "Angular", "Node.js", "Python", "Java", "C++", "SQL", "MongoDB"];
  const filteredSkills = allSkills.filter(skill => skill.toLowerCase().includes(skillInput.toLowerCase()));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (skillsDropdownRef.current && !skillsDropdownRef.current.contains(event.target)) {
        setShowSkillsDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSalaryChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, minPackage: { ...prev.minPackage, [name]: value } }));
  };

  const addSkill = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
    setSkillInput('');
  };

  const removeSkill = (index) => {
    setFormData(prev => {
      const newSkills = [...prev.skills];
      newSkills.splice(index, 1);
      return { ...prev, skills: newSkills };
    });
  };

  const handleSkillInputKeyDown = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      addSkill(skillInput.trim());
    }
  };

  const handleSelectSkill = (skill) => {
    addSkill(skill);
    setShowSkillsDropdown(false);
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // The payload no longer needs any corrections, as it now sends capitalized employmentType
      const payload = {
        jobTitle: formData.jobTitle.trim(),
        description: formData.description.trim(), 
        location: formData.location, // Backend now expects an array as per your schema
        employmentType: formData.employmentType, 
        workMode: formData.workMode,
        minPackage: {
          currency: formData.minPackage.currency,
          amount: parseFloat(formData.minPackage.amount)
        }, 
        numberOfOpenings: parseInt(formData.numberOfOpenings, 10) || 0,
        minEducation: formData.minEducation,
        yearsOfExperience: formData.yearsOfExperience,
        skills: formData.skills,
        certifications: formData.certifications,
        workAuthorization: formData.workAuthorization,
        studentStreams: formData.studentStreams,
      };

      if (!payload.jobTitle || !payload.description) {
          alert('Please fill all required fields: Title and Description.');
          setIsSubmitting(false);
          return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_Backend_URL}/api/employer/hiring-channel/create-internship-posting`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          withCredentials: true
        }
      );

      alert("Internship posted successfully!");
      setFormData({
        jobTitle: '',
        description: '',
        employmentType: 'Full-time',
        workMode: 'On-site',
        location: [],
        minPackage: { currency: 'USD', amount: '' },
        numberOfOpenings: '',
        minEducation: '',
        yearsOfExperience: '',
        skills: [],
        certifications: [],
        workAuthorization: '',
        studentStreams: []
      });

    } catch (error) {
      console.error("Detailed error:", error);
      alert(`Error posting job: ${error.response?.data?.error || error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
        jobTitle: '',
        description: '',
        employmentType: 'Full-time',
        workMode: 'On-site',
        location: [],
        minPackage: { currency: 'USD', amount: '' },
        numberOfOpenings: '',
        minEducation: '',
        yearsOfExperience: '',
        skills: [],
        certifications: [],
        workAuthorization: '',
        studentStreams: []
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
          <h2 className="text-lg font-bold mb-1">Basic Intership Details</h2>
          <p className="text-sm text-gray-600 mb-4">Help candidates connect with the right recruiter in your company.</p>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Employment type <span className="text-red-500">*</span></label>
            <div className="flex gap-2 flex-wrap">
             
              <button type="button" className={`px-4 py-1 border rounded-full text-sm transition-colors ${formData.employmentType === 'Full-time' ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}`} onClick={() => handleOptionSelect('employmentType', 'Full-time')}>Full-time</button>
              <button type="button" className={`px-4 py-1 border rounded-full text-sm transition-colors ${formData.employmentType === 'Part-time' ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}`} onClick={() => handleOptionSelect('employmentType', 'Part-time')}>Part-time</button>
              <button type="button" className={`px-4 py-1 border rounded-full text-sm transition-colors ${formData.employmentType === 'Contract' ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}`} onClick={() => handleOptionSelect('employmentType', 'Contract')}>Contract</button>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">Job Title <span className="text-red-500">*</span></label>
            <input type="text" id="jobTitle" name="jobTitle" placeholder="Enter the Job Title" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent" value={formData.jobTitle} onChange={handleInputChange} />
          </div>

          <div className="mb-4">
            <label htmlFor="workMode" className="block text-sm font-medium mb-2">Work Mode <span className="text-red-500">*</span></label>
            <div className="relative">
              <select id="workMode" name="workMode" className="w-full p-2 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:ring-2 focus:ring-black focus:border-transparent" value={formData.workMode} onChange={handleInputChange}>
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium mb-2">Location <span className="text-red-500">*</span></label>
            <input type="text" id="location" name="location" placeholder="Enter job location(s), comma separated" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent" value={formData.location.join(', ')} onChange={(e) => { const locations = e.target.value.split(',').map(loc => loc.trim()).filter(Boolean); setFormData(prev => ({ ...prev, location: locations })); }} />
          </div>

          <div className="mb-4">
            <label htmlFor="minPackage.amount" className="block text-sm font-medium mb-2">Salary <span className="text-red-500">*</span></label>
            <div className="flex">
              <div className="relative w-20">
                <select id="minPackage.currency" name="currency" value={formData.minPackage.currency} onChange={handleSalaryChange} className="w-full h-full pl-3 pr-6 py-2 border border-gray-300 rounded-l-md appearance-none bg-white focus:ring-2 focus:ring-black focus:border-transparent">
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={12} />
              </div>
              <input type="number" name="amount" placeholder="Enter amount" className="flex-1 p-2 border border-l-0 border-gray-300 rounded-r-md focus:ring-2 focus:ring-black focus:border-transparent" value={formData.minPackage.amount} onChange={handleSalaryChange} step="0.01" min="0" />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="numberOfOpenings" className="block text-sm font-medium mb-2">No. of Openings <span className="text-red-500">*</span></label>
            <input type="number" id="numberOfOpenings" name="numberOfOpenings" placeholder="Ex. 5" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent" value={formData.numberOfOpenings} onChange={handleInputChange} min="1" />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium mb-2">Job Description <span className="text-red-500">*</span></label>
            <textarea id="description" name="description" placeholder="Describe the job responsibilities and requirements..." className="w-full p-2 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-black focus:border-transparent" value={formData.description} onChange={handleInputChange}></textarea>
          </div>
        </div>



        {/* Selection Criteria Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
          <h2 className="text-lg font-bold mb-1">Selection Criteria</h2>
          <p className="text-sm text-gray-600 mb-4">Outline the steps involved in assessing applicants to ensure the best fit for the role.</p>

          {/* Minimum Education */}
          <div className="mb-4">
            <label htmlFor="minEducation" className="block text-sm font-medium mb-2">Minimum Education</label>
            <div className="relative">
              <select
                id="minEducation"
                name="minEducation"
                className="w-full p-2 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:ring-2 focus:ring-black focus:border-transparent"
                value={formData.minEducation}
                onChange={handleInputChange}
              >
                <option value="">Select education level</option>
                {educationOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>

          {/* Preferred Field of Study */}
          <div className="mb-4">
            <label htmlFor="studentStreams" className="block text-sm font-medium mb-2">Preferred Field of Study</label>
            <div className="relative">
              <select
                id="studentStreams"
                name="studentStreams"
                className="w-full p-2 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:ring-2 focus:ring-black focus:border-transparent"
                value={formData.studentStreams[0] || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    studentStreams: value ? [value] : []
                  }));
                }}
              >
                <option value="">Select field of study</option>
                {fieldOfStudyOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>

          {/* Years of Experience */}
          <div className="mb-4">
            <label htmlFor="yearsOfExperience" className="block text-sm font-medium mb-2">Years of Experience</label>
            <div className="relative">
              <select
                id="yearsOfExperience"
                name="yearsOfExperience"
                className="w-full p-2 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:ring-2 focus:ring-black focus:border-transparent"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
              >
                <option value="">Select experience range</option>
                {experienceOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>

          {/* Skills */}
          <div className="mb-4" ref={skillsDropdownRef}>
            <label htmlFor="skills" className="block text-sm font-medium mb-2">Skills</label>
            <div className="relative">
              <div
                className="w-full p-2 border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-black focus-within:border-transparent cursor-text"
                onClick={() => setShowSkillsDropdown(true)}
              >
                {/* Display selected skills as tags */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="bg-gray-100 px-2 py-1 rounded flex items-center">
                      {skill}
                      <button
                        type="button"
                        className="ml-2 text-gray-500 hover:text-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSkill(index);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                {/* Skill input field */}
                <input
                  type="text"
                  placeholder="Type a skill and press Enter..."
                  className="w-full p-1 outline-none"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillInputKeyDown}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                size={16}
                onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
              />

              {/* Skills dropdown */}
              {showSkillsDropdown && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {filteredSkills.length > 0 ? (
                    filteredSkills.map((skill, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelectSkill(skill)}
                      >
                        {skill}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">
                      No matching skills found
                    </div>
                  )}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Type to search skills or select from dropdown</p>
          </div>

          {/* Certifications */}
          <div className="mb-4">
            <label htmlFor="certifications" className="block text-sm font-medium mb-2">Certifications (if any)</label>
            <div className="relative">
              <select
                id="certifications"
                name="certifications"
                className="w-full p-2 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:ring-2 focus:ring-black focus:border-transparent"
                value={formData.certifications[0] || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    certifications: value ? [value] : []
                  }));
                }}
              >
                <option value="">Select certification</option>
                {certificationOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>

          {/* Work Authorization Requirement */}
          <div className="mb-4">
            <label htmlFor="workAuthorization" className="block text-sm font-medium mb-2">Work Authorization Requirement</label>
            <div className="relative">
              <select
                id="workAuthorization"
                name="workAuthorization"
                className="w-full p-2 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:ring-2 focus:ring-black focus:border-transparent"
                value={formData.workAuthorization}
                onChange={handleInputChange}
              >
                <option value="">Select authorization type</option>
                {workAuthOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pb-6">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePostJob}
            disabled={isSubmitting}
            className="px-6 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Posting...' : 'Post Your Job'}
          </button>
        </div>
      </div>
    </div>
  );
}