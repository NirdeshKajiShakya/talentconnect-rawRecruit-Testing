// // src/context/RoleContext/RoleContext.jsx
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const RoleContext = createContext();

// export const RoleProvider = ({ children }) => {
//   // Initialize state from localStorage with more robust checks
//   const [selectedRole, setSelectedRole] = useState(() => {
//     try {
//       const savedRole = localStorage.getItem('selectedRole');
//       return savedRole || null;
//     } catch (error) {
//       console.error("Error reading selectedRole from localStorage:", error);
//       return null;
//     }
//   });

//    useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === 'selectedRole') {
//         setSelectedRole(e.newValue);
//       }
//     };
    
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const [formData, setFormData] = useState(() => {
//     try {
//       const savedFormData = localStorage.getItem('formData');
//       return savedFormData ? JSON.parse(savedFormData) : {};
//     } catch (error) {
//       console.error("Error reading formData from localStorage:", error);
//       return {};
//     }
//   });
  
//   // Update localStorage whenever selectedRole changes with error handling
//   useEffect(() => {
//     try {
//       if (selectedRole) {
//         localStorage.setItem('selectedRole', selectedRole);
//       } 
//       // Don't remove from localStorage when null - this helps with persistence
//       // Only remove when explicitly called via clearData
//     } catch (error) {
//       console.error("Error saving selectedRole to localStorage:", error);
//     }
//   }, [selectedRole]);
  
//   // Update localStorage whenever formData changes with error handling
//   useEffect(() => {
//     try {
//       if (Object.keys(formData).length > 0) {
//         localStorage.setItem('formData', JSON.stringify(formData));
//       }
//       // Don't remove from localStorage when empty - this helps with persistence
//       // Only remove when explicitly called via clearData
//     } catch (error) {
//       console.error("Error saving formData to localStorage:", error);
//     }
//   }, [formData]);
  
//   // Function to update form data and maintain persistence
//   const updateFormData = (newData) => {
//     setFormData(prev => {
//       const updated = { ...prev, ...newData };
//       return updated;
//     });
//   };
  
//   // Function to update role with explicit persistence
//   const updateRole = (role) => {
//     setSelectedRole(role);
//     try {
//       localStorage.setItem('selectedRole', role);
//     } catch (error) {
//       console.error("Error saving role directly to localStorage:", error);
//     }
//   };
  
//   // Function to clear all saved data (for logout or form completion)
//   // Only use this when you explicitly want to clear everything
//   const clearData = () => {
//     setSelectedRole(null);
//     setFormData({});
//     try {
//       localStorage.removeItem('selectedRole');
//       localStorage.removeItem('formData');
//     } catch (error) {
//       console.error("Error clearing data from localStorage:", error);
//     }
//   };

//   return (
//     <RoleContext.Provider 
//       value={{ 
//         selectedRole, 
//         setSelectedRole,
//         updateRole, // New function for safer role updates
//         formData, 
//         updateFormData,
//         clearData 
//       }}
//     >
//       {children}
//     </RoleContext.Provider>
//   );
// };

// export const useRole = () => useContext(RoleContext);

// // src/context/RoleContext/RoleContext.jsx
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const RoleContext = createContext();

// export const RoleProvider = ({ children }) => {
//   // This part remains the same: it correctly persists the role
//   const [selectedRole, setSelectedRole] = useState(() => {
//     try {
//       return localStorage.getItem('selectedRole') || null;
//     } catch (error) {
//       console.error("Error reading selectedRole from localStorage:", error);
//       return null;
//     }
//   });

//   useEffect(() => {
//     try {
//       if (selectedRole) {
//         localStorage.setItem('selectedRole', selectedRole);
//       } else {
//         localStorage.removeItem('selectedRole');
//       }
//     } catch (error) {
//       console.error("Error saving selectedRole to localStorage:", error);
//     }
//   }, [selectedRole]);
  
//   // formData is still kept only in memory
//   const [formData, setFormData] = useState({});

//   const updateFormData = (newData) => {
//     setFormData(prev => ({ ...prev, ...newData }));
//   };
  
//   const updateRole = (role) => {
//     setSelectedRole(role);
//   };
  
//   // FIX: This is the new function for clearing only the form data
//   const clearFormData = () => {
//     setFormData({});
//   };

//   // This function is for a FULL reset (clears role and form data)
//   const clearData = () => {
//     setSelectedRole(null);
//     setFormData({});
//   };

//   return (
//     <RoleContext.Provider 
//       value={{ 
//         selectedRole, 
//         setSelectedRole: updateRole,
//         formData, 
//         updateFormData,
//         clearData,
//         clearFormData // FIX: Expose the new function
//       }}
//     >
//       {children}
//     </RoleContext.Provider>
//   );
// };

// export const useRole = () => useContext(RoleContext);



// src/context/RoleContext/RoleContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  // Logic for selectedRole (remains the same, it's correct)
  const [selectedRole, setSelectedRole] = useState(() => {
    try {
      return localStorage.getItem('selectedRole') || null;
    } catch (error) {
      console.error("Error reading selectedRole from localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (selectedRole) {
        localStorage.setItem('selectedRole', selectedRole);
      } else {
        localStorage.removeItem('selectedRole');
      }
    } catch (error) {
      console.error("Error saving selectedRole to localStorage:", error);
    }
  }, [selectedRole]);

  // --- FIX: Persist formData in localStorage ---
  // 1. Initialize formData from localStorage on component mount.
  const [formData, setFormData] = useState(() => {
    try {
      const storedFormData = localStorage.getItem('onboardingFormData');
      // Parse the stored JSON, or return an empty object if nothing is stored.
      return storedFormData ? JSON.parse(storedFormData) : {};
    } catch (error) {
      console.error("Error reading formData from localStorage:", error);
      return {};
    }
  });

  // 2. Save formData to localStorage whenever it changes.
  useEffect(() => {
    try {
      // We stringify the object to store it.
      localStorage.setItem('onboardingFormData', JSON.stringify(formData));
    } catch (error) {
      console.error("Error saving formData to localStorage:", error);
    }
  }, [formData]);
  
  // This function now updates the state, which triggers the useEffect above to save to localStorage.
  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };
  
  const updateRole = (role) => {
    setSelectedRole(role);
  };
  
  // This function now also clears the localStorage for formData.
  const clearFormData = () => {
    setFormData({});
    try {
      localStorage.removeItem('onboardingFormData');
    } catch (error) {
      console.error("Error removing formData from localStorage:", error);
    }
  };

  // This function clears everything.
  const clearData = () => {
    setSelectedRole(null);
    setFormData({});
    try {
      localStorage.removeItem('selectedRole');
      localStorage.removeItem('onboardingFormData');
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  return (
    <RoleContext.Provider 
      value={{ 
        selectedRole, 
        setSelectedRole: updateRole,
        formData, 
        updateFormData,
        clearData,
        clearFormData
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
