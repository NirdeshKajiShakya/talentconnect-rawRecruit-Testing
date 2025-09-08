import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { RoleProvider } from "./context/RoleContext/RoleContext";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import { Toaster } from 'react-hot-toast'; // Import Toaster for notifications


const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Wrap the entire application with GoogleOAuthProvider */}
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <RoleProvider>
          <AuthProvider>
            <SocketProvider>
              <App />
              <Toaster /> {/* Add the Toaster component here */}
            </SocketProvider>
          </AuthProvider>
        </RoleProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);