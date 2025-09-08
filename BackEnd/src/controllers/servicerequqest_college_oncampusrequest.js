import RequestInfo from "../models/ServiceRequest_college_oncampusrequest.js";

export const submitRequestInfo = async (req, res) => {
  try {
    const { date, time, message, acceptTerms } = req.body;

    if (!date || !time || acceptTerms !== true) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const newRequest = new RequestInfo({
      date,
      time,
      message,
      acceptTerms,
    });

    const savedRequest = await newRequest.save();
    res
      .status(201)
      .json({ message: "Request submitted successfully", data: savedRequest });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to submit request", error: error.message });
  }
};
