import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import SimilarJobs from '../ApplicationStatus/SimilarJobs';
import {similarJobs } from '../../../constants/data.js';
export default function AIDrivenJob() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
    },
    onDrop: (acceptedFiles) => {
      setUploadedFile(acceptedFiles[0]);
    },
  });

  const locations = ['New York', 'London', 'Tokyo', 'Berlin', 'Remote'];
  const experiences = ['Entry', 'Mid', 'Senior', 'Lead', 'Manager'];

  const handleSearch = () => {
    // Implement search logic here
    console.log({
      file: uploadedFile,
      location,
      experience
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Upload your recent resume or CV to see AI Job recommendations
        </h1>

        <p className="text-gray-600 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
        </p>

        {/* File Upload Section */}
        <div className="mb-8">
          {!uploadedFile ? (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
            >
              <input {...getInputProps()} />
              <p className="text-gray-600">
                {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume, or click to select'}
              </p>
              <p className="text-sm text-gray-500 mt-2">PDF, DOC, DOCX (Max 5MB)</p>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
              <div>
                <span className="font-medium">{uploadedFile.name}</span>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="ml-4 text-blue-600 hover:text-blue-800 text-sm"
                >
                  Upload new
                </button>
              </div>
              <span className="text-gray-400">↗️</span>
            </div>
          )}
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              {experiences.map((exp) => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>
       <SimilarJobs 
        jobs={similarJobs} 
        title="AI Job Recommendations" 
        description="Lorem ipsum dolor sit amet, consectetur adipiscing enim in eros."
        />
    </div>
  );
}