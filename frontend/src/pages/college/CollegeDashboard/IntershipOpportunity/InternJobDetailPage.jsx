// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { jobs } from '@/constants/collegedashboard/jobs';
// //import Header from '../components/Header'
//  import { getInternshipDetail } from '@/lib/User_AxiosInstance' ;

// const InternJobDetailPage = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState(null);
//   const [isSaved, setIsSaved] = useState(false);

//   useEffect(() => {
//     if (id) {
//       const foundJob = jobs.find(j => j.id === id);
//       if (foundJob) {
//         setJob(foundJob);
//         // Set document title
//         document.title = `${foundJob.title} at ${foundJob.company}`;
//       }
//     }
    
//     return () => {
//       document.title = 'Campus Jobs';
//     };
//   }, [id]);

//   if (!job) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading job details...</p>
//         </div>
//       </div>
//     );
//   }

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: `${job.title} at ${job.company}`,
//         text: `Check out this job opportunity: ${job.title} at ${job.company}`,
//         url: window.location.href,
//       })
//         .catch((error) => console.log('Error sharing', error));
//     } else {
//       // Fallback for browsers that don't support navigator.share
//       navigator.clipboard.writeText(window.location.href)
//         .then(() => alert('Link copied to clipboard!'))
//         .catch(() => alert('Failed to copy link'));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* <Header /> */}
      
//       <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <Link to="/college-dashboard/internship-opportunities" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//           </svg>
//           Back to jobs
//         </Link>
        
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           {/* Header Section */}
//           <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
//             <div className="text-sm text-blue-600 font-medium">Registrations Open</div>
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2">
//               <h1 className="text-2xl font-bold text-gray-900">{job.company}</h1>
//               <div className="flex items-center mt-2 md:mt-0">
//                 <a 
//                   href={job.companyInfo.website ? `https://${job.companyInfo.website}` : '#'} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:text-blue-800 text-sm mr-6"
//                 >
//                   {job.companyInfo.website}
//                 </a>
//               </div>
//             </div>
            
//             <div className="flex flex-col sm:flex-row justify-between mt-4">
//               <div className="flex items-center text-sm text-gray-600">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//                 <span>{job.eventDates.start} - {job.eventDates.end}</span>
//               </div>
//               <div className="flex items-center mt-2 sm:mt-0 text-sm text-gray-600">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 <span>{job.isHybridEvent ? 'Hybrid Event' : 'In-person Event'}</span>
//               </div>
//             </div>
            
//             <div className="flex space-x-2 mt-4">
//               <button className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none">
//                 Register Now
//               </button>
//               <button 
//                 onClick={() => setIsSaved(!isSaved)}
//                 className={`inline-flex items-center justify-center px-4 py-2 border ${isSaved ? 'border-gray-300 bg-gray-50' : 'border-gray-300 bg-white'} text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none`}
//               >
//                 <svg 
//                   xmlns="http://www.w3.org/2000/svg" 
//                   className={`h-5 w-5 mr-1 ${isSaved ? 'text-blue-600 fill-current' : 'text-gray-400'}`} 
//                   viewBox="0 0 20 20" 
//                   fill={isSaved ? 'currentColor' : 'none'}
//                   stroke="currentColor"
//                 >
//                   <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
//                 </svg>
//                 {isSaved ? 'Saved' : 'Save'}
//               </button>
//               <button 
//                 onClick={handleShare}
//                 className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                   <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
//                 </svg>
//                 Share
//               </button>
//             </div>
//           </div>
          
//           {/* About Section */}
//           <div className="px-6 py-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">About {job.company}</h2>
//             <p className="text-gray-700 mb-6">{job.companyInfo.about}</p>
            
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <div className="text-2xl font-bold text-gray-900">{job.companyInfo.stats.employees}</div>
//                 <div className="text-sm text-gray-600">Employees</div>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <div className="text-2xl font-bold text-gray-900">{job.companyInfo.stats.revenue}</div>
//                 <div className="text-sm text-gray-600">Revenue</div>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <div className="text-2xl font-bold text-gray-900">{job.companyInfo.stats.industries}</div>
//                 <div className="text-sm text-gray-600">Industries</div>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <div className="text-2xl font-bold text-gray-900">{job.companyInfo.stats.countries}</div>
//                 <div className="text-sm text-gray-600">Countries</div>
//               </div>
//             </div>
//           </div>
          
//           {/* Program Details */}
//           <div className="px-6 py-6 border-t border-gray-200">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Program Details</h2>
//             <div className="space-y-4">
//               <div className="flex items-start">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//                 <div>
//                   <div className="font-medium text-gray-900">{job.programDetails.eligibleDegrees.join(', ')}</div>
//                   <div className="text-sm text-gray-500">(2025 batch)</div>
//                 </div>
//               </div>
//               <div className="flex items-start">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                 </svg>
//                 <div>
//                   <div className="font-medium text-gray-900">{job.programDetails.cutoff}</div>
//                 </div>
//               </div>
//               <div className="flex items-start">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 <div>
//                   <div className="font-medium text-gray-900">{job.programDetails.locations.join(', ')}</div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="mt-6">
//               <h3 className="font-medium text-gray-900">Compensation</h3>
//               <div className="mt-2 px-4 py-3 bg-gray-50 rounded-lg">
//                 <div className="text-xl font-bold text-gray-900">{job.programDetails.compensation.amount}</div>
//                 <div className="text-sm text-gray-600">{job.programDetails.compensation.details}</div>
//               </div>
//             </div>
//           </div>
          
//           {/* Description */}
//           <div className="px-6 py-6 border-t border-gray-200">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
//             <div className="prose max-w-none text-gray-700">
//               <p className="mb-4">About The Role:</p>
//               <p className="mb-4">{job.description}</p>
              
//               <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Key Responsibilities</h3>
//               <ul className="list-disc pl-5 space-y-2 mb-6">
//                 <li>Collaborate with cross-functional teams</li>
//                 <li>Write clean, maintainable and testable code</li>
//                 <li>Participate in code reviews</li>
//                 <li>Support deployment and release monitoring</li>
//                 <li>Learn and apply emerging technologies</li>
//               </ul>
              
//               <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">What We're Looking For</h3>
//               <ul className="list-disc pl-5 space-y-2">
//                 <li><strong>Education:</strong> Currently pursuing or recently completed a degree in Computer Science, Engineering, or a related field</li>
//                 <li><strong>Technical Skills:</strong> Proficiency in relevant programming languages and tools</li>
//                 <li><strong>Communication:</strong> Strong verbal and written communication skills</li>
//                 <li><strong>Team Player:</strong> Ability to collaborate effectively with cross-functional teams</li>
//               </ul>
//             </div>
//           </div>
          
//           {/* Job Details */}
//           <div className="px-6 py-6 border-t border-gray-200">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Job Details</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
//               <div>
//                 <div className="text-sm font-medium text-gray-500">Job Role</div>
//                 <div className="mt-1 text-base text-gray-900">{job.jobDetails.role}</div>
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-gray-500">Industry Type</div>
//                 <div className="mt-1 text-base text-gray-900">{job.jobDetails.industry}</div>
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-gray-500">Department</div>
//                 <div className="mt-1 text-base text-gray-900">{job.jobDetails.department}</div>
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-gray-500">Employment Type</div>
//                 <div className="mt-1 text-base text-gray-900">{job.jobDetails.employmentType}</div>
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-gray-500">Role Category</div>
//                 <div className="mt-1 text-base text-gray-900">{job.jobDetails.roleCategory}</div>
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-gray-500">Work Mode</div>
//                 <div className="mt-1 text-base text-gray-900">{job.jobDetails.workMode}</div>
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-gray-500">Job Location</div>
//                 <div className="mt-1 text-base text-gray-900">{job.jobDetails.locations.join(', ')}</div>
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-gray-500">Joining Date</div>
//                 <div className="mt-1 text-base text-gray-900">{job.jobDetails.joiningDate}</div>
//               </div>
//             </div>
//           </div>
          
//           {/* Eligibility Criteria */}
//           <div className="px-6 py-6 border-t border-gray-200">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Eligibility Criteria</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
//               <div>
//                 <div className="text-sm font-medium text-gray-500">Eligible Degrees</div>
//                 <div className="mt-1 text-base text-gray-900">{job.eligibility.degrees.join(' / ')}</div>
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-gray-500">Eligible Branches</div>
//                 <div className="mt-1 text-base text-gray-900">{job.eligibility.branches.join(', ')}</div>
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-gray-500">Graduation Year</div>
//                 <div className="mt-1 text-base text-gray-900">{job.eligibility.graduationYear}</div>
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-gray-500">Minimum 10th Score</div>
//                 <div className="mt-1 text-base text-gray-900">{job.eligibility.minimumScores.tenth}%</div>
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-gray-500">Minimum 12th Score</div>
//                 <div className="mt-1 text-base text-gray-900">{job.eligibility.minimumScores.twelfth}%</div>
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-gray-500">Minimum UG CGPA</div>
//                 <div className="mt-1 text-base text-gray-900">{job.eligibility.minimumScores.cgpa}</div>
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-gray-500">Backlogs</div>
//                 <div className="mt-1 text-base text-gray-900">No active backlogs</div>
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-gray-500">Education Gap</div>
//                 <div className="mt-1 text-base text-gray-900">Maximum 1 year allowed between studies</div>
//               </div>
//             </div>
//           </div>
          
//           {/* Compensation & Benefits */}
//           <div className="px-6 py-6 border-t border-gray-200">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Compensation & Benefits</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <div className="text-sm font-medium text-gray-500">Total CTC</div>
//                 <div className="text-xl font-bold text-gray-900">₹5.00 LPA</div>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <div className="text-sm font-medium text-gray-500">Fixed Pay</div>
//                 <div className="text-xl font-bold text-gray-900">₹4.60 LPA</div>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <div className="text-sm font-medium text-gray-500">Joining Bonus</div>
//                 <div className="text-xl font-bold text-gray-900">₹40,000</div>
//               </div>
//             </div>
            
//             <h3 className="font-medium text-gray-900 mt-6 mb-2">Benefits</h3>
//             <ul className="list-disc pl-5 space-y-1">
//               {job.benefits.map((benefit, index) => (
//                 <li key={index} className="text-gray-700">{benefit}</li>
//               ))}
//             </ul>
//           </div>
          
//           {/* Selection Process */}
//           <div className="px-6 py-6 border-t border-gray-200">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Selection Process</h2>
            
//             <div className="relative">
//               <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-gray-200">
//                 <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 w-1/5"></div>
//               </div>
//               <div className="flex justify-between mb-8">
//                 {job.selectionProcess.steps.map((step, index) => (
//                   <div key={index} className={`flex flex-col items-center ${index === 0 ? 'text-blue-600' : 'text-gray-400'}`}>
//                     <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${index === 0 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white'}`}>
//                       {index + 1}
//                     </div>
//                     <div className="text-xs mt-1 text-center">{step}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <h3 className="font-medium text-gray-900 mt-6 mb-4">Important Dates</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div className="border border-gray-300 rounded p-4">
//                 <div className="text-center">
//                   <div className="text-sm font-medium text-gray-500">Registration Deadline</div>
//                   <div className="mt-1 text-lg font-medium text-gray-900">{job.selectionProcess.dates.registrationDeadline}</div>
//                 </div>
//               </div>
//               <div className="border border-gray-300 rounded p-4">
//                 <div className="text-center">
//                   <div className="text-sm font-medium text-gray-500">Online Test Date</div>
//                   <div className="mt-1 text-lg font-medium text-gray-900">{job.selectionProcess.dates.onlineTest}</div>
//                 </div>
//               </div>
//               <div className="border border-gray-300 rounded p-4">
//                 <div className="text-center">
//                   <div className="text-sm font-medium text-gray-500">Interview Window</div>
//                   <div className="mt-1 text-lg font-medium text-gray-900">{job.selectionProcess.dates.interview}</div>
//                 </div>
//               </div>
//               <div className="border border-gray-300 rounded p-4">
//                 <div className="text-center">
//                   <div className="text-sm font-medium text-gray-500">Offer Rollout</div>
//                   <div className="mt-1 text-lg font-medium text-gray-900">{job.selectionProcess.dates.offerRollout}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Required Documents */}
//           <div className="px-6 py-6 border-t border-gray-200">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Required Documents</h2>
//             <ul className="list-disc pl-5 space-y-1">
//               {job.requiredDocuments.map((doc, index) => (
//                 <li key={index} className="text-gray-700">{doc}</li>
//               ))}
//             </ul>
//           </div>
          
//           {/* How to Apply */}
//           <div className="px-6 py-6 border-t border-gray-200">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">How to Apply</h2>
//             <p className="text-gray-700 mb-4">
//               Students can apply through the <span className="text-blue-600">TalentConnect Portal</span> or their college placement cell.
//               Make sure to complete your profile and upload all necessary documents before the deadline.
//             </p>
            
//             <div className="mt-6">
//               <h3 className="font-medium text-gray-900 mb-2">College Placement Officer Contact:</h3>
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <div className="flex items-start">
//                   <div className="mr-3 flex-shrink-0">
//                     <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                       </svg>
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-base font-medium text-gray-900">{job.contactInfo.name}</div>
//                     <div className="flex items-center mt-1">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                       </svg>
//                       <a href={`mailto:${job.contactInfo.email}`} className="text-blue-600 hover:text-blue-800 text-sm">{job.contactInfo.email}</a>
//                     </div>
//                     <div className="flex items-center mt-1">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                       <a href={`tel:${job.contactInfo.phone}`} className="text-blue-600 hover:text-blue-800 text-sm">{job.contactInfo.phone}</a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Additional Resources */}
//           <div className="px-6 py-6 border-t border-gray-200">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Resources</h2>
//             <div className="space-y-3">
//               <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                 </svg>
//                 Download Job Brochure (PDF)
//               </a>
//               <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                 </svg>
//                 Watch Day in the Life at {job.company}
//               </a>
//               <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//                 </svg>
//                 Glassdoor Reviews
//               </a>
//             </div>
//           </div>
          
//           {/* Note to Students */}
//           <div className="px-6 py-6 border-t border-gray-200">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Note to Students</h2>
//             <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm text-blue-700">
//                     Please keep your TalentConnect profile updated and check your registered email for test links and interview schedules. No communication will be sent via SMS or WhatsApp.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default InternJobDetailPage;




import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getInternshipById } from '@/lib/User_AxiosInstance';

import { ApplyForCampusInternship, ApplyForPoolCampus, SaveOppurtunity } from '@/lib/College_AxiosIntance';

const InternJobDetailPage = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobDetail = async () => {
            if (!id) {
                setLoading(false);
                setError("No internship ID provided.");
                return;
            }
            try {
                setLoading(true);
                const response = await getInternshipById(id);
                const jobData = response.data;
                
                if (jobData) {
                    const mappedJob = {
                        _id: jobData._id,
                        company: jobData.companyPosted?.companyDetails?.companyName || 'Not specified',
                        title: jobData.jobTitle || 'Not specified',
                        description: jobData.description || 'No description provided.',
                        eventDates: {
                            start: jobData.startDate ? new Date(jobData.startDate).toLocaleDateString() : 'N/A',
                            end: jobData.endDate ? new Date(jobData.endDate).toLocaleDateString() : 'N/A',
                        },
                        isHybridEvent: jobData.workMode === 'Hybrid',
                        companyInfo: {
                            website: jobData.companyPosted?.companyDetails?.websiteUrl || 'N/A',
                            about: jobData.companyPosted?.companyDetails?.description || 'N/A',
                            stats: {
                                employees: jobData.companyPosted?.companyDetails?.numberOfEmployees || 'N/A',
                                revenue: 'N/A', // Not in schema
                                industries: jobData.companyPosted?.companyDetails?.industryType || 'N/A',
                                countries: jobData.companyPosted?.companyDetails?.country ||'N/A',
                            },
                        },
                        programDetails: {
                            eligibleDegrees: jobData.minEducation || 'Not specified',
                            cutoff: 'Not specified', // Not in schema
                            locations: jobData.location || [],
                            compensation: {
                                amount: jobData.minPackage?.amount ? `${jobData.minPackage.currency} ${jobData.minPackage.amount.toLocaleString()}` : 'N/A',
                                details: 'Per Annum' 
                            },
                        },
                        jobDetails: {
                            role: (jobData.jobRoles || []).join(', ') || 'N/A',
                            industry: jobData.companyPosted?.companyDetails?.industryType || 'N/A',
                            department: 'N/A', // Not in schema
                            employmentType: jobData.employmentType || 'N/A',
                            roleCategory: 'N/A', // Not in schema
                            workMode: jobData.workMode || 'N/A',
                            locations: jobData.location || [],
                            joiningDate: 'N/A', // Not in schema
                        },
                        eligibility: {
                            degrees: jobData.degree || [],
                            branches: jobData.studentStreams || [],
                            graduationYear: 'N/A', // Not in schema
                            minimumScores: {
                                tenth: 'N/A', 
                                twelfth: 'N/A', 
                                cgpa: 'N/A',
                            },
                        },
                        skills: jobData.skills || [],
                        certifications: jobData.certifications || [],
                        benefits: ['Health Insurance', 'Paid Time Off', 'Flexible Hours'], // Placeholder
                        selectionProcess: {
                            steps: jobData.rounds?.length > 0 ? jobData.rounds : ['N/A'],
                            dates: {
                                registrationDeadline: jobData.endDate ? new Date(jobData.endDate).toLocaleDateString() : 'N/A',
                                onlineTest: 'N/A',
                                interview: 'N/A',
                                offerRollout: 'N/A',
                            },
                        },
                        requiredDocuments: ['Resume', 'Cover Letter', 'Transcripts'], // Placeholder
                        contactInfo: {
                            name: jobData.contactPerson?.name || 'N/A',
                            email: jobData.contactPerson?.email || 'N/A',
                            phone: jobData.contactPerson?.mobile || 'N/A',
                        },
                    };
                    setJob(mappedJob);
                    document.title = `${mappedJob.title} at ${mappedJob.company}`;
                } else {
                    setError("Internship not found.");
                }
            } catch (err) {
                console.error("Error fetching job details:", err);
                setError("Failed to fetch job details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetail();

        return () => {
            document.title = 'Campus Jobs';
        };
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading job details...</p>
                </div>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center text-red-600">
                    <p>{error || "Internship not found."}</p>
                </div>
            </div>
        );
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `${job.title} at ${job.company}`,
                text: `Check out this job opportunity: ${job.title} at ${job.company}`,
                url: window.location.href,
            })
                .catch((error) => console.log('Error sharing', error));
        } else {
            navigator.clipboard.writeText(window.location.href)
                .then(() => alert('Link copied to clipboard!'))
                .catch(() => alert('Failed to copy link'));
        }
    };

    const handleApply = async () => {
        try {
            const response = await ApplyForCampusInternship(id);
            if (response?.success === true) alert("Applied");
            // else alert(response.msg)
            // }
            // else alert("Application Closed!")
        } catch (error) {
            console.log("Error: ", error);
        }
    };
    const handleSave = async (jobId, jobType) => {
        console.log("Save: ", jobId, jobType);

        try {
            const response = await SaveOppurtunity(jobId, jobType);
            if (response.success === true) alert("Saved");
            // }
            // else alert("Application Closed!")
        } catch (error) {
            console.log("Error: ", error);
            alert("Error!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link to="/college-dashboard/internship-opportunities" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to jobs
                </Link>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Header Section */}
                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                        <div className="text-sm text-blue-600 font-medium">Registrations Open</div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2">
                            <h1 className="text-2xl font-bold text-gray-900">{job.company}</h1>
                            <div className="flex items-center mt-2 md:mt-0">
                                <a
                                    href={job.companyInfo.website ? `https://${job.companyInfo.website}` : '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-sm mr-6"
                                >
                                    {job.companyInfo.website}
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between mt-4">
                            <div className="flex items-center text-sm text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{job.eventDates.start} - {job.eventDates.end}</span>
                            </div>
                            <div className="flex items-center mt-2 sm:mt-0 text-sm text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{job.isHybridEvent ? 'Hybrid Event' : 'In-person Event'}</span>
                            </div>
                        </div>

                        <div className="flex space-x-2 mt-4">
                            <button
                                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none"
                                onClick={handleApply}
                            >
                                Register Now
                            </button>
                            <button
                                onClick={() => setIsSaved(!isSaved)}
                                className={`inline-flex items-center justify-center px-4 py-2 border ${isSaved ? 'border-gray-300 bg-gray-50' : 'border-gray-300 bg-white'} text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-5 w-5 mr-1 ${isSaved ? 'text-blue-600 fill-current' : 'text-gray-400'}`}
                                    viewBox="0 0 20 20"
                                    fill={isSaved ? 'currentColor' : 'none'}
                                    stroke="currentColor"
                                >
                                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                </svg>
                                {isSaved ? 'Saved' : 'Save'}
                            </button>
                            <button
                                onClick={handleShare}
                                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                </svg>
                                Share
                            </button>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="px-6 py-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">About {job.company}</h2>
                        <p className="text-gray-700 mb-6">{job.companyInfo.about}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-gray-900">{job.companyInfo.stats.employees}</div>
                                <div className="text-sm text-gray-600">Employees</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-gray-900">{job.companyInfo.stats.revenue}</div>
                                <div className="text-sm text-gray-600">Revenue</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-gray-900">{job.companyInfo.stats.industries}</div>
                                <div className="text-sm text-gray-600">Industries</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-gray-900">{job.companyInfo.stats.countries}</div>
                                <div className="text-sm text-gray-600">Countries</div>
                            </div>
                        </div>
                    </div>

                    {/* Program Details */}
                    <div className="px-6 py-6 border-t border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Program Details</h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <div>
                                    <div className="font-medium text-gray-900">{job.programDetails.eligibleDegrees}</div>
                                    <div className="text-sm text-gray-500">(Minimum Education)</div>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <div>
                                    <div className="font-medium text-gray-900">{job.programDetails.cutoff}</div>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div>
                                    <div className="font-medium text-gray-900">{job.programDetails.locations.join(', ')}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="font-medium text-gray-900">Compensation</h3>
                            <div className="mt-2 px-4 py-3 bg-gray-50 rounded-lg">
                                <div className="text-xl font-bold text-gray-900">{job.programDetails.compensation.amount}</div>
                                <div className="text-sm text-gray-600">{job.programDetails.compensation.details}</div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="px-6 py-6 border-t border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                        <div className="prose max-w-none text-gray-700">
                            <p className="mb-4">{job.description}</p>
                            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Key Responsibilities</h3>
                            <ul className="list-disc pl-5 space-y-2 mb-6">
                                <li>Collaborate with cross-functional teams</li>
                                <li>Write clean, maintainable and testable code</li>
                                <li>Participate in code reviews</li>
                                <li>Support deployment and release monitoring</li>
                                <li>Learn and apply emerging technologies</li>
                            </ul>

                            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">What We're Looking For</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Education:</strong> Currently pursuing or recently completed a degree in Computer Science, Engineering, or a related field</li>
                                <li><strong>Technical Skills:</strong> Proficiency in relevant programming languages and tools</li>
                                <li><strong>Communication:</strong> Strong verbal and written communication skills</li>
                                <li><strong>Team Player:</strong> Ability to collaborate effectively with cross-functional teams</li>
                            </ul>
                        </div>
                    </div>

                    {/* Job Details */}
                    <div className="px-6 py-6 border-t border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Job Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                            <div>
                                <div className="text-sm font-medium text-gray-500">Job Role</div>
                                <div className="mt-1 text-base text-gray-900">{job.jobDetails.role}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Industry Type</div>
                                <div className="mt-1 text-base text-gray-900">{job.jobDetails.industry}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Department</div>
                                <div className="mt-1 text-base text-gray-900">{job.jobDetails.department}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Employment Type</div>
                                <div className="mt-1 text-base text-gray-900">{job.jobDetails.employmentType}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Role Category</div>
                                <div className="mt-1 text-base text-gray-900">{job.jobDetails.roleCategory}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Work Mode</div>
                                <div className="mt-1 text-base text-gray-900">{job.jobDetails.workMode}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Job Location</div>
                                <div className="mt-1 text-base text-gray-900">{job.jobDetails.locations.join(', ')}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Joining Date</div>
                                <div className="mt-1 text-base text-gray-900">{job.jobDetails.joiningDate}</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Skills Section */}
                    <div className="px-6 py-6 border-t border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Skills Required</h2>
                        {job.skills && job.skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {job.skills.map((skill, index) => (
                                    <span key={index} className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">No specific skills listed.</p>
                        )}
                    </div>

                    {/* Certifications Section */}
                    <div className="px-6 py-6 border-t border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Certifications</h2>
                        {job.certifications && job.certifications.length > 0 ? (
                            <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                {job.certifications.map((cert, index) => (
                                    <li key={index}>{cert}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">No certifications required.</p>
                        )}
                    </div>
                    
                    {/* Eligibility Criteria */}
                    <div className="px-6 py-6 border-t border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Eligibility Criteria</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                            <div>
                                <div className="text-sm font-medium text-gray-500">Eligible Degrees</div>
                                <div className="mt-1 text-base text-gray-900">{job.eligibility.degrees.join(' / ')}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Eligible Branches</div>
                                <div className="mt-1 text-base text-gray-900">{job.eligibility.branches.join(', ')}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Graduation Year</div>
                                <div className="mt-1 text-base text-gray-900">{job.eligibility.graduationYear}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Minimum 10th Score</div>
                                <div className="mt-1 text-base text-gray-900">{job.eligibility.minimumScores.tenth}%</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Minimum 12th Score</div>
                                <div className="mt-1 text-base text-gray-900">{job.eligibility.minimumScores.twelfth}%</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Minimum UG CGPA</div>
                                <div className="mt-1 text-base text-gray-900">{job.eligibility.minimumScores.cgpa}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Backlogs</div>
                                <div className="mt-1 text-base text-gray-900">No active backlogs</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Education Gap</div>
                                <div className="mt-1 text-base text-gray-900">Maximum 1 year allowed between studies</div>
                            </div>
                        </div>
                    </div>

                    {/* Compensation & Benefits */}
                    <div className="px-6 py-6 border-t border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Compensation & Benefits</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm font-medium text-gray-500">Total CTC</div>
                                <div className="text-xl font-bold text-gray-900">{job.programDetails.compensation.amount}</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm font-medium text-gray-500">Fixed Pay</div>
                                <div className="text-xl font-bold text-gray-900">N/A</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm font-medium text-gray-500">Joining Bonus</div>
                                <div className="text-xl font-bold text-gray-900">N/A</div>
                            </div>
                        </div>

                        <h3 className="font-medium text-gray-900 mt-6 mb-2">Benefits</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            {job.benefits.map((benefit, index) => (
                                <li key={index} className="text-gray-700">{benefit}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Selection Process */}
                    <div className="px-6 py-6 border-t border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Selection Process</h2>

                        <div className="relative">
                            <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-gray-200">
                                <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 w-1/5"></div>
                            </div>
                            <div className="flex justify-between mb-8">
                                {job.selectionProcess.steps.map((step, index) => (
                                    <div key={index} className={`flex flex-col items-center ${index === 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                                        <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${index === 0 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white'}`}>
                                            {index + 1}
                                        </div>
                                        <div className="text-xs mt-1 text-center">{step}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h3 className="font-medium text-gray-900 mt-6 mb-4">Important Dates</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="border border-gray-300 rounded p-4">
                                <div className="text-center">
                                    <div className="text-sm font-medium text-gray-500">Registration Deadline</div>
                                    <div className="mt-1 text-lg font-medium text-gray-900">{job.selectionProcess.dates.registrationDeadline}</div>
                                </div>
                            </div>
                            <div className="border border-gray-300 rounded p-4">
                                <div className="text-center">
                                    <div className="text-sm font-medium text-gray-500">Online Test Date</div>
                                    <div className="mt-1 text-lg font-medium text-gray-900">{job.selectionProcess.dates.onlineTest}</div>
                                </div>
                            </div>
                            <div className="border border-gray-300 rounded p-4">
                                <div className="text-center">
                                    <div className="text-sm font-medium text-gray-500">Interview Window</div>
                                    <div className="mt-1 text-lg font-medium text-gray-900">{job.selectionProcess.dates.interview}</div>
                                </div>
                            </div>
                            <div className="border border-gray-300 rounded p-4">
                                <div className="text-center">
                                    <div className="text-sm font-medium text-gray-500">Offer Rollout</div>
                                    <div className="mt-1 text-lg font-medium text-gray-900">{job.selectionProcess.dates.offerRollout}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Required Documents */}
                    <div className="px-6 py-6 border-t border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Required Documents</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            {job.requiredDocuments.map((doc, index) => (
                                <li key={index} className="text-gray-700">{doc}</li>
                            ))}
                        </ul>
                    </div>

                    {/* How to Apply */}
                    <div className="px-6 py-6 border-t border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">How to Apply</h2>
                        <p className="text-gray-700 mb-4">
                            Students can apply through the <span className="text-blue-600">TalentConnect Portal</span> or their college placement cell.
                            Make sure to complete your profile and upload all necessary documents before the deadline.
                        </p>

                        <div className="mt-6">
                            <h3 className="font-medium text-gray-900 mb-2">College Placement Officer Contact:</h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-start">
                                    <div className="mr-3 flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-base font-medium text-gray-900">{job.contactInfo.name}</div>
                                        <div className="flex items-center mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <a href={`mailto:${job.contactInfo.email}`} className="text-blue-600 hover:text-blue-800 text-sm">{job.contactInfo.email}</a>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <a href={`tel:${job.contactInfo.phone}`} className="text-blue-600 hover:text-blue-800 text-sm">{job.contactInfo.phone}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Resources */}
                    <div className="px-6 py-6 border-t border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Resources</h2>
                        <div className="space-y-3">
                            <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                Download Job Brochure (PDF)
                            </a>
                            <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Watch Day in the Life at {job.company}
                            </a>
                            <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                Glassdoor Reviews
                            </a>
                        </div>
                    </div>

                    {/* Note to Students */}
                    <div className="px-6 py-6 border-t border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Note to Students</h2>
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-blue-700">
                                        Please keep your TalentConnect profile updated and check your registered email for test links and interview schedules. No communication will be sent via SMS or WhatsApp.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InternJobDetailPage; 