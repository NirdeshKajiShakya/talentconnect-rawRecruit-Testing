// pages/CoordinatorDetails.jsx
export default function CoordinatorDetails({ formData, updateFormData, nextStep, prevStep }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData(name, value);
    };

    return (
        <div className="fixed inset-0 bg-gray-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg my-8">
                    <h1 className="text-2xl font-bold mb-6">Placement Coordinator Details</h1>
                    <p className="mb-6">Tell us who will be managing campus recruitment.</p>

                    <div className="space-y-6">
                        <div>
                            <label className="block font-medium mb-1">Enter your name *</label>
                            <input
                                type="text"
                                name="coordinatorName"
                                value={formData.coordinatorName}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Designation *</label>
                            <input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                placeholder="Placeholder"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Official email *</label>
                            <input
                                type="email"
                                name="officialEmail"
                                value={formData.officialEmail}
                                onChange={handleChange}
                                placeholder="hello@xyz.com"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Official mobile no. *</label>
                            <input
                                type="tel"
                                name="officialMobile"
                                value={formData.officialMobile}
                                onChange={handleChange}
                                placeholder="1234567890"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">LinkedIn Profile</label>
                            <div className="flex items-center">
                                <span className="p-2 border border-gray-300 rounded-l-md bg-gray-100">http://</span>
                                <input
                                    type="text"
                                    name="linkedinProfile"
                                    value={formData.linkedinProfile}
                                    onChange={handleChange}
                                    placeholder="www.relume.io"
                                    className="flex-1 p-2 border-t border-b border-r border-gray-300 rounded-r-md"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-10 mt-8">
                        <button
                            onClick={prevStep}
                            className="px-6 py-2 border border-gray-300 rounded-md"
                        >
                            Cancel
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