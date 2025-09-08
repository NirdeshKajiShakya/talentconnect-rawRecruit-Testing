import { useState } from 'react';
import axios from 'axios';
import { ChevronDown } from 'lucide-react'; // Import ChevronDown for the selects

export default function OffCampusHiringForm() {
  // Define initial state
  const initialState = {
    venue: '',
    collegeTypes: '', // Changed to a string to match the select input
    studentStreams: '', // Changed to a string to match the select input
    criteria: '', // Renamed to description to match backend schema
    minPackage: {
      currency: 'INR',
      amount: ''
    },
    workLocations: '', // Changed to a string to match the select input
    jobRoles: '', // Changed to a string to match the select input
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    placementStartDate: '',
    placementEndDate: '',
    numberOfRounds: '', // Changed to a string to match the select input
    selectionProcess: '', // Changed to a string to match the select input
    contactPerson: {
      name: '',
      designation: '',
      email: '',
      mobile: '',
      linkedin: '',
    },
    minStudents: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Special handling for date inputs
    if (name === 'placementStartDate' || name === 'placementEndDate') {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    // Set the value directly. It will be converted to an array in handleSubmit.
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handlePackageChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      minPackage: {
        ...formData.minPackage,
        [name]: value,
      },
    });
  };
  
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      contactPerson: {
        ...formData.contactPerson,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem('token') || document.cookie.split('; ').find(row => row.startsWith('jwt='))?.split('=')[1];

      // Prepare the data for backend, ensuring fields match the schema
      const submissionData = {
        venue: formData.venue,
        // The backend schema expects arrays of strings. We convert the single select value to an array here.
        collegeTypes: formData.collegeTypes ? [formData.collegeTypes] : [],
        studentStreams: formData.studentStreams ? [formData.studentStreams] : [],
        description: formData.criteria, // Mapped 'criteria' to 'description'
        minPackage: {
            currency: formData.minPackage.currency,
            amount: parseFloat(formData.minPackage.amount) // Ensure amount is a number
        },
        location: formData.workLocations ? [formData.workLocations] : [], // Mapped 'workLocations' to 'location'
        jobRoles: formData.jobRoles ? [formData.jobRoles] : [],
        workMode: formData.workMode,
        employmentType: formData.employmentType,
        startDate: formData.placementStartDate, // Mapped 'placementStartDate' to 'startDate'
        endDate: formData.placementEndDate, // Mapped 'placementEndDate' to 'endDate'
        rounds: formData.numberOfRounds ? [formData.numberOfRounds] : [], // Mapped 'numberOfRounds' to 'rounds'
        selectionProcess: formData.selectionProcess ? [formData.selectionProcess] : [],
        contactPerson: {
          name: formData.contactPerson.name,
          designation: formData.contactPerson.designation,
          email: formData.contactPerson.email,
          mobile: formData.contactPerson.mobile,
          linkedin: formData.contactPerson.linkedin,
        },
        minimumStudents: formData.minStudents,
        jobType: "Pool-campus", // Explicitly setting the jobType
      };

      const response = await axios.post(
        `${import.meta.env.VITE_Backend_URL}/api/employer/hiring-channel/create-poolCampusJob`,
        submissionData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );

      console.log('Submission response:', response.data);

      if (response.status === 201) {
        setSubmitSuccess(true);
        // Use a modal or a div instead of alert
        alert('Your pool campus hiring request has been submitted successfully.');
        setFormData(initialState);
      }
    } catch (err) {
      console.error('Submission error:', err);
      if (err.response) {
        setError(err.response.data.message || err.response.data.error || 'Failed to submit form. Please try again.');
        // Use a modal or a div instead of alert
        alert(err.response.data.message || err.response.data.error || 'Failed to submit form. Please try again.');
      } else {
        setError('Network error. Please check your connection.');
        alert('Network error. Please check your connection.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enhanced options for all dropdowns (unchanged from your original code)
  const locations = [
    'Online',
    'Bangalore',
    'Mumbai',
    'Delhi',
    'Hyderabad',
    'Chennai',
    'Pune',
    'Kolkata',
    'Ahmedabad',
    'Jaipur',
    'Other'
  ];

  const collegeTypes = [
    'Engineering',
    'Medical',
    'Management',
    'Arts & Science',
    'Law',
    'Pharmacy',
    'Architecture',
    'Polytechnic',
    'ITI',
    'Other'
  ];

  const studentStreams = [
    'Computer Science',
    'Electronics',
    'Mechanical',
    'Civil',
    'Electrical',
    'Information Technology',
    'Biotechnology',
    'Chemical',
    'Aerospace',
    'Automobile',
    'MBA',
    'BBA',
    'B.Com',
    'B.Sc',
    'BA',
    'B.Tech',
    'M.Tech',
    'PhD',
    'Other'
  ];

  const workLocations = [
    'Bangalore',
    'Mumbai',
    'Delhi NCR',
    'Hyderabad',
    'Chennai',
    'Pune',
    'Kolkata',
    'Ahmedabad',
    'Jaipur',
    'Remote',
    'International',
    'Multiple Locations',
    'Other'
  ];

  const jobRoles = [
    'Software Developer',
    'Data Scientist',
    'DevOps Engineer',
    'QA Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Mobile App Developer',
    'UI/UX Designer',
    'Product Manager',
    'Business Analyst',
    'Data Analyst',
    'Machine Learning Engineer',
    'Cloud Architect',
    'Network Engineer',
    'Cyber Security Specialist',
    'Technical Writer',
    'Sales Engineer',
    'Marketing Specialist',
    'HR Recruiter',
    'Finance Analyst',
    'Other'
  ];

  const numberOfRoundsOptions = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6+'
  ];

  const selectionProcessOptions = [
    'Online Test',
    'Technical Interview',
    'HR Interview',
    'Group Discussion',
    'Case Study',
    'Presentation',
    'Coding Challenge',
    'Aptitude Test',
    'Psychometric Test',
    'Combination of above'
  ];

  const designationOptions = [
    'HR Manager',
    'Technical Recruiter',
    'Talent Acquisition',
    'Hiring Manager',
    'Team Lead',
    'Department Head',
    'CEO',
    'CTO',
    'Founder',
    'Other'
  ];

  const minimumStudentsOptions = [
    '1-10',
    '11-25',
    '26-50',
    '51-100',
    '101-200',
    '201-500',
    '500+'
  ];


  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">Pool Campus Connect:</h1>
          <h2 className="text-3xl font-bold mb-4">Hire Bigger</h2>
        </div>
        <div className="md:w-1/2">
          <p className="text-sm">
            Tap into diverse talent from multiple institutions through one powerful drive. <br /> Pool Campus Connect brings students from several colleges together, making it easier for companies to conduct centralized hiring drive that are time-saving, cost-efficient, and great for brand visibility
          </p>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Registration Form */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-4">Register for Pool Campus Hiring</h2>
        <p className="text-center text-gray-500 mb-6">Fill in the details below to register for the hiring drive</p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block mb-1 font-medium">Pool Campus Hiring Venue</label>
              <div className="relative">
                <select
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  className="w-full p-2 border rounded appearance-none pr-8 bg-white"
                  required
                >
                  <option value="" disabled>Select location</option>
                  {locations.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Type of College</label>
              <div className="relative">
                <select
                  name="collegeTypes"
                  value={formData.collegeTypes}
                  onChange={handleArrayChange}
                  className="w-full p-2 border rounded appearance-none pr-8 bg-white"
                  required
                >
                  <option value="" disabled>Select college type</option>
                  {collegeTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Student Stream / Degree</label>
              <div className="relative">
                <select
                  name="studentStreams"
                  value={formData.studentStreams}
                  onChange={handleArrayChange}
                  className="w-full p-2 border rounded appearance-none pr-8 bg-white"
                  required
                >
                  <option value="" disabled>Select stream</option>
                  {studentStreams.map((stream, index) => (
                    <option key={index} value={stream}>{stream}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Criteria</label>
              <textarea
                name="criteria" // This will be mapped to 'description'
                value={formData.criteria}
                onChange={handleChange}
                placeholder="Example: Minimum 60% aggregate, No active backlogs, Good communication skills..."
                className="w-full p-2 border rounded resize-none h-24"
                required
              ></textarea>
            </div>

            <div>
              <label className="block mb-1 font-medium">Minimum Package Offered</label>
              <div className="flex">
                <div className="relative">
                  <select
                    name="currency"
                    value={formData.minPackage.currency}
                    onChange={handlePackageChange}
                    className="py-2 px-3 border rounded-l bg-white"
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
                <input
                  type="number"
                  name="amount"
                  value={formData.minPackage.amount}
                  onChange={handlePackageChange}
                  placeholder="Enter amount (e.g. 500000)"
                  className="flex-grow p-2 border border-l-0 rounded-r"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Work Location</label>
              <div className="relative">
                <select
                  name="workLocations" // This will be mapped to 'location'
                  value={formData.workLocations}
                  onChange={handleArrayChange}
                  className="w-full p-2 border rounded appearance-none pr-8 bg-white"
                  required
                >
                  <option value="" disabled>Select work location</option>
                  {workLocations.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Second section */}
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Job Role</label>
              <div className="relative">
                <select
                  name="jobRoles"
                  value={formData.jobRoles}
                  onChange={handleArrayChange}
                  className="w-full p-2 border rounded appearance-none pr-8 bg-white"
                  required
                >
                  <option value="" disabled>Select job role</option>
                  {jobRoles.map((role, index) => (
                    <option key={index} value={role}>{role}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Work Mode</label>
              <div className="flex space-x-2">
                <div className="inline-flex items-center">
                  <input
                    type="radio"
                    id="hybrid"
                    name="workMode"
                    value="Hybrid"
                    checked={formData.workMode === "Hybrid"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="hybrid"
                    className={`px-4 py-2 text-sm border rounded-md cursor-pointer ${formData.workMode === 'Hybrid' ? 'bg-black text-white' : 'bg-white'}`}
                  >
                    Hybrid
                  </label>
                </div>
                <div className="inline-flex items-center">
                  <input
                    type="radio"
                    id="onsite"
                    name="workMode"
                    value="On-site"
                    checked={formData.workMode === "On-site"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="onsite"
                    className={`px-4 py-2 text-sm border rounded-md cursor-pointer ${formData.workMode === 'On-site' ? 'bg-black text-white' : 'bg-white'}`}
                  >
                    On-site
                  </label>
                </div>
                <div className="inline-flex items-center">
                  <input
                    type="radio"
                    id="remote"
                    name="workMode"
                    value="Remote"
                    checked={formData.workMode === "Remote"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="remote"
                    className={`px-4 py-2 text-sm border rounded-md cursor-pointer ${formData.workMode === 'Remote' ? 'bg-black text-white' : 'bg-white'}`}
                  >
                    Remote
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Employment type</label>
              <div className="flex space-x-2">
                <div className="inline-flex items-center">
                  <input
                    type="radio"
                    id="parttime"
                    name="employmentType"
                    value="Part-time"
                    checked={formData.employmentType === "Part-time"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="parttime"
                    className={`px-4 py-2 text-sm border rounded-md cursor-pointer ${formData.employmentType === 'Part-time' ? 'bg-black text-white' : 'bg-white'}`}
                  >
                    Part-time
                  </label>
                </div>
                <div className="inline-flex items-center">
                  <input
                    type="radio"
                    id="fulltime"
                    name="employmentType"
                    value="Full-time"
                    checked={formData.employmentType === "Full-time"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="fulltime"
                    className={`px-4 py-2 text-sm border rounded-md cursor-pointer ${formData.employmentType === 'Full-time' ? 'bg-black text-white' : 'bg-white'}`}
                  >
                    Full-time
                  </label>
                </div>
                <div className="inline-flex items-center">
                  <input
                    type="radio"
                    id="contract"
                    name="employmentType"
                    value="Contract"
                    checked={formData.employmentType === "Contract"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="contract"
                    className={`px-4 py-2 text-sm border rounded-md cursor-pointer ${formData.employmentType === 'Contract' ? 'bg-black text-white' : 'bg-white'}`}
                  >
                    Contract
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Tentative Date of Placement / Hiring</label>
              <div className="flex space-x-2">
                <div className="w-1/2 mt mt-3 ">
                  <label className="block text-xs mb-1 ml-2 font-medium ">Start Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="placementStartDate"
                      value={formData.placementStartDate}
                      onChange={handleChange}
                      className="w-full p-2 border rounded appearance-none pr-8 bg-white focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="w-1/2 mt-3  ">
                  <label className="block text-xs mb-1 ml-2 font-medium  ">End Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="placementEndDate"
                      value={formData.placementEndDate}
                      onChange={handleChange}
                      className="w-full p-2 border rounded appearance-none pr-8 bg-white focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Number of Rounds</label>
              <div className="relative">
                <select
                  name="numberOfRounds"
                  value={formData.numberOfRounds}
                  onChange={handleArrayChange}
                  className="w-full p-2 border rounded appearance-none pr-8 bg-white"
                  required
                >
                  <option value="" disabled>Select number of rounds</option>
                  {numberOfRoundsOptions.map((round, index) => (
                    <option key={index} value={round}>{round}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Process of Selection</label>
              <div className="relative">
                <select
                  name="selectionProcess"
                  value={formData.selectionProcess}
                  onChange={handleArrayChange}
                  className="w-full p-2 border rounded appearance-none pr-8 bg-white"
                  required
                >
                  <option value="" disabled>Select selection process</option>
                  {selectionProcessOptions.map((process, index) => (
                    <option key={index} value={process}>{process}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Contact Person Details */}
            <div>
              <label className="block mb-1 font-medium">Contact Person</label>
              <input
                type="text"
                name="name"
                value={formData.contactPerson.name}
                onChange={handleContactChange}
                placeholder="Enter full name"
                className="w-full p-2 border rounded mb-2"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Contact person designation *</label>
              <div className="relative">
                <select
                  name="designation"
                  value={formData.contactPerson.designation}
                  onChange={handleContactChange}
                  className="w-full p-2 border rounded appearance-none pr-8 bg-white"
                  required
                >
                  <option value="" disabled>Select designation</option>
                  {designationOptions.map((designation, index) => (
                    <option key={index} value={designation}>{designation}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Contact person email *</label>
              <div className="relative flex items-center border rounded pl-2">
                <span className="text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.contactPerson.email}
                  onChange={handleContactChange}
                  placeholder="example@company.com"
                  className="w-full p-2 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Contact person mobile no *</label>
              <div className="relative flex items-center border rounded pl-2">
                <span className="text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </span>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.contactPerson.mobile}
                  onChange={handleContactChange}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full p-2 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Contact person LinkedIn Profile</label>
              <input
                type="url"
                name="linkedin"
                value={formData.contactPerson.linkedin}
                onChange={handleContactChange}
                placeholder="https://www.linkedin.com/in/username"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Minimum Students to be Hired</label>
              <div className="relative">
                <select
                  name="minStudents"
                  value={formData.minStudents}
                  onChange={handleChange}
                  className="w-full p-2 border rounded appearance-none pr-8 bg-white"
                  required
                >
                  <option value="" disabled>Select minimum students</option>
                  {minimumStudentsOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-black text-white font-medium rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Register'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
