import SidebarNavItem from './SidebarNavItem';
import SidebarNavGroup from './SidebarNavGroup';
import { 
  FiHome, 
  FiUser, 
  FiBookmark, 
  FiPieChart, 
  FiClipboard, 
  FiSearch,
  FiMessageCircle,
  FiBriefcase,
  FiUsers,
  FiAward,
  FiPlusSquare,
  FiEdit,
  FiCheckCircle,
  FiLayers
} from 'react-icons/fi';

function ProfessionalSidebar({ activePath }) {
  return (
    <div>
      {/* Professional Sidebar */}
      <SidebarNavItem to="/profhome" icon={<FiHome />} label="Home" active={activePath === '/profhome'} />
      <SidebarNavItem to="/profprofile" icon={<FiUser />} label="Profile" active={activePath === '/profprofile'} />
      <SidebarNavItem to="/saved-jobs" icon={<FiBookmark />} label="Saved Jobs/Internships" active={activePath === '/saved-jobs'} />

      <SidebarNavGroup label="Professional Dashboard" icon={<FiPieChart />} active={activePath.includes('/professional-dashboard')}>
        <SidebarNavItem 
          to="/professional-dashboard/job-listing" 
          icon={<FiBriefcase />} 
          label="Job Listings" 
          active={activePath === '/professional-dashboard/job-listing'} 
        />
        <SidebarNavItem 
          to="/professional-dashboard/referral-jobs" 
          icon={<FiUsers />} 
          label="Referral Jobs" 
          active={activePath === '/professional-dashboard/referral-jobs'} 
        />
        <SidebarNavItem 
          to="/professional-dashboard/hackathon" 
          icon={<FiAward />} 
          label="Hackathon" 
          active={activePath === '/professional-dashboard/hackathon'} 
        />
      </SidebarNavGroup>

      <SidebarNavGroup label="Service Request" icon={<FiClipboard />} active={activePath.includes('/service-request')}>
        <SidebarNavItem 
          to="/professional/service-request" 
          icon={<FiPlusSquare />} 
          label="Post Referral Job" 
          active={activePath === '/professional/service-request'} 
        />
        <SidebarNavItem 
          to="/professional/service-request/referral" 
          icon={<FiEdit />} 
          label="Manage Referral Jobs" 
          active={activePath === '/service-request/manage-referral-jobs'} 
        />
      </SidebarNavGroup>

      <SidebarNavGroup label="Application Status" icon={<FiCheckCircle />} active={activePath.includes('/application-status')}>
        <SidebarNavItem 
          to="/application-status/job-listing" 
          icon={<FiBriefcase />} 
          label="Job Listing" 
          active={activePath === '/application-status/job-listing'} 
        />
        <SidebarNavItem 
          to="/application-status/referral-jobs" 
          icon={<FiUsers />} 
          label="Referral Jobs" 
          active={activePath === '/application-status/referral-jobs'} 
        />
        <SidebarNavItem 
          to="/application-status/off-campus-listing" 
          icon={<FiLayers />} 
          label="Off-Campus Jobs" 
          active={activePath === '/application-status/off-campus-jobs'} 
        />
        <SidebarNavItem 
          to="/application-status/hackathon" 
          icon={<FiAward />} 
          label="Hackathon" 
          active={activePath === '/application-status/hackathon'} 
        />
      </SidebarNavGroup>

      <SidebarNavItem 
        to="/ai-driven-job-search" 
        icon={<FiSearch />} 
        label="AI-Driven Job Search" 
        active={activePath === '/ai-driven-job-search'} 
      />
      <SidebarNavItem 
        to="/chat-application" 
        icon={<FiMessageCircle />} 
        label="Chats" 
        active={activePath === '/chats'} 
      />
    </div>
  );
}

export default ProfessionalSidebar;