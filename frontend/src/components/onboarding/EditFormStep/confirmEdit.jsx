import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Confirmation = ({ onSubmit }) => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setAgreed(!agreed);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Confirmation</h2>
        <p className="text-center text-gray-600 mb-6">
          Please agree to our terms and privacy policy before submitting.
        </p>

        <div className="flex items-center justify-center gap-4 mb-6">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={handleCheckboxChange}
            className="w-5 h-5 cursor-pointer"
          />
          <label
            htmlFor="terms"
            className="text-base text-black font-normal cursor-pointer"
          >
            I agree to the Terms & Conditions and Privacy Policy.
          </label>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/step/5")}
            className="text-black border border-gray-300 px-6 py-3 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
         onClick={() => navigate("/home")}
            disabled={!agreed}
            className={`text-white px-6 py-3 rounded ${
              agreed ? "bg-black hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
