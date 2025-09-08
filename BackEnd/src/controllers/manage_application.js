import CompanyJob from "../models/manageapplications_jobmodel.js";

// Create a new job
export const createJob = async (req, res) => {
  try {
    const job = new CompanyJob(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all jobs for UI listing
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await CompanyJob.find();

    const formattedJobs = jobs.map((job) => ({
      id: job._id,
      companyName: job.company.name,
      role: job.roleTitle,
      ctc: job.compensation,
      appliedOn: new Date(job.createdAt).toDateString(), // Format it for display
      status: "Registered", // static for now
      // Add more if needed:
      jobType: job.jobType,
      jobLocation: job.jobLocation,
      attachments: job.attachments,
    }));

    res.status(200).json({ jobs: formattedJobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get a single job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Update a job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Delete a job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
