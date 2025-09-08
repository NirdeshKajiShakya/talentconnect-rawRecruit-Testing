import EditButton from '../EditButton'

function BasicDetails({ formData, isEditable, handleInputChange, toggleEdit }) {
  return (
    <div className="form-container">
      <h2 className="mb-2 text-2xl font-bold">Let's begin by sharing some basic details!</h2>
      <p className="mb-6 text-gray-600">
        Tell us a bit about yourself. This helps employers get to know you better and ensures a smooth job application process.
      </p>

      <div className="space-y-4">
        <div className="form-section">
          <label htmlFor="name" className="form-label">Enter your name</label>
          {isEditable ? (
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}      
              className="form-input"
            />
          ) : (  
            <div className="p-2 border border-gray-200 rounded">   
            {formData.name || 'Not provided'}  
            </div>
          )}
        </div>

        <div className="form-section">
          <label htmlFor="email" className="form-label">
            Enter your email <span className="text-gray-500">*</span>
          </label>
          {isEditable ? (
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          ) : (
            <div className="p-2 border border-gray-200 rounded">
              {formData.email || 'Not provided'}
            </div>
          )}
        </div>

        <div className="form-section">
          <label htmlFor="mobile" className="form-label">
            Enter your mobile no. <span className="text-gray-500">*</span>
          </label>
          {isEditable ? (
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          ) : (
            <div className="p-2 border border-gray-200 rounded">
              {formData.mobile || 'Not provided'}
            </div>
          )}
        </div>

        <div className="form-section">
          <label htmlFor="profileType" className="form-label">Select Your Profile Type</label>
          {isEditable ? (
            <select
              id="profileType"
              name="profileType"
              value={formData.profileType}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="">Select</option>
              <option value="student">Student</option>
              <option value="fresher">Fresher</option>
              <option value="experienced">Experienced</option>
            </select>
          ) : (
            <div className="p-2 border border-gray-200 rounded">
              {formData.profileType || 'Not selected'}
            </div>
          )}
        </div>
      </div>

      {!isEditable && <EditButton onClick={toggleEdit} />}
    </div>
  )
}

export default BasicDetails

