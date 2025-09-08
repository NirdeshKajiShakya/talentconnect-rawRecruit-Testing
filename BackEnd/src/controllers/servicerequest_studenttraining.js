// controllers/studentTrainingController.js
import StudentTraining from "../models/ServiceRequest_studenttraining.js";

export const registerStudentTraining = async (req, res) => {
  try {
    console.log("Incoming data:", req.body); // <-- Debug logging
    const formData = req.body;
    const registration = new StudentTraining(formData);
    await registration.save();
    res.status(201).json({
      message: "Student Training Program registered successfully",
      data: registration,
    });
  } catch (error) {
    console.error("Save error:", error.message);
    res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
};
