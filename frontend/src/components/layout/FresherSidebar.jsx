import { Link } from 'react-router-dom';
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
  FiSettings,
  FiMessageCircle,
  FiBriefcase,
  FiAward,
  FiUsers,
  FiLayers,
  FiTarget,
  FiCalendar,
  FiFileText,
  FiTrendingUp,
  FiMic,
  FiTool,
  FiCheckCircle
} from 'react-icons/fi';

function FresherSidebar({ activePath }) {
  return (
    <div>
      {/* Fresher Sidebar */}
      <SidebarNavItem to="/fresherhome" icon={<FiHome />} label="Home" active={activePath === '/fresherhome'} />
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
          to="/fresher-dashboard/off-campus-listings" 
          icon={<FiLayers />} 
          label="Off-Campus Listings" 
          active={activePath === '/fresher-dashboard/off-campus-listings'} 
        />
        <SidebarNavItem 
          to="/fresher-dashboard/internship-opportunities" 
          icon={<FiTrendingUp />} 
          label="Internship Opportunities" 
          active={activePath === '/fresher-dashboard/internship-opportunities'} 
        />
        <SidebarNavItem 
          to="/fresher-dashboard/Referral-Jobs" 
          icon={<FiUsers />} 
          label="Referral Jobs" 
          active={activePath === '/fresher-dashboard/Referral-Jobs'} 
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
          to="/application-status/job-listing" 
          icon={<FiBriefcase />} 
          label="Job Listing" 
          active={activePath === '/application-status/job-listing'} 
        />
        <SidebarNavItem 
          to="/application-status/off-campus-listing" 
          icon={<FiLayers />} 
          label="Off-Campus Listing" 
          active={activePath === '/application-status/off-campus-listing'} 
        />
        <SidebarNavItem 
          to="/application-status/internship-opportunities" 
          icon={<FiTrendingUp />} 
          label="Internship Opportunities" 
          active={activePath === '/application-status/internship-opportunities'} 
        />
        <SidebarNavItem 
          to="/application-status/referral-jobs" 
          icon={<FiUsers />} 
          label="Referral Jobs" 
          active={activePath === '/application-status/referral-jobs'} 
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

export default FresherSidebar;