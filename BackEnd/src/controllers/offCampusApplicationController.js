// src/controllers/companyDashboard/jobManagement/offCampusApplicationController.js

import OffCampusApplication from "../models/offCampusApplicationModel.js";

// Get All Off-Campus Applications
export const getAllOffCampusApplications = async (req, res) => {
  try {
    const applications = await OffCampusApplication.find()
      .populate("jobId", "title location jobType")
      .populate("applicantId", "name email phone");

    res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error("Error fetching Off-Campus Applications:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Shortlist a candidate
export const shortlistOffCampusCandidate = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await OffCampusApplication.findByIdAndUpdate(
      applicationId,
      { applicationStatus: "Shortlisted" },
      { new: true }
    );

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    res.status(200).json({
      success: true,
      message: "Candidate shortlisted successfully",
      application,
    });
  } catch (error) {
    console.error("Error shortlisting candidate:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Reject a candidate
export const rejectOffCampusCandidate = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await OffCampusApplication.findByIdAndUpdate(
      applicationId,
      { applicationStatus: "Rejected" },
      { new: true }
    );

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    res.status(200).json({
      success: true,
      message: "Candidate rejected successfully",
      application,
    });
  } catch (error) {
    console.error("Error rejecting candidate:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get Single Application (View Details)
export const getSingleOffCampusApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await OffCampusApplication.findById(applicationId)
      .populate("jobId")
      .populate("applicantId");

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    console.error("Error fetching application details:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
