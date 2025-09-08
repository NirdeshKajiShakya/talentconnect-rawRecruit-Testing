import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'
import clsx from 'clsx'

function SidebarNavGroup({ icon, label, to, active = false, children }) {
  const [expanded, setExpanded] = useState(active)
  
  return (
    <div>
      <Link
        to={to}
        className={clsx(
          'sidebar-link',
          active && 'active'
        )}
        onClick={(e) => {
          if (!to) {
            e.preventDefault()
            setExpanded(!expanded)
          }
        }}
      >
        <span className="inline-flex items-center justify-center w-6 h-6 mr-3">
          {icon}
        </span>
        <span className="flex-1">{label}</span>
        
        {children && (
          <span className="ml-auto">
            {expanded ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
          </span>
        )}
      </Link>
      
      {children && expanded && (
        <div className="pl-10 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  )
}

export default SidebarNavGroup