// import { useState } from 'react'

// const FormField = ({
//   label,
//   type = 'text',
//   name,
//   value,
//   // Modified: onChange now expects the event object directly from the input/select
//   onChange,
//   placeholder = '',
//   required = false,
//   options = [],
//   icon = null,
//   className = ''
// }) => {
//   const [focused, setFocused] = useState(false)

//   const handleFocus = () => setFocused(true)
//   const handleBlur = () => setFocused(false)

//   // This internal handleChange will now *just pass the event object* up to the parent.
//   // The parent (CompanyInfoStep) will then extract name and value.
//   const handleInputChange = (e) => {
//     onChange(e); // Pass the event object directly
//   }

//   const renderField = () => {
//     const inputClasses = "form-input block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm";

//     switch (type) {
//       case 'select':
//         return (
//           <div className="relative">
//             <select
//               name={name}
//               value={value}
//               onChange={handleInputChange} // Use the simplified handler
//               onFocus={handleFocus}
//               onBlur={handleBlur}
//               className={`${inputClasses} appearance-none pr-10`}
//               required={required}
//             >
//               {/* This is correct for showing a placeholder in a select */}
//               <option value="" disabled selected={!value}>{placeholder || 'Select an option'}</option>
//               {options.map(option => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </div>
//           </div>
//         )

//       case 'textarea':
//         return (
//           <textarea
//             name={name}
//             value={value}
//             onChange={handleInputChange} // Use the simplified handler
//             onFocus={handleFocus}
//             onBlur={handleBlur}
//             placeholder={placeholder}
//             className={`${inputClasses} min-h-[100px]`}
//             required={required}
//           />
//         )

//       case 'email':
//       case 'tel':
//       case 'url':
//       case 'password':
//       case 'text':
//       default:
//         return (
//           <div className="relative">
//             {icon && (
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
//                 {icon}
//               </div>
//             )}
//             <input
//               type={type}
//               name={name}
//               value={value}
//               onChange={handleInputChange} // Use the simplified handler
//               onFocus={handleFocus}
//               onBlur={handleBlur}
//               placeholder={placeholder}
//               className={`${inputClasses} ${icon ? 'pl-10' : ''}`}
//               required={required}
//             />
//           </div>
//         )
//     }
//   }

//   return (
//     <div className={`mb-4 ${className}`}>
//       {label && (
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           {label} {required && <span className="text-red-500">*</span>}
//         </label>
//       )}
//       {renderField()}
//     </div>
//   )
// }

// export default FormField




// src/components/company/FormField.jsx (Assuming this path)

const FormField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  options = [], // For select
  icon = null, // If you have an icon prop
  className = '', // For custom styling
  isMulti = false, // <--- ADD THIS PROP
}) => {
  const inputId = name || label.toLowerCase().replace(/\s/g, '-');

  const renderField = () => {
    switch (type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'url':
        return (
          <input
            type={type}
            id={inputId}
            name={name}
            value={value || ''} // Ensure value is never undefined
            onChange={onChange}
            placeholder={placeholder}
            className={`form-input block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm ${className}`}
          />
        );
      case 'textarea':
        return (
          <textarea
            id={inputId}
            name={name}
            value={value || ''} // Ensure value is never undefined
            onChange={onChange}
            placeholder={placeholder}
            rows="4"
            className={`form-textarea block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm ${className}`}
          ></textarea>
        );
      case 'select':
        return (
          <select
            id={inputId}
            name={name}
            value={value || (isMulti ? [] : '')} // IMPORTANT: Handle initial value for multi-select
            onChange={onChange}
            className={`form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm ${className}`}
            multiple={isMulti} // <--- IMPORTANT: ADD THIS
          >
            {!isMulti && <option value="">{placeholder || `Select ${label}`}</option>} {/* Add default option if not multi-select */}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      // Add other input types like 'checkbox', 'radio' if your FormField supports them
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {renderField()}
        {icon && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">{icon}</div>}
      </div>
    </div>
  );
};

export default FormField;