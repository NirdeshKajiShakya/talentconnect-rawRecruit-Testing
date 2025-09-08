import { useState } from "react";
import MainPage from "./Main";
import RegistrationPage from "./RegistrationPage";
import ServiceCard from "./ServiceCard";

export default function EmployerWorkforce() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    message: "",
    acceptTerms: false
  });

  const handleRegisterClick = () => setShowRegistration(true);
  const handleBackClick = () => setShowRegistration(false);

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
      {!showRegistration ? (
        <MainPage onRegisterClick={handleRegisterClick} />
      ) : (
        <RegistrationPage 
          onBackClick={handleBackClick}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}