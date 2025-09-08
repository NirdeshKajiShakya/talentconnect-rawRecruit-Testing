import { Link } from 'react-router-dom';
import StatusBadge from '../StatusBadge';

const ApplicationCard = ({ application }) => {
  // const { id, company, position, application.drive.minimumSalary, application.currentStatus, application.createdAt, logo } = application;
  // console.log("Applcaiotm card: ", application)

  // Determine action button based on status
  const renderActionButton = () => {
    switch (application.currentStatus) {
      case 'Registered':
        return (
          <button className="w-full btn bg-black text-white hover:bg-gray-900 rounded-md py-2 px-4 text-sm font-medium">
            Download JD
          </button>
        );
      case 'Shortlisted':
        return (
          <button className="w-full btn bg-black text-white hover:bg-green-700 rounded-md py-2 px-4 text-sm font-medium">
            Shortlisted
          </button>
        );
      case 'Rejected':
        return (
          <button className="w-full btn bg-black text-white hover:bg-red-700 rounded-md py-2 px-4 text-sm font-medium">
            Download JD
          </button>
        );
      default:
        return (
          <button className="w-full btn bg-gray-800 text-white hover:bg-gray-900 rounded-md py-2 px-4 text-sm font-medium">
            Download JD
          </button>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-slide-up border border-gray-200">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
              {/* <img src={logo} alt={`${company} logo`} className="h-8 w-8 object-contain" /> */}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{application?.company}</h3>
              <p className="text-sm text-gray-600">{application?.position}</p>
            </div>
          </div>
          <StatusBadge status={application.currentStatus} />
        </div>

        <div className="text-sm text-gray-500 mb-2">
          <div className="flex justify-between mt-2">
            <span>CTC Package:</span>
            <div className="font-semibold text-gray-700">{application.drive.minimumSalary}</div>
          </div>
          <div className="flex justify-between mt-2">
            <span>Applied On:</span>
            <div className="font-semibold text-gray-700">{new Date(application.createdAt).toUTCString().slice(0, 16)}</div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 p-4 grid grid-cols-2 gap-2">
        <Link
          to={`/registered/on-campus-opportunities/${application._id}`}
          className="btn btn-primary text-center bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 px-4 text-sm font-medium"
        >
          View Details
        </Link>
        {renderActionButton()}
      </div>
    </div>
  );
};

export default ApplicationCard;