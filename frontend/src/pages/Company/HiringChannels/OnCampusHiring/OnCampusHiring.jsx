import { useState } from 'react';
import MainPage from './MainPage';
import RegisterPage from './RegisterPage';
import RequestInfo from './RequestInfo';

export default function OnCampusHiring() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showRequestInfo, setShowRequestInfo] = useState(false);
  const [formData, setFormData] = useState({
  date: "",
  time: "",
  message: "",
  termsAccepted: false // 🔁 was `acceptTerms`
});


  const handleRegisterClick = () => setShowRegistration(true);
  const handleRequestInfoClick = () => setShowRequestInfo(true);
  const handleBackClick = () => {
    setShowRegistration(false);
    setShowRequestInfo(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_Backend_URL}/api/rawrecruit/oncampus`, {
  method: "POST",
  withCredentials: true, // Ensure cookies are sent with the request
  credentials: "include", // Include credentials for cross-origin requests
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
});


    if (response.ok) {
      alert("Form submitted successfully!");
      setShowRegistration(false);
    } else {
      // Safely try to parse error JSON, or fall back to plain text
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText };
      }
      alert(`Submission failed: ${errorData.error}`);
    }
  } catch (err) {
    alert(`An error occurred: ${err.message}`);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {showRequestInfo ? (
        <RequestInfo onBackClick={handleBackClick}
        />
      ) : showRegistration ? (
        <RegisterPage 
          onBackClick={handleBackClick}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <MainPage 
          onRegisterClick={handleRegisterClick}
          onRequestInfoClick={handleRequestInfoClick}
        />
      )}
    </div>
  );
}