import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext';

const StepLayout = ({ 
  children, 
  step, 
  title, 
  subtitle, 
  prevRoute, 
  nextRoute,
  contextKey,
  onNext
}) => {
  const navigate = useNavigate();
  const { editMode, toggleEditMode } = useAppContext();

  const steps = [
   // { num: 1, route: '/edit/fresher-welcome' },
    { num: 1, route: '/edit/fresher-resume-upload' },
    { num: 2, route: '/edit/fresher-basic-details' },
    { num: 3, route: '/edit/fresher-education' },
    { num: 4, route: '/edit/fresher-career-goals' },
    { num: 5, route: '/edit/fresher-final-details' },
  //  { num: 7, route: '/edit/fresher-agreement' },
  ];

  const handleNext = () => {
    if (onNext && !onNext()) {
      return; // If validation fails
    }
    navigate(nextRoute);
  };

  const handleBack = () => {
    navigate(prevRoute);
  };

  const handleEdit = () => {
    toggleEditMode(contextKey);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-none shadow-lg">
      {/* Progress Bar */}
      <div className="flex justify-center items-center py-6 px-8 border-b">
        {steps.map((s) => (
          <div key={s.num} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
              ${s.num < step ? 'bg-black text-white' : ''}
              ${s.num === step ? 'bg-black text-white' : ''}
              ${s.num > step ? 'bg-white border border-gray-300 text-black' : ''}
            `}>
              {s.num < step ? '✓' : s.num}
            </div>
            {s.num < 5 && (
              <div className="w-12 h-0.5 bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}
        
        {children}
        
        <div className="flex justify-between mt-8">
          {prevRoute && (
            <button 
              className="bg-white border border-gray-300 text-black px-4 py-2 rounded"
              onClick={handleBack}
            >
              Back
            </button>
          )}
          <div className="ml-auto flex gap-2">
            <button 
              className="bg-black text-white px-4 py-2 rounded"
              onClick={handleEdit}
            >
              {editMode[contextKey] ? 'Save' : 'Edit'}
            </button>
            {nextRoute && (
              <button 
                className="bg-black text-white px-4 py-2 rounded"
                onClick={handleNext}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepLayout;