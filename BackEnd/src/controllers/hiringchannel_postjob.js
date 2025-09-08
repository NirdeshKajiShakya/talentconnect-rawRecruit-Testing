import CompanyProfile from "../models/companyDashboard/companyProfileModel.js";
import JobPosting from "../models/HiringChannels_postjob.js";

export const createJob = async (req, res) => {
  const companyId = req.user._id;
  try {
    const company = await CompanyProfile.find({ userId: companyId }).lean();
    if (!company) return res.status(404).json({ msg: "company not found!" });
    const jobData = req.body;
    jobData.companyId = company[0]._id;

    // Validate required fields
    const requiredFields = [
      "jobTitle",
      "employmentType",
      "jobDescription",
      "preferredHiringLocation",
      "monthlySalary",
      "numberOfOpenings",
      "skills",
    ];
    const missingFields = requiredFields.filter((field) => !jobData[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const newJob = new JobPosting(jobData);
    await newJob.save();

    // console.log("Job saved successfully:", savedJob);
    res.status(201).json({ success: true, message: "Job created!" });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await JobPosting.find();
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, job });
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const deletedJob = await JobPosting.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, message: "Job deleted" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
