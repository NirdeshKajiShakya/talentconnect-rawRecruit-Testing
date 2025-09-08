import { useNavigate } from 'react-router-dom';

export default function TermsAndConditions({ formData, updateFormData, prevStep, handleSubmit }) {
    const handleAcceptTerms = (e) => {
        updateFormData('acceptedTerms', e.target.checked);
    };
 // This is correctly kept.

    const handleGetStartedClick = () => {
        if (formData.acceptedTerms) {
            // Call the handleSubmit function passed from the parent component.
            // This allows the parent to manage the final submission logic (e.g., API call, final navigation).
            handleSubmit();
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="text-center p-6 bg-white rounded-lg shadow-lg w-full max-w-lg my-8">
                    <h1 className="text-2xl font-bold mb-6">Terms & Conditions and Privacy Policy</h1>

                    {/* Removed the large placeholder text block as per your request */}

                    <div className="flex items-center justify-center mb-8">
                        <input
                            type="checkbox"
                            id="acceptTerms"
                            checked={formData.acceptedTerms || false}
                            onChange={handleAcceptTerms}
                            className="mr-2 h-5 w-5"
                        />
                        <label htmlFor="acceptTerms" className="text-sm sm:text-base">
                            I agree to the Terms & Conditions and Privacy Policy
                        </label>
                    </div>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={prevStep}
                            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            Back {/* Changed "Cancel" back to "Back" to match the first code block's functionality expectation */}
                        </button>
                        <button
                            onClick={handleGetStartedClick}
                            disabled={!formData.acceptedTerms}
                            className={`px-6 py-2 rounded-md transition-colors ${
                                formData.acceptedTerms
                                    ? 'bg-black text-white hover:bg-gray-800'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}