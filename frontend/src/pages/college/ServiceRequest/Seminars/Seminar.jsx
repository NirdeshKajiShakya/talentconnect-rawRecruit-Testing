import { useState } from 'react';
import MainPage from './MainPage';
import RegisterPage from './RegisterPage';
import RequestInfo from './RequestInfo';

export default function Seminar() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showRequestInfo, setShowRequestInfo] = useState(false);
  const [formData, setFormData] = useState({
     date: "",
     time: "",
     message: "",
     termsAccepted: false,
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
    [name === 'acceptTerms' ? 'termsAccepted' : name]: type === 'checkbox' ? checked : value
  });
};

const handleSubmitRegisterPage = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_Backend_URL}/api/rawrecruit/seminarrequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Seminar Request submitted!");
      setShowRegistration(false);
    } else {
      const error = await response.text();
      alert("Submission failed: " + error);
    }
  } catch (err) {
    console.error("Submission error:", err);
    alert("Error submitting form: " + err.message);
  }
};


const handleSubmitRequestInfo = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_Backend_URL}/api/rawrecruit/seminars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Seminar request submitted successfully!");
      setShowRegistration(false);
    } else {
      const error = await response.text();
      alert("Submission failed: " + error);
    }
  } catch (err) {
    console.error("Submission error:", err);
    alert("Error submitting form: " + err.message);
  }
};



  return (
  <div className="min-h-screen bg-gray-50 font-sans">
    {showRequestInfo ? (
      <RequestInfo 
        onBackClick={handleBackClick}
        handleSubmit={handleSubmitRequestInfo}
      />
    ) : showRegistration ? (
      <RegisterPage 
        onBackClick={handleBackClick}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmitRegisterPage} // separate handler for this
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