const ProgressSteps = ({ currentStep, totalSteps = 4 }) => {
    return (
      <div className="flex items-center justify-center mb-6">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-6 h-6 flex items-center justify-center rounded-full ${
              step <= currentStep ? 'bg-black text-white' : 'bg-white text-black border border-gray-300'
            }`}>
              {step}
            </div>
            {step < totalSteps && (
              <div className="w-12 h-px bg-gray-300 mx-1"></div>
            )}
          </div>
        ))}
      </div>
    );
  };
export default ProgressSteps ;  