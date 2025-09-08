import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const JobCard = ({ job }) => {
  const companyName = job.companyPosted?.companyDetails?.companyName || 'Company';
  const logo = job.companyPosted?.profileImageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeRfV9n69zxuV4DQX7sYF7ql8ajx47wLioPeP-m4qFbHLkD9UNwfQSneRtkQEDnx-QxFs&usqp=CAU';

  const getJobStatus = () => {
    const now = new Date();
    const startDate = new Date(job.startDate);
    const endDate = new Date(job.endDate);

    if (now < startDate) {
      return { status: 'Pending', color: 'bg-yellow-400' };
    } else if (now >= startDate && now <= endDate) {
      return { status: 'Open', color: 'bg-green-500' };
    } else {
      return { status: 'Closed', color: 'bg-red-500' };
    }
  };

  const jobStatus = getJobStatus();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-40 bg-gray-200">
        <img
          src={logo}
          alt={`${companyName} logo`}
          className="w-full h-full object-cover"
        />
        {/* Job Status Badge */}
        <div className={`absolute top-2 right-2 px-3 py-1 text-xs font-bold text-white rounded-full ${jobStatus.color}`}>
          {jobStatus.status}
        </div>
      </div>
      <div className="p-4">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{companyName}</h3>
          <p className="text-sm text-gray-600">
            {job?.degree?.map((degree, index) => (
              <span key={index}>
                {degree}
                {index < job.degree.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
        <Link 
          to={`/college-dashboard/on-campus-opportunities/${job._id}`}
          className="block w-full py-2 px-4 text-center text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

JobCard.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    companyPosted: PropTypes.shape({
      companyDetails: PropTypes.shape({
        companyName: PropTypes.string
      }),
      profileImageUrl: PropTypes.string
    }),
    degree: PropTypes.arrayOf(PropTypes.string).isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired
  }).isRequired
};

export default JobCard;