import { FiTag, FiInfo, FiUser, FiCalendar } from 'react-icons/fi'
import SearchBar from '../ui/SearchBar'
import Badge from '../ui/Badge'

function PageHeader({ title, label, status, assignee, createdAt }) {
  return (
    <div className="pb-4 mb-6 border-b border-gray-200">
      <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        
        <div className="w-full mt-4 md:w-64 md:mt-0">
          <SearchBar placeholder="Search" />
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-4 mt-4">
        {label && (
          <div className="flex items-center text-sm text-gray-500">
            <FiTag className="mr-1.5 h-4 w-4" />
            <span>Label:</span>
            <span className="ml-1 font-medium text-gray-900">{label}</span>
          </div>
        )}
        
        {status && (
          <div className="flex items-center text-sm text-gray-500">
            <FiInfo className="mr-1.5 h-4 w-4" />
            <span>Status:</span>
            <Badge
              variant={
                status === 'Active' ? 'success' :
                status === 'Pending' ? 'warning' :
                status === 'Inactive' ? 'danger' : 'default'
              }
              className="ml-1"
            >
              {status}
            </Badge>
          </div>
        )}
        
        {assignee && (
          <div className="flex items-center text-sm text-gray-500">
            <FiUser className="mr-1.5 h-4 w-4" />
            <span>Assignee:</span>
            <span className="ml-1 font-medium text-gray-900">{assignee}</span>
          </div>
        )}
        
        {createdAt && (
          <div className="flex items-center text-sm text-gray-500">
            <FiCalendar className="mr-1.5 h-4 w-4" />
            <span>Created:</span>
            <span className="ml-1 font-medium text-gray-900">{createdAt}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default PageHeader