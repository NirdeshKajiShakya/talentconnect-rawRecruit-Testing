import { useState } from 'react'

const FormField = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder = '', 
  required = false,
  options = [],
  icon = null,
  className = ''
}) => {
  const [focused, setFocused] = useState(false)
  
  const handleFocus = () => setFocused(true)
  const handleBlur = () => setFocused(false)
  
  const handleChange = (e) => {
    onChange(name, e.target.value)
  }
  
  const renderField = () => {
    switch(type) {
      case 'select':
        return (
          <div className="relative">
            <select 
              name={name}
              value={value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="form-input appearance-none pr-10"
              required={required}
            >
              <option value="">{placeholder || 'Select an option'}</option>
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        )
      
      case 'textarea':
        return (
          <textarea
            name={name}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="form-input min-h-[100px]"
            required={required}
          />
        )
        
      case 'email':
      case 'tel':
      case 'url':
      case 'password':
      case 'text':
      default:
        return (
          <div className="relative">
            {icon && (
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                {icon}
              </div>
            )}
            <input
              type={type}
              name={name}
              value={value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              className={`form-input ${icon ? 'pl-10' : ''}`}
              required={required}
            />
          </div>
        )
    }
  }
  
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      {renderField()}
    </div>
  )
}

export default FormField