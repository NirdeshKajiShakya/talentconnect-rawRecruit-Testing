import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';

const DriveDetailPage = () => {
  const { driveId } = useParams();
  const navigate = useNavigate();
  const [drive, setDrive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMockDriveDetails = async () => {
      try {
        setLoading(true);
        await new Promise((res) => setTimeout(res, 800)); // simulate delay

        setDrive({
          id: driveId,
          institute: 'ABC Institute Of Technology',
          date: 'April 25, 2025',
          location: 'Mumbai, India',
          proposedDates: 'May 13-14, 2025',
          status: 'Upcoming',
          contactPerson: 'Dr. Rajesh Kumar',
          email: 'rajesh.kumar@abc-institute.edu',
          phone: '+91 98765 43210',
          description:
            'Campus recruitment drive for engineering graduates in Computer Science, Electronics and Electrical Engineering.',
          positions: [
            { title: 'Software Engineer', openings: 15, ctc: '8-12 LPA' },
            { title: 'Data Analyst', openings: 8, ctc: '6-9 LPA' },
            { title: 'Product Manager', openings: 3, ctc: '12-16 LPA' }
          ],
          timeline: [
            { event: 'Application Deadline', date: 'April 30, 2025' },
            { event: 'Pre-Placement Talk', date: 'May 13, 2025, 10:00 AM' },
            { event: 'Aptitude Test', date: 'May 13, 2025, 2:00 PM' },
            { event: 'Technical Interviews', date: 'May 14, 2025, 9:00 AM' },
            { event: 'HR Interviews', date: 'May 14, 2025, 2:00 PM' },
            { event: 'Results', date: 'May 20, 2025' }
          ]
        });

        setError(null);
      } catch (err) {
        console.error('Error loading mock drive:', err);
        setError('Failed to load mock drive details.');
      } finally {
        setLoading(false);
      }
    };

    loadMockDriveDetails();
  }, [driveId]);

  const handleBack = () => {
    navigate('/shortlisted/on-campus-listings');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button onClick={handleBack} className="flex items-center gap-2 text-gray-600 hover:text-black mb-4">
          <FaArrowLeft /> Back to Drives
        </button>
        <div className="bg-red-50 p-4 rounded-md text-red-600">{error}</div>
      </div>
    );
  }

  if (!drive) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button onClick={handleBack} className="flex items-center gap-2 text-gray-600 hover:text-black mb-4">
          <FaArrowLeft /> Back to Drives
        </button>
        <div className="bg-yellow-50 p-4 rounded-md text-yellow-600">Drive not found.</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <button onClick={handleBack} className="flex items-center gap-2 text-gray-600 hover:text-black mb-4">
          <FaArrowLeft /> Back to Drives
        </button>

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{drive.institute}</h1>
              <div className="mt-2 flex items-center gap-2 text-gray-600">
                <FaCalendarAlt />
                <span>{drive.date}</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-gray-600">
                <FaMapMarkerAlt />
                <span>{drive.location}</span>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                drive.status === 'Completed'
                  ? 'bg-gray-100 text-gray-600'
                  : drive.status === 'On-Going'
                  ? 'bg-green-100 text-green-600'
                  : 'bg-blue-100 text-blue-600'
              }`}
            >
              {drive.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Drive Description */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-3">Drive Overview</h2>
              <p className="text-gray-700">{drive.description}</p>
            </div>

            {/* Positions */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Open Positions</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Openings
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTC</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {drive.positions.map((position, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {position.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{position.openings}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{position.ctc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Drive Timeline</h2>
              <div className="relative">
                {drive.timeline.map((item, index) => (
                  <div key={index} className="mb-8 flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="rounded-full bg-blue-500 w-3 h-3"></div>
                      {index < drive.timeline.length - 1 && (
                        <div className="h-full w-0.5 bg-blue-200"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{item.event}</h3>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
              <div className="mt-4">
                <h3 className="font-medium">{drive.contactPerson}</h3>
                <p className="text-sm text-gray-500 mt-1">{drive.email}</p>
                <p className="text-sm text-gray-500 mt-1">{drive.phone}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-3">Proposed Dates</h2>
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-blue-800">{drive.proposedDates}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <button className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors mb-3">
                Edit Drive Details
              </button>
              <button className="w-full border border-black text-black py-2 px-4 rounded-md hover:bg-gray-100 transition-colors">
                Cancel Drive
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriveDetailPage;
