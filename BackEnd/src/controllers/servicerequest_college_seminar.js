import Requests from "../models/ServiceRequest_college_seminars.js";

export const submitRequest = async (req, res) => {
  try {
    const request = new Requests(req.body);
    await request.save();
    res.status(201).json({ message: "Request submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
