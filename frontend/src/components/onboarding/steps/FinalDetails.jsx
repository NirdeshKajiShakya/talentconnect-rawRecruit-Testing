import EditButton from '../EditButton'

function FinalDetails({ formData, isEditable, handleInputChange, toggleEdit }) {
  return (
    <div className="form-container">
      <h2 className="mb-2 text-2xl font-bold">You're almost there! Let's add final details and submit!</h2>
      <p className="mb-6 text-gray-600">
        Highlight your skills and achievements. Upload certifications, list technical skills, and showcase what makes you stand out to employers.
      </p>

      <div className="space-y-4">
        <div className="form-section">
          <label htmlFor="skills" className="form-label">Skills</label>
          {isEditable ? (
            <select
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              className="form-input"
              multiple
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="react">React</option>
              <option value="nodejs">Node.js</option>
              <option value="aws">AWS</option>
              <option value="sql">SQL</option>
              <option value="figma">Figma</option>
              <option value="photoshop">Photoshop</option>
            </select>
          ) : (
            <div className="p-2 border border-gray-200 rounded">
              {formData.skills && formData.skills.length > 0 
                ? formData.skills.join(', ') 
                : 'Not selected'}
            </div>
          )}
        </div>

        <div className="form-section">
          <label htmlFor="certifications" className="form-label">Certifications</label>
          {isEditable ? (
            <input
              type="text"
              id="certifications"
              name="certifications"
              value={formData.certifications}
              onChange={handleInputChange}
              className="form-input"
              placeholder="E.g., AWS Solution Architect, Google Analytics"
            />
          ) : (
            <div className="p-2 border border-gray-200 rounded">
              {formData.certifications || 'Not provided'}
            </div>
          )}
        </div>

        <div className="form-section">
          <label htmlFor="linkedinProfile" className="form-label">LinkedIn Profile</label>
          {isEditable ? (
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 py-2 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                http://
              </span>
              <input
                type="text"
                id="linkedinProfile"
                name="linkedinProfile"
                value={formData.linkedinProfile}
                onChange={handleInputChange}
                className="form-input rounded-l-none"
                placeholder="www.linkedin.io"
              />
            </div>
          ) : (
            <div className="p-2 border border-gray-200 rounded">
              {formData.linkedinProfile ? `http://${formData.linkedinProfile}` : 'Not provided'}
            </div>
          )}
        </div>

        <div className="form-section">
          <label htmlFor="githubProfile" className="form-label">GitHub Profile</label>
          {isEditable ? (
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 py-2 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                http://
              </span>
              <input
                type="text"
                id="githubProfile"
                name="githubProfile"
                value={formData.githubProfile}
                onChange={handleInputChange}
                className="form-input rounded-l-none"
                placeholder="www.github.io"
              />
            </div>
          ) : (
            <div className="p-2 border border-gray-200 rounded">
              {formData.githubProfile ? `http://${formData.githubProfile}` : 'Not provided'}
            </div>
          )}
        </div>

        <div className="form-section">
          <label htmlFor="portfolio" className="form-label">Portfolio/Website(if any)</label>
          {isEditable ? (
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 py-2 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                http://
              </span>
              <input
                type="text"
                id="portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleInputChange}
                className="form-input rounded-l-none"
                placeholder="www.website.io"
              />
            </div>
          ) : (
            <div className="p-2 border border-gray-200 rounded">
              {formData.portfolio ? `http://${formData.portfolio}` : 'Not provided'}
            </div>
          )}
        </div>

        <div className="form-section">
          <label htmlFor="referralSource" className="form-label">How did you hear about us?</label>
          {isEditable ? (
            <select
              id="referralSource"
              name="referralSource"
              value={formData.referralSource}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="">Select one</option>
              <option value="search">Search Engine</option>
              <option value="social">Social Media</option>
              <option value="friend">Friend/Colleague</option>
              <option value="job-board">Job Board</option>
              <option value="other">Other</option>
            </select>
          ) : (
            <div className="p-2 border border-gray-200 rounded">
              {formData.referralSource || 'Not selected'}
            </div>
          )}
        </div>
      </div>

      {!isEditable && <EditButton onClick={toggleEdit} />}
    </div>
  )
}

export default FinalDetails