// controllers/onDemandController.js
import OnDemandTraining from "../models/ServiceRequest_ondemandtraining.js";

export const submitOnDemandTrainingRequest = async (req, res) => {
  try {
    const { numberOfEmployees, skills, trainingMode, evaluation, duration } =
      req.body;

    if (
      !numberOfEmployees ||
      !skills ||
      !trainingMode ||
      !evaluation ||
      !duration
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newRequest = new OnDemandTraining({
      numberOfEmployees,
      skills,
      trainingMode,
      evaluation,
      duration,
    });

    const saved = await newRequest.save();

    res.status(201).json({
      message: "On-Demand Training request submitted successfully.",
      data: saved,
    });
  } catch (error) {
    console.error("Error saving training request:", error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};
