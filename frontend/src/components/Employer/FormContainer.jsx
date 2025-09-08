import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StepIndicator from './StepIndicator'
import PersonalInfoStep from '@/pages/Company/PersonalPreferencesStep'
import CompanyInfoStep from '@/pages/Company/CompanyInfoStep'
import HiringPreferencesStep from '@/pages/Company/HiringPreferencesStep'
import VerificationStep from '@/pages/Company/VerificationStep'
import Introduction from '@/pages/Company/Introduction'

const FormContainer = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Personal info
    name: '',
    designation: '',
    email: '',
    mobile: '',
    linkedIn: '',
    
    // Company info
    companyName: '',
    description: '',
    companyType: '',
    industryType: '',
    employeesCount: '',
    establishedYear: '',
    contactNumber: '',
    alternateNumber: '',
    location: '',
    state: '',
    city: '',
    country: '',
    pincode: '',
    
    // Hiring preferences
    jobRoles: [],
    hiringLocations: [],
    lookingFor: '',
    employmentType: [],
    
    // Verification
    documents: [],
    tanNumber: '',
    gstNumber: '',
    companyRegistration: ''
  })
  
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4))
  }
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }
  
  const steps = [
    <Introduction key="intro" nextStep={nextStep} />,
    <PersonalInfoStep 
      key="personal" 
      formData={formData} 
      handleChange={handleChange} 
      nextStep={nextStep} 
      prevStep={prevStep} 
    />,
    <CompanyInfoStep 
      key="company" 
      formData={formData} 
      handleChange={handleChange} 
      nextStep={nextStep} 
      prevStep={prevStep} 
    />,
    <HiringPreferencesStep 
      key="hiring" 
      formData={formData} 
      handleChange={handleChange} 
      nextStep={nextStep} 
      prevStep={prevStep} 
    />,
    <VerificationStep 
      key="verification" 
      formData={formData} 
      handleChange={handleChange} 
      prevStep={prevStep} 
      onSubmit={() => console.log('Form submitted', formData)} 
    />
  ]
  
  // Animation variants
  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  }
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {currentStep > 0 && (
        <div className="p-6 border-b">
          <StepIndicator currentStep={currentStep} totalSteps={4} />
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          {steps[currentStep]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default FormContainer