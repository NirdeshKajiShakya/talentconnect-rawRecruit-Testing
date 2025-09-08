import { useState } from "react";
import MainPage from "./Main";
import RegistrationPage from "./RegistrationPage";
import ServiceCard from "./ServiceCard";

export default function Workforce() {
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

  const handleSubmit = async () => {
  if (!formData.acceptTerms) {
    alert("Please accept the terms before submitting.");
    return;
  }

  const payload = {
    counselingtype: 1, // You can adjust this value dynamically later
    user: "660df3e52c4236bb16abfcf1", // Hardcoded user ID for now (replace later)
    Date: formData.date,
    time: formData.time,
    message: formData.message
  };

  try {
    const response = await fetch(`${import.meta.env.VITE_Backend_URL}/api/rawrecruit/servicerequest-workforce`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await response.json();
    console.log("✅ Form submitted:", data);
    alert("Form submitted successfully!");
    setShowRegistration(false);

  } catch (error) {
    console.error("❌ Submission failed:", error);
    alert("Failed to submit form. Please try again.");
  }
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