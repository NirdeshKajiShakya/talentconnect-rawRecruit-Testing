import HiringDrive from "../models/HiringChannelOffCampusRegister.js";
import Intern from "../models/HiringChannels_postinternships.js";
import { JobPostingTable } from "../models/jobPostingsModel.js";

// create by company
// export async function createOpportunityService(jobData, companyId) {
//     jobData.companyPosted = companyId;
//     try {
//         const newJob = new Job(jobData);
//         await newJob.save();
//         return { success: true, message: 'Job Created!' };
//     } catch (error) {
//         console.log("Error: ", error.message);
//         throw new Error("Failed to create job");
//     }
// }

// update opportunity by company

// fetch jobs
export async function fetchOpportunityService(query) {
    try {
        const response = await JobPostingTable.find(query)
            .populate({
                path: 'companyPosted',
                select: 'companyDetails'
            })
            .lean();

        // cal status
        const now = Date.now();
        const newResponse = response.map(item => {
            const start = new Date(item.hiringStartDate).getTime();
            const end = new Date(item.hiringEndDate).getTime();

            return {
                ...item,
                status: now >= start && now <= end ? 'Open' : 'Closed'
            };
        });

        return { success: true, data: newResponse };
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to fetch");
    }
}

export async function fetchJobListingOpportunityService(query) {
    try {
        // const response = await Job.find(query).populate('Company');
        const response = await JobPostingTable.find(query)
            .populate({
                path: 'companyPosted',
                select: 'companyDetails'
            })
            .lean();

        // cal status
        const now = Date.now();
        const newResponse = response.map(item => {
            const start = new Date(item.hiringStartDate).getTime();
            const end = new Date(item.hiringEndDate).getTime();

            return {
                ...item,
                status: now >= start && now <= end ? 'Open' : 'Closed'
            };
        });

        return { success: true, data: newResponse };
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to fetch");
    }
}

// fetch internship
export async function fetchInternshipService(yearsOfExperience) {
    try {
        // const response = await Job.find(query).populate('Company');
        // const response = await Intern.find(query)
        //     .populate({
        //         path: 'companyId',
        //         select: 'companyDetails'
        //     })
        //     .lean();

        // cal status
        // const now = Date.now();
        // const newResponse = response.map(item => {
        //     const start = new Date(item.hiringStartDate).getTime();
        //     const end = new Date(item.hiringEndDate).getTime();

        //     return {
        //         ...item,
        //         status: now >= start && now <= end ? 'Open' : 'Closed'
        //     };
        // });

        const response = await Intern.find({
            $expr: {
                $and: [
                    {
                        $lte: [
                            { $toInt: { $arrayElemAt: [{ $split: ["$yearsOfExperience", "-"] }, 0] } },
                            yearsOfExperience
                        ]
                    },
                    {
                        $gte: [
                            { $toInt: { $arrayElemAt: [{ $split: ["$yearsOfExperience", "-"] }, 1] } },
                            yearsOfExperience
                        ]
                    }
                ]
            }
        });

        // console.log("Internship, ", response)

        return { success: true, data: response };
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to fetch");
    }
}

// offcampus
export async function checkOpportunityService(jobId) {

    try {
        const response = await HiringDrive.exists({ _id: jobId });
        if (response) return true;
        return false;
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to fetch");
    }
}

export async function checkJobListingOpportunityService(jobId) {

    try {
        const response = await JobPostingTable.exists({ _id: jobId });
        if (response) return true;
        return false;
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to fetch");
    }
}

export async function fetchInternshipByIdService(Id) {
    try {
        const response = await JobPostingTable.findById(Id)
            .populate({
                path: 'companyPosted',
                select: 'companyDetails'
            })
            .lean();
        return { success: true, data: response };
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to fetch");
    }
}