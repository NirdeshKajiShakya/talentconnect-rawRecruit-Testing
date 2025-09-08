import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const HackathonCard = ({ hackathon }) => {

  const convertDate = () => {

  }

  function getTimeDifference(createdAt) {
    const now = new Date();
    const createdDate = new Date(createdAt);
    // console.log(now,"....",createdDate)
    const diffInMs = now - createdDate;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }

  return (
    <Link to={`/${localStorage.getItem('selectedRole')}-dashboard/hackathon/${hackathon._id}`} className="block border border-gray-200 rounded-md overflow-hidden mb-4 hover:shadow-md transition-shadow duration-300">
      <div className="flex p-4">
        <div className="w-16 h-16 flex-shrink-0 rounded-md flex items-center justify-center">
          {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg> */}
          <img src={hackathon.bannerImage} className='w-full h-full' alt="" />
        </div>
        <div className="ml-4 flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center text-xs text-gray-500 mb-1">
                <span>{new Date(hackathon.startDate).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                {/* <span>{hackathon.prizes?.join(', ')}</span> */}
                <span>Cash and Swags</span>
                <span className="mx-2">•</span>
                <span>{hackathon.registeredUsers} Users Registered</span>
              </div>
              <h3 className="font-bold text-lg">{hackathon.title}</h3>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {getTimeDifference(hackathon.createdAt)}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {hackathon.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HackathonCard;