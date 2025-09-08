import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const JobCard = ({ job }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="relative h-40 bg-gray-200">
                <img
                    src={job.logo}
                    alt={`${job.company} `}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4">
                <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{job.jobTitle} Intern</h3>
                    <p className="text-sm text-gray-600">{job.companyName}</p>
                </div>
                <Link 
                    to={`/college-dashboard/internship-opportunities/${job.id}`}
                    className="block w-full py-2 px-4 text-center text-white bg-black border border-gray-300 rounded hover:bg-blue-600 transition-colors"
                >
                    Contact
                </Link>
            </div>
        </div>
    );
};

JobCard.propTypes = {
    job: PropTypes.shape({
        id: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        degree: PropTypes.string.isRequired,
        university: PropTypes.string.isRequired
    }).isRequired
};

export default JobCard;