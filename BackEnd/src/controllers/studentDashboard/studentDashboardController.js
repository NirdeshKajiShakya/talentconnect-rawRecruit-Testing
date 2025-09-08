import { getJobPostingsByCollegeService, getJobPostingsByJobTypeService } from "../../services/jobPostingService.js";
import CompanyProfile from "../../models/companyDashboard/companyProfileModel.js";
import { JobPostingTable } from "../../models/jobPostingsModel.js";
import OnboardingModel from "../../models/studentonboardingmodel.js";


const sendResponse = (res, statusCode, data) => res.status(statusCode).json(data);
const sendError = (res, statusCode, message) => res.status(statusCode).json({ message });


export const getOffCampusPostings = async (req, res) => {
    try {
        const postings = await getJobPostingsByJobTypeService("Off-campus");
        sendResponse(res, 200, { data: postings });
    } catch (error) {
        sendError(res, 500, "Internal server error");
    }
};

export const getOnCampusPostings = async (req, res) => {
    try {
        const postings = await getJobPostingsByJobTypeService("On-campus");
        sendResponse(res, 200, { data: postings });
    } catch (error) {
        sendError(res, 500, "Internal server error");
    }
};

export const getOnCampusPostingsForCompany = async (req, res) => {
    try {
        // Get all on-campus postings using the existing service
        const postings = await getJobPostingsByCollegeService("On-campus");
        
        // Filter the results to include only those visible to "Company"
        const filteredPostings = postings.filter(
            (posting) => posting.visibleTo === "Company"
        );

        sendResponse(res, 200, { data: filteredPostings });
    } catch (error) {
        console.error("Error in getOnCampusPostingsForCompany:", error.message);
        sendError(res, 500, "Internal server error");
    }
};
export const getOnCampusPostingForCompanybyID = async (req, res) => {
    const { id } = req.params;
    console.log("Fetching On-campus posting for Company by ID:", id);
    try {
        console.log("Fetching posting with ID:", id);
        const response = await JobPostingTable.findById(id)
            .populate({ path: 'collegePosted', select: 'collegeUniversityDetails profileImage profileAchievements' }).lean();
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};          

export const getOnCampusPostingsForCollege = async (req, res) => {
    try {
      
        const postings = await getJobPostingsByJobTypeService("On-campus");
       
        const filteredPostings = postings.filter(
            (posting) => posting.visibleTo === "College"
        );

        sendResponse(res, 200, { data: filteredPostings });
    } catch (error) {
        console.error("Error in getOnCampusPostingsForCollege:", error.message);
        sendError(res, 500, "Internal server error");
    }
};

export const getOnCampusPostingForCollegebyID = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await JobPostingTable.findById(id)
      .populate({
        path: 'companyPosted',
        select: 'companyDetails profileImage hiringPreferences',
      })
      .lean();

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// export const getPoolCampusPostingsForCollege = async (req, res) => {
//     try {       
//         const postings = await getJobPostingsByJobTypeService("Pool-campus");
        
//         const filteredPostings = postings.filter(
//             (posting) => posting.visibleTo === "College"
//         );

//         sendResponse(res, 200, { data: filteredPostings });
//     } catch (error) {
//         console.error("Error in getPoolCampusPostingsForCollege:", error.message);  
//         sendError(res, 500, "Internal server error");
//     }
// }



// export const getPoolCampusPostings = async (req, res) => {
//     try {
//         const postings = await getJobPostingsByJobTypeService("Pool-campus");
//         sendResponse(res, 200, { data: postings });
//     } catch (error) {
//         sendError(res, 500, "Internal server error");
//     }
// };

export const getPoolCampusForCollege = async (req, res) => { 
   try {
    const response = await JobPostingTable.find({ 
     jobType: "Pool-campus",
     visibleTo: "College"
    })
     .populate({
       path: 'companyPosted',
       select: 'companyDetails profileImage',
     })
     .lean()
     .sort({ createdAt: -1 });

 res.status(200).json({ success: true, data: response });

} catch (err) {
 console.error(err);
 res.status(500).json({ error: err.message });
 }
};

export const getPoolCampusJobByIdForCollege = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await JobPostingTable.findById(id)
      .populate({
        path: 'companyPosted',
        select: 'companyDetails profileImage hiringPreferences',
      })
      .lean();
    res.status(200).json(response);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

export const getPoolCampusForCompany = async(req, res) =>{
    try{
        const response = await JobPostingTable.find({
            jobType: "Pool-campus",
            visibleTo: "Company"
        })
        .populate({ path: 'collegePosted', select: 'collegeUniversityDetails profileImage profileAchievements' })
        .lean() 
        .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: response });    
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: err.message });

    }    
}

export const getPoolCampusJobByIdForCompany = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await JobPostingTable.findById(id)
            .populate({path: 'collegePosted', select: 'collegeUniversityDetails profileImage profileAchievements'})
            .lean();
        res.status(200).json(response);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

export const getJobPostings = async (req, res) => {
    try {
        const postings = await getJobPostingsByJobTypeService("Job-posting");
        sendResponse(res, 200, { data: postings });
    } catch (error) {
        sendError(res, 500, "Internal server error");
    }
};

export const getInternshipPostings = async (req, res) => {
    try {
        const postings = await getJobPostingsByJobTypeService("Internship");
        sendResponse(res, 200, { data: postings });
    } catch (error) {
        sendError(res, 500, "Internal server error");
    }
};

export const getIntershipById = async (req , res) =>{
    const{id} = req.params ;
    try{
        const response = await JobPostingTable.findById(id)
        .populate('companyPosted')
        .lean();
        res.status(200).json(response);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: err.message });
    }    
}

export const getReferralJobs = async(req, res) => {
    try{
    
        const userId = req.user._id ;
        const postId = await OnboardingModel.findOne({userId})

        const candidatePostedId = postId._id ;
       
        const response = await JobPostingTable.find({
            jobType: "Refferral",
            candidatePosted: { $ne: candidatePostedId }
        })
        .lean() 
        .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: response });    
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: err.message });

    }    
}

export const getReferralJobById = async(req, res) =>{
      const { id } = req.params;
    try {
        const response = await JobPostingTable.findById(id)
            .populate('candidatePosted')
            .lean();
        res.status(200).json(response);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}