import { JobPostingTable } from '../models/jobPostingsModel.js';

export const createPostingService = async (postingData) => {
    try {
        const newPosting = new JobPostingTable(postingData);
        console.log("New Posting Data:", newPosting);
        const savedPosting = await newPosting.save();
        console.log("Saved Posting Data:", savedPosting);
        return savedPosting;
    } catch (error) {

        console.error("Error in createPostingService:", error.message);
        throw error;
    }
};


export const getJobPostingsByJobTypeService = async (jobType) => {
    try {
        const postings = await JobPostingTable.find({ jobType }).populate('companyPosted')
        .sort({ createdAt: -1 });

        const currentDate = new Date();
        const updatedPostings = postings.map(posting => {
            let status = posting.jobStatus;

            // Check and update status based on dates
            if (posting.startDate && posting.endDate) {
                const startDate = new Date(posting.startDate);
                const endDate = new Date(posting.endDate);

                if (currentDate < startDate) {
                    status = "Pending";
                } else if (currentDate >= startDate && currentDate <= endDate) {
                    status = "Open";
                } else if (currentDate > endDate) {
                    status = "Closed";
                }
            }

            return {
                ...posting.toObject(),
                jobStatus: status
            };
        });
        console.log("Updated Postings:", updatedPostings);
        return updatedPostings;
    } catch (error) {
        console.error("Error in getJobPostingsByJobTypeService:", error.message);
        throw error;
    }
};



export const getJobPostingsByCollegeService = async (jobType) => {
    try {
        const postings = await JobPostingTable.find({ jobType }).populate('collegePosted');

        const currentDate = new Date();
        const updatedPostings = postings.map(posting => {
            let status = posting.jobStatus;

            // Check and update status based on dates
            if (posting.startDate && posting.endDate) {
                const startDate = new Date(posting.startDate);
                const endDate = new Date(posting.endDate);

                if (currentDate < startDate) {
                    status = "Pending";
                } else if (currentDate >= startDate && currentDate <= endDate) {
                    status = "Open";
                } else if (currentDate > endDate) {
                    status = "Closed";
                }
            }

            return {
                ...posting.toObject(),
                jobStatus: status
            };
        });
        console.log("Updated Postings:", updatedPostings);
        return updatedPostings;
    } catch (error) {
        console.error("Error in getJobPostingsByJobTypeService:", error.message);
        throw error;
    }
};



// export const getJobPostingsByCollegeService = async (jobType) => {
//     try {
//         const postings = await JobPostingTable.find({ jobType }).populate('collegePosted');

//         const currentDate = new Date();
//         const updatedPostings = postings.map(posting => {
//             let status = posting.jobStatus;

//             // Check and update status based on dates
//             if (posting.startDate && posting.endDate) {
//                 const startDate = new Date(posting.startDate);
//                 const endDate = new Date(posting.endDate);

//                 if (currentDate < startDate) {
//                     status = "Pending";
//                 } else if (currentDate >= startDate && currentDate <= endDate) {
//                     status = "Open";
//                 } else if (currentDate > endDate) {
//                     status = "Closed";
//                 }
//             }

//             return {
//                 ...posting.toObject(),
//                 jobStatus: status
//             };
//         });
//         console.log("Updated Postings:", updatedPostings);
//         return updatedPostings;
//     } catch (error) {
//         console.error("Error in getJobPostingsByJobTypeService:", error.message);
//         throw error;
//     }
// };

export const getJobPostedByCompanyService = async (companyId, jobType) => {
    try {
        const response = await JobPostingTable.find({ companyPosted: companyId, jobType: jobType }).lean();
        // console.log(response);
        return { success: true, response: response };
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to fetch");
    }
}



export const deleteJobByIdService = async (jobId,companyId) => {
    try {
        const response = await JobPostingTable.findOneAndDelete({ _id: jobId, companyPosted: companyId });
        // console.log(response);
        return { success: true, msg: "Job Deleted" };
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to fetch");
    }
}