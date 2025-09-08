import { FaCheck } from 'react-icons/fa'

function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="flex justify-center py-6">
      <div className="flex items-center">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isActive = stepNumber === currentStep
          
          return (
            <div key={stepNumber} className="flex items-center">
              <div 
                className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium
                  ${isCompleted || isActive ? 'bg-black text-white' : 'bg-white text-black border border-gray-300'}`}
              >
                {isCompleted ? <FaCheck size={10} /> : stepNumber}
              </div>
              
              {stepNumber < totalSteps && (
                <div 
                  className={`w-12 h-px mx-1
                    ${stepNumber < currentStep ? 'bg-black' : 'bg-gray-300'}`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StepIndicator