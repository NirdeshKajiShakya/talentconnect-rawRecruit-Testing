// import { motion } from 'framer-motion'

// const StepIndicator = ({ currentStep, totalSteps }) => {
//   return (
//     <div className="flex items-center justify-center w-full">
//       {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => {
//         const isCompleted = currentStep > step
//         const isActive = currentStep === step
        
//         return (
//           <div key={step} className="flex items-center">
//             <div className="relative">
//               <motion.div 
//                 className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
//                   isCompleted || isActive
//                     ? 'bg-black text-white'
//                     : 'bg-white text-gray-400 border border-gray-300'
//                 }`}
//                 initial={{ scale: 0.8 }}
//                 animate={{ scale: isActive ? 1 : 0.9 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 {isCompleted ? (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                 ) : (
//                   step
//                 )}
//               </motion.div>
//             </div>
            
//             {step < totalSteps && (
//               <div className="flex-1 h-[1px] bg-gray-300 mx-2">
//                 {isCompleted && (
//                   <motion.div 
//                     className="h-full bg-black"
//                     initial={{ width: 0 }}
//                     animate={{ width: '100%' }}
//                     transition={{ duration: 0.5 }}
//                   />
//                 )}
//               </div>
//             )}
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// export default StepIndicator

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