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
  FiUsers,
  FiLayers,
  FiCalendar,
  FiFileText,
  FiTrendingUp,
  FiMic,
  FiTool,
  FiCheckCircle,
  FiAward,
  FiBook,
  FiMapPin,
  FiTarget
} from 'react-icons/fi';

function CollegeSidebar({ activePath }) {
  return (
    <div>
      {/* College Sidebar */}
      <SidebarNavItem to="/home" icon={<FiHome />} label="Home" active={activePath === '/home'} />
      <SidebarNavItem to="/college-profile" icon={<FiUser />} label="Profile" active={activePath === '/college-profile'} />

      <SidebarNavGroup label="College Dashboard" icon={<FiPieChart />} active={activePath.includes('/college-dashboard')}>
        <SidebarNavItem 
          to="/college-dashboard/on-campus-opportunities" 
          icon={<FiMapPin />} 
          label="On-campus Opportunities" 
          active={activePath === '/college-dashboard/on-campus-opportunities'} 
        />
        <SidebarNavItem 
          to="/college-dashboard/pool-campus-opportunities" 
          icon={<FiUsers />} 
          label="Pool Campus Opportunities" 
          active={activePath === '/college-dashboard/pool-campus-opportunities'} 
        />
        <SidebarNavItem 
          to="/college-dashboard/internship-opportunities" 
          icon={<FiTrendingUp />} 
          label="Internship Opportunities" 
          active={activePath === '/college-dashboard/internship-opportunities'} 
        />
      </SidebarNavGroup>

      <SidebarNavGroup label="Service Request" icon={<FiClipboard />} active={activePath.includes('/service-request')}>
        <SidebarNavItem 
          to="/service-request/campus-placement" 
          icon={<FiBriefcase />} 
          label="Campus Placement" 
          active={activePath === '/service-request/campus-placement'} 
        />
           <SidebarNavItem 
          to="/service-request/poolcampus-placement" 
          icon={<FiBriefcase />} 
          label="PoolCampus Placement" 
          active={activePath === '/service-request/poolcampus-placement'} 
        />
        <SidebarNavItem 
          to="/service-request/student-training-programs" 
          icon={<FiBook />} 
          label="Student Training Programs" 
          active={activePath === '/service-request/student-training-programs'} 
        />
        <SidebarNavItem 
          to="/service-request/seminars" 
          icon={<FiMic />} 
          label="Seminars" 
          active={activePath === '/service-request/seminars'} 
        />
      </SidebarNavGroup>

      <SidebarNavGroup label="Manage Application" icon={<FiTool />} active={activePath.includes('/manage-application')}>
        <SidebarNavItem 
          to="/manage-application/campus-placement" 
          icon={<FiBriefcase />} 
          label="Campus Placement" 
          active={activePath === '/manage-application/campus-placement'} 
        />
      </SidebarNavGroup>

      <SidebarNavGroup label="Registered / Shortlisted" icon={<FiCheckCircle />} active={activePath.includes('/registered')}>
        <SidebarNavItem 
          to="/registered/on-campus-opportunities" 
          icon={<FiMapPin />} 
          label="On-campus Opportunities" 
          active={activePath === '/registered/on-campus-opportunities'} 
        />
        <SidebarNavItem 
          to="/registered/pool-campus-opportunities" 
          icon={<FiUsers />} 
          label="Pool Campus Opportunities" 
          active={activePath === '/registered/pool-campus-opportunities'} 
        />
        <SidebarNavItem 
          to="/registered/internship-opportunities" 
          icon={<FiTrendingUp />} 
          label="Internship Opportunities" 
          active={activePath === '/registered/internship-opportunities'} 
        />
      </SidebarNavGroup>

      <SidebarNavItem 
        to="/chat-application" 
        icon={<FiMessageCircle />} 
        label="Chats" 
        active={activePath === '/chats'} 
      />
    </div>
  );
}

export default CollegeSidebar;