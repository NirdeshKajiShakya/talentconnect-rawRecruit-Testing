import { FiSearch } from 'react-icons/fi'

function SearchBar({ placeholder = 'Search...', className = '' }) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <FiSearch className="w-5 h-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full py-2 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      />
    </div>
  )
}

export default SearchBar