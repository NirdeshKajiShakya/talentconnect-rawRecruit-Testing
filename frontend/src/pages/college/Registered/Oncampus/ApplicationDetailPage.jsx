import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApplications } from '@/context/College/Registered/ApplicationContext';
import Loader from '@/components/college/Registered/Loader';
import StatusBadge from '@/components/college/Registered/StatusBadge';

const ApplicationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getApplicationById } = useApplications();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const appData = getApplicationById(id);
        if (!appData) throw new Error('Application not found');
        setApplication(appData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchApplication();
  }, [id, getApplicationById]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (loading) return <Loader />;
  
  if (error || !application) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-md p-8 text-center">
        <p className="text-red-600 text-lg mb-6">{error || 'Application not found'}</p>
        <button 
          onClick={handleGoBack} 
          className="btn bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  bg-gray-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={handleGoBack} 
          className="flex items-center pt-10 text-primary-600 hover:text-primary-800 mb-8 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Applications
        </button>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center flex-1">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mr-4 shrink-0">
                  <img 
                    src={application.logo} 
                    alt={`${application.company} logo`} 
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{application.position}</h1>
                  <p className="text-xl md:text-2xl">{application.company}</p>
                </div>
              </div>
              <StatusBadge 
                status={application.status} 
                className="text-sm px-4 py-2 md:self-start"
              />
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <p className="text-gray-500 text-sm mb-1">Salary</p>
                <p className="font-bold text-lg text-gray-800">{application.salary}</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <p className="text-gray-500 text-sm mb-1">Application Date</p>
                <p className="font-bold text-lg text-gray-800">{application.appliedDate}</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <p className="text-gray-500 text-sm mb-1">Location</p>
                <p className="font-bold text-lg text-gray-800">{application.location}</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <section className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Job Description</h2>
                <p className="text-gray-700 leading-relaxed">{application.description}</p>
              </section>
              
              <section className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Requirements</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {application.requirements.map((req, index) => (
                    <li key={index} className="leading-relaxed">{req}</li>
                  ))}
                </ul>
              </section>
              
              <section className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Responsibilities</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {application.responsibilities.map((resp, index) => (
                    <li key={index} className="leading-relaxed">{resp}</li>
                  ))}
                </ul>
              </section>
              
              <section className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Additional Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-500 text-sm">Employment Type</p>
                      <p className="font-medium text-gray-800">{application.employmentType}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Experience</p>
                      <p className="font-medium text-gray-800">{application.experience}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-500 text-sm">Education</p>
                      <p className="font-medium text-gray-800">{application.education}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Package Type</p>
                      <p className="font-medium text-gray-800">{application.ctcPackage}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row justify-center sm:justify-end gap-4">
              {application.status === 'Registered' && (
                <button className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors">
                  Shortlist Application
                </button>
              )}
              {application.status === 'Shortlisted' && (
                <button className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                  Schedule Interview
                </button>
              )}
              <button className="btn bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors">
                Download JD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailPage;