import { FaUpload, FaFilePdf } from 'react-icons/fa'
import EditButton from '../EditButton'

function ResumeUpload({ formData, isEditable, handleInputChange, toggleEdit }) {
  const fileName = formData.resume ? formData.resume.name : null
  
  return (
    <div className="form-container">
      <h2 className="mb-2 text-2xl font-bold">Upload Your Resume to Auto-Fill Your Details</h2>
      <p className="mb-6 text-gray-600">
        Save time by uploading your resume. We'll extract key details to pre-fill your onboarding form. You can review and edit before submitting.
      </p>
      
      {isEditable ? (
        <div className="mt-6">
          <label className="form-label">Upload Resume</label>
          <div className="flex items-center w-full">
            <label className="flex items-center justify-center w-full gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <FaUpload className="text-gray-400" />
              <span className="text-sm text-gray-500">Upload PDF</span>
              <input
                type="file"
                name="resume"
                accept=".pdf"
                className="hidden"
                onChange={handleInputChange}
              />
            </label>
          </div>
          {fileName && (
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
              <FaFilePdf />
              <span>{fileName}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6">
          <p className="mb-2 font-medium">Upload Resume</p>
          {fileName ? (
            <div className="flex items-center gap-2 p-2 text-sm text-gray-600 border border-gray-200 rounded">
              <FaFilePdf />
              <span>{fileName}</span>
            </div>
          ) : (
            <div className="p-2 text-sm text-gray-500 border border-gray-200 rounded">
              No file uploaded
            </div>
          )}
        </div>
      )}

      {!isEditable && <EditButton onClick={toggleEdit} />}
    </div>
  )
}

export default ResumeUpload