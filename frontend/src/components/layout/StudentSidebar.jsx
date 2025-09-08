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
  FiTool
} from 'react-icons/fi';

function StudentSidebar({ activePath }) {
  return (
    <div>
      {/* Student Sidebar */}
      <SidebarNavItem to="/home" icon={<FiHome />} label="Home" active={activePath === '/home'} />
      <SidebarNavItem to="/profile" icon={<FiUser />} label="Profile" active={activePath === '/profile'} />
      <SidebarNavItem to="/saved-jobs" icon={<FiBookmark />} label="Saved Jobs/Internships" active={activePath === '/saved-jobs'} />

      <SidebarNavGroup label="Student Dashboard" icon={<FiPieChart />} active={activePath.includes('/student-dashboard')}>
        <SidebarNavItem 
          to="/student-dashboard/job-listing" 
          icon={<FiBriefcase />} 
          label="Job Listing" 
          active={activePath === '/student-dashboard/job-listing'} 
        />
        <SidebarNavItem 
          to="/student-dashboard/off-campus-listings" 
          icon={<FiLayers />} 
          label="Off-Campus Listings" 
          active={activePath === '/student-dashboard/off-campus-listings'} 
        />
        <SidebarNavItem 
          to="/student-dashboard/internship-opportunities" 
          icon={<FiTrendingUp />} 
          label="Internship Opportunities" 
          active={activePath === '/student-dashboard/internship-opportunities'} 
        />
        <SidebarNavItem 
          to="/student-dashboard/referral-jobs" 
          icon={<FiUsers />} 
          label="Referral Jobs" 
          active={activePath === '/student-dashboard/referral-jobs'} 
        />
        <SidebarNavItem 
          to="/student-dashboard/hackathon" 
          icon={<FiAward />} 
          label="Hackathon" 
          active={activePath === '/student-dashboard/hackathon'} 
        />
      </SidebarNavGroup>

      <SidebarNavGroup label="Service Request" icon={<FiClipboard />} active={activePath.includes('/service-request')}>
        <SidebarNavItem 
          to="/service-request/counselling" 
          icon={<FiHelpCircle />} 
          label="Counselling" 
          active={activePath === '/service-request/counselling'} 
        />
        <SidebarNavItem 
          to="/service-request/career-craft" 
          icon={<FiTool />} 
          label="Career Craft" 
          active={activePath === '/service-request/career-craft'} 
        />
        <SidebarNavItem 
          to="/service-request/mock-interview" 
          icon={<FiMic />} 
          label="Mock Interview" 
          active={activePath === '/service-request/mock-interview'} 
        />
      </SidebarNavGroup>

      <SidebarNavGroup label="Application Status" icon={<FiFileText />} active={activePath.includes('/application-status')}>
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

export default StudentSidebar;