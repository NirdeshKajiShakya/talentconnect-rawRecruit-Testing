import Job from "../models/ServiceRequest_referraljobs.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      employmentType,
      numberOfOpenings,
      locations,
      selectionCriteria,
      salary,
    } = req.body;

    const job = new Job({
      title,
      description,
      employmentType,
      numberOfOpenings,
      locations: Array.isArray(locations) ? locations : [locations],
      selectionCriteria: {
        educationLevel: selectionCriteria?.educationLevel,
        fieldOfStudy: selectionCriteria?.fieldOfStudy,
        experience: selectionCriteria?.experience,
        skills: Array.isArray(selectionCriteria?.skills)
          ? selectionCriteria.skills
          : [selectionCriteria?.skills],
        certifications: Array.isArray(selectionCriteria?.certifications)
          ? selectionCriteria.certifications
          : [selectionCriteria?.certifications],
        workAuth: selectionCriteria?.workAuth,
      },
      salary: {
        amount: salary?.amount,
        currency: salary?.currency,
        type: salary?.type,
      },
    });

    await job.save();
    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
