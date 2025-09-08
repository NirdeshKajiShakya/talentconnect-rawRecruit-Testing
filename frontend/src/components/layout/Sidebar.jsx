
import { useLocation } from 'react-router-dom'
import { FiHome, FiUser, FiBookmark, FiSearch, FiHelpCircle, FiSettings } from 'react-icons/fi'
import SidebarNavItem from './SidebarNavItem'
import CompanySidebar from './CompanySidebar'
import CollegeSidebar from './CollegeSidebar'
import StudentSidebar from './StudentSidebar' // You can create a similar one for students
import Logo from '../ui/Logo'
import FresherSidebar from './FresherSidebar'
import ProfessionalSidebar from './ProfessionalSidebar'
import EmployerSidebar from './EmployerSidebar'

function Sidebar({ open, setOpen }) {
  const location = useLocation()
 // const userType = localStorage.getItem('userType')
  const selectedRole=localStorage.getItem('selectedRole')
  const isActive = (path) => location.pathname === path

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-200 
                  transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto
                  ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="px-4 py-5 border-b border-gray-200">
            <Logo />
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
    
            {/* Role-specific Sidebars */}
            {selectedRole === 'student' && <StudentSidebar activePath={location.pathname} />}
            {selectedRole === 'fresher' && <FresherSidebar activePath={location.pathname} />}
            {selectedRole === 'professional' && <ProfessionalSidebar activePath={location.pathname} />}
            {selectedRole === 'employer' && <EmployerSidebar activePath={location.pathname} />}
            {selectedRole === 'company' && <CompanySidebar activePath={location.pathname} />}
            {selectedRole === 'college' && <CollegeSidebar activePath={location.pathname} />}
            

          </nav>

          <div className="p-4 border-t border-gray-200">
            <SidebarNavItem 
              to="/ContactUs" 
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
