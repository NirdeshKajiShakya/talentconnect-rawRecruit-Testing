import { createPostingService } from "../services/jobPostingService.js"
import CompanyProfile from "../models/companyDashboard/companyProfileModel.js";
import collegeOnboardingModel from "../models/collegeDashboard/collegeOnboardingModel.js";
import OnboardingModel from "../models/studentonboardingmodel.js";


const sendResponse = (res, statusCode, data) => res.status(statusCode).json(data);
const sendError = (res, statusCode, message) => res.status(statusCode).json({ message });


export const createOffCampusJobPosting = async (req, res) => {
   
    try{
       const userId = req.user._id;
   
       const companyPostedId = await CompanyProfile.findOne({ userId });
   
       if (!companyPostedId) {
         return res.status(404).json({ error: "Company profile not found" });
       }
   
       const postingData ={
           ...req.body,
           companyPosted: companyPostedId._id,
           jobType: "Off-campus",
       }
       
       const newPosting = await createPostingService(postingData);
       if (!newPosting) {
         return sendError(res, 500, "Failed to create job posting");
       }
       sendResponse(res, 201, { message: "Off-campus posting created successfully!", data: newPosting });
    }
    catch (error) {
        console.error("Error in createOffCampusJobPosting:", error.message);
        sendError(res, 500, "Internal server error");
    }
};

export const createOnCampusPosting = async (req, res) => {
    try {
        const userId = req.user._id;

        const companyPostedId = await CompanyProfile.findOne({ userId });            
        if (!companyPostedId) {
            return res.status(404).json({ error: "Company profile not found" });
        }

        const postingData = {
            ...req.body,
            companyPosted: companyPostedId._id,
            jobType: "On-campus",
            visibleTo: "College", // Default visibility, can be changed based on requirements

            
        };

        const newPosting = await createPostingService(postingData);
        if (!newPosting) {
            return sendError(res, 500, "Failed to create job posting");
        }
        sendResponse(res, 201, { message: "On-campus posting created successfully!", data: newPosting });
    }
    catch (error) {
        console.error("Error in createOnCampusPosting:", error.message);
        sendError(res, 500, "Internal server error");
    }
}

// college Request 
export const createOnCampusCollegeRequest = async (req, res) => {
   
    try {
        const userId = req.user._id;
        console.log("User ID milega bhai :", userId);
        const collegeProfile = await collegeOnboardingModel.findOne({ userId });
        if (!collegeProfile) {
            return res.status(404).json({ error: "College profile not found" });
        }   
        const postingData = {
            ...req.body,
            collegePosted: collegeProfile._id,
            jobType: "On-campus",
            visibleTo: "Company", // Default visibility for college requests
        };  
        const newPosting = await createPostingService(postingData);
        if (!newPosting) {
            return sendError(res, 500, "Failed to create job posting");
        }
        sendResponse(res, 201, { message: "On-campus college request created successfully!", data: newPosting });
        
    } catch (error) {
        console.error("Error in createOnCampusCollegeRequest:", error.message);
        sendError(res, 500, "Internal server error");
    }

}
// colege Request for Pool Campus
export const createPoolCampusCollegeRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const companyPostedId = await collegeOnboardingModel.findOne({ userId });
        if (!companyPostedId) {
            return res.status(404).json({ error: "College profile not found" });
        }
        const postingData = {
            ...req.body,
            collegePosted: companyPostedId._id,
            jobType: "Pool-campus",
            visibleTo: "Company", // Default visibility for college requests
        };
        const newPosting = await createPostingService(postingData);
        if (!newPosting) {
            return sendError(res, 500, "Failed to create job posting");
        }
        sendResponse(res, 201, { message: "Pool-campus college request created successfully!", data: newPosting });
    } catch (error) {
        console.error("Error in createPoolCampusCollegeRequest:", error.message);
        sendError(res, 500, "Internal server error");
    }
}

export const createPoolCampusPosting = async (req, res) => {
    try {
        const userId = req.user._id;

        const companyPostedId = await CompanyProfile.findOne({ userId });            
        if (!companyPostedId) {
            return res.status(404).json({ error: "Company profile not found" });
        }
        const postingData = {
            ...req.body,
            companyPosted: companyPostedId._id,
            jobType: "Pool-campus",
            visibleTo: "College", 
             
        };
        const newPosting = await createPostingService(postingData);
        if (!newPosting) {
            return sendError(res, 500, "Failed to create job posting");
        }
        sendResponse(res, 201, { message: "Pool-campus posting created successfully!", data: newPosting });
    }
    catch (error) {
        console.error("Error in createPoolCampusPosting:", error.message);
        sendError(res, 500, "Internal server error");
    }
}


export const createJobPosting = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log("User ID:", userId);
        const companyPostedId = await CompanyProfile.findOne({ userId });
        if (!companyPostedId) {
            return res.status(404).json({ error: "Company profile not found" });
        }       
        const postingData = {
            ...req.body,
            companyPosted: companyPostedId._id,
            jobType: "Job-posting",
        };
        const newPosting = await createPostingService(postingData);
        if (!newPosting) {
            return sendError(res, 500, "Failed to create job posting");
        }
        sendResponse(res, 201, { message: "Job posting created successfully!", data: newPosting });
    }       
    catch (error) {
        console.error("Error in createJobPosting:", error.message);
        sendError(res, 500, "Internal server error");
    }
}


export const createInternshipPosting = async (req, res) => {
    try {
        const userId = req.user._id;

        const companyPostedId = await CompanyProfile.findOne({ userId });
        if (!companyPostedId) {
            return res.status(404).json({ error: "Company profile not found" });
        }
        const postingData = {
            ...req.body,
            companyPosted: companyPostedId._id,
            jobType: "Internship",
        };
        const newPosting = await createPostingService(postingData);
        if (!newPosting) {
            return sendError(res, 500, "Failed to create internship posting");
        }

        sendResponse(res, 201, { message: "Internship posting created successfully!", data: newPosting });
    } catch (error) {
        console.error("Error in createInternshipPosting:", error.message);
        sendError(res, 500, "Internal server error");
    }
}

export const createRefferralPosting = async (req, res) =>{
    try{
        const userId = req.user._id;

        const companyPostedId = await OnboardingModel.findOne({ userId });
        if (!companyPostedId) {
            return res.status(404).json({ error: "User profile not found" });
        }   
        const postingData = {
            ...req.body,
            candidatePosted: companyPostedId._id,
            jobType: "Refferral",
        };
        const newPosting = await createPostingService(postingData);
        if (!newPosting) {
            return sendError(res, 500, "Failed to create referral posting");
        }
        sendResponse(res, 201, { message: "Referral posting created successfully!", data: newPosting });

    }
    catch (error) {
        console.error("Error in createRefferralPosting:", error.message);
        sendError(res, 500, "Internal server error");
    }
    
}

