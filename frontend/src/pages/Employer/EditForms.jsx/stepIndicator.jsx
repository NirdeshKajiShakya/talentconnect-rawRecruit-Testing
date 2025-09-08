const StepIndicator = ({ currentStep }) => (
  <div className="flex items-center justify-center mb-8">
    {[1, 2, 3].map((step) => (
      <div key={step} className="flex items-center">
        <div 
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= step 
              ? 'bg-black text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          {currentStep > step ? '✓' : step}
        </div>
        {step < 3 && (
          <div className={`w-20 h-0.5 ${currentStep > step ? 'bg-black' : 'bg-gray-200'}`} />
        )}
      </div>
    ))}
  </div>
);

export default StepIndicator;