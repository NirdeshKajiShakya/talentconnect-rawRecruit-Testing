
import { useState } from 'react';
import { Calendar, MapPin, FileText, Users, CheckCircle, ArrowUpRight, User, Mail, Phone, Link, Briefcase, DollarSign, Target, ClipboardList } from 'lucide-react';
import { format, isValid } from 'date-fns';

const DetailRow = ({ icon: Icon, label, value }) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;
    return (
        <div className="flex items-start">
            <Icon className="w-5 h-5 mr-3 mt-1 text-gray-500 flex-shrink-0" />
            <div>
                <p className="font-semibold text-gray-800">{label}</p>
                <p className="text-gray-600">{Array.isArray(value) ? value.join(', ') : value}</p>
            </div>
        </div>
    );
};

const CollegeRequestDetail = ({ collegeApplication, onAccept, onShortlist, onReject }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const safeFormatDate = (dateString, formatStr = 'MMM d, yyyy') => {
    if (!dateString) return 'Not Specified';
    const date = new Date(dateString);
    return isValid(date) ? format(date, formatStr) : 'Invalid Date';
  };

  const handleAction = async (actionCallback) => {
    setIsSubmitting(true);
    try {
      await actionCallback();
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- DESTRUCTURE ALL FIELDS FROM THE SINGLE, MERGED PROP ---
  const {
    // College Application Data
    applicationId,
    appliedAt,
    currentStatus = 'Unknown',
    
    // College Profile Data
    collegeName = 'Not Specified',
    city = 'Not Specified',
    state = 'Not Specified',
    country = 'Not Specified',
    pincode = 'Not Specified',
    profileImage = null,
    collegeProfilePdf = null,
    collegeDescriptionPdf = null,
    collegeWebsite = null,
    linkedinProfile = null, // College's LinkedIn
    placementRate = 'Not Specified',
    highestPackage = 'Not Specified',
    averagePackage = 'Not Specified',

    // Drive (CampusRegistration) Data - now merged in!
    lookingFor = 'Not Specified',
    employmentType = 'Not Specified',
    preferredLocations = [],
    minimumSalary = 'Not Specified',
    startDate = '',
    endDate = '',
    rounds = [],
    selectionProcess = [],
    contactPerson = 'Not Specified',
    contactDesignation = 'Not Specified',
    email = 'Not Specified',
    mobile = 'Not Specified',
    linkedin = '', // Coordinator's LinkedIn
    minimumStudents = 'Not Specified',
  } = collegeApplication || {};

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
      {/* College Header */}
      <div className="pb-4 border-b border-gray-200 mb-4">
        <div className="flex items-center">
          {profileImage ? (
            <img src={profileImage} alt={collegeName} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center text-gray-500 text-xs">No Image</div>
          )}
          <div className="ml-4 flex-grow">
            <h1 className="text-xl font-bold text-gray-900">{collegeName}</h1>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <MapPin size={14} className="mr-1" />
              <span>{[city, state].filter(Boolean).join(', ')}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="text-center"><div className="font-bold text-lg">{placementRate}{placementRate !== 'Not Specified' && '%'}</div><div className="text-sm text-gray-600">Placement Rate</div></div>
          <div className="text-center"><div className="font-bold text-lg">{highestPackage}{highestPackage !== 'Not Specified' && ' LPA'}</div><div className="text-sm text-gray-600">Highest Package</div></div>
          <div className="text-center"><div className="font-bold text-lg">{averagePackage}{averagePackage !== 'Not Specified' && ' LPA'}</div><div className="text-sm text-gray-600">Average Package</div></div>
        </div>
      </div>

      {/* Main Drive Details Section */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Drive Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <DetailRow icon={Target} label="Role" value={lookingFor} />
            <DetailRow icon={Briefcase} label="Employment Type" value={employmentType} />
            <DetailRow icon={MapPin} label="Locations" value={preferredLocations} />
            <DetailRow icon={DollarSign} label="Minimum Salary" value={minimumSalary} />
            <DetailRow icon={Users} label="Minimum Students" value={minimumStudents} />
            <DetailRow icon={Calendar} label="Drive Period" value={`${safeFormatDate(startDate)} to ${safeFormatDate(endDate)}`} />
            <DetailRow icon={ClipboardList} label="Rounds" value={rounds} />
            <DetailRow icon={ClipboardList} label="Selection Process" value={selectionProcess} />
        </div>
      </div>

      {/* Proposed date */}
      <div>
        
      </div>
      
      {/* Coordinator and Application Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Drive Coordinator</h3>
            <div className="space-y-3 text-sm">
                <div className="flex items-center"><User size={16} className="mr-2 text-gray-500 flex-shrink-0" /><span>{contactPerson} ({contactDesignation})</span></div>
                <div className="flex items-center"><Mail size={16} className="mr-2 text-gray-500 flex-shrink-0" /><span>{email}</span></div>
                <div className="flex items-center"><Phone size={16} className="mr-2 text-gray-500 flex-shrink-0" /><span>{mobile}</span></div>
                {linkedin && <a href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline"><Link size={16} className="mr-2 flex-shrink-0" /><span>Coordinator LinkedIn</span></a>}
            </div>
        </div>
        <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">College Application Status</h3>
            <div className="space-y-3 text-sm">
                <div className="flex items-center"><Calendar size={16} className="mr-2 text-gray-500 flex-shrink-0" /><span>Applied on: {safeFormatDate(appliedAt)}</span></div>
                <div className="flex items-center"><FileText size={16} className="mr-2 text-gray-500 flex-shrink-0" /><span>Current Status: <span className="font-semibold">{currentStatus}</span></span></div>
            </div>
        </div>
      </div>

      {/* College Links and Documents */}
      <div className="mb-6">
          <h3 className="text-lg font-bold mb-4 text-gray-800">College Resources</h3>
          <div className="flex flex-wrap gap-4 text-sm">
              {collegeWebsite && <a href={collegeWebsite.startsWith('http') ? collegeWebsite : `https://${collegeWebsite}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline"><Link size={16} className="mr-2" />College Website <ArrowUpRight size={16} className="ml-1" /></a>}
              {linkedinProfile && <a href={linkedinProfile.startsWith('http') ? linkedinProfile : `https://${linkedinProfile}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline"><Link size={16} className="mr-2" />College LinkedIn <ArrowUpRight size={16} className="ml-1" /></a>}
              {collegeProfilePdf && <a href={collegeProfilePdf} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline"><FileText size={16} className="mr-2" />Profile PDF <ArrowUpRight size={16} className="ml-1" /></a>}
              {collegeDescriptionPdf && <a href={collegeDescriptionPdf} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline"><FileText size={16} className="mr-2" />Description PDF <ArrowUpRight size={16} className="ml-1" /></a>}
          </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
        <button onClick={() => handleAction(() => onAccept(applicationId))} disabled={isSubmitting} className="flex-1 justify-center bg-black text-white py-2 font-medium rounded-md hover:bg-gray-800 disabled:opacity-50 transition-colors duration-200">
          {isSubmitting ? 'Processing...' : 'Accept Application'}
        </button>
        <button onClick={() => handleAction(() => onShortlist(applicationId))} disabled={isSubmitting} className="flex-1 justify-center bg-white border border-gray-300 text-gray-700 py-2 font-medium rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200">
          {isSubmitting ? 'Processing...' : 'Shortlist Application'}
        </button>
        <button onClick={() => handleAction(() => onReject(applicationId))} disabled={isSubmitting} className="flex-1 justify-center bg-white border border-gray-300 text-gray-700 py-2 font-medium rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200">
          {isSubmitting ? 'Processing...' : 'Reject Application'}
        </button>
      </div>
    </div>
  );
};

export default CollegeRequestDetail;