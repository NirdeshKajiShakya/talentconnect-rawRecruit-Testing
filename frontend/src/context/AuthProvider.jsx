// import React, { createContext, useContext, useState } from "react";
// import Cookies from "js-cookie";
// export const AuthContext = createContext();
// export const AuthProvider = ({ children }) => {
//   const initialUserState =
//     Cookies.get("jwt") || localStorage.getItem("ChatApp");

//   // parse the user data and storing in state.
//   const [authUser, setAuthUser] = useState(
//     initialUserState ? JSON.parse(initialUserState) : undefined
//   );
//   return (
//     <AuthContext.Provider value={[authUser, setAuthUser]}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authUser, setAuthUser] = useState(() => {
//     try {
//       // Initialize from localStorage with a consistent key
//       const storedAuth = localStorage.getItem('ChatAppUser');
//       return storedAuth ? JSON.parse(storedAuth) : null;
//     } catch (error) {
//       console.error("Failed to parse auth user from localStorage:", error);
//       return null;
//     }
//   });

//   // Effect to update localStorage whenever authUser changes
//   useEffect(() => {
//     try {
//       if (authUser) {
//         localStorage.setItem('ChatAppUser', JSON.stringify(authUser));
//       } else {
//         localStorage.removeItem('ChatAppUser');
//       }
//     } catch (error) {
//       console.error("Failed to save auth user to localStorage:", error);
//     }
//   }, [authUser]);

//   return (
//     <AuthContext.Provider value={[authUser, setAuthUser]}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authUser, setAuthUser] = useState(() => {
//     try {
//       const storedUser = localStorage.getItem('ChatAppUser');
//       if (storedUser) {
//         const parsedUser = JSON.parse(storedUser);
        
      
//         if (parsedUser && parsedUser._id) {
//           return { user: parsedUser };
//         } 
       
//         else if (parsedUser && parsedUser.user && parsedUser.user._id) {
//           return parsedUser;
//         }
//       }
//     } catch (error) {
//       console.error("Failed to parse auth user from localStorage, clearing data:", error);
//       localStorage.removeItem('ChatAppUser'); // Clear potentially corrupted data
//     }
//     return null; // Default initial state if no valid user data found
//   });

//   // Effect to update localStorage whenever authUser changes
//   useEffect(() => {
//     try {
     
//       if (authUser && authUser.user && authUser.user._id) {
//         localStorage.setItem('ChatAppUser', JSON.stringify(authUser.user));
//       } else {
//         localStorage.removeItem('ChatAppUser'); // Remove if no valid user in state
//       }
//     } catch (error) {
//       console.error("Failed to save auth user to localStorage:", error);
//     }
//   }, [authUser]);

//   return (
//     <AuthContext.Provider value={[authUser, setAuthUser]}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


// context/AuthProvider.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('ChatAppUser');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        
        // Handle both formats: { user: {...} } and direct user object
        if (parsedUser && parsedUser.user && parsedUser.user._id) {
          return parsedUser; // Correct format: { user: {...} }
        } else if (parsedUser && parsedUser._id) {
          return { user: parsedUser }; // Convert old format to new format
        }
      }
    } catch (error) {
      console.error("Failed to parse auth user from localStorage, clearing data:", error);
      localStorage.removeItem('ChatAppUser');
    }
    return null;
  });

  // Enhanced useEffect to handle both formats
  useEffect(() => {
    try {
      if (authUser && authUser.user && authUser.user._id) {
        localStorage.setItem('ChatAppUser', JSON.stringify(authUser));
      } else {
        localStorage.removeItem('ChatAppUser');
      }
    } catch (error) {
      console.error("Failed to save auth user to localStorage:", error);
    }
  }, [authUser]);

  // Create a stable setter function that maintains the correct structure
  const setAuthUserStable = (newAuthUser) => {
    if (newAuthUser && newAuthUser._id && !newAuthUser.user) {
      // If we get a user object directly, wrap it in { user: ... }
      setAuthUser({ user: newAuthUser });
    } else {
      setAuthUser(newAuthUser);
    }
  };

  return (
    <AuthContext.Provider value={[authUser, setAuthUserStable]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};