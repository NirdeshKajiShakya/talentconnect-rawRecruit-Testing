import { FaUpload, FaFilePdf } from 'react-icons/fa'
import EditButton from '../EditButton'

function Education({ formData, isEditable, handleInputChange, toggleEdit }) {
  const certificateFileName = formData.degreeCertificate ? formData.degreeCertificate.name : null
  
  return (
    <div className="form-container">
      <h2 className="mb-2 text-2xl font-bold">Let's add your educational background!</h2>
      <p className="mb-6 text-gray-600">
        Provide your academic background to match with relevant job and internship opportunities. Employers consider this when shortlisting candidates.
      </p>

      <div className="space-y-4">
        <div className="form-section">
          <label htmlFor="college" className="form-label">College/University</label>
          {isEditable ? (
            <select
              id="college"
              name="college"
              value={formData.college}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="">Placeholder</option>
              <option value="university1">University 1</option>
              <option value="university2">University 2</option>
              <option value="other">Other</option>
            </select>
          ) : (
            <div className="p-2 border border-gray-200 rounded">
              {formData.college || 'Not selected'}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="form-section">
            <label htmlFor="degree" className="form-label">Degree</label>
            {isEditable ? (
              <select
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Placeholder</option>
                <option value="bachelors">Bachelor's</option>
                <option value="masters">Master's</option>
                <option value="phd">PhD</option>
              </select>
            ) : (
              <div className="p-2 border border-gray-200 rounded">
                {formData.degree || 'Not selected'}
              </div>
            )}
          </div>

          <div className="form-section">
            <label htmlFor="currentSemester" className="form-label">Current Semester</label>
            {isEditable ? (
              <select
                id="currentSemester"
                name="currentSemester"
                value={formData.currentSemester}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Placeholder</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
                <option value="3">3rd Semester</option>
                <option value="4">4th Semester</option>
                <option value="5">5th Semester</option>
                <option value="6">6th Semester</option>
                <option value="7">7th Semester</option>
                <option value="8">8th Semester</option>
                <option value="graduated">Graduated</option>
              </select>
            ) : (
              <div className="p-2 border border-gray-200 rounded">
                {formData.currentSemester || 'Not selected'}
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <label htmlFor="fieldOfStudy" className="form-label">Field of Study / Specialization</label>
          {isEditable ? (
            <select
              id="fieldOfStudy"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="">Placeholder</option>
              <option value="computerScience">Computer Science</option>
              <option value="engineering">Engineering</option>
              <option value="business">Business</option>
              <option value="arts">Arts</option>
              <option value="science">Science</option>
            </select>
          ) : (
            <div className="p-2 border border-gray-200 rounded">
              {formData.fieldOfStudy || 'Not selected'}
            </div>
          )}
        </div>

        <div className="form-section">
          <label htmlFor="gpa" className="form-label">Current CGPA/Percentage</label>
          {isEditable ? (
            <input
              type="text"
              id="gpa"
              name="gpa"
              value={formData.gpa}
              onChange={handleInputChange}
              className="form-input"
              placeholder="3.5 / 85%"
            />
          ) : (
            <div className="p-2 border border-gray-200 rounded">
              {formData.gpa || 'Not provided'}
            </div>
          )}
        </div>

        <div className="form-section">
          <label className="form-label">Degree Certificate (Optional)</label>
          {isEditable ? (
            <div className="flex items-center w-full">
              <label className="flex items-center justify-center w-full gap-2 p-3 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                <FaUpload className="text-gray-400" />
                <span className="text-sm text-gray-500">Upload Degree Certificate</span>
                <input
                  type="file"
                  name="degreeCertificate"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleInputChange}
                />
              </label>
            </div>
          ) : (
            <div className="p-2 border border-gray-200 rounded">
              {certificateFileName ? (
                <div className="flex items-center gap-2">
                  <FaFilePdf className="text-gray-500" />
                  <span>{certificateFileName}</span>
                </div>
              ) : (
                'No certificate uploaded'
              )}
            </div>
          )}
        </div>
      </div>

      {!isEditable && <EditButton onClick={toggleEdit} />}
    </div>
  )
}

export default Education