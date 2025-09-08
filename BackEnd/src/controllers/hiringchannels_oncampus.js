import Request from "../models/HiringChannels_oncampus.js";

export const submitRequest = async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.status(201).json({ message: "Request submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
