function Navigation({ currentStep, totalSteps, handleNext, handlePrevious, formData }) {
    const isLastStep = currentStep === totalSteps
    
    return (
      <div className="flex justify-between items-center p-6 border-t border-gray-200">
        <button
          onClick={handlePrevious}
          className={`btn btn-secondary ${currentStep === 1 ? 'invisible' : ''}`}
        >
          Cancel
        </button>
        
        {isLastStep ? (
          <div className="flex items-center gap-6">
            <div className="form-checkbox-wrapper">
              <input
                type="checkbox"
                name="termsAgreed"
                id="termsAgreed"
                checked={formData.termsAgreed}
                onChange={(e) => {
                  formData.termsAgreed = e.target.checked
                }}
                className="form-checkbox"
              />
              <label htmlFor="termsAgreed" className="form-checkbox-label">
                I have reviewed my details and confirm they are correct.
              </label>
            </div>
            <button
              onClick={handleNext}
              className="btn btn-primary whitespace-nowrap"
              disabled={!formData.termsAgreed}
            >
              Submit & Continue
            </button>
          </div>
        ) : (
          <button
            onClick={handleNext}
            className="btn btn-primary"
          >
            Next
          </button>
        )}
      </div>
    )
  }
  
  export default Navigation