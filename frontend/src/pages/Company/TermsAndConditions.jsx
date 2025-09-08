


import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TermsAndConditions({ formData, updateFormData, prevStep, onSubmit }) {
    const handleAcceptTerms = (e) => {
        // updateFormData is now for top-level fields: (fieldName, value)
        updateFormData('acceptedTerms', e.target.checked);
    };

    const handleGetStartedClick = async () => {
        try {
            if (formData.acceptedTerms) {
                await onSubmit(); 
            } else {
                alert("Please accept the Terms & Conditions to proceed.");
            }
        } catch (error) {
            console.error("Submission failed:", error);
            alert("There was an error submitting the form. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <motion.div
                className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Terms & Conditions and Privacy Policy</h1>


                <div className="flex items-center justify-center mb-8">
                    <input
                        type="checkbox"
                        id="acceptTerms"
                        checked={formData.acceptedTerms || false}
                        onChange={handleAcceptTerms}
                        className="mr-2 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="acceptTerms" className="text-sm sm:text-base text-gray-700">
                        I agree to the Terms & Conditions and Privacy Policy
                    </label>
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={prevStep}
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleGetStartedClick}
                        disabled={!formData.acceptedTerms}
                        className={`px-6 py-2 rounded-md transition-colors duration-200 ${
                            formData.acceptedTerms
                                ? 'bg-black text-white hover:bg-gray-800'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        Get Started
                    </button>
                </div>
            </motion.div>
        </div>
    );
}