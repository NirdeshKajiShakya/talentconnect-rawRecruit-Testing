import express from "express";
import CompanyJob from "../models/manageapplications_jobmodel.js"; // adjust path as needed

const router = express.Router();

// GET /api/rawrecruit - Fetch all job postings
router.get("/", async (req, res) => {
  try {
    const jobs = await CompanyJob.find();

    const formattedJobs = jobs.map((job) => ({
      id: job._id,
      companyName: job.company.name,
      roleTitle: job.roleTitle,
      ctcPackage: job.compensation,
      appliedOn: job.createdAt, // or another field if you track application date
      status: "Registered", // Static for now; you can replace with real logic if needed
    }));

    res.status(200).json({ jobs: formattedJobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
