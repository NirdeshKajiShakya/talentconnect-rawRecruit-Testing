// import { useState } from 'react';
// import { ChevronDown } from 'lucide-react';
// import axios from 'axios';

// export default function RegisterPage({ onBackClick }) {
//     const initialFormState = {
//         degree: '',
//         lookingFor: ['job'],
//         employmentType: 'Full-time',
//         salaryRange: 'USD',
//         salaryValue: '',
//         tentativeDate: '',
//         rounds: [
//             { id: 1, students: '', branch: '', skills: '' },
//             { id: 2, students: '', branch: '', skills: '' },
//             { id: 3, students: '', branch: '', skills: '' },
//             { id: 4, students: '', branch: '', skills: '' },
//             { id: 5, students: '', branch: '', skills: '' },
//             { id: 6, students: '', branch: '', skills: '' },
//         ],
//         collegeLocation: '',
//         state: '',
//         city: '',
//         country: '',
//         pincode: '',
//         coordinatorName: '',
//         coordinatorDesignation: '',
//         email: '',
//         mobile: '',
//         linkedinProfile: '',
//         minStudents: '',
//     };

//     const [formData, setFormData] = useState(initialFormState);
//     const [message, setMessage] = useState(null);
//     const [messageType, setMessageType] = useState(null);
//     const [showSuccessAlert, setShowSuccessAlert] = useState(false);

//     const degreeOptions = ['B.Tech', 'M.Tech', 'MBA', 'B.Sc', 'M.Sc', 'PhD'];
//     const branchOptions = ['Computer Science', 'Mechanical', 'Civil', 'Electrical', 'Electronics', 'Bio-medical'];
//     const countryOptions = ['United States', 'India', 'Germany', 'Canada', 'Australia', 'Japan'];
//     const designationOptions = ['Professor', 'HOD', 'Placement Officer', 'Dean', 'Coordinator'];
//     const studentCountOptions = ['50+', '100+', '150+', '200+', '250+'];

//     const handleLookingForToggle = (type) => {
//         const current = [...formData.lookingFor];
//         if (current.includes(type)) {
//             setFormData({
//                 ...formData,
//                 lookingFor: current.filter(item => item !== type)
//             });
//         } else {
//             setFormData({
//                 ...formData,
//                 lookingFor: [...current, type]
//             });
//         }
//     };

//     const handleEmploymentTypeChange = (type) => {
//         setFormData({ ...formData, employmentType: type });
//     };

//     const handleRoundChange = (id, field, value) => {
//         const updatedRounds = formData.rounds.map(round =>
//             round.id === id ? { ...round, [field]: value } : round
//         );
//         setFormData({ ...formData, rounds: updatedRounds });
//     };

//     const handleChange = (field, value) => {
//         setFormData({ ...formData, [field]: value });
//     };

//     const showMessage = (msg, type) => {
//         setMessage(msg);
//         setMessageType(type);
//         setTimeout(() => {
//             setMessage(null);
//             setMessageType(null);
//         }, 5000);
//     };

//     const resetForm = () => {
//         setFormData(initialFormState);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage(null);

//         let aggregatedSkills = [];
//         let studentStreams = [];
//         let roundNames = [];
//         let studentCounts = [];

//         const nonEmptyRounds = formData.rounds.filter(round => round.students || round.branch || round.skills);

//         nonEmptyRounds.forEach(round => {
//             if (round.skills) {
//                 const roundSkills = round.skills.split(',').map(s => s.trim()).filter(Boolean);
//                 aggregatedSkills = [...new Set([...aggregatedSkills, ...roundSkills])];
//             }
//             if (round.branch) {
//                 studentStreams = [...new Set([...studentStreams, round.branch])];
//             }
//             if (round.students) {
//                 studentCounts.push(round.students);
//             }
//             roundNames.push(`Round ${round.id}`);
//         });

//         let backendLookingFor = '';
//         if (formData.lookingFor.includes('job') && formData.lookingFor.includes('internship')) {
//             backendLookingFor = 'Both';
//         } else if (formData.lookingFor.includes('internship')) {
//             backendLookingFor = 'Internship';
//         } else if (formData.lookingFor.includes('job')) {
//             backendLookingFor = 'Job';
//         }

//         const payload = {
//             degree: formData.degree,
//             lookingFor: backendLookingFor,
//             employmentType: formData.employmentType,
//             minPackage: {
//                 currency: formData.salaryRange,
//                 amount: parseFloat(formData.salaryValue),
//             },
//             startDate: formData.tentativeDate,
//             location: [formData.collegeLocation].filter(Boolean),
//             state: formData.state,
//             city: formData.city,
//             country: formData.country,
//             pincode: formData.pincode,
//             contactPerson: {
//                 name: formData.coordinatorName,
//                 designation: formData.coordinatorDesignation,
//                 email: formData.email,
//                 mobile: formData.mobile,
//                 linkedin: formData.linkedinProfile,
//             },
//             minimumStudents: formData.minStudents,
//             studentStreams: studentStreams,
//             skills: aggregatedSkills,
//             rounds: roundNames,
//             numberOfStudent: studentCounts,
//         };

//         console.log("Payload being sent:", payload);

//         try {
//             const backendUrl = import.meta.env.VITE_Backend_URL;
//             if (!backendUrl) {
//                 console.error("VITE_Backend_URL is not defined in environment variables.");
//                 showMessage("Configuration error: Backend URL not found.", 'error');
//                 return;
//             }

//             const response = await axios.post(
//                 `${backendUrl}/api/hiring-channels/on-campus/college-request`,
//                 payload,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         'Content-Type': 'application/json',
//                     }
//                 }
//             );

//             showMessage(response.data.message || 'Registration successful!', 'success');
//             setShowSuccessAlert(true);
//             setTimeout(() => setShowSuccessAlert(false), 5000);
            
//             // Reset form after successful submission
//             resetForm();

//         } catch (error) {
//             console.error('Error submitting form:', error);
//             if (error.response) {
//                 showMessage(error.response.data.message || 'An error occurred during registration.', 'error');
//             } else if (error.request) {
//                 showMessage('No response from server. Please check your network connection.', 'error');
//             } else {
//                 showMessage('An unexpected error occurred while submitting the form. Please try again.', 'error');
//             }
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-8 font-inter">
//             {showSuccessAlert && (
//                 <div className="fixed inset-0 flex items-center justify-center z-50">
//                     <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative max-w-md w-full mx-4">
//                         <div className="flex items-center">
//                             <svg className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                             <strong className="font-bold">Success!</strong>
//                             <span className="ml-2">Job posted successfully!</span>
//                         </div>
//                         <button
//                             onClick={() => setShowSuccessAlert(false)}
//                             className="absolute top-0 right-0 px-2 py-1 text-green-600 hover:text-green-800"
//                         >
//                             &times;
//                         </button>
//                     </div>
//                 </div>
//             )}

//             <div className="text-center mb-8">
//                 <h1 className="text-3xl font-bold mb-2 text-gray-800">Revolutionizing Campus Recruitment</h1>
//                 <p className="text-sm text-gray-600 max-w-lg mx-auto">
//                     Our solutions include an outreach connection software with skilled employers, a recruitment platform with
//                     tools for targeted training programs to bridge skill gaps, and data-driven insights for refining career
//                     services and recruitment strategies.
//                 </p>
//             </div>

//             <div className="text-center mb-8">
//                 <h2 className="text-2xl font-bold mb-2 text-gray-700">Register for Campus Placement</h2>
//                 <p className="text-sm text-gray-500">Please fill out the form below to register your college for campus placements.</p>
//             </div>

//             {message && (
//                 <div className={`p-3 mb-4 rounded-md text-center ${
//                     messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                 }`}>
//                     {message}
//                 </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                     <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
//                     <div className="relative">
//                         <select
//                             id="degree"
//                             className="block w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-10 focus:ring-blue-500 focus:border-blue-500"
//                             value={formData.degree}
//                             onChange={(e) => handleChange('degree', e.target.value)}
//                         >
//                             <option value="">Select Degree</option>
//                             {degreeOptions.map(option => (
//                                 <option key={option} value={option}>{option}</option>
//                             ))}
//                         </select>
//                         <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                             <ChevronDown size={16} className="text-gray-400" />
//                         </div>
//                     </div>
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Looking for</label>
//                     <div className="flex space-x-2">
//                         {['job', 'internship', 'both'].map((type) => (
//                             <button
//                                 key={type}
//                                 type="button"
//                                 className={`px-4 py-2 text-sm border rounded-md capitalize transition-colors duration-200 ${
//                                     formData.lookingFor.includes(type) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
//                                 }`}
//                                 onClick={() => handleLookingForToggle(type)}
//                             >
//                                 {type}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Employment type</label>
//                     <div className="flex space-x-2">
//                         {['Part-time', 'Full-time', 'Contract'].map((type) => (
//                             <button
//                                 key={type}
//                                 type="button"
//                                 className={`px-4 py-2 text-sm border rounded-md transition-colors duration-200 ${
//                                     formData.employmentType === type ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
//                                 }`}
//                                 onClick={() => handleEmploymentTypeChange(type)}
//                             >
//                                 {type}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Cut-off Salary</label>
//                     <div className="flex rounded-md shadow-sm">
//                         <select
//                             className="border border-gray-300 rounded-l-md px-3 py-2 w-24 focus:ring-blue-500 focus:border-blue-500"
//                             value={formData.salaryRange}
//                             onChange={(e) => handleChange('salaryRange', e.target.value)}
//                         >
//                             <option>USD</option>
//                             <option>INR</option>
//                             <option>EUR</option>
//                         </select>
//                         <input
//                             type="number"
//                             className="border border-gray-300 rounded-r-md px-3 py-2 flex-1 focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="Enter amount"
//                             value={formData.salaryValue}
//                             onChange={(e) => handleChange('salaryValue', e.target.value)}
//                         />
//                     </div>
//                 </div>

//                 <div>
//                     <label htmlFor="tentativeDate" className="block text-sm font-medium text-gray-700 mb-1">Tentative Date</label>
//                     <input
//                         type="date"
//                         id="tentativeDate"
//                         className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                         value={formData.tentativeDate}
//                         onChange={(e) => handleChange('tentativeDate', e.target.value)}
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Number of Rounds</label>
//                     <div className="overflow-x-auto border border-gray-300 rounded-md">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No.</th>
//                                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. of Students</th>
//                                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
//                                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills (comma separated)</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {formData.rounds.map((round) => (
//                                     <tr key={round.id}>
//                                         <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{round.id}</td>
//                                         <td className="px-4 py-2 whitespace-nowrap">
//                                             <input
//                                                 type="number"
//                                                 className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
//                                                 value={round.students}
//                                                 onChange={(e) => handleRoundChange(round.id, 'students', e.target.value)}
//                                                 min="0"
//                                             />
//                                         </td>
//                                         <td className="px-4 py-2 whitespace-nowrap">
//                                             <div className="relative">
//                                                 <select
//                                                     className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm appearance-none pr-8 focus:ring-blue-500 focus:border-blue-500"
//                                                     value={round.branch}
//                                                     onChange={(e) => handleRoundChange(round.id, 'branch', e.target.value)}
//                                                 >
//                                                     <option value="">Select Branch</option>
//                                                     {branchOptions.map(option => (
//                                                         <option key={option} value={option}>{option}</option>
//                                                     ))}
//                                                 </select>
//                                                 <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
//                                                     <ChevronDown size={14} className="text-gray-400" />
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td className="px-4 py-2 whitespace-nowrap">
//                                             <input
//                                                 type="text"
//                                                 className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
//                                                 value={round.skills}
//                                                 onChange={(e) => handleRoundChange(round.id, 'skills', e.target.value)}
//                                                 placeholder="e.g., Python, SQL"
//                                             />
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//                 <div>
//                     <label htmlFor="collegeLocation" className="block text-sm font-medium text-gray-700 mb-1">College Location *</label>
//                     <div className="relative">
//                         <select
//                             id="collegeLocation"
//                             className="block w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-10 focus:ring-blue-500 focus:border-blue-500"
//                             value={formData.collegeLocation}
//                             onChange={(e) => handleChange('collegeLocation', e.target.value)}
//                             required
//                         >
//                             <option value="">Select Location</option>
//                             <option value="Urban">Urban</option>
//                             <option value="Suburban">Suburban</option>
//                             <option value="Rural">Rural</option>
//                         </select>
//                         <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                             <ChevronDown size={16} className="text-gray-400" />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
//                         <input
//                             type="text"
//                             id="state"
//                             className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="Enter state"
//                             value={formData.state}
//                             onChange={(e) => handleChange('state', e.target.value)}
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                         <input
//                             type="text"
//                             id="city"
//                             className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="Enter city"
//                             value={formData.city}
//                             onChange={(e) => handleChange('city', e.target.value)}
//                         />
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
//                         <div className="relative">
//                             <select
//                                 id="country"
//                                 className="block w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-10 focus:ring-blue-500 focus:border-blue-500"
//                                 value={formData.country}
//                                 onChange={(e) => handleChange('country', e.target.value)}
//                             >
//                                 <option value="">Select Country</option>
//                                 {countryOptions.map(option => (
//                                     <option key={option} value={option}>{option}</option>
//                                 ))}
//                             </select>
//                             <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                                 <ChevronDown size={16} className="text-gray-400" />
//                             </div>
//                         </div>
//                     </div>
//                     <div>
//                         <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
//                         <input
//                             type="text"
//                             id="pincode"
//                             className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="Enter pincode"
//                             value={formData.pincode}
//                             onChange={(e) => handleChange('pincode', e.target.value)}
//                         />
//                     </div>
//                 </div>

//                 <div>
//                     <label htmlFor="coordinatorName" className="block text-sm font-medium text-gray-700 mb-1">Coordinator Name</label>
//                     <input
//                         type="text"
//                         id="coordinatorName"
//                         className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Enter name"
//                         value={formData.coordinatorName}
//                         onChange={(e) => handleChange('coordinatorName', e.target.value)}
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="coordinatorDesignation" className="block text-sm font-medium text-gray-700 mb-1">Coordinator Designation *</label>
//                     <div className="relative">
//                         <select
//                             id="coordinatorDesignation"
//                             className="block w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-10 focus:ring-blue-500 focus:border-blue-500"
//                             value={formData.coordinatorDesignation}
//                             onChange={(e) => handleChange('coordinatorDesignation', e.target.value)}
//                             required
//                         >
//                             <option value="">Select Designation</option>
//                             {designationOptions.map(option => (
//                                 <option key={option} value={option}>{option}</option>
//                             ))}
//                         </select>
//                         <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                             <ChevronDown size={16} className="text-gray-400" />
//                         </div>
//                     </div>
//                 </div>

//                 <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Official Email *</label>
//                     <div className="relative flex items-center">
//                         <div className="absolute left-3 flex items-center pointer-events-none">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
//                                 <rect width="20" height="16" x="2" y="4" rx="2" />
//                                 <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
//                             </svg>
//                         </div>
//                         <input
//                             type="email"
//                             id="email"
//                             className="block w-full border border-gray-300 rounded-md px-3 py-2 pl-10 focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="hello@xyz.com"
//                             value={formData.email}
//                             onChange={(e) => handleChange('email', e.target.value)}
//                             required
//                         />
//                     </div>
//                 </div>

//                 <div>
//                     <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Official Mobile *</label>
//                     <div className="relative flex items-center">
//                         <div className="absolute left-3 flex items-center pointer-events-none">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
//                                 <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
//                             </svg>
//                         </div>
//                         <input
//                             type="tel"
//                             id="mobile"
//                             className="block w-full border border-gray-300 rounded-md px-3 py-2 pl-10 focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="1234567890"
//                             value={formData.mobile}
//                             onChange={(e) => handleChange('mobile', e.target.value)}
//                             required
//                         />
//                     </div>
//                 </div>

//                 <div>
//                     <label htmlFor="linkedinProfile" className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
//                     <input
//                         type="url"
//                         id="linkedinProfile"
//                         className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="https://linkedin.com/in/username"
//                         value={formData.linkedinProfile}
//                         onChange={(e) => handleChange('linkedinProfile', e.target.value)}
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="minStudents" className="block text-sm font-medium text-gray-700 mb-1">Minimum Students</label>
//                     <div className="relative">
//                         <select
//                             id="minStudents"
//                             className="block w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-10 focus:ring-blue-500 focus:border-blue-500"
//                             value={formData.minStudents}
//                             onChange={(e) => handleChange('minStudents', e.target.value)}
//                         >
//                             <option value="">Select Minimum Students</option>
//                             {studentCountOptions.map(option => (
//                                 <option key={option} value={option}>{option}</option>
//                             ))}
//                         </select>
//                         <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                             <ChevronDown size={16} className="text-gray-400" />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex justify-between pt-6">
//                     <button
//                         type="button"
//                         onClick={onBackClick}
//                         className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
//                     >
//                         ← Back to Home
//                     </button>
//                     <button
//                         type="submit"
//                         className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200 shadow-md"
//                     >
//                         Register
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }


import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';

export default function RegisterPage({ onBackClick }) {
    const initialFormState = {
        degree: '',
        lookingFor: ['job'],
        employmentType: [],
        salaryRange: 'USD',
        salaryValue: '',
        tentativeStartDate: '',
        tentativeEndDate: '',
        rounds: Array.from({ length: 6 }, (_, i) => ({ id: i + 1, students: '', branch: '', skills: '' })),
        collegeLocation: '',
        country: '',
        countryCode: '',
        state: '',
        stateCode: '',
        city: '',
        pincode: '',
        coordinatorName: '',
        coordinatorDesignation: '',
        email: '',
        mobile: '',
        linkedinProfile: '',
        minStudentsToBePlaced: '',
        amenities: [],
        description: ''
    };

    const [formData, setFormData] = useState(initialFormState);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    
    // --- Dropdown and Input State Management ---
    const [dropdownOpen, setDropdownOpen] = useState({ amenities: false });
    const [customAmenity, setCustomAmenity] = useState('');
    
    // Country-State-City data
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const amenitiesRef = useRef(null);

    // --- Options ---
    const degreeOptions = ['B.Tech', 'M.Tech', 'MBA', 'B.Sc', 'M.Sc', 'PhD'];
    const branchOptions = ['Computer Science', 'Mechanical', 'Civil', 'Electrical', 'Electronics', 'Bio-medical'];
    const designationOptions = ['Professor', 'HOD', 'Placement Officer', 'Dean', 'Coordinator'];
    const amenitiesOptions = ['Auditorium', 'Seminar Hall', 'Interview Rooms', 'Computer Labs', 'Wi-Fi Access', 'Projector'];
    const minStudentsOptions = ['1-10', '11-25', '26-50', '51-100', '101-200', '200+'];

    // Load countries on component mount
    useEffect(() => {
        const allCountries = Country.getAllCountries();
        setCountries(allCountries);
    }, []);

    // Load states when country changes
    useEffect(() => {
        if (formData.countryCode) {
            const countryStates = State.getStatesOfCountry(formData.countryCode);
            setStates(countryStates);
            // Reset state and city when country changes
            setFormData(prev => ({
                ...prev,
                state: '',
                stateCode: '',
                city: ''
            }));
        } else {
            setStates([]);
        }
    }, [formData.countryCode]);

    // Load cities when state changes
    useEffect(() => {
        if (formData.countryCode && formData.stateCode) {
            const stateCities = City.getCitiesOfState(formData.countryCode, formData.stateCode);
            setCities(stateCities);
            // Reset city when state changes
            setFormData(prev => ({
                ...prev,
                city: ''
            }));
        } else {
            setCities([]);
        }
    }, [formData.countryCode, formData.stateCode]);

    // --- Handlers ---
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (amenitiesRef.current && !amenitiesRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({ ...prev, amenities: false }));
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => { document.removeEventListener('mousedown', handleClickOutside); };
    }, []);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };
    
    const handleMultiToggle = (field, value) => {
        const currentValues = formData[field];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(item => item !== value)
            : [...currentValues, value];
        setFormData({ ...formData, [field]: newValues });
    };

    const handleCountryChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const countryCode = selectedOption.getAttribute('data-countrycode');
        setFormData(prev => ({
            ...prev,
            country: e.target.value,
            countryCode: countryCode || '',
            state: '',
            stateCode: '',
            city: ''
        }));
    };

    const handleStateChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const stateCode = selectedOption.getAttribute('data-statecode');
        setFormData(prev => ({
            ...prev,
            state: e.target.value,
            stateCode: stateCode || '',
            city: ''
        }));
    };

    const handleRoundChange = (id, field, value) => {
        const updatedRounds = formData.rounds.map(round =>
            round.id === id ? { ...round, [field]: value } : round
        );
        setFormData({ ...formData, rounds: updatedRounds });
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
        
        if (!formData.degree || !formData.collegeLocation || !formData.email || !formData.mobile) {
            showAlert('Please fill all the required fields marked with *', 'error');
            return;
        }

        let aggregatedSkills = [];
        let studentStreams = [];
        let roundNames = [];
        let studentCounts = [];
        
        const nonEmptyRounds = formData.rounds.filter(round => round.students || round.branch || round.skills);
        nonEmptyRounds.forEach(round => {
            if (round.skills) aggregatedSkills = [...new Set([...aggregatedSkills, ...round.skills.split(',').map(s => s.trim()).filter(Boolean)])];
            if (round.branch) studentStreams = [...new Set([...studentStreams, round.branch])];
            if (round.students) studentCounts.push(round.students); // Collect student counts from rounds
            roundNames.push(`Round ${round.id}`);
        });

        let backendLookingFor = '';
        if (formData.lookingFor.includes('job') && formData.lookingFor.includes('internship')) {
            backendLookingFor = 'Both';
        } else if (formData.lookingFor.includes('internship')) {
            backendLookingFor = 'Internship';
        } else if (formData.lookingFor.includes('job')) {
            backendLookingFor = 'Job';
        }

        const payload = {
            jobType: 'On-campus',
            degree: [formData.degree],
            studentStreams: studentStreams,
            numberOfStudent: studentCounts, // Use the integrated student counts
            lookingFor: backendLookingFor,
            employmentType: formData.employmentType,
            minPackage: {
                currency: formData.salaryRange,
                amount: parseFloat(formData.salaryValue) || 0,
            },
            startDate: formData.tentativeStartDate,
            endDate: formData.tentativeEndDate,
            location: [formData.collegeLocation].filter(Boolean),
            country: formData.country,
            state: formData.state,
            city: formData.city,
            pincode: formData.pincode,
            contactPerson: {
                name: formData.coordinatorName,
                designation: formData.coordinatorDesignation,
                email: formData.email,
                mobile: formData.mobile,
                linkedin: formData.linkedinProfile,
            },
            noOfplacedStudents: formData.minStudentsToBePlaced,
            skills: aggregatedSkills,
            rounds: roundNames,
            amenitiesRequired: formData.amenities,
            description: formData.description
        };

        try {
            const backendUrl = import.meta.env.VITE_Backend_URL || 'http://localhost:5000';
            const response = await axios.post(`${backendUrl}/api/hiring-channels/on-campus/college-request`, payload, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' }
            });
            showAlert(response.data.message || 'Registration successful!', 'success');
            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
            const errorMsg = error.response?.data?.message || 'An unexpected error occurred.';
            showAlert(errorMsg, 'error');
        }
    };
    
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-8 font-inter">
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

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2 text-gray-800">Revolutionizing Campus Recruitment</h1>
                <p className="text-sm text-gray-600 max-w-lg mx-auto">Our platform connects colleges with skilled employers, offering tools for targeted training and data-driven insights to refine recruitment strategies.</p>
            </div>

            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2 text-gray-700">Register for Campus Placement</h2>
                <p className="text-sm text-gray-500">Please fill out the form below to register your college for campus placements.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                    <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">Degree <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <select id="degree" className="block w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-10" value={formData.degree} onChange={(e) => handleChange('degree', e.target.value)} required>
                            <option value="">Select Degree</option>
                            {degreeOptions.map(option => (<option key={option} value={option}>{option}</option>))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"><ChevronDown size={16} className="text-gray-400" /></div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tentative Date Range</label>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input type="date" placeholder="Start Date" className="block w-full border border-gray-300 rounded-md px-3 py-2" value={formData.tentativeStartDate} onChange={(e) => handleChange('tentativeStartDate', e.target.value)} />
                        <input type="date" placeholder="End Date" className="block w-full border border-gray-300 rounded-md px-3 py-2" value={formData.tentativeEndDate} onChange={(e) => handleChange('tentativeEndDate', e.target.value)} />
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Looking for</label>
                    <div className="flex space-x-2">
                        {['job', 'internship','both'].map((type) => (
                            <button key={type} type="button" className={`px-4 py-2 text-sm border rounded-md capitalize transition-colors ${formData.lookingFor.includes(type) ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`} onClick={() => handleMultiToggle('lookingFor', type)}>{type}</button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment type</label>
                    <div className="flex space-x-2">
                        {['Part-time', 'Full-time', 'Contract'].map((type) => (
                            <button key={type} type="button" className={`px-4 py-2 text-sm border rounded-md transition-colors ${formData.employmentType.includes(type) ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`} onClick={() => handleMultiToggle('employmentType', type)}>{type}</button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Cut-off Salary</label>
                    <div className="flex rounded-md shadow-sm">
                        <select className="border border-gray-300 rounded-l-md px-3 py-2 w-24" value={formData.salaryRange} onChange={(e) => handleChange('salaryRange', e.target.value)}>
                            <option>USD</option><option>INR</option><option>EUR</option>
                        </select>
                        <input type="number" className="border border-gray-300 rounded-r-md px-3 py-2 flex-1" placeholder="Enter amount" value={formData.salaryValue} onChange={(e) => handleChange('salaryValue', e.target.value)}/>
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
                                        <td className="px-4 py-2"><input type="number" className="w-full px-2 py-1 border rounded-md text-sm" value={round.students} onChange={(e) => handleRoundChange(round.id, 'students', e.target.value)} min="0"/></td>
                                        <td className="px-4 py-2">
                                            <div className="relative">
                                                <select className="w-full px-2 py-1 border rounded-md text-sm appearance-none pr-8" value={round.branch} onChange={(e) => handleRoundChange(round.id, 'branch', e.target.value)}>
                                                    <option value="">Select Branch</option>
                                                    {branchOptions.map(option => (<option key={option} value={option}>{option}</option>))}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none"><ChevronDown size={14} className="text-gray-400" /></div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2"><input type="text" className="w-full px-2 py-1 border rounded-md text-sm" value={round.skills} onChange={(e) => handleRoundChange(round.id, 'skills', e.target.value)} placeholder="e.g., Python, SQL"/></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                 <div ref={amenitiesRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Campus Facilities/Amenities Provided</label>
                     <div className="relative">
                        <div className="block w-full border border-gray-300 rounded-md px-3 py-2 min-h-[42px] cursor-pointer" onClick={() => setDropdownOpen(prev => ({...prev, amenities: !prev.amenities}))}>
                            {formData.amenities.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                    {formData.amenities.map(item => (
                                        <span key={item} className="flex items-center bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                            {item}
                                            <button type="button" onClick={(e) => {e.stopPropagation(); removeItem('amenities', item);}} className="ml-1.5"><X size={12}/></button>
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
                                    <input type="text" placeholder="Add custom facility..." className="w-full border-gray-300 border rounded-md px-2 py-1" value={customAmenity} onChange={(e) => setCustomAmenity(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter'){ e.preventDefault(); addItem('amenities', customAmenity, setCustomAmenity);}}}/>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description / Message</label>
                    <textarea id="description" className="block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Any additional information..." value={formData.description} onChange={(e) => handleChange('description', e.target.value)} rows="3"></textarea>
                </div>
                
                <hr/>

                <div>
                    <label htmlFor="collegeLocation" className="block text-sm font-medium text-gray-700 mb-1">College Location <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <select id="collegeLocation" className="block w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-10" value={formData.collegeLocation} onChange={(e) => handleChange('collegeLocation', e.target.value)} required >
                            <option value="">Select Location Type</option>
                            <option value="Urban">Urban</option><option value="Suburban">Suburban</option><option value="Rural">Rural</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"><ChevronDown size={16} className="text-gray-400" /></div>
                    </div>
                </div>
                
                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <div className="relative">
                        <select id="country" className="block w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-10" value={formData.country} onChange={handleCountryChange}>
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
                         <select id="state" className="block w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-10" value={formData.state} onChange={handleStateChange} disabled={!formData.countryCode}>
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
                         <select id="city" className="block w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-10" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} disabled={!formData.stateCode}>
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
                     <input id="pincode" type="text" placeholder="Enter pincode" className="w-full border p-2 rounded-md" value={formData.pincode} onChange={(e) => handleChange('pincode', e.target.value)} />
                 </div>
                
                <div>
                    <label htmlFor="coordinatorName" className="block text-sm font-medium text-gray-700 mb-1">Coordinator Name</label>
                    <input id="coordinatorName" type="text" placeholder="Enter name" className="w-full border p-2 rounded-md" value={formData.coordinatorName} onChange={(e) => handleChange('coordinatorName', e.target.value)} />
                </div>
                <div>
                    <label htmlFor="coordinatorDesignation" className="block text-sm font-medium text-gray-700 mb-1">Coordinator Designation <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <select id="coordinatorDesignation" className="block w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-10" value={formData.coordinatorDesignation} onChange={(e) => handleChange('coordinatorDesignation', e.target.value)} required>
                            <option value="">Select Designation</option>
                            {designationOptions.map(option => (<option key={option} value={option}>{option}</option>))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"><ChevronDown size={16} className="text-gray-400" /></div>
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Official Email <span className="text-red-500">*</span></label>
                    <input id="email" type="email" placeholder="hello@xyz.com" className="w-full border p-2 rounded-md" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Official Mobile <span className="text-red-500">*</span></label>
                    <input id="mobile" type="tel" placeholder="1234567890" className="w-full border p-2 rounded-md" value={formData.mobile} onChange={(e) => handleChange('mobile', e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="linkedinProfile" className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                    <input id="linkedinProfile" type="url" placeholder="https://linkedin.com/in/username" className="w-full border p-2 rounded-md" value={formData.linkedinProfile} onChange={(e) => handleChange('linkedinProfile', e.target.value)} />
                </div>

                <div>
                     <label htmlFor="minStudentsToBePlaced" className="block text-sm font-medium text-gray-700 mb-1">Minimum Students to be Placed <span className="text-red-500">*</span></label>
                     <div className="relative">
                         <select id="minStudentsToBePlaced" className="block w-full border border-gray-300 rounded-md px-3 py-2 appearance-none pr-10" value={formData.minStudentsToBePlaced} onChange={(e) => handleChange('minStudentsToBePlaced', e.target.value)} required >
                             <option value="">Select Range</option>
                             {minStudentsOptions.map(option => (<option key={option} value={option}>{option}</option>))}
                         </select>
                         <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"><ChevronDown size={16} className="text-gray-400" /></div>
                     </div>
                </div>

                <div className="flex justify-between pt-6">
                    <button type="button" onClick={onBackClick} className="text-blue-600 hover:text-blue-800 font-medium">← Back to Home</button>
                    <button type="submit" className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">Register</button>
                </div>
            </form>
        </div>
    );
}