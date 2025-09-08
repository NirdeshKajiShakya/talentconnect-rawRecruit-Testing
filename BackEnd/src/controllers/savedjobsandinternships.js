import Job from "../models/SavedJobsandInternships.js";

export const getSavedJobsAndInternships = async (req, res) => {
  try {
    const savedJobsAndInternships = await Job.find({});
    if (!savedJobsAndInternships) {
      return res
        .status(404)
        .json({ message: "No saved jobs or internships found" });
    }
    return res.status(200).json(savedJobsAndInternships);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
