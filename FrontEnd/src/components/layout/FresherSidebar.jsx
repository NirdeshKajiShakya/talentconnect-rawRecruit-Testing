
import SidebarNavItem from './SidebarNavItem';
import SidebarNavGroup from './SidebarNavGroup';
import { 
  FiHome, 
  FiUser, 
  FiBookmark, 
  FiPieChart, 
  FiClipboard, 
  FiSearch, 
  FiHelpCircle,
  FiMessageCircle,
  FiBriefcase,
  FiAward,
  FiUsers,
  FiLayers,
  FiTrendingUp,
  FiMic,
  FiTool,
  FiCheckCircle
} from 'react-icons/fi';

function FresherSidebar({ activePath }) {
  return (
    <div>
      {/* Fresher Sidebar */}
      <SidebarNavItem to="/home" icon={<FiHome />} label="Home" active={activePath === '/home'} />
      <SidebarNavItem to="/fresherprofile" icon={<FiUser />} label="Profile" active={activePath === '/fresherprofile'} />
      <SidebarNavItem to="/saved-jobs" icon={<FiBookmark />} label="Saved Jobs/Internships" active={activePath === '/saved-jobs'} />

      <SidebarNavGroup label="Fresher Dashboard" icon={<FiPieChart />} active={activePath.includes('/fresher-dashboard')}>
        <SidebarNavItem 
          to="/fresher-dashboard/job-listing" 
          icon={<FiBriefcase />} 
          label="Job Listing" 
          active={activePath === '/fresher-dashboard/job-listing'} 
        />
        <SidebarNavItem 
          to="/fresher-dashboard/Off-campus" 
          icon={<FiLayers />} 
          label="Off-Campus Listings" 
          active={activePath === '/fresher-dashboard/Off-campus'} 
        />
        <SidebarNavItem 
          to="/fresher-dashboard/Internship" 
          icon={<FiTrendingUp />} 
          label="Internship Opportunities" 
          active={activePath === '/fresher-dashboard/Internship'} 
        />
        <SidebarNavItem 
          to="/fresher-dashboard/Referral" 
          icon={<FiUsers />} 
          label="Referral Jobs" 
          active={activePath === '/fresher-dashboard/Referral'} 
        />
        <SidebarNavItem 
          to="/fresher-dashboard/hackathon" 
          icon={<FiAward />} 
          label="Hackathon" 
          active={activePath === '/fresher-dashboard/hackathon'} 
        />
      </SidebarNavGroup>

      <SidebarNavGroup label="Service Request" icon={<FiClipboard />} active={activePath.includes('/fresher-dashboard/service-request')}>
        <SidebarNavItem 
          to="/fresher-dashboard/service-request/counselling" 
          icon={<FiHelpCircle />} 
          label="Counselling" 
          active={activePath === '/fresher-dashboard/service-request/counselling'} 
        />
        <SidebarNavItem 
          to="/fresher-dashboard/service-request/career-craft" 
          icon={<FiTool />} 
          label="Career Craft" 
          active={activePath === '/fresher-dashboard/service-request/career-craft'} 
        />
        <SidebarNavItem 
          to="/fresher-dashboard/service-request/mock-interview" 
          icon={<FiMic />} 
          label="Mock Interview" 
          active={activePath === '/fresher-dashboard/service-request/mock-interview'} 
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
          to="/application-status/Off-campus" 
          icon={<FiLayers />} 
          label="Off-Campus Listing" 
          active={activePath === '/application-status/Off-campus'} 
        />
        <SidebarNavItem 
          to="/application-status/Internship" 
          icon={<FiTrendingUp />} 
          label="Internship Opportunities" 
          active={activePath === '/application-status/Internship'} 
        />
        <SidebarNavItem 
          to="/application-status/Referral" 
          icon={<FiUsers />} 
          label="Referral Jobs" 
          active={activePath === '/application-status/Referral'} 
        />
        {/* <SidebarNavItem 
          to="/application-status/hackathon" 
          icon={<FiAward />} 
          label="Hackathon" 
          active={activePath === '/application-status/hackathon'} 
        /> */}
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

export default FresherSidebar;