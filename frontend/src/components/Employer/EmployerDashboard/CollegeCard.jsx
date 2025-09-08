import { Link } from 'react-router-dom';

const CollegeCard = ({ college }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </div>
      <div className="p-4">
        <div className="font-medium mb-1 text-center">Degree</div>
        <div className="text-sm text-gray-600 mb-3 text-center">{college.name}</div>
        <Link 
          to={`/employer-dashboard/on-campus-request/${college.id}`}
          className="block w-full text-center border border-gray-300 rounded py-2 text-sm hover:bg-gray-50 transition"
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

export default CollegeCard;