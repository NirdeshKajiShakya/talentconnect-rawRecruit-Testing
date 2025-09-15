// import { useState } from 'react';
// import axios from 'axios';
// import { ChevronDown } from 'lucide-react'; // Import ChevronDown for the selects

// export default function OffCampusHiringForm() {
//   // Define initial state
//   const initialState = {
//     venue: '',
//     collegeTypes: '', // Changed to a string to match the select input
//     studentStreams: '', // Changed to a string to match the select input
//     criteria: '', // Renamed to description to match backend schema
//     minPackage: {
//       currency: 'INR',
//       amount: ''
//     },
//     workLocations: '', // Changed to a string to match the select input
//     jobRoles: '', // Changed to a string to match the select input
//     workMode: 'Hybrid',
//     employmentType: 'Full-time',
//     placementStartDate: '',
//     placementEndDate: '',
//     numberOfRounds: '', // Changed to a string to match the select input
//     selectionProcess: '', // Changed to a string to match the select input
//     contactPerson: {
//       name: '',
//       designation: '',
//       email: '',
//       mobile: '',
//       linkedin: '',
//     },
//     minStudents: '',
//   };

//   const [formData, setFormData] = useState(initialState);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // Special handling for date inputs
//     if (name === 'placementStartDate' || name === 'placementEndDate') {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   const handleArrayChange = (e) => {
//     const { name, value } = e.target;
//     // Set the value directly. It will be converted to an array in handleSubmit.
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
  
//   const handlePackageChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       minPackage: {
//         ...formData.minPackage,
//         [name]: value,
//       },
//     });
//   };
  
//   const handleContactChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       contactPerson: {
//         ...formData.contactPerson,
//         [name]: value,
//       },
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem('token') || document.cookie.split('; ').find(row => row.startsWith('jwt='))?.split('=')[1];

//       // Prepare the data for backend, ensuring fields match the schema
//       const submissionData = {
//         venue: formData.venue,
//         // The backend schema expects arrays of strings. We convert the single select value to an array here.
//         collegeTypes: formData.collegeTypes ? [formData.collegeTypes] : [],
//         studentStreams: formData.studentStreams ? [formData.studentStreams] : [],
//         description: formData.criteria, // Mapped 'criteria' to 'description'
//         minPackage: {
//             currency: formData.minPackage.currency,
//             amount: parseFloat(formData.minPackage.amount) // Ensure amount is a number
//         },
//         location: formData.workLocations ? [formData.workLocations] : [], // Mapped 'workLocations' to 'location'
//         jobRoles: formData.jobRoles ? [formData.jobRoles] : [],
//         workMode: formData.workMode,
//         employmentType: formData.employmentType,
//         startDate: formData.placementStartDate, // Mapped 'placementStartDate' to 'startDate'
//         endDate: formData.placementEndDate, // Mapped 'placementEndDate' to 'endDate'
//         rounds: formData.numberOfRounds ? [formData.numberOfRounds] : [], // Mapped 'numberOfRounds' to 'rounds'
//         selectionProcess: formData.selectionProcess ? [formData.selectionProcess] : [],
//         contactPerson: {
//           name: formData.contactPerson.name,
//           designation: formData.contactPerson.designation,
//           email: formData.contactPerson.email,
//           mobile: formData.contactPerson.mobile,
//           linkedin: formData.contactPerson.linkedin,
//         },
//         minimumStudents: formData.minStudents,
//         jobType: "Pool-campus", // Explicitly setting the jobType
//       };

//       const response = await axios.post(
//         `${import.meta.env.VITE_Backend_URL}/api/hiring-channels/pool-campus/college-request`,
//         submissionData,
//         {
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//         }
//       );

//       console.log('Submission response:', response.data);

//       if (response.status === 201) {
//         setSubmitSuccess(true);
//         // Use a modal or a div instead of alert
//         alert('Your pool campus hiring request has been submitted successfully.');
//         setFormData(initialState);
//       }
//     } catch (err) {
//       console.error('Submission error:', err);
//       if (err.response) {
//         setError(err.response.data.message || err.response.data.error || 'Failed to submit form. Please try again.');
//         // Use a modal or a div instead of alert
//         alert(err.response.data.message || err.response.data.error || 'Failed to submit form. Please try again.');
//       } else {
//         setError('Network error. Please check your connection.');
//         alert('Network error. Please check your connection.');
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Enhanced options for all dropdowns (unchanged from your original code)
//   const locations = [
//     'Online',
//     'Bangalore',
//     'Mumbai',
//     'Delhi',
//     'Hyderabad',
//     'Chennai',
//     'Pune',
//     'Kolkata',
//     'Ahmedabad',
//     'Jaipur',
//     'Other'
//   ];

//   const collegeTypes = [
//     'Engineering',
//     'Medical',
//     'Management',
//     'Arts & Science',
//     'Law',
//     'Pharmacy',
//     'Architecture',
//     'Polytechnic',
//     'ITI',
//     'Other'
//   ];

//   const studentStreams = [
//     'Computer Science',
//     'Electronics',
//     'Mechanical',
//     'Civil',
//     'Electrical',
//     'Information Technology',
//     'Biotechnology',
//     'Chemical',
//     'Aerospace',
//     'Automobile',
//     'MBA',
//     'BBA',
//     'B.Com',
//     'B.Sc',
//     'BA',
//     'B.Tech',
//     'M.Tech',
//     'PhD',
//     'Other'
//   ];

//   const workLocations = [
//     'Bangalore',
//     'Mumbai',
//     'Delhi NCR',
//     'Hyderabad',
//     'Chennai',
//     'Pune',
//     'Kolkata',
//     'Ahmedabad',
//     'Jaipur',
//     'Remote',
//     'International',
//     'Multiple Locations',
//     'Other'
//   ];

//   const jobRoles = [
//     'Software Developer',
//     'Data Scientist',
//     'DevOps Engineer',
//     'QA Engineer',
//     'Frontend Developer',
//     'Backend Developer',
//     'Full Stack Developer',
//     'Mobile App Developer',
//     'UI/UX Designer',
//     'Product Manager',
//     'Business Analyst',
//     'Data Analyst',
//     'Machine Learning Engineer',
//     'Cloud Architect',
//     'Network Engineer',
//     'Cyber Security Specialist',
//     'Technical Writer',
//     'Sales Engineer',
//     'Marketing Specialist',
//     'HR Recruiter',
//     'Finance Analyst',
//     'Other'
//   ];

//   const numberOfRoundsOptions = [
//     '1',
//     '2',
//     '3',
//     '4',
//     '5',
//     '6+'
//   ];

//   const selectionProcessOptions = [
//     'Online Test',
//     'Technical Interview',
//     'HR Interview',
//     'Group Discussion',
//     'Case Study',
//     'Presentation',
//     'Coding Challenge',
//     'Aptitude Test',
//     'Psychometric Test',
//     'Combination of above'
//   ];

//   const designationOptions = [
//     'HR Manager',
//     'Technical Recruiter',
//     'Talent Acquisition',
//     'Hiring Manager',
//     'Team Lead',
//     'Department Head',
//     'CEO',
//     'CTO',
//     'Founder',
//     'Other'
//   ];

//   const minimumStudentsOptions = [
//     '1-10',
//     '11-25',
//     '26-50',
//     '51-100',
//     '101-200',
//     '201-500',
//     '500+'
//   ];


//   return (
//     <div className="max-w-4xl mx-auto p-4 font-sans">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row justify-between mb-8">
//         <div className="md:w-1/2">
//           <h1 className="text-3xl font-bold mb-2">Pool Campus Connect:</h1>
//           <h2 className="text-3xl font-bold mb-4">Hire Bigger</h2>
//         </div>
//         <div className="md:w-1/2">
//           <p className="text-sm">
//             Tap into diverse talent from multiple institutions through one powerful drive. <br /> Pool Campus Connect brings students from several colleges together, making it easier for companies to conduct centralized hiring drive that are time-saving, cost-efficient, and great for brand visibility
//           </p>
//         </div>
//       </div>

//       {/* Error message */}
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
//           <span className="block sm:inline">{error}</span>
//         </div>
//       )}

//       {/* Registration Form */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-center mb-4">Register for Pool Campus Hiring</h2>
//         <p className="text-center text-gray-500 mb-6">Fill in the details below to register for the hiring drive</p>

//         <form onSubmit={handleSubmit}>
//           <div className="space-y-4 mb-6">
//             <div>
//               <label className="block mb-1 font-medium">Pool Campus Hiring Venue</label>
//               <div className="relative">
//                 <select
//                   name="venue"
//                   value={formData.venue}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded appearance-none pr-8 bg-white"
//                   required
//                 >
//                   <option value="" disabled>Select location</option>
//                   {locations.map((location, index) => (
//                     <option key={index} value={location}>{location}</option>
//                   ))}
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                   <ChevronDown className="w-4 h-4 text-gray-400" />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Type of College</label>
//               <div className="relative">
//                 <select
//                   name="collegeTypes"
//                   value={formData.collegeTypes}
//                   onChange={handleArrayChange}
//                   className="w-full p-2 border rounded appearance-none pr-8 bg-white"
//                   required
//                 >
//                   <option value="" disabled>Select college type</option>
//                   {collegeTypes.map((type, index) => (
//                     <option key={index} value={type}>{type}</option>
//                   ))}
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                   <ChevronDown className="w-4 h-4 text-gray-400" />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Student Stream / Degree</label>
//               <div className="relative">
//                 <select
//                   name="studentStreams"
//                   value={formData.studentStreams}
//                   onChange={handleArrayChange}
//                   className="w-full p-2 border rounded appearance-none pr-8 bg-white"
//                   required
//                 >
//                   <option value="" disabled>Select stream</option>
//                   {studentStreams.map((stream, index) => (
//                     <option key={index} value={stream}>{stream}</option>
//                   ))}
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                   <ChevronDown className="w-4 h-4 text-gray-400" />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Criteria</label>
//               <textarea
//                 name="criteria" // This will be mapped to 'description'
//                 value={formData.criteria}
//                 onChange={handleChange}
//                 placeholder="Example: Minimum 60% aggregate, No active backlogs, Good communication skills..."
//                 className="w-full p-2 border rounded resize-none h-24"
//                 required
//               ></textarea>
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Minimum Package Offered</label>
//               <div className="flex">
//                 <div className="relative">
//                   <select
//                     name="currency"
//                     value={formData.minPackage.currency}
//                     onChange={handlePackageChange}
//                     className="py-2 px-3 border rounded-l bg-white"
//                   >
//                     <option value="INR">INR</option>
//                     <option value="USD">USD</option>
//                     <option value="EUR">EUR</option>
//                   </select>
//                 </div>
//                 <input
//                   type="number"
//                   name="amount"
//                   value={formData.minPackage.amount}
//                   onChange={handlePackageChange}
//                   placeholder="Enter amount (e.g. 500000)"
//                   className="flex-grow p-2 border border-l-0 rounded-r"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Work Location</label>
//               <div className="relative">
//                 <select
//                   name="workLocations" // This will be mapped to 'location'
//                   value={formData.workLocations}
//                   onChange={handleArrayChange}
//                   className="w-full p-2 border rounded appearance-none pr-8 bg-white"
//                   required
//                 >
//                   <option value="" disabled>Select work location</option>
//                   {workLocations.map((location, index) => (
//                     <option key={index} value={location}>{location}</option>
//                   ))}
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                   <ChevronDown className="w-4 h-4 text-gray-400" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Second section */}
//           <div className="space-y-4">
//             <div>
//               <label className="block mb-1 font-medium">Job Role</label>
//               <div className="relative">
//                 <select
//                   name="jobRoles"
//                   value={formData.jobRoles}
//                   onChange={handleArrayChange}
//                   className="w-full p-2 border rounded appearance-none pr-8 bg-white"
//                   required
//                 >
//                   <option value="" disabled>Select job role</option>
//                   {jobRoles.map((role, index) => (
//                     <option key={index} value={role}>{role}</option>
//                   ))}
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                   <ChevronDown className="w-4 h-4 text-gray-400" />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Work Mode</label>
//               <div className="flex space-x-2">
//                 <div className="inline-flex items-center">
//                   <input
//                     type="radio"
//                     id="hybrid"
//                     name="workMode"
//                     value="Hybrid"
//                     checked={formData.workMode === "Hybrid"}
//                     onChange={handleChange}
//                     className="sr-only"
//                   />
//                   <label
//                     htmlFor="hybrid"
//                     className={`px-4 py-2 text-sm border rounded-md cursor-pointer ${formData.workMode === 'Hybrid' ? 'bg-black text-white' : 'bg-white'}`}
//                   >
//                     Hybrid
//                   </label>
//                 </div>
//                 <div className="inline-flex items-center">
//                   <input
//                     type="radio"
//                     id="onsite"
//                     name="workMode"
//                     value="On-site"
//                     checked={formData.workMode === "On-site"}
//                     onChange={handleChange}
//                     className="sr-only"
//                   />
//                   <label
//                     htmlFor="onsite"
//                     className={`px-4 py-2 text-sm border rounded-md cursor-pointer ${formData.workMode === 'On-site' ? 'bg-black text-white' : 'bg-white'}`}
//                   >
//                     On-site
//                   </label>
//                 </div>
//                 <div className="inline-flex items-center">
//                   <input
//                     type="radio"
//                     id="remote"
//                     name="workMode"
//                     value="Remote"
//                     checked={formData.workMode === "Remote"}
//                     onChange={handleChange}
//                     className="sr-only"
//                   />
//                   <label
//                     htmlFor="remote"
//                     className={`px-4 py-2 text-sm border rounded-md cursor-pointer ${formData.workMode === 'Remote' ? 'bg-black text-white' : 'bg-white'}`}
//                   >
//                     Remote
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Employment type</label>
//               <div className="flex space-x-2">
//                 <div className="inline-flex items-center">
//                   <input
//                     type="radio"
//                     id="parttime"
//                     name="employmentType"
//                     value="Part-time"
//                     checked={formData.employmentType === "Part-time"}
//                     onChange={handleChange}
//                     className="sr-only"
//                   />
//                   <label
//                     htmlFor="parttime"
//                     className={`px-4 py-2 text-sm border rounded-md cursor-pointer ${formData.employmentType === 'Part-time' ? 'bg-black text-white' : 'bg-white'}`}
//                   >
//                     Part-time
//                   </label>
//                 </div>
//                 <div className="inline-flex items-center">
//                   <input
//                     type="radio"
//                     id="fulltime"
//                     name="employmentType"
//                     value="Full-time"
//                     checked={formData.employmentType === "Full-time"}
//                     onChange={handleChange}
//                     className="sr-only"
//                   />
//                   <label
//                     htmlFor="fulltime"
//                     className={`px-4 py-2 text-sm border rounded-md cursor-pointer ${formData.employmentType === 'Full-time' ? 'bg-black text-white' : 'bg-white'}`}
//                   >
//                     Full-time
//                   </label>
//                 </div>
//                 <div className="inline-flex items-center">
//                   <input
//                     type="radio"
//                     id="contract"
//                     name="employmentType"
//                     value="Contract"
//                     checked={formData.employmentType === "Contract"}
//                     onChange={handleChange}
//                     className="sr-only"
//                   />
//                   <label
//                     htmlFor="contract"
//                     className={`px-4 py-2 text-sm border rounded-md cursor-pointer ${formData.employmentType === 'Contract' ? 'bg-black text-white' : 'bg-white'}`}
//                   >
//                     Contract
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Tentative Date of Placement / Hiring</label>
//               <div className="flex space-x-2">
//                 <div className="w-1/2 mt mt-3 ">
//                   <label className="block text-xs mb-1 ml-2 font-medium ">Start Date</label>
//                   <div className="relative">
//                     <input
//                       type="date"
//                       name="placementStartDate"
//                       value={formData.placementStartDate}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded appearance-none pr-8 bg-white focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="w-1/2 mt-3  ">
//                   <label className="block text-xs mb-1 ml-2 font-medium  ">End Date</label>
//                   <div className="relative">
//                     <input
//                       type="date"
//                       name="placementEndDate"
//                       value={formData.placementEndDate}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded appearance-none pr-8 bg-white focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Number of Rounds</label>
//               <div className="relative">
//                 <select
//                   name="numberOfRounds"
//                   value={formData.numberOfRounds}
//                   onChange={handleArrayChange}
//                   className="w-full p-2 border rounded appearance-none pr-8 bg-white"
//                   required
//                 >
//                   <option value="" disabled>Select number of rounds</option>
//                   {numberOfRoundsOptions.map((round, index) => (
//                     <option key={index} value={round}>{round}</option>
//                   ))}
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                   <ChevronDown className="w-4 h-4 text-gray-400" />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Process of Selection</label>
//               <div className="relative">
//                 <select
//                   name="selectionProcess"
//                   value={formData.selectionProcess}
//                   onChange={handleArrayChange}
//                   className="w-full p-2 border rounded appearance-none pr-8 bg-white"
//                   required
//                 >
//                   <option value="" disabled>Select selection process</option>
//                   {selectionProcessOptions.map((process, index) => (
//                     <option key={index} value={process}>{process}</option>
//                   ))}
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                   <ChevronDown className="w-4 h-4 text-gray-400" />
//                 </div>
//               </div>
//             </div>

//             {/* Contact Person Details */}
//             <div>
//               <label className="block mb-1 font-medium">Contact Person</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.contactPerson.name}
//                 onChange={handleContactChange}
//                 placeholder="Enter full name"
//                 className="w-full p-2 border rounded mb-2"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Contact person designation *</label>
//               <div className="relative">
//                 <select
//                   name="designation"
//                   value={formData.contactPerson.designation}
//                   onChange={handleContactChange}
//                   className="w-full p-2 border rounded appearance-none pr-8 bg-white"
//                   required
//                 >
//                   <option value="" disabled>Select designation</option>
//                   {designationOptions.map((designation, index) => (
//                     <option key={index} value={designation}>{designation}</option>
//                   ))}
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                   <ChevronDown className="w-4 h-4 text-gray-400" />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Contact person email *</label>
//               <div className="relative flex items-center border rounded pl-2">
//                 <span className="text-gray-500">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                     <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                   </svg>
//                 </span>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.contactPerson.email}
//                   onChange={handleContactChange}
//                   placeholder="example@company.com"
//                   className="w-full p-2 focus:outline-none"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Contact person mobile no *</label>
//               <div className="relative flex items-center border rounded pl-2">
//                 <span className="text-gray-500">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
//                   </svg>
//                 </span>
//                 <input
//                   type="tel"
//                   name="mobile"
//                   value={formData.contactPerson.mobile}
//                   onChange={handleContactChange}
//                   placeholder="Enter 10-digit mobile number"
//                   className="w-full p-2 focus:outline-none"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Contact person LinkedIn Profile</label>
//               <input
//                 type="url"
//                 name="linkedin"
//                 value={formData.contactPerson.linkedin}
//                 onChange={handleContactChange}
//                 placeholder="https://www.linkedin.com/in/username"
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Minimum Students to be Hired</label>
//               <div className="relative">
//                 <select
//                   name="minStudents"
//                   value={formData.minStudents}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded appearance-none pr-8 bg-white"
//                   required
//                 >
//                   <option value="" disabled>Select minimum students</option>
//                   {minimumStudentsOptions.map((option, index) => (
//                     <option key={index} value={option}>{option}</option>
//                   ))}
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                   <ChevronDown className="w-4 h-4 text-gray-400" />
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end mt-6">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="px-6 py-2 bg-black text-white font-medium rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
//               >
//                 {isSubmitting ? 'Submitting...' : 'Register'}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ChevronDown, X } from 'lucide-react';
import { Country, State, City } from 'country-state-city';

export default function OffCampusHiringForm() {
    const initialFormState = {
        venue: '',
        degree: [],
        collegeTypes: '',
        criteria: '',
        workMode: [],
        employmentType: [],
        salaryRange: 'INR',
        salaryValue: '',
        tentativeStartDate: '',
        tentativeEndDate: '',
        rounds: Array.from({ length: 6 }, (_, i) => ({ id: i + 1, students: '', branch: '', skills: '' })),
        country: '',
        countryCode: '',
        state: '',
        stateCode: '',
        city: '',
        pincode: '',
        contactPerson: {
            name: '',
            designation: '',
            email: '',
            mobile: '',
            linkedin: '',
        },
        minStudentsToBePlaced: '',
        amenities: [],
        description: ''
    };

    const [formData, setFormData] = useState(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    // --- State for dynamic dropdowns ---
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const amenitiesRef = useRef(null);
    const degreeRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState({ amenities: false, degree: false });
    const [customAmenity, setCustomAmenity] = useState('');

    // --- Static Options ---
    const locations = ['Online', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Other'];
    const degreeOptions = ['B.Tech', 'M.Tech', 'MBA', 'B.Sc', 'M.Sc', 'PhD'];
    const collegeTypeOptions = ['Engineering', 'Medical', 'Management', 'Arts & Science', 'Law', 'Pharmacy', 'Architecture'];
    const workModeOptions = ['On-site', 'Remote', 'Hybrid'];
    const branchOptions = ['Computer Science', 'Mechanical', 'Civil', 'Electrical', 'Electronics', 'Bio-medical'];
    const designationOptions = ['HR Manager', 'Technical Recruiter', 'Talent Acquisition', 'Hiring Manager', 'Team Lead', 'Department Head', 'CEO', 'CTO', 'Founder', 'Other'];
    const minStudentsOptions = ['1-10', '11-25', '26-50', '51-100', '101-200', '200+'];
    const amenitiesOptions = ['Auditorium', 'Seminar Hall', 'Interview Rooms', 'Computer Labs', 'Wi-Fi Access', 'Projector'];

    // --- Effects for location data ---
    useEffect(() => {
        setCountries(Country.getAllCountries());
    }, []);

    useEffect(() => {
        const countryStates = formData.countryCode ? State.getStatesOfCountry(formData.countryCode) : [];
        setStates(countryStates);
        setCities([]); // Reset cities when country changes
    }, [formData.countryCode]);

    useEffect(() => {
        const stateCities = (formData.countryCode && formData.stateCode) ? City.getCitiesOfState(formData.countryCode, formData.stateCode) : [];
        setCities(stateCities);
    }, [formData.countryCode, formData.stateCode]);

    // --- Handlers ---
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (amenitiesRef.current && !amenitiesRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({ ...prev, amenities: false }));
            }
            if (degreeRef.current && !degreeRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({ ...prev, degree: false }));
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCountryChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const countryCode = selectedOption.getAttribute('data-countrycode') || '';
        setFormData(prev => ({
            ...prev,
            country: e.target.value,
            countryCode: countryCode,
            state: '',
            stateCode: '',
            city: ''
        }));
    };

    const handleStateChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const stateCode = selectedOption.getAttribute('data-statecode') || '';
        setFormData(prev => ({
            ...prev,
            state: e.target.value,
            stateCode: stateCode,
            city: ''
        }));
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            contactPerson: {
                ...prev.contactPerson,
                [name]: value
            }
        }));
    };

    const handleMultiToggle = (field, value) => {
        setFormData(prev => {
            const currentValues = prev[field] || [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(item => item !== value)
                : [...currentValues, value];
            return { ...prev, [field]: newValues };
        });
    };

    const handleRoundChange = (id, field, value) => {
        const updatedRounds = formData.rounds.map(round =>
            round.id === id ? { ...round, [field]: value } : round
        );
        setFormData(prev => ({ ...prev, rounds: updatedRounds }));
    };

    const addItem = (field, item, setCustomInput) => {
        if (item.trim() && !formData[field].includes(item.trim())) {
            setFormData(prev => ({ ...prev, [field]: [...prev[field], item.trim()] }));
        }
        setCustomInput('');
    };

    const removeItem = (field, valueToRemove) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter(item => item !== valueToRemove)
        }));
    };

    const showAlert = (message, type) => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setStates([]);
        setCities([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (formData.degree.length === 0 || !formData.venue || !formData.contactPerson.email || !formData.contactPerson.mobile) {
            showAlert('Please fill all required fields marked with *', 'error');
            setIsSubmitting(false);
            return;
        }

        let aggregatedSkills = [];
        let studentStreams = [];
        let roundNames = [];
        let studentCounts = [];

        const nonEmptyRounds = formData.rounds.filter(round => round.students || round.branch || round.skills);
        nonEmptyRounds.forEach(round => {
            if (round.skills) aggregatedSkills.push(...round.skills.split(',').map(s => s.trim()).filter(Boolean));
            if (round.branch) studentStreams.push(round.branch);
            if (round.students) studentCounts.push(round.students);
            roundNames.push(`Round ${round.id}`);
        });

        const payload = {
            jobType: "Pool-campus",
            venue: formData.venue,
            degree: formData.degree,
            collegeTypes: formData.collegeTypes ? [formData.collegeTypes] : [],
            eligibilityCriteria: formData.criteria,
            workMode: formData.workMode,
            employmentType: formData.employmentType,
            minPackage: {
                currency: formData.salaryRange,
                amount: parseFloat(formData.salaryValue) || 0,
            },
            startDate: formData.tentativeStartDate,
            endDate: formData.tentativeEndDate,
            rounds: roundNames,
            studentStreams: [...new Set(studentStreams)],
            skills: [...new Set(aggregatedSkills)],
            numberOfStudent: studentCounts,
            location: [formData.city].filter(Boolean),
            country: formData.country,
            state: formData.state,
            city: formData.city,
            pincode: formData.pincode,
            contactPerson: formData.contactPerson,
            noOfplacedStudents: formData.minStudentsToBePlaced,
            amenitiesRequired: formData.amenities,
            description: formData.description,
        };

        try {
            const token = localStorage.getItem('token') || document.cookie.split('; ').find(row => row.startsWith('jwt='))?.split('=')[1];
            
            const response = await axios.post(`${import.meta.env.VITE_Backend_URL}/api/hiring-channels/pool-campus/college-request`, payload, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            });

            toast.success(response.data.message);
            resetForm();
        } catch (error) {
            console.error('Submission error:', error);
            // const errorMsg = error.response?.data?.message || 'Failed to submit the form.';
            // showAlert(errorMsg, 'error');
            toast.error('Something went wrong!')
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 font-sans">
             {alert.show && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                   <div className={`relative p-6 rounded-lg shadow-lg w-full max-w-md text-center ${alert.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                       <div className="flex flex-col items-center">
                           {alert.type === 'success' && (
                               <div className="w-12 h-12 rounded-full bg-green-200 p-2 flex items-center justify-center mx-auto mb-3">
                                   <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                               </div>
                           )}
                           <strong className={`text-xl font-bold mb-2 ${alert.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                               {alert.type === 'success' ? 'Success!' : 'Error!'}
                           </strong>
                           <span className={`text-sm ${alert.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>{alert.message}</span>
                           <button onClick={() => setAlert({ show: false, message: '', type: '' })} className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/10 transition-colors">
                               <X size={20} className={alert.type === 'success' ? 'text-green-800' : 'text-red-800'}/>
                           </button>
                       </div>
                   </div>
               </div>
            )}
            <div className="flex flex-col md:flex-row justify-between mb-8">
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold mb-2">Pool Campus Connect:</h1>
                    <h2 className="text-3xl font-bold mb-4">Hire Bigger</h2>
                </div>
                <div className="md:w-1/2">
                    <p className="text-sm">Tap into diverse talent from multiple institutions through one powerful drive.</p>
                </div>
            </div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-center mb-4">Register for Pool Campus Hiring</h2>
                <p className="text-center text-gray-500 mb-6">Fill in the details below to register for the hiring drive</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-1 font-medium">Pool Campus Hiring Venue <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <select name="venue" value={formData.venue} onChange={handleChange} className="w-full p-2 border rounded appearance-none pr-8 bg-white" required>
                                <option value="" disabled>Select location</option>
                                {locations.map((location) => (<option key={location} value={location}>{location}</option>))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"><ChevronDown className="w-4 h-4 text-gray-400" /></div>
                        </div>
                    </div>

                    <div ref={degreeRef}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Degree(s) <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <div className="block w-full border border-gray-300 rounded-md px-3 py-2 min-h-[42px] cursor-pointer" onClick={() => setDropdownOpen(prev => ({ ...prev, degree: !prev.degree }))}>
                                {formData.degree.length > 0 ? (
                                    <div className="flex flex-wrap gap-1">
                                        {formData.degree.map(deg => (
                                            <span key={deg} className="flex items-center bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                                {deg}
                                                <button type="button" onClick={(e) => { e.stopPropagation(); removeItem('degree', deg); }} className="ml-1.5"><X size={12} /></button>
                                            </span>
                                        ))}
                                    </div>
                                ) : <span className="text-gray-500">Select degrees</span>}
                            </div>
                            {dropdownOpen.degree && (
                                <div className="absolute z-10 w-full bg-white border rounded-md mt-1 shadow-lg">
                                    {degreeOptions.map(opt => (
                                        <div key={opt} className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${formData.degree.includes(opt) ? 'bg-gray-200' : ''}`} onClick={() => handleMultiToggle('degree', opt)}>{opt}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="collegeTypes" className="block text-sm font-medium text-gray-700 mb-1">Type of College</label>
                        <div className="relative">
                            <select id="collegeTypes" name="collegeTypes" className="block w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-10" value={formData.collegeTypes} onChange={handleChange}>
                                <option value="">Select College Type</option>
                                {collegeTypeOptions.map(option => (<option key={option} value={option}>{option}</option>))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"><ChevronDown size={16} className="text-gray-400" /></div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="criteria" className="block text-sm font-medium text-gray-700 mb-1">Eligibility Criteria</label>
                        <textarea id="criteria" name="criteria" className="block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="e.g. Minimum 60% aggregate, No active backlogs..." value={formData.criteria} onChange={handleChange} rows="3"></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Work Mode</label>
                        <div className="flex space-x-2">
                            {workModeOptions.map((type) => (
                                <button key={type} type="button" className={`px-4 py-2 text-sm border rounded-md transition-colors ${formData.workMode.includes(type) ? 'bg-black text-white' : 'bg-white text-gray-700'}`} onClick={() => handleMultiToggle('workMode', type)}>{type}</button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Employment type</label>
                        <div className="flex space-x-2">
                            {['Part-time', 'Full-time', 'Contract'].map((type) => (
                                <button key={type} type="button" className={`px-4 py-2 text-sm border rounded-md transition-colors ${formData.employmentType.includes(type) ? 'bg-black text-white' : 'bg-white text-gray-700'}`} onClick={() => handleMultiToggle('employmentType', type)}>{type}</button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tentative Date Range</label>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input name="tentativeStartDate" type="date" className="block w-full border border-gray-300 rounded-md px-3 py-2" value={formData.tentativeStartDate} onChange={handleChange} />
                            <input name="tentativeEndDate" type="date" className="block w-full border border-gray-300 rounded-md px-3 py-2" value={formData.tentativeEndDate} onChange={handleChange} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Cut-off Salary</label>
                        <div className="flex rounded-md shadow-sm">
                            <select name="salaryRange" className="border border-gray-300 rounded-l-md px-3 py-2 w-24" value={formData.salaryRange} onChange={handleChange}>
                                <option>USD</option><option>INR</option><option>EUR</option>
                            </select>
                            <input name="salaryValue" type="number" className="border border-gray-300 rounded-r-md px-3 py-2 flex-1" placeholder="Enter amount" value={formData.salaryValue} onChange={handleChange} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Rounds</label>
                        <div className="overflow-x-auto border border-gray-300 rounded-md">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">S.No.</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">No. of Students</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Branch</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Skills (comma separated)</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {formData.rounds.map((round) => (
                                        <tr key={round.id}>
                                            <td className="px-4 py-2 text-sm">{round.id}</td>
                                            <td className="px-4 py-2"><input type="number" className="w-full px-2 py-1 border rounded-md text-sm" value={round.students} onChange={(e) => handleRoundChange(round.id, 'students', e.target.value)} min="0" /></td>
                                            <td className="px-4 py-2">
                                                <div className="relative">
                                                    <select className="w-full px-2 py-1 border rounded-md text-sm appearance-none pr-8" value={round.branch} onChange={(e) => handleRoundChange(round.id, 'branch', e.target.value)}>
                                                        <option value="">Select Branch</option>
                                                        {branchOptions.map(option => (<option key={option} value={option}>{option}</option>))}
                                                    </select>
                                                    <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none"><ChevronDown size={14} className="text-gray-400" /></div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2"><input type="text" className="w-full px-2 py-1 border rounded-md text-sm" value={round.skills} onChange={(e) => handleRoundChange(round.id, 'skills', e.target.value)} placeholder="e.g., Python, SQL" /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div ref={amenitiesRef}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Campus Facilities/Amenities Provided</label>
                        <div className="relative">
                            <div className="block w-full border border-gray-300 rounded-md px-3 py-2 min-h-[42px] cursor-pointer" onClick={() => setDropdownOpen(prev => ({ ...prev, amenities: !prev.amenities }))}>
                                {formData.amenities.length > 0 ? (
                                    <div className="flex flex-wrap gap-1">
                                        {formData.amenities.map(item => (
                                            <span key={item} className="flex items-center bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                                {item}
                                                <button type="button" onClick={(e) => { e.stopPropagation(); removeItem('amenities', item); }} className="ml-1.5"><X size={12} /></button>
                                            </span>
                                        ))}
                                    </div>
                                ) : <span className="text-gray-500">Select facilities</span>}
                            </div>
                            {dropdownOpen.amenities && (
                                <div className="absolute z-10 w-full bg-white border rounded-md mt-1 shadow-lg">
                                    {amenitiesOptions.map(opt => (
                                        <div key={opt} className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${formData.amenities.includes(opt) ? 'bg-gray-200' : ''}`} onClick={() => handleMultiToggle('amenities', opt)}>{opt}</div>
                                    ))}
                                    <div className="p-2">
                                        <input type="text" placeholder="Add custom facility..." className="w-full border-gray-300 border rounded-md px-2 py-1" value={customAmenity} onChange={(e) => setCustomAmenity(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addItem('amenities', customAmenity, setCustomAmenity); } }} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description / Message</label>
                        <textarea id="description" name="description" className="block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Any additional information..." value={formData.description} onChange={handleChange} rows="3"></textarea>
                    </div>

                    <hr />

                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <div className="relative">
                            <select id="country" name="country" className="block w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-10" value={formData.country} onChange={handleCountryChange}>
                                <option value="">Select Country</option>
                                {countries.map(country => (
                                    <option key={country.isoCode} value={country.name} data-countrycode={country.isoCode}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"><ChevronDown size={16} className="text-gray-400" /></div>
                        </div>
                    </div>

                    <div>
                         <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                         <div className="relative">
                             <select id="state" name="state" className="block w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-10" value={formData.state} onChange={handleStateChange} disabled={!formData.countryCode}>
                                 <option value="">Select State</option>
                                 {states.map(state => (
                                     <option key={state.isoCode} value={state.name} data-statecode={state.isoCode}>
                                         {state.name}
                                     </option>
                                 ))}
                             </select>
                             <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"><ChevronDown size={16} className="text-gray-400" /></div>
                         </div>
                    </div>

                     <div>
                         <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                         <div className="relative">
                             <select id="city" name="city" className="block w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-10" value={formData.city} onChange={handleChange} disabled={!formData.stateCode}>
                                 <option value="">Select City</option>
                                 {cities.map(city => (
                                     <option key={city.name} value={city.name}>
                                         {city.name}
                                     </option>
                                 ))}
                             </select>
                             <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"><ChevronDown size={16} className="text-gray-400" /></div>
                         </div>
                    </div>

                     <div>
                         <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                         <input id="pincode" name="pincode" type="text" placeholder="Enter pincode" className="w-full border p-2 rounded-md" value={formData.pincode} onChange={handleChange} />
                     </div>
                    
                    <div>
                        <label className="block mb-1 font-medium">Contact Person Name *</label>
                        <input type="text" name="name" value={formData.contactPerson.name} onChange={handleContactChange} placeholder="Enter full name" className="w-full p-2 border rounded" required />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Contact person designation *</label>
                        <div className="relative">
                            <select name="designation" value={formData.contactPerson.designation} onChange={handleContactChange} className="w-full p-2 border rounded appearance-none pr-8 bg-white" required>
                                <option value="" disabled>Select designation</option>
                                {designationOptions.map((designation) => (<option key={designation} value={designation}>{designation}</option>))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"><ChevronDown className="w-4 h-4 text-gray-400" /></div>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Contact person email *</label>
                        <input type="email" name="email" value={formData.contactPerson.email} onChange={handleContactChange} placeholder="example@company.com" className="w-full p-2 border rounded" required />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Contact person mobile no *</label>
                        <input type="tel" name="mobile" value={formData.contactPerson.mobile} onChange={handleContactChange} placeholder="Enter 10-digit mobile number" className="w-full p-2 border rounded" required />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Contact person LinkedIn Profile</label>
                        <input type="url" name="linkedin" value={formData.contactPerson.linkedin} onChange={handleContactChange} placeholder="https://www.linkedin.com/in/username" className="w-full p-2 border rounded" />
                    </div>
                     <div>
                         <label htmlFor="minStudentsToBePlaced" className="block text-sm font-medium text-gray-700 mb-1">Minimum Students to be Placed *</label>
                         <div className="relative">
                             <select id="minStudentsToBePlaced" name="minStudentsToBePlaced" className="block w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-10" value={formData.minStudentsToBePlaced} onChange={handleChange} required >
                                 <option value="">Select Range</option>
                                 {minStudentsOptions.map(option => (<option key={option} value={option}>{option}</option>))}
                             </select>
                             <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"><ChevronDown size={16} className="text-gray-400" /></div>
                         </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-black text-white font-medium rounded hover:bg-gray-800 transition-colors disabled:opacity-50">
                          {isSubmitting ? 'Submitting...' : 'Register'}
                      </button>
                    </div>
                </form>
            </div>
        </div>
    );
}