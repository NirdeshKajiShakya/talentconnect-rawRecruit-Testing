import { useState, useEffect, useMemo } from 'react'
import ApplicationCard from '@/components/college/Registered/oncampus/Application'
import Pagination from '@/components/college/Registered/Pagination'
import Loader from '@/components/college/Registered/Loader'
import { getOncampusJobs } from '@/lib/College_AxiosIntance'

const itemsPerPage = 6

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([])
  const [filteredApplications, setFilteredApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    role: 'All Roles',
    searchQuery: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('ctc-high')
  const [searchValue, setSearchValue] = useState('')

  // Fetch applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getOncampusJobs()
        setApplications(response.data.data || [])
        setLoading(false)
      } catch (err) {
        setError(err.message || 'Failed to fetch data')
        setLoading(false)
      }
    }
    fetchApplications()
  }, [])

  // Memoize unique roles
  const roles = useMemo(
    () =>
      ['All Roles', ...Array.from(new Set(applications.map(app =>
        // If job position is not present, fallback to blank
        app.drive?.position || ''
      )))].filter(role => !!role), // remove empty roles, if any
    [applications]
  )

  // Filter & sort applications
  useEffect(() => {
    let result = [...applications]

    // Role filter
    if (filters.role !== 'All Roles') {
      result = result.filter(app =>
        (app.drive?.position || '').toLowerCase() === filters.role.toLowerCase()
      )
    }

    // Search filter (by company, position, candidate)
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(app => {
        // Allow company name, position, or (add your candidate name extraction if needed)
        const company = app.drive?.companyName || ''
        const position = app.drive?.position || ''
        // You can extract candidate name from app.candidate?.name if your data provides it
        return (
          company.toLowerCase().includes(query) ||
          position.toLowerCase().includes(query)
        )
      })
    }

    // Sorting logic. As your API sample doesn’t provide CTC or appliedDate at top-level,
    // you need to *adjust* these fields as per your real data shape
    if (sortBy === 'ctc-high' || sortBy === 'ctc-low') {
      result.sort((a, b) => {
        const ctcA = Number(a.drive?.minimumSalary) || 0
        const ctcB = Number(b.drive?.minimumSalary) || 0
        if (sortBy === 'ctc-high') return ctcB - ctcA
        return ctcA - ctcB
      })
    } else if (sortBy === 'newest' || sortBy === 'oldest') {
      result.sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        if (sortBy === 'newest') return dateB - dateA
        return dateA - dateB
      })
    }

    setFilteredApplications(result)
    setCurrentPage(1) // Reset to page 1 if filters change
  }, [applications, filters, sortBy])

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        searchQuery: searchValue
      }))
    }, 300)
    return () => clearTimeout(handler)
  }, [searchValue])

  // Pagination logic
  const getCurrentApplications = () => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return filteredApplications.slice(indexOfFirstItem, indexOfLastItem)
  }

  const getTotalPages = () =>
    Math.ceil(filteredApplications.length / itemsPerPage)

  // UI Handlers
  const handleSearchChange = e => setSearchValue(e.target.value)
  const handleRoleChange = e =>
    setFilters(prev => ({ ...prev, role: e.target.value }))
  const handleSortChange = e => setSortBy(e.target.value)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-white">
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="max-w-md p-6 text-center bg-white rounded-lg shadow-sm">
          <p className="text-danger-600 font-medium">
            Error loading applications: {error}
          </p>
        </div>
      </div>
    )
  }

  // Pagination display indices
  const startIndex =
    filteredApplications.length === 0
      ? 0
      : (currentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(
    currentPage * itemsPerPage,
    filteredApplications.length
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Candidate Applications
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Manage and review all candidate applications in one centralized dashboard
          </p>
        </div>
        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="search"
                className="w-full pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search by company, position or candidate name"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
            {/* Role */}
            <div className="w-full md:w-48">
              <select
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-primary-500 focus:border-primary-500"
                value={filters.role}
                onChange={handleRoleChange}
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            {/* Sort */}
            <div className="w-full md:w-48">
              <select
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-primary-500 focus:border-primary-500"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="ctc-high">Highest CTC First</option>
                <option value="ctc-low">Lowest CTC First</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
        {/* Result count */}
        <div className="mb-6 px-2">
          <p className="text-sm font-medium text-gray-500">
            Showing <span className="text-gray-700">{startIndex}-{endIndex}</span> of <span className="text-gray-700">{filteredApplications.length}</span> applications
          </p>
        </div>
        {/* Cards */}
        <div className="mb-12">
          {getCurrentApplications().length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getCurrentApplications().map(application => (
                <ApplicationCard
                  key={application._id}
                  application={application}
                  className="transition-all hover:shadow-md hover:-translate-y-1"
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No applications found</h3>
              <p className="mt-1 text-gray-500">
                {searchValue || filters.role !== 'All Roles'
                  ? "Try adjusting your search or filter criteria"
                  : "There are currently no applications available"}
              </p>
            </div>
          )}
        </div>
        {/* Pagination */}
        {getTotalPages() > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={getTotalPages()}
              onPageChange={setCurrentPage}
              className="shadow-sm"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ApplicationsPage
