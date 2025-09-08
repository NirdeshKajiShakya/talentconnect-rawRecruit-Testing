// controllers/placementController.js
import Placement from "../models/ServiceRequest_college_oncampus.js";

export const registerPlacement = async (req, res) => {
  try {
    const newPlacement = new Placement(req.body);
    const savedPlacement = await newPlacement.save();
    res
      .status(201)
      .json({ message: "Registration successful", data: savedPlacement });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};
