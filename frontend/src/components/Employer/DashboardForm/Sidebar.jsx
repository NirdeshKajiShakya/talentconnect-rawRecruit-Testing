import { useLocation, Link } from 'react-router-dom'
import {
  FiHome,
  FiUser,
  FiBookmark,
  FiPieChart,
  FiClipboard,
  FiFileText,
  FiSearch,
  FiHelpCircle,
  FiSettings,
} from 'react-icons/fi'
import SidebarNavItem from '@/components/layout/SidebarNavItem'
import SidebarNavGroup from '@/components/layout/SidebarNavGroup'
import Logo from '@/components/ui/Logo'

function Sidebar({ open, setOpen }) {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-200 
                    transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto
                    ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-4 py-5 border-b border-gray-200">
            <Logo />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            <SidebarNavItem
              to="/company-dashboard"
              icon={<FiHome />}
              label="Home"
              active={isActive('/dashboard')}
            />
            <SidebarNavItem
              to="/company-profile"
              icon={<FiUser />}
              label="Profile"
              active={isActive('/profile')}
            />
            <SidebarNavItem
              to="/company/saved-jobs"
              icon={<FiBookmark />}
              label="Saved Jobs/Internships"
              active={isActive('/saved-jobs')}
              badge="24"
            />


            <SidebarNavGroup
              icon={<FiClipboard />}
              label="Service Requests"
              to="company//service-requests"
              active={isActive('/service-requests')}
            />

            <SidebarNavGroup
              icon={<FiFileText />}
              label="Application Status"
              to="/application-status"
              active={isActive('/application-status')}
            />

            <SidebarNavItem
              to="/job-search"
              icon={<FiSearch />}
              label="AI-Driven Job Search"
              active={isActive('/job-search')}
            />
          </nav>

          {/* Footer Links */}
          <div className="p-4 border-t border-gray-200">
            <SidebarNavItem
              to="/support"
              icon={<FiHelpCircle />}
              label="Support"
              active={isActive('/support')}
            />
            <SidebarNavItem
              to="/settings"
              icon={<FiSettings />}
              label="Settings"
              active={isActive('/settings')}
            />
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
