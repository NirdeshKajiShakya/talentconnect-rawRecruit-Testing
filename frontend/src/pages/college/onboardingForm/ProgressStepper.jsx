import { FaCheck } from 'react-icons/fa';

export default function ProgressStepper({ currentStep, totalSteps }) {
  return (
    <div className="flex justify-center py-12">
      <div className="flex items-center">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div key={stepNumber} className="flex items-center">
              {/* Step Circle */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium
                  ${isCompleted || isActive ? 'bg-black text-white' : 'bg-white text-black border border-gray-300'}`}
              >
                {isCompleted ? <FaCheck size={12} /> : stepNumber}
              </div>

              {/* Line between steps */}
              {stepNumber < totalSteps && (
                <div
                  className={`w-12 h-px mx-1
                    ${isCompleted ? 'bg-black' : isActive ? 'bg-black' : 'bg-gray-300'}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
