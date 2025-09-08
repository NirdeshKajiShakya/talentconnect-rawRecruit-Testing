

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react' // Import useEffect
import Button from '@/components/company/Button'
import FormField from '@/components/company/FormField'

const VerificationStep = ({ formData, handleChange, prevStep, nextStep, updateFormData }) => {
    // Local state for dropdown (document type) and file inputs (to manage UI feedback)
    const [selectedDocumentType, setSelectedDocumentType] = useState(formData.documentType || '');
    // Removed local states for backgroundFileName and profileFileName as they are no longer in this component
    const [kycFileNames, setKycFileNames] = useState([]);

    // Sync local file names with parent formData on initial render or formData change
    useEffect(() => {
        // Only check kycDocuments, as backgroundImage and profileImage are no longer handled here
        if (formData.kycDocuments) {
            setKycFileNames(formData.kycDocuments.map(file => file.name));
        }
    }, [formData.kycDocuments]); // Dependency array updated to only include relevant prop

    const documentTypeOptions = [
        { value: '', label: 'Select document type' },
        { value: 'certificate', label: 'Company Certificate' },
        { value: 'registration', label: 'Registration Document' },
        { value: 'tax', label: 'Tax Document' },
    ];

    // Removed handleFileChange as backgroundImage and profileImage are no longer in this component

    const handleKycFilesChange = (e) => {
        const files = Array.from(e.target.files);
        // Ensure handleChange correctly updates the kycDetails.kycDocuments array
        handleChange('kycDocuments', files);
        setKycFileNames(files.map(file => file.name));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ensure the selected document type is saved to formData.kycDetails
        handleChange('documentType', selectedDocumentType);
        nextStep();
    };

    // Custom File Input Component to mimic a text input with a button
    const CustomFileInput = ({ label, name, fileName, onChange, multiple = false, accept = "*/*" }) => (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
                <input
                    type="text"
                    className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm cursor-not-allowed bg-gray-50"
                    value={fileName || 'No file chosen'}
                    readOnly
                    placeholder="No file chosen"
                />
                <label
                    htmlFor={name}
                    className="cursor-pointer bg-blue-50 text-blue-700 px-4 py-2 rounded-r-md border border-l-0 border-blue-200 text-sm font-semibold hover:bg-blue-100 flex items-center justify-center"
                >
                    Choose File{multiple ? '(s)' : ''}
                    <input
                        id={name}
                        name={name}
                        type="file"
                        className="sr-only" // Hide the actual input
                        onChange={onChange}
                        multiple={multiple}
                        accept={accept}
                    />
                </label>
            </div>
            {fileName && (
                <p className="text-xs text-gray-500 mt-1">Selected: {fileName}</p>
            )}
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <motion.div
                className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
            >
                <h1 className="text-2xl font-bold mb-1">Company Verification & KYC</h1>
                <p className="text-gray-600 mb-6">
                    Complete KYC verification to unlock full hiring access and ensure compliance.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Background Image Upload and Profile Image Upload sections removed */}

                    {/* KYC Documents Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Verification Documents (Choose any one for verification)
                        </label>
                        <FormField
                            type="select"
                            name="documentType"
                            value={selectedDocumentType}
                            onChange={(e) => setSelectedDocumentType(e.target.value)}
                            placeholder="Select document type"
                            options={documentTypeOptions}
                        />

                        <CustomFileInput
                            label="Choose File(s)"
                            name="kycDocuments"
                            fileName={kycFileNames.join(', ')}
                            onChange={handleKycFilesChange}
                            multiple={true}
                            accept="image/*,.pdf"
                        />
                    </div>

                    <FormField
                        label="TAN (Tax Deduction and Collection Account Number)"
                        name="TAN"
                        value={formData.TAN}
                        onChange={(e) => handleChange('TAN', e.target.value)}
                        placeholder="e.g., ABCDE12345Z"
                    />

                    <FormField
                        label="GST Number (Optional)"
                        name="GSTNumber"
                        value={formData.GSTNumber}
                        onChange={(e) => handleChange('GSTNumber', e.target.value)}
                        placeholder="e.g., 22ABCDE1234F1Z5"
                    />

                    <FormField
                        label="Company Registration Number (CIN/LLPIN - Optional)"
                        name="companyRegistrationNumber"
                        value={formData.companyRegistrationNumber}
                        onChange={(e) => handleChange('companyRegistrationNumber', e.target.value)}
                        placeholder="e.g., L12345MH2020PTC123456"
                    />

                    <div className="flex justify-end space-x-4 pt-4">
                        <Button variant="secondary" onClick={prevStep}>
                            Back
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                        >
                            Next
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default VerificationStep;