import CompanyProfile from "../models/companyDashboard/companyProfileModel.js" ;
import { getJobPostedByCollegeService } from "../services/jobManagementService.js";

import collegeOnboardingModel from "../models/collegeDashboard/collegeOnboardingModel.js"

export const getCollegePostedJobs = async (req, res) => {
    const collegeId = req.user._id;
    const { jobType } = req.params;
    if (!jobType) return res.status(404).json({ msg: "job not found!" });
    // console.log("companyid: ", companyId);   
    try {
        const collegeProfile = await collegeOnboardingModel.findOne({ userId: collegeId });
        if (!collegeProfile) {
            return res.status(404).json({ error: "Company profile not found" });
        }

        const response = await getJobPostedByCollegeService(collegeProfile._id, jobType);
        // console.log(response);
        res.status(200).json(response);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ msg: "Internal server error!" });
    }
}

