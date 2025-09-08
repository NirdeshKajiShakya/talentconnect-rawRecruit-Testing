import OffCampusRegister from "../models/ServiceRequest_offcampusregister.js";

export const registerOffCampus = async (req, res) => {
  try {
    const registration = new OffCampusRegister(req.body);
    await registration.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
