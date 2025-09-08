import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from "@/components/dashboard/PageHeader";
import { postReferralJob } from '@/lib/User_AxiosInstance';

function PostReferralJobPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employmentType: '',
        jobTitle: '',
        location: '',
        numberOfOpenings: '',
        minEducation: '',
        studentStreams: '',
        yearsOfExperience: '',
        skills: [], 
        certifications: '',
        workAchievements: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
    const skillsDropdownRef = useRef(null);

    const skillsOptions = [
        'JavaScript', 'React', 'Node.js', 'Python', 
        'Java', 'SQL', 'Go', 'TypeScript', 'HTML/CSS',
        'Docker', 'Kubernetes', 'AWS', 'Git'
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (skillsDropdownRef.current && !skillsDropdownRef.current.contains(event.target)) {
                setShowSkillsDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEmploymentTypeChange = (type) => {
        setFormData({ ...formData, employmentType: type });
    };

    const toggleSkillsDropdown = () => {
        setShowSkillsDropdown(!showSkillsDropdown);
    };

    const handleSkillSelection = (skill) => {
        const currentSkills = formData.skills;
        if (currentSkills.includes(skill)) {
            setFormData({
                ...formData,
                skills: currentSkills.filter(s => s !== skill)
            });
        } else {
            setFormData({
                ...formData,
                skills: [...currentSkills, skill]
            });
        }
    };

    const removeSkill = (skill) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter(s => s !== skill)
        });
    };

    const handleSubmit = async () => {
        if (!formData.jobTitle || !formData.location || !formData.numberOfOpenings || formData.skills.length === 0) {
            setError('Please fill in all required fields (*).');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        const payload = {
            ...formData,
            jobType: "Referral",
            location: [formData.location],
            studentStreams: formData.studentStreams ? [formData.studentStreams] : [],
            certifications: formData.certifications ? [formData.certifications] : [],
            workAchievements: formData.workAchievements ? [formData.workAchievements] : [],
        };

        try {
            const response = await postReferralJob(payload);
            console.log('API Response:', response);
            alert('Referral job posted successfully!');
            navigate('/professional/service-request');
        } catch (err) {
            console.error('Failed to post referral job:', err);
            setError(err.response?.data?.error || 'An unexpected error occurred.');
            alert('Failed to post job. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate('/professional/service-request');
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <PageHeader title="Post a Referral Job" />
            <p className="text-gray-600 mb-8">Effortlessly Connect with Qualified Candidates and Build Your Dream Team</p>

            <div>
                {/* Basic Job Details Section */}
                <div className="bg-white border border-gray-200 rounded-md p-6 mb-6">
                    <h2 className="text-lg font-medium mb-4">Basic Job Details</h2>
                    <p className="text-gray-600 mb-4">Help candidates discover the right mandate in your company.</p>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Employment type *</label>
                        <div className="flex space-x-2">
                            {['Full-time', 'Part-time', 'Contract'].map(type => (
                                <button
                                    key={type}
                                    type="button"
                                    className={`px-4 py-1 rounded-md text-sm ${formData.employmentType === type ? 'bg-black text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
                                    onClick={() => handleEmploymentTypeChange(type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                        <input id="jobTitle" name="jobTitle" type="text" placeholder="Enter the Job Title" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={formData.jobTitle} onChange={handleChange} />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Preferred Hiring Location *</label>
                        <select id="location" name="location" className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white" value={formData.location} onChange={handleChange}>
                            <option value="">Select a location</option>
                            <option value="Remote">Remote</option>
                            <option value="New York">New York</option>
                            <option value="San Francisco">San Francisco</option>
                            <option value="London">London</option>
                        </select>
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="numberOfOpenings" className="block text-sm font-medium text-gray-700 mb-1">No of Openings *</label>
                        <input id="numberOfOpenings" name="numberOfOpenings" type="number" min="1" placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={formData.numberOfOpenings} onChange={handleChange} />
                    </div>
                </div>
                
                {/* Selection Criteria Section */}
                <div className="bg-white border border-gray-200 rounded-md p-6 mb-6">
                    <h2 className="text-lg font-medium mb-4">Selection Criteria</h2>
                    <p className="text-gray-600 mb-4">Qualify the talent to ensure the best fit for the role.</p>
                    
                    <div className="mb-4">
                        <label htmlFor="minEducation" className="block text-sm font-medium text-gray-700 mb-1">Minimum Education</label>
                        <select id="minEducation" name="minEducation" className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white" value={formData.minEducation} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="High School">High School</option>
                            <option value="Bachelor's">Bachelor's</option>
                            <option value="Master's">Master's</option>
                            <option value="PhD">PhD</option>
                        </select>
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="studentStreams" className="block text-sm font-medium text-gray-700 mb-1">Preferred Field of Study</label>
                        <select id="studentStreams" name="studentStreams" className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white" value={formData.studentStreams} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Business">Business</option>
                            <option value="Design">Design</option>
                        </select>
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                        <select id="yearsOfExperience" name="yearsOfExperience" className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white" value={formData.yearsOfExperience} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="0-1">0-1 Years</option>
                            <option value="1-3">1-3 Years</option>
                            <option value="3-5">3-5 Years</option>
                            <option value="5+">5+ Years</option>
                        </select>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Skills *</label>
                        <div className="relative" ref={skillsDropdownRef}>
                            <div 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer flex items-center justify-between"
                                onClick={toggleSkillsDropdown}
                            >
                                <div className="flex flex-wrap gap-1">
                                    {formData.skills.length > 0 ? (
                                        formData.skills.map(skill => (
                                            <span 
                                                key={skill} 
                                                className="bg-gray-100 px-2 py-1 rounded text-sm flex items-center"
                                            >
                                                {skill}
                                                <button 
                                                    type="button" 
                                                    className="ml-1 text-gray-500 hover:text-gray-700"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeSkill(skill);
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400">Select skills</span>
                                    )}
                                </div>
                                <svg 
                                    className={`w-5 h-5 text-gray-400 transition-transform ${showSkillsDropdown ? 'transform rotate-180' : ''}`}
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            
                            {showSkillsDropdown && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                    {skillsOptions.map(skill => (
                                        <div 
                                            key={skill}
                                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${formData.skills.includes(skill) ? 'bg-gray-100' : ''}`}
                                            onClick={() => handleSkillSelection(skill)}
                                        >
                                            <div className="flex items-center">
                                                <input 
                                                    type="checkbox" 
                                                    checked={formData.skills.includes(skill)}
                                                    readOnly
                                                    className="mr-2"
                                                />
                                                {skill}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="certifications" className="block text-sm font-medium text-gray-700 mb-1">Certifications (if any)</label>
                        <select id="certifications" name="certifications" className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white" value={formData.certifications} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="AWS">AWS</option>
                            <option value="Google Cloud">Google Cloud</option>
                            <option value="Azure">Azure</option>
                        </select>
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="workAchievements" className="block text-sm font-medium text-gray-700 mb-1">Work Achievement/Requirements</label>
                        <select id="workAchievements" name="workAchievements" className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white" value={formData.workAchievements} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Leadership">Leadership</option>
                            <option value="Project Management">Project Management</option>
                            <option value="Innovation">Innovation</option>
                        </select>
                    </div>
                </div>
                
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                <div className="flex justify-end space-x-4">
                    <button type="button" className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 font-medium" onClick={handleCancel}>Cancel</button>
                    <button type="button" className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 font-medium" onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? 'Posting...' : 'Post Your Job'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PostReferralJobPage;