// controllers/studentRegistrationController.js
import StudentRegistration from "../models/ServiceRequest_college_studenttraining_requestinfo.js";

export const registerStudent = async (req, res) => {
  try {
    const { date, time, message, acceptedTerms } = req.body;

    // Validation
    if (!date || !time || typeof acceptedTerms !== "boolean") {
      return res.status(400).json({ error: "Missing required fields." });
    }

    if (!acceptedTerms) {
      return res
        .status(400)
        .json({ error: "You must accept the terms to register." });
    }

    // Create and save new registration
    const registration = new StudentRegistration({
      date,
      time,
      message,
      acceptedTerms,
    });

    await registration.save();

    res.status(201).json({
      message: "Student training program registration submitted successfully.",
      data: registration,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
