

import { motion } from 'framer-motion'
import { useState } from 'react' // Import useState for local state
import FormField from '@/components/company/FormField'
import Button from '@/components/company/Button'

const CompanyInfoStep = ({ formData, handleChange, nextStep, prevStep }) => {
    // Local state to manage if the user is registering a new company
    const [isRegisteringNewCompany, setIsRegisteringNewCompany] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        nextStep();
    }

    // Company Name options for selection (if not registering new)
    const existingCompanyOptions = [
        { value: '', label: 'Select an existing company' },
        { value: 'TCS', label: 'TCS' },
        { value: 'Google', label: 'Google' },
        { value: 'Microsoft', label: 'Microsoft' },
        { value: 'Meta', label: 'Meta' },
    ];

    const companyTypeOptions = [
        { value: '', label: 'Select company type' },
        { value: 'startup', label: 'Startup' },
        { value: 'mnc', label: 'MNC' },
        { value: 'private', label: 'Private Limited' },
        { value: 'public', label: 'Public Limited' },
    ];

    const industryOptions = [
        { value: '', label: 'Select industry type' },
        { value: 'tech', label: 'Technology' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'finance', label: 'Finance' },
        { value: 'education', label: 'Education' },
        { value: 'retail', label: 'Retail' },
        { value: 'manufacturing', label: 'Manufacturing' },
        { value: 'automotive', label: 'Automotive' },
    ];

    const employeeCountOptions = [
        { value: '', label: 'Select employee count' },
        { value: '1-10', label: '1-10' },
        { value: '11-50', label: '11-50' },
        { value: '51-200', label: '51-200' },
        { value: '201-500', label: '201-500' },
        { value: '501-1000', label: '501-1000' },
        { value: '1001+', label: '1001+' },
    ];

    const yearOptions = Array.from({ length: 74 }, (_, i) => {
        const year = 2025 - i;
        return { value: year.toString(), label: year.toString() };
    });
    yearOptions.unshift({ value: '', label: 'Select year established' }); // Add default option

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-3xl"
            >
                <h1 className="text-2xl font-bold mb-1 text-center">Connect to Your Company!</h1>
                <p className="text-gray-600 mb-6 text-center">Select the company you represent or register a new one.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isRegisteringNewCompany ? (
                        <>
                            <FormField
                                label="Company Name"
                                type="select"
                                name="companyName"
                                value={formData.companyName}
                                onChange={(e) => handleChange('companyName', e.target.value)}
                                placeholder="Select an existing company"
                                options={existingCompanyOptions}
                                required
                            />
                            <p
                                className="text-accent text-sm font-medium text-blue-600 cursor-pointer hover:underline mb-4 text-center"
                                onClick={() => {
                                    setIsRegisteringNewCompany(true);
                                    handleChange('companyName', ''); // Clear selected company if switching to register
                                }}
                            >
                                Register Your Company
                            </p>
                        </>
                    ) : (
                        <>
                            <FormField
                                label="Company Name"
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={(e) => handleChange('companyName', e.target.value)}
                                placeholder="Enter your company's full name"
                                required
                            />
                            <p
                                className="text-accent text-sm font-medium text-blue-600 cursor-pointer hover:underline mb-4 text-center"
                                onClick={() => {
                                    setIsRegisteringNewCompany(false);
                                    handleChange('companyName', ''); // Clear entered name if switching to select
                                }}
                            >
                                Select Existing Company
                            </p>
                        </>
                    )}


                    <FormField
                        label="Description"
                        type="textarea"
                        name="description"
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Provide a brief description of your company..."
                    />

                    <FormField
                        label="Company Type"
                        type="select"
                        name="companyType"
                        value={formData.companyType}
                        onChange={(e) => handleChange('companyType', e.target.value)}
                        placeholder="Select company type"
                        options={companyTypeOptions}
                        required
                    />

                    <FormField
                        label="Industry Type"
                        type="select"
                        name="industryType"
                        value={formData.industryType}
                        onChange={(e) => handleChange('industryType', e.target.value)}
                        placeholder="Select industry type"
                        options={industryOptions}
                        required
                    />

                    <FormField
                        label="Number of Employees"
                        type="select"
                        name="numberOfEmployees" // Corrected to match schema
                        value={formData.numberOfEmployees}
                        onChange={(e) => handleChange('numberOfEmployees', e.target.value)}
                        placeholder="Select number of employees"
                        options={employeeCountOptions}
                        required
                    />

                    <FormField
                        label="Established Year"
                        type="select"
                        name="establishedYear"
                        value={formData.establishedYear}
                        onChange={(e) => handleChange('establishedYear', e.target.value)}
                        placeholder="Select established year"
                        options={yearOptions}
                        required
                    />

                     {/* Location Fields */}
                    <FormField
                        label="Company Location"
                        type="text" // Changed to text input
                        name="companyLocation" // Assuming this maps to companyLocation in your formData
                        value={formData.companyLocation}
                        onChange={(e) => handleChange('companyLocation', e.target.value)}
                        placeholder="Enter full address"
                        required
                    />

                    {/* Contact Numbers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            label="Contact Number"
                            type="text" // Changed to text input
                            name="phoneNumber" // Assuming this maps to phoneNumber in your formData
                            value={formData.phoneNumber}
                            onChange={(e) => handleChange('phoneNumber', e.target.value)}
                            placeholder="e.g., +91 98765 43210"
                        />
                        <FormField
                            label="Alternate Number"
                            type="text" // Changed to text input
                            name="alternatePhoneNumber" // Assuming this maps to alternatePhoneNumber in your formData
                            value={formData.alternatePhoneNumber}
                            onChange={(e) => handleChange('alternatePhoneNumber', e.target.value)}
                            placeholder="e.g., +91 91234 56789"
                        />
                    </div>

                   

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            label="Country"
                            type="text" // Changed to text input
                            name="country"
                            value={formData.country}
                            onChange={(e) => handleChange('country', e.target.value)}
                            placeholder="e.g., India"
                            required
                        />
                        <FormField
                            label="State"
                            type="text" // Changed to text input
                            name="state"
                            value={formData.state}
                            onChange={(e) => handleChange('state', e.target.value)}
                            placeholder="e.g., Maharashtra"
                            required
                        />
                       
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        label="Pincode"
                        type="text" // Keeping as text to allow alphanumeric if needed, or change to 'number' for pure digits
                        name="pincode"
                        value={formData.pincode}
                        onChange={(e) => handleChange('pincode', e.target.value)}
                        placeholder="e.g., 400001"
                        required
                    />
                     <FormField
                            label="City"
                            type="text" // Changed to text input
                            name="city"
                            value={formData.city}
                            onChange={(e) => handleChange('city', e.target.value)}
                            placeholder="e.g., Mumbai"
                            required
                      />
                    </div>

                    {/* New fields: College Website and LinkedIn URL */}
                    <FormField
                        label="Company Website (Optional)"
                        type="url"
                        name="collegeWebsite"
                        value={formData.collegeWebsite}
                        onChange={(e) => handleChange('collegeWebsite', e.target.value)}
                        placeholder="e.g., https://www.yourcollege.edu"
                    />

                    <FormField
                        label="LinkedIn URL (Company Page - Optional)"
                        type="url"
                        name="companyLinkedin" // Using 'companyLinkedin' to match a common schema name for company LinkedIn
                        value={formData.companyLinkedin}
                        onChange={(e) => handleChange('companyLinkedin', e.target.value)}
                        placeholder="e.g., https://linkedin.com/company/yourcompany"
                    />

                    <div className="flex justify-end mt-8 space-x-4">
                        <Button variant="secondary" onClick={prevStep}>
                            Back
                        </Button>
                        <Button type="submit" variant="primary">
                            Next
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default CompanyInfoStep;