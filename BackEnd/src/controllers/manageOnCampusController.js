import Job from "../models/jobModels.js";

// POST: Create a new job
export const createJob = async (req, res) => {
  try {
    const { title, employmentType, location, status, deadline, createdBy } =
      req.body;

    // Check if req.user exists, otherwise use createdBy from request body
    const jobCreator = req.user ? req.user.id : createdBy;

    // Validate that we have a createdBy value
    if (!jobCreator) {
      return res.status(400).json({
        success: false,
        message:
          "Creator ID is required. Please provide a createdBy field or ensure authentication.",
      });
    }

    const newJob = await Job.create({
      title,
      employmentType,
      location,
      status,
      deadline,
      createdBy: jobCreator,
    });
    res.status(201).json({ success: true, job: newJob });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET: Fetch all jobs (with search, filter, pagination)
export const getJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", status, createdBy } = req.query;

    // Use query parameter if req.user is not available
    const userId = req.user ? req.user.id : createdBy;

    // Validate that we have a userId to filter by
    if (!userId) {
      return res.status(400).json({
        success: false,
        message:
          "Creator ID is required. Please provide a createdBy query parameter or ensure authentication.",
      });
    }

    const query = { createdBy: userId };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (status) {
      query.status = status;
    }

    const jobs = await Job.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Job.countDocuments(query);

    res.status(200).json({ success: true, jobs, total });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT: Update a job
export const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
      new: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, job: updatedJob });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE: Delete a job
export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST: Duplicate a job
export const duplicateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const newJob = await Job.create({
      title: job.title,
      employmentType: job.employmentType,
      location: job.location,
      status: "Draft", // Always duplicated as Draft
      deadline: job.deadline,
      createdBy: job.createdBy,
    });

    res.status(201).json({ success: true, job: newJob });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET: Get single job details (optional)
export const getJobDetails = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
