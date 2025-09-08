// controllers/campusPlacementController.js
import CampusPlacement from "../models/ServiceRequest_oncampusplacement.js";

export const registerCampusPlacement = async (req, res) => {
  try {
    const formData = req.body;
    const newRegistration = new CampusPlacement(formData);
    await newRegistration.save();
    res
      .status(201)
      .json({
        message: "Campus Placement registration successful",
        data: newRegistration,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
};
