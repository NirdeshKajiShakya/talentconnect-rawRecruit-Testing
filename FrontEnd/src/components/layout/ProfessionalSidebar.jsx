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
  FiLayers,
  FiCalendar,
  FiTool
} from 'react-icons/fi';

function ProfessionalSidebar({ activePath }) {
  return (
    <div>
      {/* Professional Sidebar */}
      <SidebarNavItem to="/home" icon={<FiHome />} label="Home" active={activePath === '/home'} />
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
          to="/professional-dashboard/Referral" 
          icon={<FiUsers />} 
          label="Referral Jobs" 
          active={activePath === '/professional-dashboard/Referral'} 
        />
        {/* <SidebarNavItem 
          to="/professional-dashboard/hackathon" 
          icon={<FiAward />} 
          label="Hackathon" 
          active={activePath === '/professional-dashboard/hackathon'} 
        /> */}
      </SidebarNavGroup>
            <SidebarNavGroup label="Events" icon={<FiCalendar/>} active={activePath.includes('/events')}>
        <SidebarNavItem 
          to="/professional-events/casestudy" 
          icon={<FiBookmark />} 
          label="Case Studies" 
          active={activePath === '/professional-events/casestudy'} 
        />
        <SidebarNavItem 
          to="/professional-events/hackathon" 
          icon={<FiAward />} 
          label="Hackathon" 
          active={activePath === '/professional-events/hackathon'} 
        />
        <SidebarNavItem 
          to="/professional-events/workshop" 
          icon={<FiTool/>} 
          label="Workshop" 
          active={activePath === '/professional-events/workshop'} 
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
          active={activePath === '/service-request/manage-Referral'} 
        />
      </SidebarNavGroup>

      <SidebarNavGroup label="Application Status" icon={<FiCheckCircle />} active={activePath.includes('/application-status')}>
        <SidebarNavItem 
          to="/application-status/Job-listing" 
          icon={<FiBriefcase />} 
          label="Job Listing" 
          active={activePath === '/application-status/Job-listing'} 
        />
        <SidebarNavItem 
          to="/application-status/Referral" 
          icon={<FiUsers />} 
          label="Referral Jobs" 
          active={activePath === '/application-status/Referral'} 
        />
        {/* <SidebarNavItem 
          to="/application-status/Off-campus" 
          icon={<FiLayers />} 
          label="Off-Campus Jobs" 
          active={activePath === '/application-status/off-campus-jobs'} 
        /> */}
        <SidebarNavItem 
          to="/application-status/event-status" 
          icon={<FiAward />} 
          label="Event Management" 
          active={activePath === '/application-status/event-status'} 
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