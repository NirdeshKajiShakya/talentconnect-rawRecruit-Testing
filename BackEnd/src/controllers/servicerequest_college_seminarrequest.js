import Request from "../models/ServiceRequest_college_seminars_requestinfo.js";

export const submitRequest = async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.status(201).json({ message: "Request submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
