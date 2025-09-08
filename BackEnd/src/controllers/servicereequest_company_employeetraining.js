import serviceRequestModel from "../models/ServiceRequest_company_employeetraining_v2.js";

export const createServiceRequest = async (req, res) => {
  try {
    const { user, Date, time, message } = req.body;

    const newServiceRequest = new serviceRequestModel({
      user, // <-- include user field as required by your schema
      Date,
      time,
      message,
    });

    await newServiceRequest.save();

    return res.status(201).json({
      message: "Service request created successfully",
      newServiceRequest,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
