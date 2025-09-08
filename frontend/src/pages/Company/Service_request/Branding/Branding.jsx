import { useState } from 'react';
import MainPage from './MainPage';
import RegisterPage from './RegisterPage';
import RequestInfo from './RequestInfo';

export default function Branding() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showRequestInfo, setShowRequestInfo] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    message: "",
    acceptTerms: false
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
  const payload = {
    user: "664c0f2a8a9c3e5b1d7d1234", // Replace with real ObjectId when ready
    Date: formData.date, // Case sensitive
    time: formData.time,
    message: `Message: ${formData.message}` // Or format it like RequestInfo if needed
  };

  console.log("Final Payload to send:", payload);

  try {
    const response = await fetch(`${import.meta.env.VITE_Backend_URL}/api/rawrecruit/servicerequest-companybranding`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok) {
      alert("Service request submitted successfully!");
      console.log(data);
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (err) {
    console.error("Submission error:", err);
    alert("An error occurred while submitting the form.");
  }

  setShowRegistration(false);
};


  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {showRequestInfo ? (
        <RequestInfo onBackClick={handleBackClick}
        // formData={formData} 
        // handleInputChange={handleInputChange}
        // handleSubmit={handleSubmit}
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