// import { getOffCampusJobsService } from "../services/jobManagementService.js";
// import { getOffCampusApplicantsService } from "../services/Application.service.js";
import CompanyProfile from "../models/companyDashboard/companyProfileModel.js";
import { deleteJobByIdService, getJobPostedByCompanyService } from "../services/jobPostingService.js";

// all jobs posted by company
export const getPostedJobs = async (req, res) => {
    const companyId = req.user._id;
    const { jobType } = req.params;
    if (!jobType) return res.status(404).json({ msg: "job not found!" });
    // console.log("companyid: ", companyId);   
    try {
        const companyProfile = await CompanyProfile.findOne({ userId: companyId });
        if (!companyProfile) {
            return res.status(404).json({ error: "Company profile not found" });
        }

        const response = await getJobPostedByCompanyService(companyProfile._id, jobType);
        // console.log(response);
        res.status(200).json(response);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ msg: "Internal server error!" });
    }
}

export const deleteJob = async (req, res) => {
    const { jobId } = req.params;
    const companyId = req.user._id;
    // if (!jobType) return res.status(404).json({ msg: "job not found!" });
    // console.log("companyid: ", companyId);   
    try {
        const companyProfile = await CompanyProfile.findOne({ userId: companyId });
        if (!companyProfile) return res.status(404).json({ error: "Company profile not found" });

        const response = await deleteJobByIdService(jobId, companyProfile._id);
        if (response.success === true) return res.status(200).json(response.msg);

        // after this from application table clear all application for this job

        res.status(400).json("Bad request!")
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ msg: "Internal server error!" });
    }
}


// export const getOffcampusJobApplicants = async (req, res) => {
//     const { jobId } = req.params;
//     if (!jobId) return res.status(404).json({ msg: "Job not found!" });

//     const query = {};
//     query.job = jobId;

//     try {
//         const response = await getOffCampusApplicantsService(query);
//         res.status(200).json(response);
//     } catch (error) {
//         console.log("Error: ", error);
//         res.status(500).json({ msg: "Internal server error!" });
//     }
// }

// export const getShortlistedOffcampusJobApplicants = async (req, res) => {
//     const { jobId } = req.params;
//     if (!jobId) return res.status(404).json({ msg: "Job not found!" });

//     const query = {};
//     query.job = jobId;
//     query.currentStatus = "Shortlisted";

//     try {
//         const response = await getOffCampusApplicantsService(query);
//         res.status(200).json(response);
//     } catch (error) {
//         console.log("Error: ", error);
//         res.status(500).json({ msg: "Internal server error!" });
//     }
// }