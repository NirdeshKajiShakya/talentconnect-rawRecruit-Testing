export default function CollegeDetails({ formData, updateFormData, nextStep, prevStep }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData(name, value);
    };

    // Ensure formData is defined before trying to access its properties
    const safeFormData = formData || {};

    return (
        <div className="fixed inset-0 bg-gray-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                    <h1 className="text-2xl font-bold mb-6">College/University Details</h1>
                    <p className="mb-6">Provide essential details about your institution.</p>

                    <div className="space-y-6">
                        <div>
                            <label className="block font-medium mb-1">College/University Name *</label>
                            <input
                                type="text"
                                name="collegeName"
                                value={safeFormData.collegeName || ''}
                                onChange={handleChange}
                                placeholder="Placeholder"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">College Location *</label>
                            <input
                                type="text"
                                name="collegeLocation"
                                value={safeFormData.collegeLocation || ''}
                                onChange={handleChange}
                                placeholder="Placeholder"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium mb-1">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={safeFormData.state || ''}
                                    onChange={handleChange}
                                    placeholder="Placeholder"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={safeFormData.city || ''}
                                    onChange={handleChange}
                                    placeholder="Placeholder"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium mb-1">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={safeFormData.country || ''}
                                    onChange={handleChange}
                                    placeholder="Placeholder"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={safeFormData.pincode || ''}
                                    onChange={handleChange}
                                    placeholder="Placeholder"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between  gap-10 mt-8">
                        <button
                            onClick={prevStep}
                            className="px-6 py-2 border border-gray-300 rounded-md"
                        >
                            Back
                        </button>
                        <button
                            onClick={nextStep}
                            className="px-6 py-2 bg-black text-white rounded-md"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}