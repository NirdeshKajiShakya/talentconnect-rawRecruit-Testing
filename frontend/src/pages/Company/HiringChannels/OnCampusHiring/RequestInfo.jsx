import { useState } from 'react';
import axios from 'axios'; // Import axios
import { ChevronDown, Mail, Phone, Link } from 'lucide-react';

export default function RequestInfo() {
  const initialData = {
    degree: '',
    preferredLocations: [],
    lookingFor: '',
    employmentType: '',
    minimumSalary: '',
    startDate: '',
    endDate: '',
    rounds: '',
    selectionProcess: [],
    contactPersonName: '',
    contactDesignation: '',
    email: '',
    mobile: '',
    linkedin: '',
    minimumStudents: ''
  };
  const [formData, setFormData] = useState(initialData);
  const [currency, setCurrency] = useState('USD');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleOptionSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token') || document.cookie.split('; ').find(row => row.startsWith('jwt='))?.split('=')[1];

      // Map frontend formData to the backend schema
      const payload = {
        degree: formData.degree ? [formData.degree] : [],
        location: formData.preferredLocations,
        lookingFor: formData.lookingFor,
        employmentType: formData.employmentType,
        minPackage: {
          currency: currency,
          amount: parseFloat(formData.minimumSalary) || 0
        },
        startDate: formData.startDate,
        endDate: formData.endDate,
        rounds: formData.rounds ? [formData.rounds] : [],
        selectionProcess: formData.selectionProcess,
        contactPerson: {
          name: formData.contactPersonName,
          designation: formData.contactDesignation,
          email: formData.email,
          mobile: formData.mobile,
          linkedin: formData.linkedin,
        },
        minimumStudents: formData.minimumStudents,
        jobType: 'On-campus',
      };

      const response = await axios.post(
        `${import.meta.env.VITE_Backend_URL}/api/hiring-channels/on-campus`,
        payload,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 201) {
        alert('Form submitted successfully!');
        setFormData(initialData); // Reset form data
        setCurrency('USD');
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(`Submission failed: ${err.response.data.message || err.response.data.error}`);
      } else if (err.request) {
        // The request was made but no response was received
        alert('Submission failed: No response from server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        alert(`An error occurred: ${err.message}`);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">OnCampus Connect:</h1>
          <h2 className="text-2xl font-bold mb-4">Hire Smarter</h2>
        </div>
        <div className="max-w-md">
          <p className="text-sm">
            Our OnCampus service brings career opportunities directly to students, connecting them with top employers through campus recruitment drives and job events.
          </p>
        </div>
      </div>

      {/* Main heading */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">Register for On-Campus Hiring</h2>
        <p className="text-gray-500 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Degree */}
        <div>
          <label htmlFor="degree" className="block mb-2 font-medium">Degree</label>
          <div className="relative">
            <select
              id="degree"
              name="degree"
              className="w-full p-2 border border-gray-300 rounded appearance-none bg-white pr-10"
              value={formData.degree}
              onChange={handleInputChange}
            >
              <option value="" disabled>Multiple select</option>
              <option value="bachelors">Bachelor's</option>
              <option value="masters">Master's</option>
              <option value="phd">PhD</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        {/* Preferred Hiring Locations */}
        <div>
          <label htmlFor="preferredLocations" className="block mb-2 font-medium">Preferred Hiring Locations</label>
          <div className="relative">
            <select
              id="preferredLocations"
              name="preferredLocations"
              className="w-full p-2 border border-gray-300 rounded appearance-none bg-white pr-10"
              value={formData.preferredLocations}
              onChange={(e) => setFormData(prev => ({ ...prev, preferredLocations: [e.target.value] }))}
            >
              <option value="" disabled>Multiple select</option>
              <option value="remote">Remote</option>
              <option value="onsite">On-site</option>
              <option value="hybrid">Hybrid</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="UP">UP</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Kerala">Kerala</option>
              <option value="Noida">Noida</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        {/* Looking for */}
        <div>
          <label className="block mb-2 font-medium">Looking for</label>
          <div className="flex space-x-2">
            <button
              type="button"
              className={`px-4 py-1 border ${formData.lookingFor === 'Job' ? 'bg-black text-white' : 'bg-white text-black'} rounded`}
              onClick={() => handleOptionSelect('lookingFor', 'Job')}
            >
              Job
            </button>
            <button
              type="button"
              className={`px-4 py-1 border ${formData.lookingFor === 'Internship' ? 'bg-black text-white' : 'bg-white text-black'} rounded`}
              onClick={() => handleOptionSelect('lookingFor', 'Internship')}
            >
              Internship
            </button>
            <button
              type="button"
              className={`px-4 py-1 border ${formData.lookingFor === 'Both' ? 'bg-black text-white' : 'bg-white text-black'} rounded`}
              onClick={() => handleOptionSelect('lookingFor', 'Both')}
            >
              Both
            </button>
          </div>
        </div>

        {/* Employment type */}
        <div>
          <label className="block mb-2 font-medium">Employment type</label>
          <div className="flex space-x-2">
            <button
              type="button"
              className={`px-4 py-1 border ${formData.employmentType === 'Part-time' ? 'bg-black text-white' : 'bg-white text-black'} rounded`}
              onClick={() => handleOptionSelect('employmentType', 'Part-time')}
            >
              Part-time
            </button>
            <button
              type="button"
              className={`px-4 py-1 border ${formData.employmentType === 'Full-time' ? 'bg-black text-white' : 'bg-white text-black'} rounded`}
              onClick={() => handleOptionSelect('employmentType', 'Full-time')}
            >
              Full-time
            </button>
            <button
              type="button"
              className={`px-4 py-1 border ${formData.employmentType === 'Contract' ? 'bg-black text-white' : 'bg-white text-black'} rounded`}
              onClick={() => handleOptionSelect('employmentType', 'Contract')}
            >
              Contract
            </button>
          </div>
        </div>

        {/* Minimum Salary Offered */}
        <div>
          <label className="block mb-2 font-medium">Minimum Salary Offered</label>
          <div className="flex">
            <div className="relative w-16">
              <select
                id="currency"
                name="currency"
                className="w-full h-full p-2 border border-gray-300 rounded-l appearance-none bg-white pr-6"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
              <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400" size={12} />
            </div>
            <input
              type="text"
              name="minimumSalary"
              placeholder="Placeholder"
              className="flex-1 p-2 border border-l-0 border-gray-300 rounded-r"
              value={formData.minimumSalary}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Tentative Date of Placement / Hiring */}
        <div>
          <label className="block mb-2 font-medium">Tentative Date of Placement / Hiring</label>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block mb-1 text-sm">Start Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="startDate"
                  className="w-full p-2 border border-gray-300 rounded appearance-none pr-10"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="w-1/2">
              <label className="block mb-1 text-sm">End Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="endDate"
                  className="w-full p-2 border border-gray-300 rounded appearance-none pr-10"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Number of Rounds */}
        <div>
          <label htmlFor="rounds" className="block mb-2 font-medium">Number of Rounds</label>
          <div className="relative">
            <select
              id="rounds"
              name="rounds"
              className="w-full p-2 border border-gray-300 rounded appearance-none bg-white pr-10"
              value={formData.rounds}
              onChange={handleInputChange}
            >
              <option value="" disabled>Multiple select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5+">5+</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        {/* Process of Selection */}
        <div>
          <label htmlFor="selectionProcess" className="block mb-2 font-medium">Process of Selection</label>
          <div className="relative">
            <select
              id="selectionProcess"
              name="selectionProcess"
              className="w-full p-2 border border-gray-300 rounded appearance-none bg-white pr-10"
              value={formData.selectionProcess}
              onChange={(e) => setFormData(prev => ({ ...prev, selectionProcess: [e.target.value] }))}
            >
              <option value="" disabled>Multiple select</option>
              <option value="interview">Interview</option>
              <option value="technical-test">Technical Test</option>
              <option value="assignment">Assignment</option>
              <option value="group-discussion">Group Discussion</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>


        {/* Contact Person */}
        <div>
          <label htmlFor="contactPerson" className="block mb-2 font-medium">Contact Person</label>
          <input
            type="text"
            id="contactPerson"
            name="contactPersonName"
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.contactPersonName}
            onChange={handleInputChange}
          />
        </div>

        {/* Contact person designation */}
        <div>
          <label htmlFor="contactDesignation" className="block mb-2 font-medium">Contact person designation <span className="text-red-500">*</span></label>
          <div className="relative">
            <input
              type="text"
              id="contactDesignation"
              name="contactDesignation"
              placeholder="Placeholder"
              className="w-full p-2 border border-gray-300 rounded appearance-none pr-10"
              value={formData.contactDesignation}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Contact person email */}
        <div>
          <label htmlFor="email" className="block mb-2 font-medium">Contact person email <span className="text-red-500">*</span></label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="hello@xyz.com"
              className="w-full p-2 pl-10 border border-gray-300 rounded"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Contact person mobile no */}
        <div>
          <label htmlFor="mobile" className="block mb-2 font-medium">Contact person mobile no <span className="text-red-500">*</span></label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="tel"
              id="mobile"
              name="mobile"
              placeholder="1234567890"
              className="w-full p-2 pl-10 border border-gray-300 rounded"
              value={formData.mobile}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Contact person LinkedIn Profile */}
        <div>
          <label htmlFor="linkedin" className="block mb-2 font-medium">Contact person LinkedIn Profile</label>
          <div className="relative">
            <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              placeholder="http://www.linkedin.com/in/yourprofile"
              className="w-full p-2 pl-10 border border-gray-300 rounded"
              value={formData.linkedin}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Minimum Students to be Hired */}
        <div>
          <label htmlFor="minimumStudents" className="block mb-2 font-medium">Minimum Students to be Hired</label>
          <div className="relative">
            <select
              id="minimumStudents"
              name="minimumStudents"
              className="w-full p-2 border border-gray-300 rounded appearance-none bg-white pr-10"
              value={formData.minimumStudents}
              onChange={handleInputChange}
            >
              <option value="" disabled>Multiple select</option>
              <option value="1-5">1-5</option>
              <option value="6-10">6-10</option>
              <option value="11-20">11-20</option>
              <option value="21+">21+</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        {/* Register Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-black text-white rounded"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}