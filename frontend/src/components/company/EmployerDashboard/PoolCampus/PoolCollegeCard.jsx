// import { Link } from 'react-router-dom';

// const PoolCollegeCard = ({ college }) => {
//   return (
//     <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//       <div className="h-48 bg-gray-200 flex items-center justify-center">
//         <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//           <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
//         </svg>
//       </div>
//       <div className="p-4">
//         <div className="font-medium mb-1 text-center">Degree</div>
//         <div className="text-sm text-gray-600 mb-3 text-center">{college.name}</div>
//         <Link 
//           to={`/employer-dashboard/pool-campus-requests/${college.id}`}
//           className="block w-full text-center border border-gray-300 rounded py-2 text-sm hover:bg-gray-50 transition"
//         >
//           Contact
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PoolCollegeCard;



import { Link } from 'react-router-dom';

const PoolCollegeCard = ({ college }) => {

  if (!college) return null;

  const collegeDetails = college.collegePosted;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="h-48 bg-gray-100 flex items-center justify-center">
       
        {collegeDetails?.profileImage ? (
          <img 
            src={collegeDetails.profileImage} 
            alt={`${collegeDetails?.collegeUniversityDetails?.collegeName || 'College'} logo`} 
            className="h-full w-full object-contain"
          />
        ) : (
          <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        )}
      </div>
      <div className="p-4">
 
        <div className="font-medium mb-1 text-center">
          {college?.degree?.map((d, i) => (
            <span key={i} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-1 mb-1">
              {d}
            </span>
          ))}
        </div>
      
        <h3 className="font-medium text-lg mb-1 text-center truncate">
          {college?.collegePosted?.collegeUniversityDetails?.collegeName || 'N/A'}
        </h3>

        <Link
          to={`/employer-dashboard/pool-campus-requests/${college._id}`}
          className="block w-full text-center border border-gray-300 rounded py-2 text-sm hover:bg-blue-600 transition"
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

export default PoolCollegeCard;