import Interview from "../models/ServiceRequest_interview.js";

// Controller to schedule a mock interview
export const scheduleInterview = async (req, res) => {
  try {
    const {
      category,
      skillset,
      date,
      time,
      message,
      termsAccepted,
      user, // ⬅️ ADDED: Ensure user is included
    } = req.body;

    // Validation
    if (
      !category ||
      !skillset ||
      !date ||
      !time ||
      !termsAccepted ||
      !user // ⬅️ ADDED: Required field check
    ) {
      return res.status(400).json({
        error:
          "All required fields must be provided, including user and terms must be accepted.",
      });
    }

    // Create new interview record
    const newInterview = new Interview({
      category,
      skillset,
      date,
      time,
      message,
      termsAccepted,
      user, // ⬅️ ADDED to match the schema
    });

    await newInterview.save();

    return res
      .status(201)
      .json({ message: "Interview scheduled successfully!" });
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
};
