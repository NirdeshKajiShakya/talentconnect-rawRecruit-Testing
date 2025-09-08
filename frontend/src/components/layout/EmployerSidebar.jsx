import { 
  FiHome, 
  FiUser, 
  FiPieChart, 
  FiClipboard, 
  FiMessageCircle,
  FiBriefcase,
  FiUsers,
  FiSearch,
  FiTool,
  FiBook,
  FiAward,
  FiLayers,
  FiMapPin,
  FiCheckCircle,
  FiFileText,
  FiCalendar,
  FiBarChart2,
  FiMic,
  FiThumbsUp,
  FiFilePlus,
  FiList
} from 'react-icons/fi';
import SidebarNavItem from './SidebarNavItem';
import SidebarNavGroup from './SidebarNavGroup';

function EmployerSidebar({ activePath }) {
  return (
    <div>
      {/* Basic Navigation */}
      <SidebarNavItem to="/home" icon={<FiHome />} label="Home" active={activePath === '/home'} />
      <SidebarNavItem to="/employer-profile" icon={<FiUser />} label="Profile" active={activePath === '/employer-profile'} />

      {/* Employer Dashboard */}
      <SidebarNavGroup label="Employer Dashboard" icon={<FiPieChart />} active={activePath.includes('/employer-dashboard')}>
        <SidebarNavItem 
          to="/employer-dashboard/on-campus-request" 
          icon={<FiMapPin />} 
          label="On-campus Request" 
          active={activePath === '/employer-dashboard/on-campus-request'} 
        />
        <SidebarNavItem 
          to="/employer-dashboard/pool-campus-requests" 
          icon={<FiUsers />} 
          label="Pool Campus Requests" 
          active={activePath === '/employer-dashboard/pool-campus-requests'} 
        />
        <SidebarNavItem 
          to="/employer-dashboard/resume-search" 
          icon={<FiSearch />} 
          label="Resume Search" 
          active={activePath === '/employer-dashboard/resume-search'} 
        />
      </SidebarNavGroup>

      {/* Service Request */}
      <SidebarNavGroup label="Service Request" icon={<FiTool />} active={activePath.includes('/service-request')}>
        <SidebarNavItem 
          to="/service-request/workforce-solution" 
          icon={<FiBriefcase />} 
          label="Workforce Solution" 
          active={activePath === '/service-request/workforce-solution'} 
        />
        <SidebarNavItem 
          to="/service-request/employee-training" 
          icon={<FiBook />} 
          label="Employee Training" 
          active={activePath === '/service-request/employee-training'} 
        />
        <SidebarNavItem 
          to="/service-request/branding" 
          icon={<FiAward />} 
          label="Branding" 
          active={activePath === '/service-request/branding'} 
        />
      </SidebarNavGroup>

      {/* Job Management */}
      <SidebarNavGroup label="Job Management" icon={<FiBriefcase />} active={activePath.includes('/job-management')}>
        <SidebarNavItem 
          to="/job-management/on-campus-listings/employer" 
          icon={<FiMapPin />} 
          label="On-campus Listings" 
          active={activePath === '/job-management/on-campus-listings/employer'} 
        />
        <SidebarNavItem 
          to="/job-management/pool-campus-listings/employer" 
          icon={<FiUsers />} 
          label="Pool Campus Listings" 
          active={activePath === '/job-management/pool-campus-listings/employer'} 
        />
        <SidebarNavItem 
          to="/job-management/off-campus-listings" 
          icon={<FiLayers />} 
          label="Off-campus Listings" 
          active={activePath === '/job-management/off-campus-listings'} 
        />
        <SidebarNavItem 
          to="/job-management/job-listings" 
          icon={<FiFileText />} 
          label="Job Listings" 
          active={activePath === '/job-management/job-listings'} 
        />
      </SidebarNavGroup>

      {/* Hiring Channels */}
      <SidebarNavGroup label="Hiring Channels" icon={<FiUsers />} active={activePath.includes('/hiring-channels')}>
        <SidebarNavItem 
          to="/hiring-channels/on-campus-hiring/employer" 
          icon={<FiMapPin />} 
          label="On-campus Hiring" 
          active={activePath === '/hiring-channels/on-campus-hiring//employer'} 
        />
        <SidebarNavItem 
          to="/hiring-channels/pool-campus-hiring/employer" 
          icon={<FiUsers />} 
          label="Pool Campus Hiring" 
          active={activePath === '/hiring-channels/pool-campus-hiring/employer'} 
        />
        <SidebarNavItem 
          to="/hiring-channels/off-campus-hiring/employer" 
          icon={<FiLayers />} 
          label="Off-campus Hiring" 
          active={activePath === '/hiring-channels/off-campus-hiring/employer'} 
        />
        <SidebarNavItem 
          to="/hiring-channels/post-a-job/employer" 
          icon={<FiFilePlus />} 
          label="Post a Job" 
          active={activePath === '/hiring-channels/post-a-job/employer'} 
        />
        <SidebarNavItem 
          to="/hiring-channels/post-an-internship/employer" 
          icon={<FiCalendar />} 
          label="Post an Internship" 
          active={activePath === '/hiring-channels/post-an-internship/employer'} 
        />
      </SidebarNavGroup>

      {/* Shortlisted Candidates/Colleges */}
      <SidebarNavGroup label="Shortlisted Candidates" icon={<FiCheckCircle />} active={activePath.includes('/shortlisted')}>
        <SidebarNavItem 
          to="/shortlisted/on-campus-listings" 
          icon={<FiMapPin />} 
          label="On-campus Listings" 
          active={activePath === '/shortlisted/on-campus-listings'} 
        />
        <SidebarNavItem 
          to="/shortlisted/off-campus-listings" 
          icon={<FiLayers />} 
          label="Off-campus Listings" 
          active={activePath === '/shortlisted/off-campus-listings'} 
        />
        <SidebarNavItem 
          to="/shortlisted/pool-campus-listings" 
          icon={<FiUsers />} 
          label="Pool Campus Listings" 
          active={activePath === '/shortlisted/pool-campus-listings'} 
        />
      </SidebarNavGroup>

      {/* Accepted Candidates/Colleges */}
      <SidebarNavGroup label="Accepted Candidates" icon={<FiThumbsUp />} active={activePath.includes('/accepted')}>
        <SidebarNavItem 
          to="/accepted/on-campus-listings" 
          icon={<FiMapPin />} 
          label="On-campus Listings" 
          active={activePath === '/accepted/on-campus-listings'} 
        />
        <SidebarNavItem 
          to="/accepted/off-campus-listings" 
          icon={<FiLayers />} 
          label="Off-campus Listings" 
          active={activePath === '/accepted/off-campus-listings'} 
        />
        <SidebarNavItem 
          to="/accepted/pool-campus-listings" 
          icon={<FiUsers />} 
          label="Pool Campus Listings" 
          active={activePath === '/accepted/pool-campus-listings'} 
        />
        <SidebarNavItem 
          to="/Employee/acceptedJobList" 
          icon={<FiList />} 
          label="Accepted Job List" 
          active={activePath === '/Employee/acceptedJobList'} 
        />
      </SidebarNavGroup>

      {/* Misc Pages */}
      <SidebarNavItem 
        to="/interviews" 
        icon={<FiMic />} 
        label="Interviews" 
        active={activePath === '/interviews'} 
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

export default EmployerSidebar;