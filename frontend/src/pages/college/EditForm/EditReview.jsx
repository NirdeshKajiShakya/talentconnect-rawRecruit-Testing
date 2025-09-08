export default function EditReview({ prevStep, nextStep }) {
    return (
        <div className="fixed inset-0 bg-gray-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="bg-white text-center w-full max-w-lg p-6 rounded-lg shadow-lg my-8">
                    <h1 className="text-2xl font-bold mb-4">Review & Edit Your Details</h1>
                    <p className="mb-8 text-gray-600">We've pre-filled your details based on your resume. Please review the information below and make any necessary edits before submitting.</p>
                    <div className="flex justify-between mt-8">
                        <button 
                            onClick={prevStep} 
                            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            Back
                        </button>
                        <button 
                            onClick={nextStep} 
                            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}