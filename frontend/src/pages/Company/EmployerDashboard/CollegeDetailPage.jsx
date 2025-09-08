import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCollegeDetail } from '@/lib/Company_AxiosInstance';
import { mockColleges } from '@/constants/mockData';

// Utility function to format dates
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const CollegeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Renamed to jobPosting for clarity, since the ID is for a job posting
  const [jobPosting, setJobPosting] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobPosting = async () => {
    setIsLoading(true);
    try {
      // Assuming getCollegeDetail fetches a JobPostingTable document
      // that is populated with the associated CollegeOnboarding document.
      const response = await getCollegeDetail(id);
      setJobPosting(response.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobPosting();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !jobPosting) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center p-4">
          <p className="text-xl font-semibold">{error}</p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => fetchJobPosting()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Access the nested college details for convenience
  const collegeDetails = jobPosting?.collegePosted;
  const placementCoordinator = collegeDetails?.placementCoordinatorDetails;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <div className="mb-2 flex items-center">
              <h1 className="text-2xl font-bold">Registration for: {jobPosting?.lookingFor || 'N/A'}</h1>
          
            </div>
            <h2 className="text-3xl font-bold mb-2"> College Name : {collegeDetails?.collegeUniversityDetails?.collegeName || 'N/A'}</h2>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <span className="mr-2">Job Code: {jobPosting?._id || 'N/A'}</span>
            </div>
         
            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
              
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
                </svg>
                <span>{formatDate(jobPosting?.startDate)}</span>
              </div>
              
              
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>
                  {jobPosting?.location || 'N/A'
                  }
                </span>
              </div>
     
              <a 
                href={collegeDetails?.profileAchievements?.collegeWebsite || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                title="Visit College Website"
                className="flex items-center hover:text-blue-500"
              >
                <svg className="w-5 h-5 text-gray-600 hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
      
          </div>

          <div className="flex flex-col md:items-end mt-2">
            <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded mb-4">
              {collegeDetails?.profileImage ? (
                <img src={collegeDetails.profileImage} alt={`${collegeDetails?.collegeUniversityDetails?.collegeName} logo`} className="h-full w-full object-contain" />
              ) : (
                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="flex gap-2">
              <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded text-sm">Accept Invitation</button>
              <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded text-sm">Save</button>
              <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded text-sm flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-xl font-bold mb-4">About {collegeDetails?.collegeUniversityDetails?.collegeName || 'N/A'}</h3>
          <p className="text-gray-700 mb-6">{jobPosting?.description || 'N/A'}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded border border-gray-200">
              <h4 className="font-bold text-3xl text-blue-600">{jobPosting?.minPackage?.amount || 'N/A'}</h4>
              <p className="text-gray-600 text-sm">Min Salary ({jobPosting?.minPackage?.currency || 'N/A'})</p>
            </div>
            <div className="bg-white p-4 rounded border border-gray-200">
              <h4 className="font-bold text-3xl text-blue-600">{jobPosting?.employmentType || 'N/A'}</h4>
              <p className="text-gray-600 text-sm">EmploymentType</p>
            </div>
            <div className="bg-white p-4 rounded border border-gray-200">
              <h4 className="font-bold text-3xl text-blue-600">{jobPosting?.jobType || 'N/A'}</h4>
              <p className="text-gray-600 text-sm">Job Type</p>
            </div>
            <div className="bg-white p-4 rounded border border-gray-200">
              <h4 className="font-bold text-3xl text-blue-600">{jobPosting?.workMode || 'N/A'}</h4>
              <p className="text-gray-600 text-sm">Work Mode</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Point of Contact - Campus Placement Coordination</h3>
            <p className="text-gray-700 mb-4">
              Our Training & Placement Cell will be your single point of contact for all coordination regarding the on-campus recruitment process. Once your company confirms participation, the placement officer will assist with scheduling, logistics, student shortlisting, and post-drive follow-ups.
            </p>
            <p className="text-gray-700 mb-2">Please reach out for:</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Drive date confirmation</li>
              <li>Infrastructure or tech setup queries</li>
              <li>Shortlist finality or custom requirements</li>
              <li>Student eligibility clarification</li>
            </ul>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">College Placement Officer Contact:</h4>
              <div className="flex items-center mb-2">
                <span className="font-medium">{jobPosting?.contactPerson?.name || 'N/A'}, </span>
                <span className="text-gray-600 ml-2">{jobPosting?.contactPerson?.designation || 'N/A'}</span>
              </div>
              <div className="flex items-center text-blue-600 mb-2">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href={`mailto:${jobPosting?.contactPerson?.email}`}>{jobPosting?.contactPerson?.email || 'N/A'}</a>
              </div>
              <div className="flex items-center text-blue-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href={`tel:${jobPosting?.contactPerson?.mobile}`}>{jobPosting?.contactPerson?.mobile || 'N/A'}</a>
              </div>
              <div className="flex items-center text-blue-600 mt-2">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16 0H4C1.79 0 0 1.79 0 4v12c0 2.21 1.79 4 4 4h12c2.21 0 4-1.79 4-4V4c0-2.21-1.79-4-4-4zM6.5 16H3V7h3.5v9zm-1.75-10a1.75 1.75 0 110-3.5A1.75 1.75 0 014.75 6zm11.25 10h-3.5v-5c0-1.38-.28-2.5-2-2.5s-2 .88-2 2v5H7V7h3v1h-.01c1-.88 2-.88 3-.88s3 .88 3 .88V16z" />
                </svg>
                {jobPosting?.contactPerson?.linkedin ? (
                  <a href={jobPosting.contactPerson.linkedin} target="_blank" rel="noopener noreferrer">
                    {jobPosting.contactPerson.linkedin}
                  </a>
                ) : (
                  <span>N/A</span>
                )}
              </div>
            </div>
          </div>

              <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Student Batch Details</h3>
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 p-2 text-left">S.No.</th>
                <th className="border border-gray-200 p-2 text-left">Branch</th>
                <th className="border border-gray-200 p-2 text-left">No. of Students</th>
                <th className="border border-gray-200 p-2 text-left">Skills</th>
              </tr>
            </thead>
            <tbody>
              {jobPosting?.studentStreams?.length > 0 ? (
                jobPosting.studentStreams.map((stream, index) => (
                  <tr key={index}>
                    <td className="border border-gray-200 p-2">{index + 1}</td>
                    <td className="border border-gray-200 p-2">{stream || 'N/A'}</td>
                    <td className="border border-gray-200 p-2">
                      {jobPosting?.numberOfStudent?.[index] || 'N/A'}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {jobPosting?.skills?.[index] || 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border border-gray-200 p-4 text-center text-gray-500">
                    No student batch details available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

            <h3 className="text-xl font-bold mb-4">Academic Cutoff Followed:</h3>
            <div className="mb-6">
              <p className="font-medium mb-2">Graduation Year: 2025</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Minimum 60% in 10th and 12th</li>
                <li>Minimum 6.5 CGPA in UG</li>
                <li>No active backlogs</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">Proposed Schedule</h3>
              <p className="text-gray-700 mb-4">
                We have several available recruitment drive slots for the 2025 graduating batch.
                We believe our students align well with your hiring requirements and would be an excellent fit for your GeeCo.
                Standard Engineer Trainee roles. Our campus is equipped with state-of-the-art infrastructure and has a
                strong record of successful placement drives.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="font-medium mb-1">Preferred Drive Date:</p>
                  <p className="text-gray-700">{formatDate(jobPosting?.startDate)}</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Alternative Dates:</p>
                  <p className="text-gray-700">{formatDate(jobPosting?.endDate)}</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Preferred Mode:</p>
                  <p className="text-gray-700">{jobPosting?.workMode || 'N/A'}</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Time Slots Available:</p>
                  <p className="text-gray-700">Full day (9:00 AM - 5:00 PM)</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Campus Facilities</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>4 Computer Labs (80+ systems each)</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>High-speed Internet (1 Gbps)</span>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Attached Documents</h3>
              <div className="flex flex-col gap-2">
                {collegeDetails?.placementRecruitmentDetails?.collegeBrochureUrl && (
                  <a href={collegeDetails.placementRecruitmentDetails.collegeBrochureUrl} className="flex items-center text-blue-600 hover:underline">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a3 3 0 006 0V7a1 1 0 112 0v4a5 5 0 01-10 0V7a5 5 0 0110 0v1.5a2.5 2.5 0 01-5 0V7a1 1 0 012 0v1.5a.5.5 0 001 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                    </svg>
                    College Brochure (PDF)
                  </a>
                )}
                <a href="#" className="flex items-center text-blue-600 hover:underline">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a3 3 0 006 0V7a1 1 0 112 0v4a5 5 0 01-10 0V7a5 5 0 0110 0v1.5a2.5 2.5 0 01-5 0V7a1 1 0 012 0v1.5a.5.5 0 001 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                  </svg>
                  Top 10 Student Resumes (ZIP)
                </a>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Optional Customizations (as checked by college)</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Willing to share shortlisted resumes before the interview</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Can host online tests through college proctored platform</span>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Response Requested By</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 font-medium mb-2">Deadline for Employer Response: July 10, 2025</p>
                <p className="text-gray-700 text-sm">(So we can finalize the schedule and inform students in time)</p>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <div className="flex gap-2">
                <button className="flex items-center border border-gray-300 rounded px-4 py-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Brochure
                </button>
                <button className="flex items-center border border-gray-300 rounded px-4 py-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Suggest Alternate Date
                </button>
                <button className="flex items-center border border-gray-300 rounded px-4 py-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                  Message Placement Officer
                </button>
              </div>
              <div className="flex gap-2">
                <button className="bg-blue-600 text-white px-6 py-2 rounded font-medium">Accept Invitation</button>
                <button className="border border-red-500 text-red-500 px-6 py-2 rounded font-medium">Reject Invitation</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetailsPage;