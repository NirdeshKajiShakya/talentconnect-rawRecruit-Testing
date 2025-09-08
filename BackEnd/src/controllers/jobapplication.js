import JobApplication from "../models/JobApplicationModel.js";
import CompanyJob from "../models/manageapplications_jobmodel.js";

export const getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find()
      .populate("job") // joins CompanyJob info
      .sort({ appliedOn: -1 });

    const formatted = applications.map((app) => ({
      company: app.job.company?.name || "",
      roleTitle: app.job.roleTitle,
      ctc: app.job.compensation,
      appliedOn: app.appliedOn,
      status: app.status,
      downloadLink: app.job.attachments?.[0] || "", // assuming first attachment is JD
    }));

    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
};
