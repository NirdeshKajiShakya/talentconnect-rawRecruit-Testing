import { useState } from 'react';

function ResumeSearch({ onSearch, onFileUpload }) {
  const [searchParams, setSearchParams] = useState({
    query: '',
    location: '',
    experience: '',
    salary: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 pt-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Smart Resume Search for Faster Hiring</h1>
        <p className="text-gray-600">Leverage AI-driven recommendations and powerful filters to find the right talent instantly.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            name="query"
            value={searchParams.query}
            onChange={handleChange}
            placeholder="Search by job title, skills, or keywords"
            className="w-full p-3 pl-10 border border-gray-300 rounded"
          />
          <svg className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
            <select
              name="location"
              value={searchParams.location}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded appearance-none"
            >
              <option value="">Select</option>
              <option value="remote">Remote</option>
              <option value="onsite">On-site</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Experience</label>
            <select
              name="experience"
              value={searchParams.experience}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded appearance-none"
            >
              <option value="">Select</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Expected Salary</label>
          <select
            name="salary"
            value={searchParams.salary}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded appearance-none"
          >
            <option value="">Select range</option>
            <option value="0-50000">$0 - $50,000</option>
            <option value="50000-75000">$50,000 - $75,000</option>
            <option value="75000-100000">$75,000 - $100,000</option>
            <option value="100000+">$100,000+</option>
          </select>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <button
            type="submit"
            className="bg-black text-white py-2 px-12 rounded font-medium hover:bg-gray-800"
          >
            Search
          </button>
          
          {/* <div className="mt-4 text-center">
            <p className="mb-2 text-gray-500">Or upload resumes to parse automatically</p>
            <input
              type="file"
              id="resume-upload"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={onFileUpload}
              className="hidden"
            />
            <label 
              htmlFor="resume-upload"
              className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium"
            >
              Upload Resumes
            </label>
          </div> */}
        </div>
      </form>
    </div>
  );
}

export default ResumeSearch;