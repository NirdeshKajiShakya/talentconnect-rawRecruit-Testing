 import HiringDrive from "../models/hiringChannelOffCampusRegisterModel.js";
import {JobPostingTable} from "../models/jobPostingsModel.js"
import mongoose from "mongoose";

export async function getOffCampusJobsService(companyId) {
    try {
        const response = await HiringDrive.find({ companyId: companyId }, {
            // custom fields
        }).lean();
        return { success: true, data: response };
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to create profile");
    }
}

// export const getJobPostedByCollegeService = async (collegeId, jobType) => {
//     try {
//         const response = await JobPostingTable.find({ collegePosted: collegeId, jobType: jobType }).lean();
//         // console.log(response);
//         return { success: true, response: response };
//     } catch (error) {
//         console.log("Error: ", error.message);
//         throw new Error("Failed to fetch");
//     }
// }
export const getJobPostedByCollegeService = async (collegeId, jobType) => {
    try {
        
        const response = await JobPostingTable.aggregate([
            {
                $match: {
                    collegePosted: new mongoose.Types.ObjectId(collegeId),
                    jobType: jobType
                }
            },
            {
        
                $lookup: {
                    from: "applications",
                    localField: "_id",    
                    foreignField: "job",    
                    as: "jobApplications"  
                }
            },
            {
                $addFields: {
                    applicationCount: { $size: "$jobApplications" }
                }
            },
            {
                $project: {
                    jobApplications: 0
                }
            }
        ]);

        return { success: true, response: response };
    } catch (error) {
        console.log("Error in getJobPostedByCollegeService: ", error.message);
        throw new Error("Failed to fetch jobs with application counts");
    }
}