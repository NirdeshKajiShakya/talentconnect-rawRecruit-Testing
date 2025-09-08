import { useState } from 'react';
import MainPage from './MainPage';
import RegisterPage from './RegisterPage';
import RequestInfo from './RequestInfo';

export default function PoolCampus() {
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

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
    setShowRegistration(false);
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