import { useState } from 'react';
import MainPage from './MainPage';
import RequestInfo from "./RegisterPage"


export default function CampusBranding() {
  const [showRequestInfo, setShowRequestInfo] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    message: "",
    acceptTerms: false
  });

  const handleRequestInfoClick = () => setShowRequestInfo(true);
  const handleBackClick = () => setShowRequestInfo(false);

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
    setShowRequestInfo(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {showRequestInfo ? (
        <RequestInfo
          onBackClick={handleBackClick}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <MainPage onRequestInfoClick={handleRequestInfoClick} />
      )}
    </div>
  );
}
