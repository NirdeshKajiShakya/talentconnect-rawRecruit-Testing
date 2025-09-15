// export default function CollegeDetails({ formData, updateFormData, nextStep, prevStep }) {
    
//     // --- KEY CHANGE: Updated handleChange to be smarter ---
//     const handleChange = (e) => {
//         const { name, value, type, options, selectedIndex } = e.target;

//         // For regular text inputs, update directly
//         if (type !== 'select-one') {
//             updateFormData(name, value);
//             return;
//         }

//         // For dropdowns, get the display text of the selected option
//         const selectedText = options[selectedIndex].text;

//         // Store both the text (for submission) and the ID (for filtering)
//         updateFormData(name, selectedText); // e.g., update 'country' with "India"
//         updateFormData(`${name}Id`, value);   // e.g., update 'countryId' with "2"

//         // Reset child dropdowns when a parent changes to avoid mismatches
//         if (name === 'country') {
//             updateFormData('state', '');
//             updateFormData('stateId', '');
//             updateFormData('city', '');
//             updateFormData('cityId', '');
//             updateFormData('pincode', '');
//         }
//         if (name === 'state') {
//             updateFormData('city', '');
//             updateFormData('cityId', '');
//             updateFormData('pincode', '');
//         }
//         if (name === 'city') {
//             updateFormData('pincode', '');
//         }
//     };

//     const safeFormData = formData || {};

//     // Location data (can be moved to a separate file for larger apps)
//     const countries = [
//         { id: 1, name: 'United States' },
//         { id: 2, name: 'India' },
//         { id: 3, name: 'United Kingdom' },
//         { id: 4, name: 'Canada' },
//         { id: 5, name: 'Australia' }
//     ];
//     const states = [
//         { id: 1, name: 'California', countryId: 1 }, { id: 2, name: 'Texas', countryId: 1 },
//         { id: 3, name: 'Maharashtra', countryId: 2 }, { id: 4, name: 'Karnataka', countryId: 2 },
//         { id: 5, name: 'England', countryId: 3 }, { id: 6, name: 'Scotland', countryId: 3 },
//         { id: 7, name: 'Ontario', countryId: 4 }, { id: 8, name: 'Quebec', countryId: 4 },
//         { id: 9, name: 'New South Wales', countryId: 5 }, { id: 10, name: 'Victoria', countryId: 5 }
//     ];
//     const cities = [
//         { id: 1, name: 'Los Angeles', stateId: 1 }, { id: 2, name: 'San Francisco', stateId: 1 },
//         { id: 3, name: 'Houston', stateId: 2 }, { id: 4, name: 'Austin', stateId: 2 },
//         { id: 5, name: 'Mumbai', stateId: 3 }, { id: 6, name: 'Pune', stateId: 3 },
//         { id: 7, name: 'Bangalore', stateId: 4 }, { id: 8, name: 'Mysore', stateId: 4 },
//         { id: 9, name: 'London', stateId: 5 }, { id: 10, name: 'Manchester', stateId: 5 },
//         { id: 11, name: 'Toronto', stateId: 7 }, { id: 12, name: 'Ottawa', stateId: 7 },
//         { id: 13, name: 'Sydney', stateId: 9 }, { id: 14, name: 'Melbourne', stateId: 10 }
//     ];
//     const pincodes = [
//         { id: 1, code: '90001', cityId: 1 }, { id: 2, code: '90002', cityId: 1 },
//         { id: 3, code: '94102', cityId: 2 }, { id: 4, code: '94103', cityId: 2 },
//         { id: 5, code: '77001', cityId: 3 }, { id: 6, code: '77002', cityId: 3 },
//         { id: 7, code: '73301', cityId: 4 }, { id: 8, code: '73302', cityId: 4 },
//         { id: 9, code: '400001', cityId: 5 }, { id: 10, code: '400002', cityId: 5 },
//         { id: 11, code: '411001', cityId: 6 }, { id: 12, code: '411002', cityId: 6 },
//         { id: 13, code: '560001', cityId: 7 }, { id: 14, code: '560002', cityId: 7 },
//         { id: 15, code: '570001', cityId: 8 }, { id: 16, code: '570002', cityId: 8 }
//     ];

//     // College locations for the dropdown
//     const collegeLocations = [
//         "Urban", "Suburban", "Rural", "Metropolitan", "Small Town", "Campus"
//     ];

//     // --- KEY CHANGE: Filtering now uses the '...Id' fields ---
//     const filteredStates = states.filter(state =>
//         state.countryId === parseInt(safeFormData.countryId || 0)
//     );
//     const filteredCities = cities.filter(city =>
//         city.stateId === parseInt(safeFormData.stateId || 0)
//     );
//     const filteredPincodes = pincodes.filter(pincode =>
//         pincode.cityId === parseInt(safeFormData.cityId || 0)
//     );

//     return (
//         <div className="fixed inset-0 bg-gray-50 overflow-y-auto">
//             <div className="flex items-center justify-center min-h-full p-4">
//                 <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
//                     <h1 className="text-2xl font-bold mb-6">College/University Details</h1>
//                     <p className="mb-6">Provide essential details about your institution.</p>
//                     <div className="space-y-6">
//                         <div>
//                             <label className="block font-medium mb-1">College/University Name *</label>
//                             <input
//                                 type="text" name="collegeName"
//                                 value={safeFormData.collegeName || ''} onChange={handleChange}
//                                 placeholder="Enter college name"
//                                 className="w-full p-2 border border-gray-300 rounded-md" required
//                             />
//                         </div>
//                         <div>
//                             <label className="block font-medium mb-1">College Location *</label>
//                             <select
//                                 name="collegeLocation"
//                                 value={safeFormData.collegeLocation || ''}
//                                 onChange={handleChange}
//                                 className="w-full p-2 border border-gray-300 rounded-md"
//                                 required
//                             >
//                                 <option value="">Select College Location</option>
//                                 {collegeLocations.map((location, index) => (
//                                     <option key={index} value={location}>
//                                         {location}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block font-medium mb-1">Country</label>
//                                 <select
//                                     name="country"
//                                     // --- KEY CHANGE: Value is now bound to the ID field ---
//                                     value={safeFormData.countryId || ''}
//                                     onChange={handleChange}
//                                     className="w-full p-2 border border-gray-300 rounded-md"
//                                 >
//                                     <option value="">Select Country</option>
//                                     {countries.map(country => (
//                                         <option key={country.id} value={country.id}>
//                                             {country.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block font-medium mb-1">State</label>
//                                 <select
//                                     name="state"
//                                     value={safeFormData.stateId || ''}
//                                     onChange={handleChange}
//                                     className="w-full p-2 border border-gray-300 rounded-md"
//                                     disabled={!safeFormData.countryId}
//                                 >
//                                     <option value="">Select State</option>
//                                     {filteredStates.map(state => (
//                                         <option key={state.id} value={state.id}>
//                                             {state.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block font-medium mb-1">City</label>
//                                 <select
//                                     name="city"
//                                     value={safeFormData.cityId || ''}
//                                     onChange={handleChange}
//                                     className="w-full p-2 border border-gray-300 rounded-md"
//                                     disabled={!safeFormData.stateId}
//                                 >
//                                     <option value="">Select City</option>
//                                     {filteredCities.map(city => (
//                                         <option key={city.id} value={city.id}>
//                                             {city.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block font-medium mb-1">Pincode</label>
//                                 <select
//                                     name="pincode"
//                                     value={safeFormData.pincode || ''}
//                                     onChange={handleChange}
//                                     className="w-full p-2 border border-gray-300 rounded-md"
//                                     disabled={!safeFormData.cityId}
//                                 >
//                                     <option value="">Select Pincode</option>
//                                     {filteredPincodes.map(pincode => (
//                                         <option key={pincode.id} value={pincode.code}>
//                                             {pincode.code}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex justify-between gap-10 mt-8">
//                         <button onClick={prevStep} className="px-6 py-2 border border-gray-300 rounded-md">
//                             Back
//                         </button>
//                         <button onClick={nextStep} className="px-6 py-2 bg-black text-white rounded-md">
//                             Next
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }



import { Country, State, City } from 'country-state-city';
import { useState, useEffect } from 'react';

export default function CollegeDetails({ formData, updateFormData, nextStep, prevStep }) {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    // Load countries on component mount
    useEffect(() => {
        const allCountries = Country.getAllCountries();
        setCountries(allCountries);
    }, []);

    // Load states when country changes
    useEffect(() => {
        if (formData?.countryCode) {
            const countryStates = State.getStatesOfCountry(formData.countryCode);
            setStates(countryStates);
            // Reset state and city when country changes
            updateFormData('state', '');
            updateFormData('stateCode', '');
            updateFormData('city', '');
        } else {
            setStates([]);
        }
    }, [formData?.countryCode]);

    // Load cities when state changes
    useEffect(() => {
        if (formData?.countryCode && formData?.stateCode) {
            const stateCities = City.getCitiesOfState(formData.countryCode, formData.stateCode);
            setCities(stateCities);
            // Reset city when state changes
            updateFormData('city', '');
        } else {
            setCities([]);
        }
    }, [formData?.countryCode, formData?.stateCode]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        // For regular text inputs, update directly
        if (type !== 'select-one') {
            updateFormData(name, value);
            return;
        }

        // For dropdowns, handle special cases for country, state, and city
        if (name === 'country') {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const countryCode = selectedOption.getAttribute('data-countrycode');
            updateFormData('country', value);
            updateFormData('countryCode', countryCode);
            // Reset dependent fields
            updateFormData('state', '');
            updateFormData('stateCode', '');
            updateFormData('city', '');
        } 
        else if (name === 'state') {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const stateCode = selectedOption.getAttribute('data-statecode');
            updateFormData('state', value);
            updateFormData('stateCode', stateCode);
            // Reset dependent field
            updateFormData('city', '');
        } 
        else if (name === 'city') {
            updateFormData('city', value);
        }
        else {
            // For other dropdowns
            updateFormData(name, value);
        }
    };

    const safeFormData = formData || {};

    // College locations for the dropdown
    const collegeLocations = [
        "Urban", "Suburban", "Rural", "Metropolitan", "Small Town", "Campus"
    ];

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
                                type="text" name="collegeName"
                                value={safeFormData.collegeName || ''} onChange={handleChange}
                                placeholder="Enter college name"
                                className="w-full p-2 border border-gray-300 rounded-md" required
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">College Location *</label>
                            <select
                                name="collegeLocation"
                                value={safeFormData.collegeLocation || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="">Select College Location</option>
                                {collegeLocations.map((location, index) => (
                                    <option key={index} value={location}>
                                        {location}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium mb-1">Country</label>
                                <select
                                    name="country"
                                    value={safeFormData.country || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select Country</option>
                                    {countries.map(country => (
                                        <option 
                                            key={country.isoCode} 
                                            value={country.name}
                                            data-countrycode={country.isoCode}
                                        >
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium mb-1">State</label>
                                <select
                                    name="state"
                                    value={safeFormData.state || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    disabled={!safeFormData.countryCode}
                                >
                                    <option value="">Select State</option>
                                    {states.map(state => (
                                        <option 
                                            key={state.isoCode} 
                                            value={state.name}
                                            data-statecode={state.isoCode}
                                        >
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium mb-1">City</label>
                                <select
                                    name="city"
                                    value={safeFormData.city || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    disabled={!safeFormData.stateCode}
                                >
                                    <option value="">Select City</option>
                                    {cities.map(city => (
                                        <option key={city.name} value={city.name}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={safeFormData.pincode || ''}
                                    onChange={handleChange}
                                    placeholder="Enter pincode"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between gap-10 mt-8">
                        <button onClick={prevStep} className="px-6 py-2 border border-gray-300 rounded-md">
                            Back
                        </button>
                        <button onClick={nextStep} className="px-6 py-2 bg-black text-white rounded-md">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}