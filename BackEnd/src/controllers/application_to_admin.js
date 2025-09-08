import express from "express";
import serviceRequestModel from "../models/ServiceRequest.js";
import serviceRequestInterviewModel from "../models/ServiceRequest_interview.js";

export const createServiceRequest = async (req, res) => {
  try {
    const allRequests = await serviceRequestModel
      .find()
      .populate({
        path: "user",
        model: "StudentOverview",
        select: "-__v", // Optional: exclude internal fields
      })
      .sort({ Date: -1 }); // Sort newest first

    res.status(200).json(allRequests);
  } catch (error) {
    console.error("Error retrieving admin service requests:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const createmockinterviewrequest = async (req, res) => {
  try {
    const allRequests = await serviceRequestInterviewModel
      .find()
      .populate({
        path: "user",
        model: "StudentOverview",
        select: "-__v", // Optional: exclude internal fields
      })
      .sort({ Date: -1 }); // Sort newest first

    res.status(200).json(allRequests);
  } catch (error) {
    console.error("Error retrieving admin service requests:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// export default router;
