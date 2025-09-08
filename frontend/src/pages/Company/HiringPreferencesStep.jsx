

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import FormField from '@/components/company/FormField'
import Button from '@/components/company/Button'

const HiringPreferencesStep = ({ formData, handleChange, nextStep, prevStep }) => {
    const [lookingFor, setLookingFor] = useState(formData.lookingFor || '')
    const [employmentTypes, setEmploymentTypes] = useState(formData.employmentType || [])
    const [showJobRolesDropdown, setShowJobRolesDropdown] = useState(false)
    const [showLocationsDropdown, setShowLocationsDropdown] = useState(false)
    const jobRolesRef = useRef(null)
    const locationsRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        handleChange('lookingFor', lookingFor)
        handleChange('employmentType', employmentTypes)
        nextStep()
    }

    const handleLookingForClick = (value) => {
        setLookingFor(value)
    }

    const handleEmploymentTypeClick = (value) => {
        setEmploymentTypes([value]); // Changed to single selection
    }

    const handleJobRoleSelect = (value) => {
        handleChange('jobRoles', [value])
        setShowJobRolesDropdown(false)
    }

    const handleLocationSelect = (value) => {
        handleChange('hiringLocations', [value])
        setShowLocationsDropdown(false)
    }

    const jobRoleOptions = [
        { value: 'software_engineer', label: 'Software Engineer' },
        { value: 'product_manager', label: 'Product Manager' },
        { value: 'designer', label: 'Designer' },
        { value: 'data_scientist', label: 'Data Scientist' },
        { value: 'marketing', label: 'Marketing' },
    ]

    const locationOptions = [
        { value: 'UP', label: 'UP' },
        { value: 'bangalore', label: 'Bangalore' },
        { value: 'delhi', label: 'Delhi' },
        { value: 'mumbai', label: 'Mumbai' },
        { value: 'hyderabad', label: 'Hyderabad' },
    ]

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (jobRolesRef.current && !jobRolesRef.current.contains(event.target)) {
                setShowJobRolesDropdown(false)
            }
            if (locationsRef.current && !locationsRef.current.contains(event.target)) {
                setShowLocationsDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8"
            >
                <h1 className="text-2xl font-bold mb-1">Define Your Hiring Preferences!</h1>
                <p className="text-gray-600 mb-6">Tell us what roles you're hiring for and where!</p>

                <form onSubmit={handleSubmit}>
                    {/* Job Roles Dropdown - Single Select */}
                    <div className="mb-6" ref={jobRolesRef}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Role You Hire For</label>
                        <div className="relative">
                            <div 
                                className="flex items-center justify-between p-2 border border-gray-300 rounded-md cursor-pointer"
                                onClick={() => setShowJobRolesDropdown(!showJobRolesDropdown)}
                            >
                                <span className="text-gray-700">
                                    {formData.jobRoles.length > 0 
                                        ? jobRoleOptions.find(opt => opt.value === formData.jobRoles[0])?.label
                                        : 'Select Job Role'}
                                </span>
                                <svg 
                                    className={`w-5 h-5 text-gray-500 transition-transform ${showJobRolesDropdown ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            {showJobRolesDropdown && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                    {jobRoleOptions.map((option) => (
                                        <div 
                                            key={option.value}
                                            className={`p-2 hover:bg-gray-100 cursor-pointer ${formData.jobRoles.includes(option.value) ? 'bg-gray-100' : ''}`}
                                            onClick={() => handleJobRoleSelect(option.value)}
                                        >
                                            {option.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Locations Dropdown - Single Select */}
                    <div className="mb-6" ref={locationsRef}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Hiring Location</label>
                        <div className="relative">
                            <div 
                                className="flex items-center justify-between p-2 border border-gray-300 rounded-md cursor-pointer"
                                onClick={() => setShowLocationsDropdown(!showLocationsDropdown)}
                            >
                                <span className="text-gray-700">
                                    {formData.hiringLocations.length > 0 
                                        ? locationOptions.find(opt => opt.value === formData.hiringLocations[0])?.label
                                        : 'Select Location'}
                                </span>
                                <svg 
                                    className={`w-5 h-5 text-gray-500 transition-transform ${showLocationsDropdown ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            {showLocationsDropdown && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                    {locationOptions.map((option) => (
                                        <div 
                                            key={option.value}
                                            className={`p-2 hover:bg-gray-100 cursor-pointer ${formData.hiringLocations.includes(option.value) ? 'bg-gray-100' : ''}`}
                                            onClick={() => handleLocationSelect(option.value)}
                                        >
                                            {option.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Rest of the form remains unchanged */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Looking for</label>
                        <div className="flex space-x-2">
                            {['job', 'internship', 'both'].map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    className={`px-4 py-2 rounded-md border ${
                                        lookingFor === option
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-gray-700 border-gray-300'
                                    } transition-colors duration-200`}
                                    onClick={() => handleLookingForClick(option)}
                                >
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Employment type</label>
                        <div className="flex space-x-2">
                            {['part-time', 'full-time', 'contract'].map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    className={`px-4 py-2 rounded-md border ${
                                        employmentTypes.includes(type)
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-gray-700 border-gray-300'
                                    } transition-colors duration-200`}
                                    onClick={() => handleEmploymentTypeClick(type)}
                                >
                                    {type.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                                </button>
                            ))}
                        </div>
                    </div>

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

export default HiringPreferencesStep