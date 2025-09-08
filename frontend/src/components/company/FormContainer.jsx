"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StepIndicator from './StepIndicator';
import CompanyInfoStep from '@/pages/Company/CompanyInfoStep';
import HiringPreferencesStep from '@/pages/Company/HiringPreferencesStep';
import VerificationStep from '@/pages/Company/VerificationStep';
import Introduction from '@/pages/Company/Introduction';
import TermsAndConditions from '@/pages/Company/TermsAndConditions';
import useApplicationForm from '../../pages/Company/ApplicationForm';
import PersonalInfoStep from '../../pages/Company/PersonalPreferencesStep'; // <-- 1. IMPORT the new step

const FormContainer = () => {
    const { formData, updateFormData, handleSubmit } = useApplicationForm();
    const [currentStep, setCurrentStep] = useState(0);

    const totalSteps = 6; // <-- 2. UPDATE total steps (Intro, Personal, Company, Hiring, Verification, T&C)
    const navigate = useNavigate();

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };
    
    // 3. ADD the new step to the array after Introduction
    const steps = [
        <Introduction key="intro" nextStep={nextStep} />,
        
        <PersonalInfoStep
            key="personal"
            formData={formData.employerDetails}
            handleChange={(field, value) => updateFormData('employerDetails', field, value)}
            nextStep={nextStep}
            prevStep={prevStep}
        />,

        <CompanyInfoStep
            key="company"
            formData={formData.companyDetails}
            handleChange={(field, value) => updateFormData('companyDetails', field, value)}
            nextStep={nextStep}
            prevStep={prevStep}
        />,
        <HiringPreferencesStep
            key="hiring"
            formData={formData.hiringPreferences}
            handleChange={(field, value) => updateFormData('hiringPreferences', field, value)}
            nextStep={nextStep}
            prevStep={prevStep}
        />,
        <VerificationStep
            key="verification"
            formData={formData.kycDetails}
            handleChange={(field, value) => updateFormData('kycDetails', field, value)}
            prevStep={prevStep}
            nextStep={nextStep}
            updateFormData={updateFormData}
        />,
        <TermsAndConditions
            key="terms"
            formData={formData}
            updateFormData={(field, value) => updateFormData(field, value)}
            prevStep={prevStep}
            onSubmit={async () => {
                const success = await handleSubmit(); // Note: handleSubmit may need an update from previous suggestions
                if (success) {
                    navigate('/home');
                }
            }}
        />,
    ];

    const variants = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    const visualStepsCount = 5; // <-- 4. UPDATE visual steps to include the new step

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden min-h-screen flex flex-col">
            {currentStep > 0 && currentStep <= visualStepsCount && (
                <div className="p-6 border-b">
                    <StepIndicator currentStep={currentStep} totalSteps={visualStepsCount} />
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
                    className="p-6 flex-grow flex items-center justify-center"
                >
                    {steps[currentStep]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default FormContainer;