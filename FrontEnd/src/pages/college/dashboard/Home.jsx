import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '@/components/dashboard/PageHeader'
import { getMyApplicationStatus, getCollegeServiceRequestStatus } from '@/lib/College_AxiosIntance'

function Home() {
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState({
    loading: true,
    onCampus: {
      total: 0,
      byStatus: { Applied: 0, Shortlisted: 0, Accepted: 0, Rejected: 0 },
      updates: [],
      items: [],
    },
    poolCampus: {
      total: 0,
      byStatus: { Applied: 0, Shortlisted: 0, Accepted: 0, Rejected: 0 },
      updates: [],
      items: [],
    },
    serviceRequests: {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      completed: 0,
    },
  })

  useEffect(() => {
    fetchDashboardData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Compute recent updates from current dashboard data (must be before any early return)
  const recentUpdates = useMemo(() => {
    const items = [
      ...(dashboardData.onCampus.updates || []),
      ...(dashboardData.poolCampus.updates || []),
    ]
    items.sort((a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0))
    return items.slice(0, 6)
  }, [dashboardData])

  const fetchDashboardData = async () => {
    try {
      const [onRes, poolRes, serviceRes] = await Promise.all([
        getMyApplicationStatus('On-campus'),
        getMyApplicationStatus('Pool-campus'),
        getCollegeServiceRequestStatus(),
      ])

      const normalize = (resp) => Array.isArray(resp?.data?.data) ? resp.data.data : []
      const onItems = normalize(onRes)
      const poolItems = normalize(poolRes)

      const countStatuses = (items) =>
        items.reduce(
          (acc, it) => {
            const st = it?.currentStatus || 'Applied'
            acc.total += 1
            acc.byStatus[st] = (acc.byStatus[st] || 0) + 1
            if (st !== 'Applied') acc.updates.push(it)
            return acc
          },
          { total: 0, byStatus: { Applied: 0, Shortlisted: 0, Accepted: 0, Rejected: 0 }, updates: [] }
        )

      const onCounts = countStatuses(onItems)
      const poolCounts = countStatuses(poolItems)

      const serviceData = serviceRes?.data?.data || {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        completed: 0,
      }

      setDashboardData({
        loading: false,
        onCampus: { ...onCounts, items: onItems },
        poolCampus: { ...poolCounts, items: poolItems },
        serviceRequests: serviceData,
      })
    } catch (error) {
      console.error('Failed to fetch college dashboard data:', error)
      setDashboardData((prev) => ({ ...prev, loading: false }))
    }
  }

  if (dashboardData.loading) {
    return (
      <div className="p-6">
        <PageHeader title="College Dashboard" label="Loading" status="In Progress" />
        <div className="mt-6 text-sm text-gray-600">Fetching your dashboard data…</div>
      </div>
    )
  }

  const onCampusTotal = dashboardData.onCampus.total
  const poolCampusTotal = dashboardData.poolCampus.total

  return (
    <div>
      <PageHeader
        title="College Dashboard"
        label="Overview"
        status="Active"
        assignee="College Admin"
        createdAt={new Date().toLocaleDateString()}
      />

      {/* Top cards */}
      <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
        {/* On-campus applications sent */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => navigate('/application-status/oncampus')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/application-status/oncampus')}
          className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow md:transition"
        >
          <h2 className="mb-2 text-lg font-medium text-gray-900">On-campus Applications</h2>
          <p className="text-3xl font-bold text-blue-600">{onCampusTotal}</p>
          <p className="mt-2 text-xs text-gray-500">Updates: {dashboardData.onCampus.updates.length}</p>
        </div>

        {/* Pool-campus applications sent */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => navigate('/application-status/poolcampus')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/application-status/poolcampus')}
          className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow md:transition"
        >
          <h2 className="mb-2 text-lg font-medium text-gray-900">Pool-campus Applications</h2>
          <p className="text-3xl font-bold text-indigo-600">{poolCampusTotal}</p>
          <p className="mt-2 text-xs text-gray-500">Updates: {dashboardData.poolCampus.updates.length}</p>
        </div>
      </div>

      {/* Secondary cards */}
      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900">On-campus Status</h3>
          <ul className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <li className="flex items-center justify-between"><span className="text-gray-500">Applied</span><span className="font-medium">{dashboardData.onCampus.byStatus.Applied}</span></li>
            <li className="flex items-center justify-between"><span className="text-gray-500">Shortlisted</span><span className="font-medium text-yellow-600">{dashboardData.onCampus.byStatus.Shortlisted}</span></li>
            <li className="flex items-center justify-between"><span className="text-gray-500">Accepted</span><span className="font-medium text-green-600">{dashboardData.onCampus.byStatus.Accepted}</span></li>
            <li className="flex items-center justify-between"><span className="text-gray-500">Rejected</span><span className="font-medium text-red-600">{dashboardData.onCampus.byStatus.Rejected}</span></li>
          </ul>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900">Pool-campus Status</h3>
          <ul className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <li className="flex items-center justify-between"><span className="text-gray-500">Applied</span><span className="font-medium">{dashboardData.poolCampus.byStatus.Applied}</span></li>
            <li className="flex items-center justify-between"><span className="text-gray-500">Shortlisted</span><span className="font-medium text-yellow-600">{dashboardData.poolCampus.byStatus.Shortlisted}</span></li>
            <li className="flex items-center justify-between"><span className="text-gray-500">Accepted</span><span className="font-medium text-green-600">{dashboardData.poolCampus.byStatus.Accepted}</span></li>
            <li className="flex items-center justify-between"><span className="text-gray-500">Rejected</span><span className="font-medium text-red-600">{dashboardData.poolCampus.byStatus.Rejected}</span></li>
          </ul>
        </div>
      </div>

      {/* Service Requests section */}
      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900">Service Requests</h3>
          <ul className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <li className="flex items-center justify-between"><span className="text-gray-500">Total</span><span className="font-medium">{dashboardData.serviceRequests.total}</span></li>
            <li className="flex items-center justify-between"><span className="text-gray-500">Pending</span><span className="font-medium text-yellow-600">{dashboardData.serviceRequests.pending}</span></li>
            <li className="flex items-center justify-between"><span className="text-gray-500">Approved</span><span className="font-medium text-green-600">{dashboardData.serviceRequests.approved}</span></li>
            <li className="flex items-center justify-between"><span className="text-gray-500">Rejected</span><span className="font-medium text-red-600">{dashboardData.serviceRequests.rejected}</span></li>
          </ul>
        </div>
      </div>

      {/* Recent updates (status changed) */}
      <div className="p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="mb-4 text-base font-semibold text-gray-900">Recent Updates</h3>
        {recentUpdates.length === 0 ? (
          <p className="text-sm text-gray-500">No updates yet.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {recentUpdates.map((app, idx) => {
              const jobTitle = app?.jobDetails?.[0]?.jobTitle || app?.jobDetails?.[0]?.jobRoles || 'Job'
              const companyName = app?.companyDetails?.[0]?.companyDetails?.companyName || 'Company'
              const status = app?.currentStatus || 'Updated'
              const when = new Date(app?.createdAt || Date.now()).toLocaleDateString()
              return (
                <li key={app?._id || idx} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{jobTitle}</p>
                    <p className="text-xs text-gray-500">{companyName} • {status} • {when}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Home
