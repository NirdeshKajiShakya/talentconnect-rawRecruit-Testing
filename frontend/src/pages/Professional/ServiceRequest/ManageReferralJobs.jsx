import { useState, useEffect } from 'react'
import { FiSearch, FiFilter, FiEye, FiEdit, FiTrash2, FiDownload, FiShare2 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import PageHeader from '@/components/dashboard/PageHeader'
import Button from '@/components/ui/Button'

function ManageReferralJobs() {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [serviceRequest, setServiceRequest] = useState({
    requestType: '',
    description: '',
    urgency: 'normal',
    attachments: []
  })
  const [showServiceRequestModal, setShowServiceRequestModal] = useState(false)

  // Mock data
  useEffect(() => {
    const mockJobs = [
      {
        id: 1,
        title: 'Software Engineer',
        location: 'Full-time • Mumbai',
        status: 'Published',
        deadline: 'Apr 30, 2025',
        views: 1234,
        applications: 68
      },
      {
        id: 2,
        title: 'Product Design Intern',
        location: 'Internship • Mumbai',
        status: 'Draft',
        deadline: 'May 15, 2025',
        views: 856,
        applications: 45
      },
      {
        id: 3,
        title: 'Software Engineer',
        location: 'Full-time • Mumbai',
        status: 'Draft',
        deadline: 'Apr 30, 2025',
        views: 956,
        applications: 67
      },
      {
        id: 4,
        title: 'Software Engineer',
        location: 'Full-time • Mumbai',
        status: 'Published',
        deadline: 'Apr 30, 2025',
        views: 127,
        applications: 36
      },
      {
        id: 5,
        title: 'Software Engineer',
        location: 'Full-time • Mumbai',
        status: 'Published',
        deadline: 'May 15, 2025',
        views: 29,
        applications: 23
      },
      {
        id: 6,
        title: 'Software Engineer',
        location: 'Full-time • Mumbai',
        status: 'Draft',
        deadline: 'May 15, 2025',
        views: 1005,
        applications: 78
      }
    ]
    setJobs(mockJobs)
  }, [])

  // Filter jobs based on active tab and search query
  const filteredJobs = jobs.filter(job => {
    const matchesTab = activeTab === 'all' || 
                       (activeTab === 'published' && job.status === 'Published') ||
                       (activeTab === 'drafts' && job.status === 'Draft')
    
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesTab && matchesSearch
  })

  // Pagination
  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleServiceRequestSubmit = (e) => {
    e.preventDefault()
    // Here you would typically make an API call to submit the service request
    console.log('Service request submitted:', serviceRequest)
    alert('Service request submitted successfully!')
    setServiceRequest({
      requestType: '',
      description: '',
      urgency: 'normal',
      attachments: []
    })
    setShowServiceRequestModal(false)
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setServiceRequest(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }))
  }

  const removeAttachment = (index) => {
    setServiceRequest(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }))
  }

  const handleViewApplication = (jobId) => {
    // Navigate to the total applicants page for a specific job
    navigate(`/professional/service-request/totalapplicants?jobId=${jobId}`)
  }
  
  const handleViewJobDetails = (jobId) => {
    // Navigate to the off-campus applicant page with job ID
    navigate(`/professional/service-request/totalapplicants?jobId=${jobId}`)
  }

  const handlePostJob = () => {
    navigate('/professional/service-request/post')
  }

  const handleBackToServiceRequest = () => {
    navigate('/professional/service-request')
  }

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Manage Referral Jobs"
        description="Track Your Job Listings and Streamline Candidate Applications"
      />
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 text-sm rounded-md ${activeTab === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => handleTabChange('all')}
          >
            All Jobs ({jobs.length})
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-md ${activeTab === 'published' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => handleTabChange('published')}
          >
            Published
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-md ${activeTab === 'drafts' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => handleTabChange('drafts')}
          >
            Drafts
          </button>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setShowServiceRequestModal(true)}
            className="border-black text-black hover:bg-gray-50"
          >
            Request Service
          </Button>
          <Button 
            variant="primary"
            onClick={handlePostJob}
            className="bg-black hover:bg-gray-900"
          >
            Post a Job
          </Button>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="relative w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <button
            className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter className="mr-2" />
            Filters
          </button>
        </div>
        
        {showFilters && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
                  <option value="">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
                  <option value="">All Time</option>
                  <option value="last-week">Last Week</option>
                  <option value="last-month">Last Month</option>
                  <option value="last-3-months">Last 3 Months</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
                  <option value="">All Locations</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="delhi">Delhi</option>
                  <option value="bangalore">Bangalore</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button className="mr-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-500">
                Clear All
              </button>
              <button className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-900">
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applications
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedJobs.map((job) => (
                <tr key={job.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleViewJobDetails(job.id)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    <div className="text-sm text-gray-500">{job.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      job.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.deadline}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click event
                        handleViewApplication(job.id);
                      }}
                    >
                      {job.applications}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click event
                          handleViewJobDetails(job.id);
                        }}
                      >
                        <FiEye size={18} />
                      </button>
                      <button 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click event
                        }}
                      >
                        <FiEdit size={18} />
                      </button>
                      <button 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click event
                        }}
                      >
                        <FiTrash2 size={18} />
                      </button>
                      <button 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click event
                        }}
                      >
                        <FiDownload size={18} />
                      </button>
                      <button 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click event
                        }}
                      >
                        <FiShare2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, filteredJobs.length)}
                </span>{' '}
                of <span className="font-medium">{filteredJobs.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  Prev
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`relative inline-flex items-center px-4 py-2 border ${
                        currentPage === pageNumber
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      } text-sm font-medium`}
                    >
                      {pageNumber}
                    </button>
                  )
                })}
                
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Next</span>
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Service Request Modal */}
      {showServiceRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Submit Service Request</h3>
                <button
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setShowServiceRequestModal(false)}
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <form onSubmit={handleServiceRequestSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Request Type*
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    value={serviceRequest.requestType}
                    onChange={(e) => setServiceRequest({...serviceRequest, requestType: e.target.value})}
                    required
                  >
                    <option value="">Select Request Type</option>
                    <option value="job-posting-help">Help with Job Posting</option>
                    <option value="candidate-management">Candidate Management</option>
                    <option value="account-issue">Account Issue</option>
                    <option value="billing-support">Billing Support</option>
                    <option value="technical-problem">Technical Problem</option>
                    <option value="feature-request">Feature Request</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    rows="5"
                    placeholder="Please describe your request in detail..."
                    value={serviceRequest.description}
                    onChange={(e) => setServiceRequest({...serviceRequest, description: e.target.value})}
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Urgency
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        serviceRequest.urgency === 'low' 
                          ? 'bg-green-100 text-green-800 border border-green-300' 
                          : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                      }`}
                      onClick={() => setServiceRequest({...serviceRequest, urgency: 'low'})}
                    >
                      Low
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        serviceRequest.urgency === 'normal' 
                          ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' 
                          : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                      }`}
                      onClick={() => setServiceRequest({...serviceRequest, urgency: 'normal'})}
                    >
                      Normal
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        serviceRequest.urgency === 'high' 
                          ? 'bg-red-100 text-red-800 border border-red-300' 
                          : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                      }`}
                      onClick={() => setServiceRequest({...serviceRequest, urgency: 'high'})}
                    >
                      High
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attachments
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={handleFileUpload}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, PDF up to 10MB
                      </p>
                    </div>
                  </div>
                  
                  {serviceRequest.attachments.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700">Attached Files</h4>
                      <ul className="mt-2 border border-gray-200 rounded-md divide-y divide-gray-200">
                        {serviceRequest.attachments.map((file, index) => (
                          <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                              </svg>
                              <span className="ml-2 flex-1 w-0 truncate">
                                {file.name}
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                className="font-medium text-red-600 hover:text-red-500"
                                onClick={() => removeAttachment(index)}
                              >
                                Remove
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => setShowServiceRequestModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageReferralJobs