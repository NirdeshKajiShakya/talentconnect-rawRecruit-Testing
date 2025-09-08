import Registration from "../models/ServiceRequest_oncampusregister.js";

export const submitRegistration = async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).json({ message: "Registration submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
