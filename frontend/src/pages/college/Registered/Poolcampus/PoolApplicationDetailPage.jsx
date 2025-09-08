import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApplications } from '@/context/College/Registered/ApplicationContext';
import Loader from '@/components/college/Registered/Loader';
import StatusBadge from '@/components/college/Registered/StatusBadge';

const PoolApplicationDetailPage = () => {
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
    <div className="p-6 text-center">
      <p className="text-danger-600">{error || 'Application not found'}</p>
      <button 
        onClick={handleGoBack} 
        className="btn btn-primary mt-4"
      >
        Go Back
      </button>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <button 
        onClick={handleGoBack} 
        className="flex items-center text-primary-600 mb-6 hover:underline"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Applications
      </button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary-600 text-white p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mr-4">
                <img 
                  src={application.logo} 
                  alt={`${application.company} logo`} 
                  className="h-12 w-12 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{application.position}</h1>
                <p className="text-xl">{application.company}</p>
              </div>
            </div>
            <StatusBadge status={application.status} className="text-sm px-3 py-1.5" />
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="border rounded-lg p-4">
              <p className="text-gray-500 text-sm">Salary</p>
              <p className="font-bold text-lg">{application.salary}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-gray-500 text-sm">Application Date</p>
              <p className="font-bold text-lg">{application.appliedDate}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-gray-500 text-sm">Location</p>
              <p className="font-bold text-lg">{application.location}</p>
            </div>
          </div>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4 text-gray-800">Job Description</h2>
              <p className="text-gray-700">{application.description}</p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4 text-gray-800">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {application.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4 text-gray-800">Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {application.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4 text-gray-800">Additional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Employment Type</p>
                  <p className="font-medium">{application.employmentType}</p>
                </div>
                <div>
                  <p className="text-gray-500">Experience</p>
                  <p className="font-medium">{application.experience}</p>
                </div>
                <div>
                  <p className="text-gray-500">Education</p>
                  <p className="font-medium">{application.education}</p>
                </div>
                <div>
                  <p className="text-gray-500">Package Type</p>
                  <p className="font-medium">{application.ctcPackage}</p>
                </div>
              </div>
            </section>
          </div>
          
          <div className="mt-10 flex justify-center md:justify-end space-x-4">
            {application.status === 'Registered' && (
              <button className="btn btn-success">Shortlist Application</button>
            )}
            {application.status === 'Shortlisted' && (
              <button className="btn btn-primary">Schedule Interview</button>
            )}
            <button className="btn btn-secondary">Download JD</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolApplicationDetailPage;