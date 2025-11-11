import { useState, useEffect } from 'react'
import PageHeader from '@/components/dashboard/PageHeader'
import Button from '@/components/ui/Button'
import { FiPlus, FiUsers, FiCheckCircle, FiClock, FiAlertCircle, FiTrendingUp, FiTrendingDown } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { getShorlistedCandidateByCompany, getAcceptedCandidateByCompany, getCompanyServiceRequestStatus, getPostedJobs } from '@/lib/Company_AxiosInstance'

function Home() {
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState({
    shortlisted: [],
    accepted: [],
    applied: [],
    byJobType: {},
    onCampus: {
      shortlisted: [],
      accepted: [],
      newApplied: 0
    },
    poolCampus: {
      shortlisted: [],
      accepted: [],
      newApplied: 0
    },
    serviceRequests: {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0
    },
    loading: true
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const jobTypes = ['Off-campus', 'Job-listing', 'Internship', 'On-campus', 'Pool-campus']
      const applicantTypes = ['user', 'college', 'company']

      // Initialize byJobType map for easy breakdown rendering
      const byJobTypeInit = jobTypes.reduce((acc, jt) => {
        acc[jt] = { shortlisted: [], accepted: [] }
        return acc
      }, {})

      const promises = []
      for (const jobType of jobTypes) {
        for (const applicantType of applicantTypes) {
          promises.push(
            getShorlistedCandidateByCompany(applicantType, jobType).catch(() => ({ data: { response: [] } })),
            getAcceptedCandidateByCompany(applicantType, jobType).catch(() => ({ data: { response: [] } }))
          )
        }
      }

      // Add posted jobs fetch for On-campus and Pool-campus to compute new (Applied) counts
      promises.push(
        getPostedJobs('On-campus').catch(() => ({ data: [] })),
        getPostedJobs('Pool-campus').catch(() => ({ data: [] }))
      )

      // Add service request API call at the end
      promises.push(getCompanyServiceRequestStatus().catch(() => ({ 
        data: { 
          success: false,
          data: {
            total: 0,
            pending: 0,
            approved: 0,
            rejected: 0
          }
        } 
      })))

      const results = await Promise.all(promises)

  let shortlisted = []
  let accepted = []
      let onCampusShortlisted = []
      let onCampusAccepted = []
      let poolCampusShortlisted = []
      let poolCampusAccepted = []

      // Process application results (now we have 30 items: 5 jobTypes × 3 applicantTypes × 2 calls)
      let resultIndex = 0
      for (const jobType of jobTypes) {
        for (const applicantType of applicantTypes) {
          const shortlistedRes = results[resultIndex]?.data?.response || []
          const acceptedRes = results[resultIndex + 1]?.data?.response || []
          
          // Add to overall counts
          shortlisted = shortlisted.concat(shortlistedRes)
          accepted = accepted.concat(acceptedRes)

          // Populate job-type breakdown
          byJobTypeInit[jobType].shortlisted = byJobTypeInit[jobType].shortlisted.concat(shortlistedRes)
          byJobTypeInit[jobType].accepted = byJobTypeInit[jobType].accepted.concat(acceptedRes)
          
          // Categorize by campus type
          if (jobType === 'On-campus') {
            onCampusShortlisted = onCampusShortlisted.concat(shortlistedRes)
            onCampusAccepted = onCampusAccepted.concat(acceptedRes)
          } else if (jobType === 'Pool-campus') {
            poolCampusShortlisted = poolCampusShortlisted.concat(shortlistedRes)
            poolCampusAccepted = poolCampusAccepted.concat(acceptedRes)
          }
          
          resultIndex += 2
        }
      }

  // Extract posted jobs for campus types (last 3 include: onCampusJobs, poolCampusJobs, serviceRequests)
  const onCampusJobsRes = results[results.length - 3]
  const poolCampusJobsRes = results[results.length - 2]
  const serviceRequestRes = results[results.length - 1]
      let serviceRequestsData = {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0
      }

      if (serviceRequestRes.data?.success && serviceRequestRes.data?.data) {
        serviceRequestsData = serviceRequestRes.data.data
      } else if (serviceRequestRes.data?.data) {
        // Fallback in case structure is different
        serviceRequestsData = serviceRequestRes.data.data
      }

      // Compute new (Applied) counts using posted jobs' applicationCount
      const onCampusJobs = Array.isArray(onCampusJobsRes?.data) ? onCampusJobsRes.data : []
      const poolCampusJobs = Array.isArray(poolCampusJobsRes?.data) ? poolCampusJobsRes.data : []
      const onCampusNewApplied = onCampusJobs.reduce((sum, j) => sum + (j?.applicationCount || 0), 0)
      const poolCampusNewApplied = poolCampusJobs.reduce((sum, j) => sum + (j?.applicationCount || 0), 0)

      setDashboardData({
        shortlisted,
        accepted,
        applied: [...shortlisted, ...accepted],
        byJobType: byJobTypeInit,
        onCampus: {
          shortlisted: onCampusShortlisted,
          accepted: onCampusAccepted,
          newApplied: onCampusNewApplied
        },
        poolCampus: {
          shortlisted: poolCampusShortlisted,
          accepted: poolCampusAccepted,
          newApplied: poolCampusNewApplied
        },
        serviceRequests: serviceRequestsData,
        loading: false
      })
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      setDashboardData(prev => ({ ...prev, loading: false }))
    }
  }

  const totalApplications = dashboardData.shortlisted.length + dashboardData.accepted.length

  if (dashboardData.loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':
        return <FiClock className="w-4 h-4" />
      case 'approved':
        return <FiCheckCircle className="w-4 h-4" />
      case 'rejected':
        return <FiAlertCircle className="w-4 h-4" />
      default:
        return <FiUsers className="w-4 h-4" />
    }
  }

  return (
    <div>
      <PageHeader 
        title="Company Dashboard"
        label="Overview"
        status="Active"
        assignee="Company Admin"
        createdAt={new Date().toLocaleDateString()}
      />
      
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {/* On-Campus Applications */}
        <div 
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/job-management/On-campus')}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">On-Campus</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {dashboardData.onCampus.shortlisted.length + dashboardData.onCampus.accepted.length + dashboardData.onCampus.newApplied}
              </p>
              <p className="text-xs text-gray-500 mt-2">New: {dashboardData.onCampus.newApplied}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FiUsers className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Pool-Campus Applications */}
        <div 
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/job-management/Pool-campus')}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Pool-Campus</h3>
              <p className="text-3xl font-bold text-teal-600 mt-2">
                {dashboardData.poolCampus.shortlisted.length + dashboardData.poolCampus.accepted.length + dashboardData.poolCampus.newApplied}
              </p>
              <p className="text-xs text-gray-500 mt-2">New: {dashboardData.poolCampus.newApplied}</p>
            </div>
            <div className="p-3 bg-teal-100 rounded-lg">
              <FiUsers className="w-8 h-8 text-teal-600" />
            </div>
          </div>
        </div>

        {/* Shortlisted */}
        <div 
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/shortlisted/on-campus-listings')}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Shortlisted</h3>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{dashboardData.shortlisted.length}</p>
              <p className="text-xs text-gray-500 mt-2 flex items-center">
                <FiTrendingUp className="w-3 h-3 mr-1" />
                {dashboardData.shortlisted.length > 0 ? 'In Progress' : 'No Candidates'}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FiClock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Accepted */}
        <div 
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/accepted/on-campus-listings')}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Accepted</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">{dashboardData.accepted.length}</p>
              <p className="text-xs text-gray-500 mt-2 flex items-center">
                <FiCheckCircle className="w-3 h-3 mr-1" />
                Final Hires
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FiCheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Service Requests */}
        <div 
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/service-request/workforce-solution')}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Service Requests</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">{dashboardData.serviceRequests.total}</p>
              <p className="text-xs text-gray-500 mt-2">
                <span className="inline-block bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs mr-1">
                  {dashboardData.serviceRequests.pending} Pending
                </span>
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FiAlertCircle className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Service Requests Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Service Requests Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-gray-700 font-medium">Pending Requests</span>
              </div>
              <span className="text-2xl font-bold text-yellow-600">{dashboardData.serviceRequests.pending}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700 font-medium">Approved Requests</span>
              </div>
              <span className="text-2xl font-bold text-green-600">{dashboardData.serviceRequests.approved}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                <span className="text-gray-700 font-medium">Rejected Requests</span>
              </div>
              <span className="text-2xl font-bold text-red-600">{dashboardData.serviceRequests.rejected}</span>
            </div>
          </div>
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="md"
              onClick={() => navigate('/service-request/workforce-solution')}
              className="w-full"
            >
              Manage Service Requests
            </Button>
          </div>
        </div>

        {/* Applications Overview */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Application Funnel</h2>
          <div className="space-y-4">
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Total Received</span>
                <span className="text-sm font-bold text-gray-900">{totalApplications}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Shortlisted</span>
                <span className="text-sm font-bold text-gray-900">
                  {totalApplications > 0 ? Math.round((dashboardData.shortlisted.length / totalApplications) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-yellow-600 h-3 rounded-full" 
                  style={{ width: totalApplications > 0 ? `${(dashboardData.shortlisted.length / totalApplications) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Accepted</span>
                <span className="text-sm font-bold text-gray-900">
                  {totalApplications > 0 ? Math.round((dashboardData.accepted.length / totalApplications) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-600 h-3 rounded-full" 
                  style={{ width: totalApplications > 0 ? `${(dashboardData.accepted.length / totalApplications) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="md"
              onClick={() => navigate('/job-management/On-campus')}
              className="w-full"
            >
              View Job Management
            </Button>
          </div>
        </div>
      </div>

      {/* Applications by Job Type Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Applications by Job Type</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left font-medium text-gray-600">Job Type</th>
                <th className="px-4 py-2 text-left font-medium text-gray-600">Total</th>
                <th className="px-4 py-2 text-left font-medium text-gray-600">Shortlisted</th>
                <th className="px-4 py-2 text-left font-medium text-gray-600">Accepted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Object.entries(dashboardData.byJobType).map(([jt, data]) => {
                const total = data.shortlisted.length + data.accepted.length
                return (
                  <tr key={jt} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-800">{jt}</td>
                    <td className="px-4 py-2 text-gray-900">{total}</td>
                    <td className="px-4 py-2 text-yellow-700">{data.shortlisted.length}</td>
                    <td className="px-4 py-2 text-green-700">{data.accepted.length}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-xs text-gray-500">
          Data combines all applicant types per job type. Use cards above to drill into categories.
        </div>
      </div>

      {/* Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Shortlisted</h2>
            <button 
              onClick={() => navigate('/shortlisted/on-campus-listings')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </button>
          </div>
          {dashboardData.shortlisted.length > 0 ? (
            <div className="space-y-3">
              {dashboardData.shortlisted.slice(0, 5).map((application, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {application.applicant?.name || 'Unknown Candidate'}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {application.jobTitle?.join(', ') || 'Job Title'}
                    </p>
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                    Shortlisted
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No shortlisted candidates yet</p>
          )}
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Accepted</h2>
            <button 
              onClick={() => navigate('/accepted/on-campus-listings')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </button>
          </div>
          {dashboardData.accepted.length > 0 ? (
            <div className="space-y-3">
              {dashboardData.accepted.slice(0, 5).map((application, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {application.applicant?.name || 'Unknown Candidate'}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {application.jobTitle?.join(', ') || 'Job Title'}
                    </p>
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                    Accepted
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No accepted candidates yet</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 className="mb-6 text-lg font-semibold text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            variant="primary" 
            size="md" 
            className="flex items-center justify-center"
            onClick={() => navigate('/hiring-channels/post-a-job')}
          >
            <FiPlus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
          <Button 
            variant="outline" 
            size="md"
            onClick={() => navigate('/job-management/On-campus')}
          >
            Manage Applications
          </Button>
          <Button 
            variant="outline" 
            size="md"
            onClick={() => navigate('/interviews')}
          >
            Schedule Interviews
          </Button>
          <Button 
            variant="outline" 
            size="md"
            onClick={() => navigate('/hosting-management')}
          >
            Hosting Events
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home