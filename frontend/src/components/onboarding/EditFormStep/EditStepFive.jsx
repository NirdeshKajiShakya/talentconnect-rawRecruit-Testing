import React, { useState } from "react";
import { ProgressIndicator } from "../ProgressIndicator";
import { UploadIcon, XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "lucide-react";

export const EditStepFive = () => {
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    skills: [],
    certifications: "",
    linkedinProfile: "www.relume.io",
    githubProfile: "www.relume.io",
    portfolio: "www.relume.io",
    project: null,
    referralSource: "",
  });

  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const skillOptions = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "UI/UX Design",
    "HTML/CSS",
    "TypeScript",
    "SQL",
    "AWS"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, project: e.target.files[0] }));
    }
  };

  const toggleSkill = (skill) => {
    if (!isEditable) return;
    
    setFormData(prev => {
      if (prev.skills.includes(skill)) {
        return { ...prev, skills: prev.skills.filter(s => s !== skill) };
      } else {
        return { ...prev, skills: [...prev.skills, skill] };
      }
    });
  };

  const removeSkill = (skill) => {
    if (!isEditable) return;
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleEditClick = () => setIsEditable(true);
  const handleCancelClick = () => navigate("/step/4");
  const handleNextClick = () => navigate("/confirmation");

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white flex flex-col w-full max-w-[560px] mx-auto p-12 max-md:px-5">
        <ProgressIndicator currentStep={5} totalSteps={5} />

        <div className="mt-8">
          <h2 className="text-[32px] font-bold leading-[42px]">
            You're almost there! Let's add final details and submit!
          </h2>
          <p className="text-base mt-2 text-[#444]">
            Highlight your skills and achievements. Upload certifications, list technical skills, and showcase what makes you stand out to employers.
          </p>
        </div>

        <form className="mt-8 space-y-6">
          {/* Skills - Updated with tag input style */}
          <div>
            <label htmlFor="skills" className="block text-black">Skills</label>
            
            {/* Selected skills display */}
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 mb-1">
                {formData.skills.map(skill => (
                  <div 
                    key={skill} 
                    className={`flex items-center gap-1 px-3 py-1 rounded-full border ${
                      isEditable ? "bg-gray-100 border-gray-300" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <span className="text-sm">{skill}</span>
                    {isEditable && (
                      <button 
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <XIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Skills dropdown */}
            <div className="relative">
              <div 
                className={`flex items-center justify-between p-3 w-full border border-gray-300 rounded text-[#666] cursor-pointer ${
                  !isEditable ? "bg-gray-100 cursor-not-allowed" : "hover:border-gray-400"
                }`}
                onClick={() => isEditable && setIsSkillsOpen(!isSkillsOpen)}
              >
                <span>Select skills</span>
                <ChevronDownIcon className={`w-5 h-5 transition-transform ${isSkillsOpen ? "rotate-180" : ""}`} />
              </div>
              
              {isSkillsOpen && isEditable && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
                  {skillOptions.map(skill => (
                    <div
                      key={skill}
                      className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                        formData.skills.includes(skill) ? "bg-gray-100 font-medium" : ""
                      }`}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                      {formData.skills.includes(skill) && (
                        <span className="ml-2 text-gray-500">✓</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <label htmlFor="certifications" className="block text-black">Certifications</label>
            <textarea
              id="certifications"
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              disabled={!isEditable}
              className={`mt-2 p-3 w-full border border-gray-300 rounded text-[#666] min-h-[80px] ${!isEditable ? "bg-gray-100 cursor-not-allowed" : ""}`}
              placeholder="List any certifications"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label htmlFor="linkedinProfile" className="block text-black">LinkedIn Profile</label>
            <div className="flex mt-2 border border-gray-300 rounded overflow-hidden">
              <div className="bg-gray-100 px-3 py-2 text-black">http://</div>
              <input
                id="linkedinProfile"
                name="linkedinProfile"
                type="text"
                value={formData.linkedinProfile}
                onChange={handleChange}
                disabled={!isEditable}
                className={`flex-1 px-3 py-2 text-[#666] ${!isEditable ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
            </div>
          </div>

          {/* Github */}
          <div>
            <label htmlFor="githubProfile" className="block text-black">Github Profile</label>
            <div className="flex mt-2 border border-gray-300 rounded overflow-hidden">
              <div className="bg-gray-100 px-3 py-2 text-black">http://</div>
              <input
                id="githubProfile"
                name="githubProfile"
                type="text"
                value={formData.githubProfile}
                onChange={handleChange}
                disabled={!isEditable}
                className={`flex-1 px-3 py-2 text-[#666] ${!isEditable ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
            </div>
          </div>

          {/* Portfolio */}
          <div>
            <label htmlFor="portfolio" className="block text-black">Portfolio/Website (if any)</label>
            <div className="flex mt-2 border border-gray-300 rounded overflow-hidden">
              <div className="bg-gray-100 px-3 py-2 text-black">http://</div>
              <input
                id="portfolio"
                name="portfolio"
                type="text"
                value={formData.portfolio}
                onChange={handleChange}
                disabled={!isEditable}
                className={`flex-1 px-3 py-2 text-[#666] ${!isEditable ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
            </div>
          </div>

          {/* Project Upload */}
          <div>
            <label htmlFor="project" className="block text-black">Project (PDF)</label>
            <label className={`flex items-center mt-2 p-3 border border-gray-300 rounded gap-2 cursor-pointer ${!isEditable ? "bg-gray-100 cursor-not-allowed" : "hover:bg-gray-50"}`}>
              <span className="flex-1">{formData.project ? formData.project.name : "Upload PDF"}</span>
              <UploadIcon className="w-6 h-6" />
              <input
                type="file"
                id="project"
                name="project"
                accept=".pdf"
                className="hidden"
                disabled={!isEditable}
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Referral Source */}
          <div>
            <label htmlFor="referralSource" className="block text-black">How did you hear about us?</label>
            <select
              id="referralSource"
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
              disabled={!isEditable}
              className={`mt-2 p-3 w-full border border-gray-300 rounded text-[#666] ${!isEditable ? "bg-gray-100 cursor-not-allowed" : ""}`}
            >
              <option value="" disabled>Select one...</option>
              <option value="social">Social Media</option>
              <option value="friend">Friend or Colleague</option>
              <option value="search">Search Engine</option>
              <option value="college">College/University</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            {!isEditable && (
              <button
                type="button"
                onClick={handleEditClick}
                className="border border-gray-300 text-black rounded-md px-6 py-3"
              >
                Edit
              </button>
            )}
            <button
              type="button"
              onClick={handleCancelClick}
              className="border border-gray-300 text-black rounded-md px-6 py-3"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleNextClick}
              className="bg-black text-white rounded-md px-6 py-3"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};