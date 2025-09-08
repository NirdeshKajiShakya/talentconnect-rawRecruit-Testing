import { useForm } from './FormContext';

const FormLayout = ({ title, subtitle, children, showProgress = true }) => {
  const { getCurrentStep, progressSteps } = useForm();
  const currentStep = getCurrentStep();

  return (
    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
      {/* Progress Bar */}
      {showProgress && (
        <div className="flex items-center justify-between mb-8">
          {progressSteps.map((progressStep, index) => (
            <div key={index} className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${index + 1 < currentStep ? 'bg-black text-white' : 
                    index + 1 === currentStep ? 'bg-black text-white' : 'bg-white text-black border border-gray-300'}`}
              >
                {index + 1 < currentStep ? '✓' : index + 1}
              </div>
              {index < progressSteps.length - 1 && (
                <div className={`w-12 h-0.5 ${index + 1 < currentStep ? 'bg-black' : 'bg-gray-300'}`}></div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-2">{title}</h1>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      
      {children}
    </div>
  );
};

export default FormLayout;
