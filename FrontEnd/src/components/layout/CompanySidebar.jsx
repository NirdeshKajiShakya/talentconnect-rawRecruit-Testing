import SidebarNavItem from './SidebarNavItem';
import SidebarNavGroup from './SidebarNavGroup';
import {
  FiHome,
  FiUser,
  FiPieChart,
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
  FiFilePlus
} from 'react-icons/fi';

function CompanySidebar({ activePath }) {
  return (
    <div>
      {/* Company Sidebar */}
      <SidebarNavItem to="/home" icon={<FiHome />} label="Home" active={activePath === '/home'} />
      <SidebarNavItem to="/company-profile" icon={<FiUser />} label="Profile" active={activePath === '/company-profile'} />
      
      <SidebarNavItem to="/company/saved-jobs/" icon={<FiUser />} label="Saved Opportunities" active={activePath === '/company/saved-jobs/'} />

      <SidebarNavGroup label="Company Dashboard" icon={<FiPieChart />} active={activePath.includes('/employer-dashboard')}>
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

      <SidebarNavGroup label="Application Status" icon={<FiUsers />} active={activePath.includes('/company/application-status')}>
        <SidebarNavItem
          to="/company/application-status/oncampus"
          icon={<FiMapPin />}
          label="On Campus"
          active={activePath === '/company/application-status/oncampus'}
        />
        <SidebarNavItem
          to="/company/application-status/poolcampus"
          icon={<FiMapPin />}
          label="Pool Campus"
          active={activePath === '/company/application-status/poolcampus'}
        />
      </SidebarNavGroup>

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

      <SidebarNavGroup label="Hiring Channels" icon={<FiUsers />} active={activePath.includes('/hiring-channels')}>
        <SidebarNavItem
          to="/hiring-channels/on-campus-hiring"
          icon={<FiMapPin />}
          label="On-campus Hiring"
          active={activePath === '/hiring-channels/on-campus-hiring'}
        />
        <SidebarNavItem
          to="/hiring-channels/pool-campus-hiring"
          icon={<FiUsers />}
          label="Pool Campus Hiring"
          active={activePath === '/hiring-channels/pool-campus-hiring'}
        />
        <SidebarNavItem
          to="/hiring-channels/off-campus-hiring"
          icon={<FiLayers />}
          label="Off-campus Hiring"
          active={activePath === '/hiring-channels/off-campus-hiring'}
        />
        <SidebarNavItem
          to="/hiring-channels/post-a-job"
          icon={<FiFilePlus />}
          label="Post a Job"
          active={activePath === '/hiring-channels/post-a-job'}
        />
        <SidebarNavItem
          to="/hiring-channels/post-an-internship"
          icon={<FiCalendar />}
          label="Post an Internship"
          active={activePath === '/hiring-channels/post-an-internship'}
        />
      </SidebarNavGroup>

      <SidebarNavGroup label="Job Management" icon={<FiBriefcase />} active={activePath.includes('/job-management')}>
        <SidebarNavItem
          to="/job-management/on-campus-listings"
          icon={<FiMapPin />}
          label="On-campus Listings"
          active={activePath === '/job-management/on-campus-listings'}
        />
        <SidebarNavItem
          to="/job-management/off-campus-listings"
          icon={<FiLayers />}
          label="Off-campus Listings"
          active={activePath === '/job-management/off-campus-listings'}
        />
        <SidebarNavItem
          to="/job-management/pool-campus-listings"
          icon={<FiUsers />}
          label="Pool Campus Listings"
          active={activePath === '/job-management/pool-campus-listings'}
        />
        <SidebarNavItem
          to="/job-management/job-listings"
          icon={<FiFileText />}
          label="Job Listings"
          active={activePath === '/job-management/job-listings'}
        />

          <SidebarNavItem
          to="/job-management/internship-listings"
          icon={<FiFileText />}
          label="Internship Listings"
          active={activePath === '/job-management/internship-listings'}
        />
      </SidebarNavGroup>

      <SidebarNavGroup label="Shortlisted Candidates/Colleges" icon={<FiCheckCircle />} active={activePath.includes('/shortlisted')}>
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

         <SidebarNavItem
          to="/shortlisted/jobs-listings"
          icon={<FiFileText />}
          label="Job Listings"
          active={activePath === '/shortlisted/jobs-listings'}
        />
        
         <SidebarNavItem
          to="/shortlisted/internship-listings"
          icon={<FiLayers />}
          label="Internship"
          active={activePath === '/shortlisted/internship-listings'}
        />

      </SidebarNavGroup>

      <SidebarNavGroup label="Accepted Candidates/Colleges" icon={<FiThumbsUp />} active={activePath.includes('/accepted')}>
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
          to="/accepted/jobs-listings"
          icon={<FiFileText />}
          label="Job Listings"
          active={activePath === '/accepted/jobs-listings'}
        />

         <SidebarNavItem
          to="/accepted/internship-listings"
          icon={<FiUsers />}
          label="Intership"
          active={activePath === '/accepted/internship-listings'}
        />
      </SidebarNavGroup>

      <SidebarNavItem
        to="/interviews"
        icon={<FiMic />}
        label="Interviews"
        active={activePath === '/interviews'}
      />
      <SidebarNavItem
        to="/reports"
        icon={<FiBarChart2 />}
        label="Reports"
        active={activePath === '/reports'}
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

export default CompanySidebar;