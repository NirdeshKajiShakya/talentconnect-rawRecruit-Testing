import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function RequesInfo({onBackClick}) {
  const [numberOfEmployees, setNumberOfEmployees] = useState('');
  const [skillTypes, setSkillTypes] = useState([]);
  const [trainingMode, setTrainingMode] = useState('Virtual');
  const [evaluationType, setEvaluationType] = useState('Examination');
  const [hoursOrDays, setHoursOrDays] = useState('');

  const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false);
  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false);
  const [isHoursDropdownOpen, setIsHoursDropdownOpen] = useState(false);

  const employeeOptions = ['1-10', '11-50', '51-100', '100+'];
  const skillOptions = ['Technical Skills', 'Soft Skills', 'Leadership', 'Domain-Specific'];
  const hoursOptions = ['1-8 hours', '9-16 hours', '2-5 days', '1 week+'];

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    console.log({
      numberOfEmployees,
      skillTypes,
      trainingMode,
      evaluationType,
      hoursOrDays
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4">
      <div className="max-w-3xl w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            OnDemand Training: <br />Upskill with Purpose
          </h1>
          <p className="text-sm text-gray-700 max-w-2xl mx-auto">
            Bridge the gap between potential and performance with tailored training programs. OnDemand Training empowers
            companies to offer job-ready learning experiences for students or newly hired employees. Whether it's onboarding,
            domain-specific skills, or soft skills—train when you need, how you need.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow border max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-2 text-center">Request info for On-Demand Training</h2>
          <p className="text-sm text-gray-600 mb-6 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>

          <div className="space-y-4">
            {/* Number of Employees */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Employees</label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-left flex justify-between items-center"
                  onClick={() => setIsEmployeeDropdownOpen(!isEmployeeDropdownOpen)}
                >
                  <span>{numberOfEmployees || 'Select an option'}</span>
                  <ChevronDown size={16} />
                </button>
                {isEmployeeDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                    {employeeOptions.map((option) => (
                      <div
                        key={option}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setNumberOfEmployees(option);
                          setIsEmployeeDropdownOpen(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Types of Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Types of Skills</label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-left flex justify-between items-center"
                  onClick={() => setIsSkillsDropdownOpen(!isSkillsDropdownOpen)}
                >
                  <span>{skillTypes.length > 0 ? skillTypes.join(', ') : 'Select skills'}</span>
                  <ChevronDown size={16} />
                </button>
                {isSkillsDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                    {skillOptions.map((option) => (
                      <div
                        key={option}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          if (skillTypes.includes(option)) {
                            setSkillTypes(skillTypes.filter(item => item !== option));
                          } else {
                            setSkillTypes([...skillTypes, option]);
                          }
                        }}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={skillTypes.includes(option)}
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

            {/* Mode of Training */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mode of Training</label>
              <div className="flex gap-2">
                {['Virtual', 'Classroom'].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    className={`px-4 py-2 border border-gray-300 ${
                      trainingMode === mode ? 'bg-black text-white' : 'bg-gray-100'
                    }`}
                    onClick={() => setTrainingMode(mode)}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Evaluation based on */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Evaluation based on</label>
              <div className="flex gap-2">
                {['Examination', 'Project'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`px-4 py-2 border border-gray-300 ${
                      evaluationType === type ? 'bg-black text-white' : 'bg-gray-100'
                    }`}
                    onClick={() => setEvaluationType(type)}
                  >
                    {type}
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
                  <span>{hoursOrDays || 'Select duration'}</span>
                  <ChevronDown size={16} />
                </button>
                {isHoursDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                    {hoursOptions.map((option) => (
                      <div
                        key={option}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setHoursOrDays(option);
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
                className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
                onClick={handleSubmit}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
