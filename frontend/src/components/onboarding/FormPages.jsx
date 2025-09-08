import ResumeUpload from './steps/ResumeUpload'
import BasicDetails from './steps/BasicDetails'
import Education from './steps/Education'
import CareerGoals from './steps/CareerGoals'
import FinalDetails from './steps/FinalDetails'

function FormPages({ currentStep, formData, isEditable, handleInputChange, toggleEdit }) {
  // Render the appropriate form based on current step
  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <ResumeUpload 
            formData={formData} 
            isEditable={isEditable} 
            handleInputChange={handleInputChange} 
            toggleEdit={toggleEdit}
          />
        )
      case 2:
        return (
          <BasicDetails 
            formData={formData} 
            isEditable={isEditable} 
            handleInputChange={handleInputChange} 
            toggleEdit={toggleEdit}
          />
        )
      case 3:
        return (
          <Education 
            formData={formData} 
            isEditable={isEditable} 
            handleInputChange={handleInputChange} 
            toggleEdit={toggleEdit}
          />
        )
      case 4:
        return (
          <CareerGoals 
            formData={formData} 
            isEditable={isEditable} 
            handleInputChange={handleInputChange} 
            toggleEdit={toggleEdit}
          />
        )
      case 5:
        return (
          <FinalDetails 
            formData={formData} 
            isEditable={isEditable} 
            handleInputChange={handleInputChange} 
            toggleEdit={toggleEdit}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="px-8 py-6 animate-slide-in">
      {renderForm()}
    </div>
  )
}

export default FormPages