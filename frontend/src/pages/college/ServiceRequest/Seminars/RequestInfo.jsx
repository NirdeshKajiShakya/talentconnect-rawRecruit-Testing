import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
export default function RequestInfo({ onBackClick, handleSubmit: handleSubmitProp }) {
  const [numberOfStudents, setNumberOfStudents] = useState('');
  const [seminarTypes, setSeminarTypes] = useState([]);
  const [evaluationType, setEvaluationType] = useState('Examination');
  const [duration, setDuration] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isStudentsDropdownOpen, setIsStudentsDropdownOpen] = useState(false);
  const [isSeminarsDropdownOpen, setIsSeminarsDropdownOpen] = useState(false);
  const [isHoursDropdownOpen, setIsHoursDropdownOpen] = useState(false);

  const studentsOptions = ['1-10', '11-50', '51-100', '100+'];
  const seminarOptions = ['Cyber Security', 'AI', 'Leadership', 'Domain-Specific'];
  const hoursOptions = ['1-8 hours', '9-16 hours', '2-5 days', '1 week+'];


const handleSubmit = async () => {
  if (!numberOfStudents || seminarTypes.length === 0 || !duration) {
    alert("Please fill all required fields.");
    return;
  }

  const formData = {
    numberOfStudents,
    typesOfSeminar: seminarTypes,
    evaluationBasedOn: evaluationType,
    numberOfHoursDays: duration
  };

  setIsSubmitting(true);
  try {
    await handleSubmitProp(formData); // call parent-provided handler
    setSubmissions(prev => [...prev, { ...formData, id: Date.now() }]);
  } catch (error) {
    console.error("Submission error:", error);
    alert("Submission failed.");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4">
      <div className="max-w-3xl w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Seminars: Empower Minds, Inspire Futures
          </h1>
          <p className="text-sm text-gray-700 max-w-2xl mx-auto">
            Equip students with insights and knowledge that shape their careers. Our seminars bring industry experts to your campus, offering students a deeper understanding of various career paths, market trends, and essential skills. Create a learning environment that fosters growth and help students make informed career decisions.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow border max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-2 text-center">Register for Transformative Seminars</h2>
          <p className="text-sm text-gray-600 mb-6 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>

          <div className="space-y-4">
            {/* Number of Students */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Students</label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-left flex justify-between items-center"
                  onClick={() => setIsStudentsDropdownOpen(!isStudentsDropdownOpen)}
                >
                  <span>{numberOfStudents || 'Select an option'}</span>
                  <ChevronDown size={16} />
                </button>
                {isStudentsDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                    {studentsOptions.map((option) => (
                      <div
                        key={option}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setNumberOfStudents(option);
                          setIsStudentsDropdownOpen(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Types of Seminar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Types of Seminar</label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-left flex justify-between items-center"
                  onClick={() => setIsSeminarsDropdownOpen(!isSeminarsDropdownOpen)}
                >
                  <span>{seminarTypes.length > 0 ? seminarTypes.join(', ') : 'Select seminars'}</span>
                  <ChevronDown size={16} />
                </button>
                {isSeminarsDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                    {seminarOptions.map((option) => (
                      <div
                        key={option}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          if (seminarTypes.includes(option)) {
                            setSeminarTypes(seminarTypes.filter(item => item !== option));
                          } else {
                            setSeminarTypes([...seminarTypes, option]);
                          }
                        }}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={seminarTypes.includes(option)}
                            readOnly
                            className="mr-2"
                          />
                          {option}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Evaluation based on */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Evaluation based on</label>
              <div className="flex gap-2">
                {["Examination", "Project"].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    className={`px-4 py-2 border border-gray-300 rounded ${
                      evaluationType === mode ? 'bg-black text-white' : 'bg-gray-100'
                    }`}
                    onClick={() => setEvaluationType(mode)}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Number of Hours/Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Hours/Days</label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-left flex justify-between items-center"
                  onClick={() => setIsHoursDropdownOpen(!isHoursDropdownOpen)}
                >
                  <span>{duration || 'Select duration'}</span>
                  <ChevronDown size={16} />
                </button>
                {isHoursDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                    {hoursOptions.map((option) => (
                      <div
                        key={option}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setDuration(option);
                          setIsHoursDropdownOpen(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Register Button */}
            <div className="flex justify-between pt-4">
              <button 
                type="button"
                onClick={onBackClick}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Home
              </button>  
              <button
                type="button"
                className={`px-6 py-2 rounded text-white ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-black hover:bg-gray-800'
                }`}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Register'}
              </button>
            </div>
          </div>
        </div>

        {/* Local Submissions Display (for testing) */}
        {submissions.length > 0 && (
          <div className="mt-8 bg-gray-50 p-4 rounded-lg max-w-md mx-auto">
            <h3 className="font-bold mb-2">Recent Submissions ({submissions.length}):</h3>
            {submissions.slice(-3).map((sub) => (
              <div key={sub.id} className="mb-2 p-2 bg-white rounded text-sm">
                <strong>Students:</strong> {sub.numberOfStudents}<br/>
                <strong>Seminars:</strong> {sub.seminarTypes.join(', ')}<br/>
                <strong>Evaluation:</strong> {sub.evaluationType}<br/>
                <strong>Duration:</strong> {sub.duration}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}