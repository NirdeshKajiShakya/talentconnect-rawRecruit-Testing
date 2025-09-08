// import React, { useState } from 'react';
// import { ChevronDownIcon } from 'lucide-react';

// export default function RecruitmentDetails({ formData, updateFormData, nextStep, prevStep }) {
//   const [selectedService, setSelectedService] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState({
//     programs: false,
//     courses: false,
//     companies: false
//   });

//   const programOptions = ["Engineering", "Business", "Arts", "Science"];
//   const courseOptions = ["Computer Science", "Mechanical Engineering", "MBA", "Electrical Engineering"];
//   const companyOptions = ["Google", "Microsoft", "Amazon", "TCS"];

//   const toggleDropdown = (dropdown) => {
//     setDropdownOpen(prev => {
//       const isOpening = !prev[dropdown];
//       return {
//         programs: false,
//         courses: false,
//         companies: false,
//         [dropdown]: isOpening
//       };
//     });
//   };

//   const handleSingleSelect = (field, value) => {
//     updateFormData(field, value);
//     setDropdownOpen({
//       programs: false,
//       courses: false,
//       companies: false
//     });
//   };

//   const handleButtonClick = (service) => {
//     setSelectedService(service === selectedService ? null : service);
//     updateFormData('recruitmentServices', service === selectedService ? null : service);
//   };

//   const handleFileUpload = (e) => {
//     updateFormData('collegeBrochure', e.target.files[0]);
//   };

//   const isAnyDropdownOpen = Object.values(dropdownOpen).some(Boolean);

//   return (
//     <div className="fixed inset-0 bg-gray-50 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-full p-4">
//         <div className="relative w-full max-w-lg">
//           {isAnyDropdownOpen && (
//             <div
//               className="fixed inset-0 z-0"
//               onClick={() => setDropdownOpen({ programs: false, courses: false, companies: false })}
//             />
//           )}

//           <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg">
//             <h1 className="text-2xl font-bold mb-6">Placement & Recruitment Details</h1>
//             <p className="mb-6">Define your hiring partnerships and recruitment process.</p>

//             <div className="space-y-5">
//               {/* Programs Offered Dropdown */}
//               <div className="relative">
//                 <label className="block font-medium mb-2">Programs Offered</label>
//                 <div
//                   className="flex items-center justify-between p-2 w-full border border-gray-300 rounded-md cursor-pointer hover:border-gray-400"
//                   onClick={() => toggleDropdown('programs')}
//                 >
//                   <span className={formData.programsOffered ? "text-black" : "text-gray-500"}>
//                     {formData.programsOffered || "Select program"}
//                   </span>
//                   <ChevronDownIcon className={`w-5 h-5 transition-transform ${dropdownOpen.programs ? "rotate-180" : ""}`} />
//                 </div>
//                 {dropdownOpen.programs && (
//                   <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
//                     {programOptions.map(program => (
//                       <div
//                         key={program}
//                         className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${formData.programsOffered === program ? "bg-gray-100 font-medium" : ""}`}
//                         onClick={() => handleSingleSelect('programsOffered', program)}
//                       >
//                         {program}
//                         {formData.programsOffered === program && <span className="ml-2 text-gray-500">✓</span>}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Popular Courses for Recruitment */}
//               <div className="relative">
//                 <label className="block font-medium mb-2">Popular Courses for Recruitment</label>
//                 <div
//                   className="flex items-center justify-between p-2 w-full border border-gray-300 rounded-md cursor-pointer hover:border-gray-400"
//                   onClick={() => toggleDropdown('courses')}
//                 >
//                   <span className={formData.popularCourses ? "text-black" : "text-gray-500"}>
//                     {formData.popularCourses || "Select course"}
//                   </span>
//                   <ChevronDownIcon className={`w-5 h-5 transition-transform ${dropdownOpen.courses ? "rotate-180" : ""}`} />
//                 </div>
//                 {dropdownOpen.courses && (
//                   <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
//                     {courseOptions.map(course => (
//                       <div
//                         key={course}
//                         className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${formData.popularCourses === course ? "bg-gray-100 font-medium" : ""}`}
//                         onClick={() => handleSingleSelect('popularCourses', course)}
//                       >
//                         {course}
//                         {formData.popularCourses === course && <span className="ml-2 text-gray-500">✓</span>}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Preferred Hiring Companies */}
//               <div className="relative">
//                 <label className="block font-medium mb-2">Preferred Hiring Companies</label>
//                 <div
//                   className="flex items-center justify-between p-2 w-full border border-gray-300 rounded-md cursor-pointer hover:border-gray-400"
//                   onClick={() => toggleDropdown('companies')}
//                 >
//                   <span className={formData.preferredCompanies ? "text-black" : "text-gray-500"}>
//                     {formData.preferredCompanies || "Select company"}
//                   </span>
//                   <ChevronDownIcon className={`w-5 h-5 transition-transform ${dropdownOpen.companies ? "rotate-180" : ""}`} />
//                 </div>
//                 {dropdownOpen.companies && (
//                   <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
//                     {companyOptions.map(company => (
//                       <div
//                         key={company}
//                         className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${formData.preferredCompanies === company ? "bg-gray-100 font-medium" : ""}`}
//                         onClick={() => handleSingleSelect('preferredCompanies', company)}
//                       >
//                         {company}
//                         {formData.preferredCompanies === company && <span className="ml-2 text-gray-500">✓</span>}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Recruitment Services */}
//               <div className="border-t border-gray-200 pt-6">
//                 <h3 className="font-medium mb-4">Recruitment Services Required?</h3>
//                 <div className="flex gap-4 h-13">
//                   {['Job Fairs', 'Internship Support', 'Company Tie-ups'].map((service) => (
//                     <button
//                       key={service}
//                       onClick={() => handleButtonClick(service)}
//                       className={`px-6 py-2 rounded-md border ${selectedService === service ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} transition-colors duration-300`}
//                     >
//                       {service}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Upload Section */}
//               <div className="border-gray-200 pt-6">
//                 <h3 className="font-medium mb-4">Upload College Brochure</h3>
//                 <input
//                   type="file"
//                   accept=".pdf"
//                   onChange={handleFileUpload}
//                   className="block rounded-md border w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-black hover:file:bg-blue-100"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Upload PDF</p>
//               </div>
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex justify-end gap-10 mt-8">
//               <button
//                 onClick={prevStep}
//                 className="px-6 py-2 border border-gray-300 rounded-md"
//               >
//                 Back
//               </button>
//               <button
//                 onClick={nextStep}
//                 className="px-6 py-2 bg-black text-white rounded-md"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';

export default function RecruitmentDetails({ formData, updateFormData, nextStep, prevStep }) {
  const [selectedService, setSelectedService] = useState(formData.recruitmentServicesRequired || null); // Initialize with existing data
  const [dropdownOpen, setDropdownOpen] = useState({
    programs: false,
    courses: false,
    companies: false
  });

  const programOptions = ["Engineering", "Business", "Arts", "Science"];
  const courseOptions = ["Computer Science", "Mechanical Engineering", "MBA", "Electrical Engineering"];
  const companyOptions = ["Google", "Microsoft", "Amazon", "TCS"];

  const toggleDropdown = (dropdown) => {
    setDropdownOpen(prev => {
      const isOpening = !prev[dropdown];
      return {
        programs: false,
        courses: false,
        companies: false,
        [dropdown]: isOpening
      };
    });
  };

  const handleSingleSelect = (field, value) => {
    updateFormData(field, value);
    setDropdownOpen({
      programs: false,
      courses: false,
      companies: false
    });
  };

  const handleButtonClick = (service) => {
    const newService = service === selectedService ? null : service;
    setSelectedService(newService);
    updateFormData('recruitmentServicesRequired', newService); // Renamed to match backend schema
  };

  const handleFileUpload = (e) => {
    updateFormData('collegeBrochure', e.target.files[0]);
  };

  const isAnyDropdownOpen = Object.values(dropdownOpen).some(Boolean);

  return (
    <div className="fixed inset-0 bg-gray-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-full p-4">
        <div className="relative w-full max-w-lg">
          {isAnyDropdownOpen && (
            <div
              className="fixed inset-0 z-0"
              onClick={() => setDropdownOpen({ programs: false, courses: false, companies: false })}
            />
          )}

          <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Placement & Recruitment Details</h1>
            <p className="mb-6">Define your hiring partnerships and recruitment process.</p>

            <div className="space-y-5">
              {/* Programs Offered Dropdown */}
              <div className="relative">
                <label className="block font-medium mb-2">Programs Offered</label>
                <div
                  className="flex items-center justify-between p-2 w-full border border-gray-300 rounded-md cursor-pointer hover:border-gray-400"
                  onClick={() => toggleDropdown('programs')}
                >
                  <span className={formData.programsOffered ? "text-black" : "text-gray-500"}>
                    {formData.programsOffered || "Select program"}
                  </span>
                  <ChevronDownIcon className={`w-5 h-5 transition-transform ${dropdownOpen.programs ? "rotate-180" : ""}`} />
                </div>
                {dropdownOpen.programs && (
                  <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {programOptions.map(program => (
                      <div
                        key={program}
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${formData.programsOffered === program ? "bg-gray-100 font-medium" : ""}`}
                        onClick={() => handleSingleSelect('programsOffered', program)}
                      >
                        {program}
                        {formData.programsOffered === program && <span className="ml-2 text-gray-500">✓</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Popular Courses for Recruitment */}
              <div className="relative">
                <label className="block font-medium mb-2">Popular Courses for Recruitment</label>
                <div
                  className="flex items-center justify-between p-2 w-full border border-gray-300 rounded-md cursor-pointer hover:border-gray-400"
                  onClick={() => toggleDropdown('courses')}
                >
                  <span className={formData.popularCoursesForRecruitment ? "text-black" : "text-gray-500"}>
                    {formData.popularCoursesForRecruitment || "Select course"}
                  </span>
                  <ChevronDownIcon className={`w-5 h-5 transition-transform ${dropdownOpen.courses ? "rotate-180" : ""}`} />
                </div>
                {dropdownOpen.courses && (
                  <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {courseOptions.map(course => (
                      <div
                        key={course}
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${formData.popularCoursesForRecruitment === course ? "bg-gray-100 font-medium" : ""}`}
                        onClick={() => handleSingleSelect('popularCoursesForRecruitment', course)}
                      >
                        {course}
                        {formData.popularCoursesForRecruitment === course && <span className="ml-2 text-gray-500">✓</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Preferred Hiring Companies */}
              <div className="relative">
                <label className="block font-medium mb-2">Preferred Hiring Companies</label>
                <div
                  className="flex items-center justify-between p-2 w-full border border-gray-300 rounded-md cursor-pointer hover:border-gray-400"
                  onClick={() => toggleDropdown('companies')}
                >
                  <span className={formData.preferredHiringCompanies ? "text-black" : "text-gray-500"}>
                    {formData.preferredHiringCompanies || "Select company"}
                  </span>
                  <ChevronDownIcon className={`w-5 h-5 transition-transform ${dropdownOpen.companies ? "rotate-180" : ""}`} />
                </div>
                {dropdownOpen.companies && (
                  <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {companyOptions.map(company => (
                      <div
                        key={company}
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${formData.preferredHiringCompanies === company ? "bg-gray-100 font-medium" : ""}`}
                        onClick={() => handleSingleSelect('preferredHiringCompanies', company)}
                      >
                        {company}
                        {formData.preferredHiringCompanies === company && <span className="ml-2 text-gray-500">✓</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recruitment Services */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium mb-4">Recruitment Services Required?</h3>
                <div className="flex gap-4 h-13">
                  {['Job Fairs', 'Internship Support', 'Company Tie-ups'].map((service) => (
                    <button
                      key={service}
                      onClick={() => handleButtonClick(service)}
                      className={`px-6 py-2 rounded-md border ${selectedService === service ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} transition-colors duration-300`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Section */}
              <div className="border-gray-200 pt-6">
                <h3 className="font-medium mb-4">Upload College Brochure</h3>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="block rounded-md border w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-black hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-1">Upload PDF</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-10 mt-8">
              <button
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 rounded-md"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-black text-white rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}