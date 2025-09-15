import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';
import FormField from '@/components/company/FormField';
import Button from '@/components/company/Button';

const CompanyInfoStep = ({ formData, handleChange, nextStep, prevStep }) => {
    const [isRegisteringNewCompany, setIsRegisteringNewCompany] = useState(false);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        setCountries(Country.getAllCountries());
    }, []);

    useEffect(() => {
        if (formData.country) {
            const statesOfCountry = State.getStatesOfCountry(formData.country);
            setStates(statesOfCountry);
            // Reset state, city and pincode when country changes
            handleChange('state', '');
            handleChange('city', '');
            handleChange('pincode', '');
        } else {
            setStates([]);
            setCities([]);
        }
    }, [formData.country]);

    useEffect(() => {
        if (formData.country && formData.state) {
            const citiesOfState = City.getCitiesOfState(formData.country, formData.state);
            setCities(citiesOfState);
            // Reset city and pincode when state changes
            handleChange('city', '');
            handleChange('pincode', '');
        } else {
            setCities([]);
        }
    }, [formData.country, formData.state]);

    const formatOptions = (data, valueKey, labelKey) => {
        if (!data) return [];
        return data.map(item => ({
            value: item[valueKey],
            label: item[labelKey]
        }));
    };
    
    const countryOptions = formatOptions(countries, 'isoCode', 'name');
    countryOptions.unshift({ value: '', label: 'Select country' });

    const stateOptions = formatOptions(states, 'isoCode', 'name');
    stateOptions.unshift({ value: '', label: 'Select state' });

    const cityOptions = formatOptions(cities, 'name', 'name');
    cityOptions.unshift({ value: '', label: 'Select city' });

    const handleSubmit = (e) => {
        e.preventDefault();
        nextStep();
    };

    const existingCompanyOptions = [
        { value: '', label: 'Select an existing company' },
        { value: 'TCS', label: 'Tata Consultancy Services (TCS)' },
        { value: 'Infosys', label: 'Infosys' },
        { value: 'Wipro', label: 'Wipro' },
        { value: 'Google', label: 'Google' },
        { value: 'Microsoft', label: 'Microsoft' },
        { value: 'Meta', label: 'Meta' },
        { value: 'Amazon', label: 'Amazon' },
        { value: 'Apple', label: 'Apple' },
        { value: 'Reliance Industries', label: 'Reliance Industries' },
        { value: 'HDFC Bank', label: 'HDFC Bank' },
    ];

    const companyTypeOptions = [
        { value: '', label: 'Select company type' },
        { value: 'startup', label: 'Startup' },
        { value: 'mnc', label: 'Multinational Corporation (MNC)' },
        { value: 'private', label: 'Private Limited' },
        { value: 'public', label: 'Public Limited' },
        { value: 'llc', label: 'Limited Liability Company (LLC)' },
        { value: 'partnership', label: 'Partnership' },
        { value: 'sole_proprietorship', label: 'Sole Proprietorship' },
        { value: 'non_profit', label: 'Non-Profit Organization' },
    ];

    const industryOptions = [
        { value: '', label: 'Select industry type' },
        { value: 'tech', label: 'Information Technology' },
        { value: 'healthcare', label: 'Healthcare & Pharmaceuticals' },
        { value: 'finance', label: 'Finance & Banking' },
        { value: 'ecommerce', label: 'E-commerce' },
        { value: 'education', label: 'Education' },
        { value: 'retail', label: 'Retail & Consumer Goods' },
        { value: 'manufacturing', label: 'Manufacturing' },
        { value: 'automotive', label: 'Automotive' },
        { value: 'media', label: 'Media & Entertainment' },
        { value: 'hospitality', label: 'Hospitality & Tourism' },
        { value: 'real_estate', label: 'Real Estate & Construction' },
        { value: 'telecom', label: 'Telecommunications' },
    ];

    const employeeCountOptions = [
        { value: '', label: 'Select employee count' },
        { value: '1-10', label: '1-10 employees' },
        { value: '11-50', label: '11-50 employees' },
        { value: '51-200', label: '51-200 employees' },
        { value: '201-500', label: '201-500 employees' },
        { value: '501-1000', label: '501-1,000 employees' },
        { value: '1001-5000', label: '1,001-5,000 employees' },
        { value: '5001-10000', label: '5,001-10,000 employees' },
        { value: '10001+', label: '10,001+ employees' },
    ];

    const yearOptions = Array.from({ length: 74 }, (_, i) => {
        const year = new Date().getFullYear() - i;
        return { value: year.toString(), label: year.toString() };
    });
    yearOptions.unshift({ value: '', label: 'Select year established' });

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
                                options={existingCompanyOptions}
                                required
                            />
                            <p className="text-accent text-sm font-medium text-blue-600 cursor-pointer hover:underline mb-4 text-center"
                               onClick={() => {
                                   setIsRegisteringNewCompany(true);
                                   handleChange('companyName', '');
                               }}>
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
                            <p className="text-accent text-sm font-medium text-blue-600 cursor-pointer hover:underline mb-4 text-center"
                               onClick={() => {
                                   setIsRegisteringNewCompany(false);
                                   handleChange('companyName', '');
                               }}>
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
                        options={companyTypeOptions} 
                        required
                    />
                    
                    <FormField 
                        label="Industry Type" 
                        type="select" 
                        name="industryType" 
                        value={formData.industryType} 
                        onChange={(e) => handleChange('industryType', e.target.value)} 
                        options={industryOptions} 
                        required
                    />
                    
                    <FormField 
                        label="Number of Employees" 
                        type="select" 
                        name="numberOfEmployees" 
                        value={formData.numberOfEmployees} 
                        onChange={(e) => handleChange('numberOfEmployees', e.target.value)} 
                        options={employeeCountOptions} 
                        required
                    />
                    
                    <FormField 
                        label="Established Year" 
                        type="select" 
                        name="establishedYear" 
                        value={formData.establishedYear} 
                        onChange={(e) => handleChange('establishedYear', e.target.value)} 
                        options={yearOptions} 
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField 
                            label="Contact Number" 
                            type="text" 
                            name="phoneNumber" 
                            value={formData.phoneNumber} 
                            onChange={(e) => handleChange('phoneNumber', e.target.value)} 
                            placeholder="e.g., +91 98765 43210"
                        />
                        <FormField 
                            label="Alternate Number" 
                            type="text" 
                            name="alternatePhoneNumber" 
                            value={formData.alternatePhoneNumber} 
                            onChange={(e) => handleChange('alternatePhoneNumber', e.target.value)} 
                            placeholder="e.g., +91 91234 56789"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            label="Country"
                            type="select"
                            name="country"
                            value={formData.country} 
                            onChange={(e) => {
                                handleChange('country', e.target.value);
                                handleChange('state', '');
                                handleChange('city', '');
                                handleChange('pincode', '');
                            }}
                            options={countryOptions}
                            required
                        />
                        <FormField
                            label="State"
                            type="select"
                            name="state"
                            value={formData.state} 
                            onChange={(e) => {
                                handleChange('state', e.target.value);
                                handleChange('city', '');
                                handleChange('pincode', '');
                            }}
                            options={stateOptions}
                            required
                            disabled={!formData.country}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            label="City"
                            type="select"
                            name="city"
                            value={formData.city}
                            onChange={(e) => {
                                handleChange('city', e.target.value);
                                handleChange('pincode', '');
                            }}
                            options={cityOptions}
                            required
                            disabled={!formData.state}
                        />
                        <FormField
                            label="Pincode / Zip Code"
                            type="text" 
                            name="pincode"
                            value={formData.pincode}
                            onChange={(e) => handleChange('pincode', e.target.value)}
                            placeholder="Enter pincode or zip code"
                            required
                            disabled={!formData.city}
                        />
                    </div>
                    
                    <FormField 
                        label="Company Website (Optional)" 
                        type="url" 
                        name="collegeWebsite" 
                        value={formData.collegeWebsite} 
                        onChange={(e) => handleChange('collegeWebsite', e.target.value)} 
                        placeholder="e.g., https://www.yourcompany.com"
                    />
                    
                    <FormField 
                        label="LinkedIn URL (Optional)" 
                        type="url" 
                        name="companyLinkedin" 
                        value={formData.companyLinkedin} 
                        onChange={(e) => handleChange('companyLinkedin', e.target.value)} 
                        placeholder="e.g., https://linkedin.com/company/yourcompany"
                    />

                    <div className="flex justify-end mt-8 space-x-4">
                        <Button variant="secondary" onClick={prevStep}>Back</Button>
                        <Button type="submit" variant="primary">Next</Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CompanyInfoStep;



// import { motion } from 'framer-motion'
// import { useState } from 'react'
// import FormField from '@/components/company/FormField'
// import Button from '@/components/company/Button'

// const CompanyInfoStep = ({ formData, handleChange, nextStep, prevStep }) => {
//     const [isRegisteringNewCompany, setIsRegisteringNewCompany] = useState(false);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         nextStep();
//     }

//     // Company Name options for selection (if not registering new)
//     const existingCompanyOptions = [
//         { value: '', label: 'Select an existing company' },
//         { value: 'TCS', label: 'TCS' },
//         { value: 'Google', label: 'Google' },
//         { value: 'Microsoft', label: 'Microsoft' },
//         { value: 'Meta', label: 'Meta' },
//     ];

//     const companyTypeOptions = [
//         { value: '', label: 'Select company type' },
//         { value: 'startup', label: 'Startup' },
//         { value: 'mnc', label: 'MNC' },
//         { value: 'private', label: 'Private Limited' },
//         { value: 'public', label: 'Public Limited' },
//     ];

//     const industryOptions = [
//         { value: '', label: 'Select industry type' },
//         { value: 'tech', label: 'Technology' },
//         { value: 'healthcare', label: 'Healthcare' },
//         { value: 'finance', label: 'Finance' },
//         { value: 'education', label: 'Education' },
//         { value: 'retail', label: 'Retail' },
//         { value: 'manufacturing', label: 'Manufacturing' },
//         { value: 'automotive', label: 'Automotive' },
//     ];

//     const employeeCountOptions = [
//         { value: '', label: 'Select employee count' },
//         { value: '1-10', label: '1-10' },
//         { value: '11-50', label: '11-50' },
//         { value: '51-200', label: '51-200' },
//         { value: '201-500', label: '201-500' },
//         { value: '501-1000', label: '501-1000' },
//         { value: '1001+', label: '1001+' },
//     ];

//     const yearOptions = Array.from({ length: 74 }, (_, i) => {
//         const year = 2025 - i;
//         return { value: year.toString(), label: year.toString() };
//     });
//     yearOptions.unshift({ value: '', label: 'Select year established' });

//     // Country options
//     const countryOptions = [
//         { value: '', label: 'Select country' },
//         { value: 'India', label: 'India' },
//         { value: 'United States', label: 'United States' },
//         { value: 'United Kingdom', label: 'United Kingdom' },
//         { value: 'Canada', label: 'Canada' },
//         { value: 'Australia', label: 'Australia' },
//         { value: 'Germany', label: 'Germany' },
//         { value: 'France', label: 'France' },
//         { value: 'Japan', label: 'Japan' },
//         { value: 'China', label: 'China' },
//     ];

//     // State options by country
//     const stateOptionsByCountry = {
//         'India': [
//             { value: '', label: 'Select state' },
//             { value: 'Maharashtra', label: 'Maharashtra' },
//             { value: 'Delhi', label: 'Delhi' },
//             { value: 'Karnataka', label: 'Karnataka' },
//             { value: 'Tamil Nadu', label: 'Tamil Nadu' },
//             { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
//             { value: 'Gujarat', label: 'Gujarat' },
//             { value: 'Rajasthan', label: 'Rajasthan' },
//             { value: 'West Bengal', label: 'West Bengal' },
//             { value: 'Kerala', label: 'Kerala' },
//             { value: 'Telangana', label: 'Telangana' },
//         ],
//         'United States': [
//             { value: '', label: 'Select state' },
//             { value: 'California', label: 'California' },
//             { value: 'Texas', label: 'Texas' },
//             { value: 'Florida', label: 'Florida' },
//             { value: 'New York', label: 'New York' },
//             { value: 'Illinois', label: 'Illinois' },
//         ],
//         'United Kingdom': [
//             { value: '', label: 'Select region' },
//             { value: 'England', label: 'England' },
//             { value: 'Scotland', label: 'Scotland' },
//             { value: 'Wales', label: 'Wales' },
//             { value: 'Northern Ireland', label: 'Northern Ireland' },
//         ],
//         'Canada': [
//             { value: '', label: 'Select province' },
//             { value: 'Ontario', label: 'Ontario' },
//             { value: 'Quebec', label: 'Quebec' },
//             { value: 'British Columbia', label: 'British Columbia' },
//             { value: 'Alberta', label: 'Alberta' },
//         ],
//         'Australia': [
//             { value: '', label: 'Select state' },
//             { value: 'New South Wales', label: 'New South Wales' },
//             { value: 'Victoria', label: 'Victoria' },
//             { value: 'Queensland', label: 'Queensland' },
//             { value: 'Western Australia', label: 'Western Australia' },
//         ],
//         'Germany': [
//             { value: '', label: 'Select state' },
//             { value: 'Bavaria', label: 'Bavaria' },
//             { value: 'North Rhine-Westphalia', label: 'North Rhine-Westphalia' },
//             { value: 'Baden-Württemberg', label: 'Baden-Württemberg' },
//             { value: 'Lower Saxony', label: 'Lower Saxony' },
//         ],
//         'France': [
//             { value: '', label: 'Select region' },
//             { value: 'Île-de-France', label: 'Île-de-France' },
//             { value: 'Auvergne-Rhône-Alpes', label: 'Auvergne-Rhône-Alpes' },
//             { value: 'Provence-Alpes-Côte d\'Azur', label: 'Provence-Alpes-Côte d\'Azur' },
//             { value: 'Occitanie', label: 'Occitanie' },
//         ],
//         'Japan': [
//             { value: '', label: 'Select prefecture' },
//             { value: 'Tokyo', label: 'Tokyo' },
//             { value: 'Osaka', label: 'Osaka' },
//             { value: 'Kanagawa', label: 'Kanagawa' },
//             { value: 'Aichi', label: 'Aichi' },
//         ],
//         'China': [
//             { value: '', label: 'Select province' },
//             { value: 'Beijing', label: 'Beijing' },
//             { value: 'Shanghai', label: 'Shanghai' },
//             { value: 'Guangdong', label: 'Guangdong' },
//             { value: 'Jiangsu', label: 'Jiangsu' },
//         ],
//         '': [{ value: '', label: 'Select state' }]
//     };

//     // City options by state
//     const cityOptionsByState = {
//         'Maharashtra': [
//             { value: '', label: 'Select city' },
//             { value: 'Mumbai', label: 'Mumbai' },
//             { value: 'Pune', label: 'Pune' },
//             { value: 'Nagpur', label: 'Nagpur' },
//             { value: 'Nashik', label: 'Nashik' },
//             { value: 'Aurangabad', label: 'Aurangabad' },
//             { value: 'Solapur', label: 'Solapur' },
//             { value: 'Amravati', label: 'Amravati' },
//             { value: 'Kolhapur', label: 'Kolhapur' },
//         ],
//         'Delhi': [
//             { value: '', label: 'Select city' },
//             { value: 'New Delhi', label: 'New Delhi' },
//             { value: 'Delhi Cantonment', label: 'Delhi Cantonment' },
//         ],
//         'Karnataka': [
//             { value: '', label: 'Select city' },
//             { value: 'Bangalore', label: 'Bangalore' },
//             { value: 'Mysore', label: 'Mysore' },
//             { value: 'Hubli', label: 'Hubli' },
//             { value: 'Mangalore', label: 'Mangalore' },
//         ],
//         'California': [
//             { value: '', label: 'Select city' },
//             { value: 'Los Angeles', label: 'Los Angeles' },
//             { value: 'San Francisco', label: 'San Francisco' },
//             { value: 'San Diego', label: 'San Diego' },
//         ],
//         'Texas': [
//             { value: '', label: 'Select city' },
//             { value: 'Houston', label: 'Houston' },
//             { value: 'Dallas', label: 'Dallas' },
//             { value: 'Austin', label: 'Austin' },
//         ],
//         'England': [
//             { value: '', label: 'Select city' },
//             { value: 'London', label: 'London' },
//             { value: 'Manchester', label: 'Manchester' },
//             { value: 'Birmingham', label: 'Birmingham' },
//         ],
//         'Ontario': [
//             { value: '', label: 'Select city' },
//             { value: 'Toronto', label: 'Toronto' },
//             { value: 'Ottawa', label: 'Ottawa' },
//             { value: 'Mississauga', label: 'Mississauga' },
//         ],
//         '': [{ value: '', label: 'Select city' }]
//     };

//     // Pincode options by city
//     const pincodeOptionsByCity = {
//         'Mumbai': [
//             { value: '', label: 'Select pincode' },
//             { value: '400001', label: '400001' },
//             { value: '400002', label: '400002' },
//             { value: '400003', label: '400003' },
//             { value: '400004', label: '400004' },
//             { value: '400005', label: '400005' },
//             { value: '400006', label: '400006' },
//             { value: '400007', label: '400007' },
//             { value: '400008', label: '400008' },
//             { value: '400009', label: '400009' },
//             { value: '400010', label: '400010' },
//         ],
//         'Pune': [
//             { value: '', label: 'Select pincode' },
//             { value: '411001', label: '411001' },
//             { value: '411002', label: '411002' },
//             { value: '411003', label: '411003' },
//         ],
//         'Bangalore': [
//             { value: '', label: 'Select pincode' },
//             { value: '560001', label: '560001' },
//             { value: '560002', label: '560002' },
//             { value: '560003', label: '560003' },
//         ],
//         'Los Angeles': [
//             { value: '', label: 'Select zip code' },
//             { value: '90001', label: '90001' },
//             { value: '90002', label: '90002' },
//             { value: '90003', label: '90003' },
//         ],
//         'London': [
//             { value: '', label: 'Select postcode' },
//             { value: 'SW1A 1AA', label: 'SW1A 1AA' },
//             { value: 'EC1A 1BB', label: 'EC1A 1BB' },
//             { value: 'W1A 0AX', label: 'W1A 0AX' },
//         ],
//         'Toronto': [
//             { value: '', label: 'Select postal code' },
//             { value: 'M5V 2T6', label: 'M5V 2T6' },
//             { value: 'M4W 1A8', label: 'M4W 1A8' },
//             { value: 'M6G 1B1', label: 'M6G 1B1' },
//         ],
//         '': [{ value: '', label: 'Select pincode' }]
//     };

//     // Get current state options based on selected country
//     const getStateOptions = () => {
//         return stateOptionsByCountry[formData.country] || [{ value: '', label: 'Select state' }];
//     };

//     // Get current city options based on selected state
//     const getCityOptions = () => {
//         return cityOptionsByState[formData.state] || [{ value: '', label: 'Select city' }];
//     };

//     // Get current pincode options based on selected city
//     const getPincodeOptions = () => {
//         return pincodeOptionsByCity[formData.city] || [{ value: '', label: 'Select pincode' }];
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//             <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-3xl"
//             >
//                 <h1 className="text-2xl font-bold mb-1 text-center">Connect to Your Company!</h1>
//                 <p className="text-gray-600 mb-6 text-center">Select the company you represent or register a new one.</p>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     {!isRegisteringNewCompany ? (
//                         <>
//                             <FormField
//                                 label="Company Name"
//                                 type="select"
//                                 name="companyName"
//                                 value={formData.companyName}
//                                 onChange={(e) => handleChange('companyName', e.target.value)}
//                                 options={existingCompanyOptions}
//                                 required
//                             />
//                             <p
//                                 className="text-accent text-sm font-medium text-blue-600 cursor-pointer hover:underline mb-4 text-center"
//                                 onClick={() => {
//                                     setIsRegisteringNewCompany(true);
//                                     handleChange('companyName', '');
//                                 }}
//                             >
//                                 Register Your Company
//                             </p>
//                         </>
//                     ) : (
//                         <>
//                             <FormField
//                                 label="Company Name"
//                                 type="text"
//                                 name="companyName"
//                                 value={formData.companyName}
//                                 onChange={(e) => handleChange('companyName', e.target.value)}
//                                 placeholder="Enter your company's full name"
//                                 required
//                             />
//                             <p
//                                 className="text-accent text-sm font-medium text-blue-600 cursor-pointer hover:underline mb-4 text-center"
//                                 onClick={() => {
//                                     setIsRegisteringNewCompany(false);
//                                     handleChange('companyName', '');
//                                 }}
//                             >
//                                 Select Existing Company
//                             </p>
//                         </>
//                     )}

//                     <FormField
//                         label="Description"
//                         type="textarea"
//                         name="description"
//                         value={formData.description}
//                         onChange={(e) => handleChange('description', e.target.value)}
//                         placeholder="Provide a brief description of your company..."
//                     />

//                     <FormField
//                         label="Company Type"
//                         type="select"
//                         name="companyType"
//                         value={formData.companyType}
//                         onChange={(e) => handleChange('companyType', e.target.value)}
//                         options={companyTypeOptions}
//                         required
//                     />

//                     <FormField
//                         label="Industry Type"
//                         type="select"
//                         name="industryType"
//                         value={formData.industryType}
//                         onChange={(e) => handleChange('industryType', e.target.value)}
//                         options={industryOptions}
//                         required
//                     />

//                     <FormField
//                         label="Number of Employees"
//                         type="select"
//                         name="numberOfEmployees"
//                         value={formData.numberOfEmployees}
//                         onChange={(e) => handleChange('numberOfEmployees', e.target.value)}
//                         options={employeeCountOptions}
//                         required
//                     />

//                     <FormField
//                         label="Established Year"
//                         type="select"
//                         name="establishedYear"
//                         value={formData.establishedYear}
//                         onChange={(e) => handleChange('establishedYear', e.target.value)}
//                         options={yearOptions}
//                         required
//                     />

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <FormField
//                             label="Contact Number"
//                             type="text"
//                             name="phoneNumber"
//                             value={formData.phoneNumber}
//                             onChange={(e) => handleChange('phoneNumber', e.target.value)}
//                             placeholder="e.g., +91 98765 43210"
//                         />
//                         <FormField
//                             label="Alternate Number"
//                             type="text"
//                             name="alternatePhoneNumber"
//                             value={formData.alternatePhoneNumber}
//                             onChange={(e) => handleChange('alternatePhoneNumber', e.target.value)}
//                             placeholder="e.g., +91 91234 56789"
//                         />
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <FormField
//                             label="Country"
//                             type="select"
//                             name="country"
//                             value={formData.country}
//                             onChange={(e) => {
//                                 handleChange('country', e.target.value);
//                                 // Reset state, city and pincode when country changes
//                                 handleChange('state', '');
//                                 handleChange('city', '');
//                                 handleChange('pincode', '');
//                             }}
//                             options={countryOptions}
//                             required
//                         />
//                         <FormField
//                             label="State"
//                             type="select"
//                             name="state"
//                             value={formData.state}
//                             onChange={(e) => {
//                                 handleChange('state', e.target.value);
//                                 // Reset city and pincode when state changes
//                                 handleChange('city', '');
//                                 handleChange('pincode', '');
//                             }}
//                             options={getStateOptions()}
//                             required
//                         />
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <FormField
//                             label="City"
//                             type="select"
//                             name="city"
//                             value={formData.city}
//                             onChange={(e) => {
//                                 handleChange('city', e.target.value);
//                                 // Reset pincode when city changes
//                                 handleChange('pincode', '');
//                             }}
//                             options={getCityOptions()}
//                             required
//                         />
//                         <FormField
//                             label="Pincode"
//                             type="select"
//                             name="pincode"
//                             value={formData.pincode}
//                             onChange={(e) => handleChange('pincode', e.target.value)}
//                             options={getPincodeOptions()}
//                             required
//                         />
//                     </div>

//                     <FormField
//                         label="Company Website (Optional)"
//                         type="url"
//                         name="collegeWebsite"
//                         value={formData.collegeWebsite}
//                         onChange={(e) => handleChange('collegeWebsite', e.target.value)}
//                         placeholder="e.g., https://www.yourcompany.com"
//                     />

//                     <FormField
//                         label="LinkedIn URL (Company Page - Optional)"
//                         type="url"
//                         name="companyLinkedin"
//                         value={formData.companyLinkedin}
//                         onChange={(e) => handleChange('companyLinkedin', e.target.value)}
//                         placeholder="e.g., https://linkedin.com/company/yourcompany"
//                     />

//                     <div className="flex justify-end mt-8 space-x-4">
//                         <Button variant="secondary" onClick={prevStep}>
//                             Back
//                         </Button>
//                         <Button type="submit" variant="primary">
//                             Next
//                         </Button>
//                     </div>
//                 </form>
//             </motion.div>
//         </div>
//     )
// }

// export default CompanyInfoStep;