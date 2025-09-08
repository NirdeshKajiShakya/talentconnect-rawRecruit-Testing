import { Link } from 'react-router-dom'
import clsx from 'clsx'

function SidebarNavItem({ to, icon, label, active = false, badge = null }) {
  return (
    <Link 
      to={to}
      className={clsx(
        'sidebar-link',
        active && 'active'
      )}
    >
      <span className="inline-flex items-center justify-center w-6 h-6 mr-3">
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      
      {badge && (
        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-600 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  )
}

export default SidebarNavItem