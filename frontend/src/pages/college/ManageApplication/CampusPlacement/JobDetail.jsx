import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJobs } from '@/context/College/JobManagement/JobContext';
import { ArrowLeft, Download, Building, MapPin, Users, Calendar, Award, Briefcase, DollarSign } from 'lucide-react';

function JobDetail() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { getJobById, acceptDrive, shortlistDrive, rejectDrive } = useJobs();
  
  const job = getJobById(Number(jobId));
  
  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-4">The job you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/manage-application/campus-placement')}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }
  
  const { collegeDetails } = job;
  
  const handleBack = () => {
    navigate('/manage-application/campus-placement');
  };
  
  const handleAccept = () => {
    acceptDrive(job.id);
    navigate('/manage-application/campus-placement');
  };
  
  const handleShortlist = () => {
    shortlistDrive(job.id);
    navigate('/manage-application/campus-placement');
  };
  
  const handleReject = () => {
    rejectDrive(job.id);
    navigate('/manage-application/campus-placement');
  };
  
  const handleSendMessage = () => {
    console.log('Send message to:', collegeDetails.name);
    // In a real app: open message modal or navigate to message page
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 shadow-sm mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-black transition-colors mb-4"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Job Listings
          </button>
          
          <h1 className="text-2xl font-bold mb-1">On-Campus College Requests Management</h1>
          <p className="text-gray-600">Review and manage campus recruitment requests from colleges</p>
        </div>
        
        {/* Company Section */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-gray-100 rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                <Building size={32} className="text-gray-400" />
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl font-bold">{collegeDetails.name}</h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-2 text-gray-600">
                  <a href={`https://www.${collegeDetails.name.toLowerCase().replace(/\s+/g, '')}.com`} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    www.{collegeDetails.name.toLowerCase().replace(/\s+/g, '')}.com
                  </a>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 mt-2 text-gray-600">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {collegeDetails.location}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <div className="flex gap-2">
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Industry</div>
                    <div className="font-medium">Technology</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Job Role Overview */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4">Job Role Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500">Role Title</div>
                  <div className="font-medium">{job.title}</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-500">Job Type</div>
                  <div className="font-medium">{job.type}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Job Location</div>
                  <div className="font-medium">Multiple Locations</div>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500">Eligible Branches</div>
                  <div className="font-medium">{collegeDetails.eligibleBranches.join(', ')}</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-500">Compensation</div>
                  <div className="font-medium">${collegeDetails.averagePackage},000 - ${collegeDetails.highestPackage},000</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Application Deadline</div>
                  <div className="font-medium">{job.deadline}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hiring Process */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4">Hiring Process</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0">
                  <span className="font-medium">1</span>
                </div>
                <div>
                  <div className="font-medium">Online Assessment</div>
                  <div className="text-sm text-gray-600">Technical MCQs and Coding Test</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0">
                  <span className="font-medium">2</span>
                </div>
                <div>
                  <div className="font-medium">Technical Interviews</div>
                  <div className="text-sm text-gray-600">2 rounds of technical interviews</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0">
                  <span className="font-medium">3</span>
                </div>
                <div>
                  <div className="font-medium">HR Interview</div>
                  <div className="text-sm text-gray-600">Final discussion and offer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* College Information */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4">College Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Placement Rate</div>
                  <div className="font-medium">{collegeDetails.placementRate}%</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Student Count</div>
                  <div className="font-medium">{collegeDetails.studentCount}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Avg. Package</div>
                  <div className="font-medium">${collegeDetails.averagePackage}L</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Highest Package</div>
                  <div className="font-medium">${collegeDetails.highestPackage}L</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Start Date</div>
                  <div className="font-medium">{collegeDetails.proposedStartDate}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">End Date</div>
                  <div className="font-medium">{collegeDetails.proposedEndDate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Facilities */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4">Facilities Provided</h2>
            
            <ul className="space-y-2">
              {collegeDetails.facilities.map((facility, index) => (
                <li key={index} className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-green-600">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>{facility}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Attachments */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4">Attachments</h2>
            
            <ul className="space-y-3">
              {collegeDetails.documents.map((doc, index) => (
                <li key={index}>
                  <button className="w-full flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors">
                    <span>{doc.name}</span>
                    <Download size={18} className="text-gray-500" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <button 
            onClick={handleShortlist}
            className="px-6 py-3 border border-black bg-white text-black font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            Shortlist Company
          </button>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={handleReject}
              className="px-6 py-3 border border-red-600 bg-white text-red-600 font-medium rounded-md hover:bg-red-50 transition-colors"
            >
              Reject Application
            </button>
            
            <button 
              onClick={handleSendMessage}
              className="px-6 py-3 border border-blue-600 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors"
            >
              Send Message
            </button>
            
            <button 
              onClick={handleAccept}
              className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              Accept Drive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;