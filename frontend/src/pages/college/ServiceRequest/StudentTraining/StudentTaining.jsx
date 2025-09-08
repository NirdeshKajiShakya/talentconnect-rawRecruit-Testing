import { useState } from 'react';
import MainPage from './MainPage';
import RegisterPage from './RegisterPage';
import RequestInfo from './RequestInfo';
import axios from 'axios';
export default function StudentTraining() {
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
  try {
    const response = await axios.post(`${import.meta.env.VITE_Backend_URL}/api/rawrecruit/student-training/register`, formData); // use correct endpoint if different
    alert("Form submitted successfully!");
    console.log(response.data);
    setShowRegistration(false);
  } catch (error) {
    console.error("Form submission error:", error);
    alert("Failed to submit the form.");
  }
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