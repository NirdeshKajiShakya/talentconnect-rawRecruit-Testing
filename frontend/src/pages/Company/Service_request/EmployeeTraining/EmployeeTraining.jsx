import { useState } from 'react';
import MainPage from './Main';
import RegisterPage from './RegisterPage';
import RequestInfo from './RequestInfo';

export default function EmployeeTraining() {
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
  const sampleUserId = "66501f37e80c7b341bc71a12"; // Replace with actual ID

  const payload = {
    user: sampleUserId,
    Date: new Date(formData.date),
    time: formData.time,
    message: formData.message,
  };

  try {
    const response = await fetch(`${import.meta.env.VITE_Backend_URL}/api/rawrecruit/servicerequest-employeetraining`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Request submitted successfully!");
      setShowRegistration(false);
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Something went wrong!");
  }
};


  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {showRequestInfo ? (
        <RequestInfo onBackClick={handleBackClick} />
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
      )}    </div>
  );
}