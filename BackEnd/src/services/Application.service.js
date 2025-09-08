import mongoose from 'mongoose';

import Application from '../models/applicationModel.js';

// import OffCampusApplication from '../models/offCampusApplicationModel.js';
// import InternshipApplication from '../models/internshipApplicationModel.js';
// import PoolCampusApplication from '../models/poolcampusApplicationModel.js';
// import OnCampusApplication from '../models/oncampusApplicationModel.js';
// import JobListingApplication from '../models/jobListingApplicationModel.js';

// check if similar application exists
export async function getApplicationService(userId, userType, jobId, jobType) {
    try {
        const response = await Application.find({
            applicant: userId,
            applicantType: userType,
            job: jobId,
            jobType: jobType
        });
        return { success: true, response: response }
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to fetch");
    }
}

export async function getSavedJobsService(userId) {
    try {
        const applications = await Application.aggregate([
            {
                $match: {
                    currentStatus: "Saved",
                    applicant: new mongoose.Types.ObjectId(userId),
                    // applicantType: userType
                }
            },
            {
                $lookup: {
                    from: "jobpostingtables",
                    localField: "job",
                    foreignField: "_id",
                    as: "jobDetails"
                }
            }
        ]);
        return { success: true, data: applications }
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to fetch");
    }
}

// save job by user
export async function saveJobService(userId, userType, jobId, jobType) {
    try {
        const existing = await getApplicationService(userId, userType, jobId, jobType);

        if (existing?.response[0]?.currentStatus === "Applied") {
            return { success: false, message: "Already Applied" };
        }
        else if (existing?.response[0]?.currentStatus === "Saved") {
            return { success: false, message: "Already saved" }
        }
        else {
            const newApplication = new Application({
                applicant: userId,
                applicantType: userType,
                job: jobId,
                jobType: jobType,
                statusHistory: [{ status: "Saved" }],
                currentStatus: "Saved"
            });
            await newApplication.save();
        }
        return { success: true, message: 'Application submited!' };
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to Save");
    }
}

// create application
export async function createApplicationService(userId, userType, jobId, jobType) {
    try {
        const existing = await getApplicationService(userId, userType, jobId, jobType);
        // console.log("existing response: ", existing.response);
        if (existing?.response[0]?.currentStatus === "Shortlisted" || existing?.response[0]?.currentStatus === "Accepted" || existing?.response[0]?.currentStatus === "Rejected") {
            return { success: false, message: `currentStatus: ${existing?.response[0]?.currentStatus}` };
        }
        else if (existing?.response[0]?.currentStatus === "Applied") {
            return { success: false, message: "Already Applied" };
        }
        else if (existing?.response[0]?.currentStatus === "Saved") {
            existing.response[0].currentStatus = "Applied";
            existing.response[0].statusHistory.push({ status: "Applied" });
            await existing.response[0].save();
        }
        else {
            const newApplication = new Application({
                applicant: userId,
                applicantType: userType,
                job: jobId,
                jobType: jobType,
                statusHistory: [{ status: "Applied" }],
                currentStatus: "Applied"
            });
            await newApplication.save();
        }

        return { success: true, message: 'Application submited!' };
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to Save");
    }
}

// getStatus
export async function fetchApplicationStatusService(userId, jobType) {
    try {

        const applicationData = await Application.aggregate([
            {
                $match: {
                    applicant: new mongoose.Types.ObjectId(userId),
                    jobType: jobType
                }
            },
            {
                $lookup: {
                    from: 'jobpostings',
                    localField: 'job',
                    foreignField: '_id',
                    as: 'jobDetails'
                }
            },
            // { $unwind: '$jobDetails' },
            {
                $lookup: {
                    from: 'companyprofiles',
                    localField: 'jobDetails.companyId',
                    foreignField: '_id',
                    as: 'companyDetails'
                }
            },
            // { $unwind: '$companyDetails' },
            // {
            //     $project: {
            //         job: 1,
            //         statusHistory: 1,
            //         currentStatus: 1,
            //         createdAt: 1,
            //         "jobDetails.jobTitle": 1,
            //         "jobDetails._id": 1,
            //         "jobDetails.jobDescription": 1,
            //         "jobDetails.preferredHiringLocation": 1,
            //         "jobDetails.yearsOfExperience": 1,
            //         "companyDetails.companyName": 1, // example field, adjust as needed
            //         "companyDetails.companyDetails": 1 // example field, adjust as needed
            //     }
            // }
        ]);

        return { success: true, data: applicationData };
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to fetch");
    }
}

// job management
// joblisting and offcampus
export async function fetchApplicationsByJobService(jobId, jobType) {
    try {
        const response = await Application.aggregate([
            {
                $match: {
                    job: new mongoose.Types.ObjectId(jobId),
                    jobType: jobType,
                    // currentStatus not equal to "saved"
                    currentStatus: { $ne: "Saved" }
                }
            },
            {
                $lookup: {
                    from: "onboardings",
                    localField: "applicant",
                    foreignField: "_id",
                    as: "applicant"
                }
            },
            {
                $unwind: { path: "$applicant", preserveNullAndEmptyArrays: true }
            },
            {
                $project: {
                    applicant: 1,
                    // job: {
                    //     _id: 1,
                    //     jobTitle: 1
                    // },
                    jobType: 1,
                    statusHistory: 1,
                    currentStatus: 1,
                    createdAt: 1
                }
            }
        ]);
        return { success: true, data: response };
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to fetch");
    }
}

// oncampus and poolcampus
export async function fetchCollegeApplicationsByJobService(jobId, jobType) {
    try {
        const response = await Application.aggregate([
            {
                $match: {
                    job: new mongoose.Types.ObjectId(jobId),
                    jobType: jobType
                }
            },
            {
                $lookup: {
                    from: "collegeonboardings",
                    localField: "applicant",
                    foreignField: "_id",
                    as: "applicant"
                }
            },
            {
                $unwind: { path: "$applicant", preserveNullAndEmptyArrays: true }
            },
            {
                $project: {
                    applicant: 1,
                    // job: {
                    //     _id: 1,
                    //     jobTitle: 1
                    // },
                    // jobType: 1,
                    statusHistory: 1,
                    currentStatus: 1,
                    createdAt: 1
                }
            }
        ]);
        return { success: true, data: response };
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to fetch");
    }
}

// count applications
export async function countApplicationsService(jobId, jobType) {
    try {
        const response = await Application.countDocuments({ job: jobId, jobType: jobType });
        return { success: true, count: response };
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed");
    }
}

// shortlist application
export async function ChangeStatusService(applicationId, newStatus) {
    try {
        const existing = await Application.findById(applicationId);
        // console.log("existing response: ", existing);
        if (existing?.currentStatus === newStatus) {
            return { success: false, msg: `Already ${newStatus}` };
        }
        else if (existing?.currentStatus === "Applied" || existing?.currentStatus === "Shortlisted" || existing?.currentStatus === "Accepted") {
            existing.currentStatus = newStatus;
            existing.statusHistory.push({ status: newStatus });
            await existing.save();
            return { success: true, msg: `status changed to: ${newStatus}` };
        }
        else {
            return { success: false, msg: "Error" };
        }
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed");
    }
}

// candidate
// export async function fetchOffcampusApplicationService(userId) {
//     try {

//         const applicationData = await OffCampusApplication.aggregate([
//             {
//                 $match: {
//                     user: new mongoose.Types.ObjectId(userId)
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'hiringdrives',
//                     localField: 'job',
//                     foreignField: '_id',
//                     as: 'jobDetails'
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'companyprofiles',
//                     localField: 'jobDetails.companyId',
//                     foreignField: '_id',
//                     as: 'companyDetails'
//                 }
//             },
//             {
//                 $project: {
//                     job: 1,
//                     statusHistory: 1,
//                     currentStatus: 1,
//                     createdAt: 1,
//                     "jobDetails.jobRoles": 1,
//                     "jobDetails._id": 1,
//                     "jobDetails.description": 1,
//                     "jobDetails.workLocations": 1,
//                     "jobDetails.workModes": 1,
//                     "jobDetails.yearsOfExperience": 1,
//                     "companyDetails.companyDetails": 1,
//                 }
//             }
//             // {
//             //     $unwind: '$jobDetails'
//             // }
//         ]);

//         // const applicationData = await OffCampusApplication.find({ user: userId })
//         //     .populate('job')
//         //     .populate('$job.companyId')
//         //     .lean();

//         return { success: true, data: applicationData };
//     } catch (error) {
//         console.log("Error: ", error.message);
//         throw new Error("Failed to fetch");
//     }
// }
// export async function fetchJoblistingApplicationService(userId) {
//     try {

//         const applicationData = await JobListingApplication.aggregate([
//             {
//                 $match: {
//                     user: new mongoose.Types.ObjectId(userId)
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'jobpostings',
//                     localField: 'job',
//                     foreignField: '_id',
//                     as: 'jobDetails'
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'companyprofiles',
//                     localField: 'jobDetails.companyId',
//                     foreignField: '_id',
//                     as: 'companyDetails'
//                 }
//             },
//             {
//                 $project: {
//                     job: 1,
//                     statusHistory: 1,
//                     currentStatus: 1,
//                     createdAt: 1,
//                     "jobDetails.jobTitle": 1,
//                     "jobDetails._id": 1,
//                     "jobDetails.jobDescription": 1,
//                     "jobDetails.preferredHiringLocation": 1,
//                     // "jobDetails.workModes": 1,
//                     "jobDetails.yearsOfExperience": 1,
//                     "companyDetails.companyDetails": 1,
//                 }
//             }
//             // {
//             //     $unwind: '$jobDetails'
//             // }
//         ]);

//         return { success: true, data: applicationData };
//     } catch (error) {
//         console.log("Error: ", error.message);
//         throw new Error("Failed to fetch");
//     }
// }
// export async function fetchInternshipApplicationService(userId) {
//     try {

//         const applicationData = await InternshipApplication.aggregate([
//             {
//                 $match: {
//                     user: new mongoose.Types.ObjectId(userId)
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'intern',
//                     localField: 'job',
//                     foreignField: '_id',
//                     as: 'jobDetails'
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'companyprofiles',
//                     localField: 'jobDetails.companyId',
//                     foreignField: '_id',
//                     as: 'companyDetails'
//                 }
//             },
//             // {
//             //     $project: {
//             //         job: 1,
//             //         statusHistory: 1,
//             //         currentStatus: 1,
//             //         createdAt: 1,
//             //         "jobDetails.jobTitle": 1,
//             //         "jobDetails._id": 1,
//             //         "jobDetails.jobDescription": 1,
//             //         "jobDetails.preferredHiringLocation": 1,
//             //         // "jobDetails.workModes": 1,
//             //         "jobDetails.yearsOfExperience": 1,
//             //         "companyDetails.companyDetails": 1,
//             //     }
//             // }
//             // {
//             //     $unwind: '$jobDetails'
//             // }
//         ]);

//         return { success: true, data: applicationData };
//     } catch (error) {
//         console.log("Error: ", error.message);
//         throw new Error("Failed to fetch");
//     }
// }

// export async function createJobListingApplicationService(userId, jobId) {
//     try {
//         const newApplication = new JobListingApplication({
//             user: userId,
//             job: jobId,
//             statusHistory: [{ status: "Applied" }],
//             currentStatus: "Applied"
//         });
//         await newApplication.save();
//         return { success: true, message: 'Application submited!' };
//     } catch (error) {
//         console.log("Error: ", error.message);
//         throw new Error("Failed to Save");
//     }
// }

// export async function fetchShortlistedCandidatesService(jobId) { //offcampus jobs
//     try {
//         const response = await OffCampusApplication.find({ job: jobId, currentStatus: 'Shortlisted' })
//             .populate({
//                 path: 'user',
//                 // select: "name collegeName cgpa resumeUrl"
//             })
//             .populate({
//                 path: 'job',
//                 // select: "title"
//             })
//             .lean();
//         return { success: true, data: response };
//     } catch (error) {
//         console.log("Error: ", error.message);
//         throw new Error("Failed to fetch");
//     }
// }

// getshorlisted candidate by company
export async function fetchCandidatesbyStatus(companyId, targetStatus, applicantType, jobType) {
    // console.log("type: ", companyId, targetStatus, applicantType, jobType);
    try {
        // determine which collection to lookup based on applicantType
        let fromCollection, projectApplicant;

        if (applicantType === "user") {
            fromCollection = "onboardings";
            projectApplicant = {
                cgpa: "$applicantDetails.cgpa",
                college: "$applicantDetails.college",
                name: "$applicantDetails.name"
            };
        } else if (applicantType === "college") {
            fromCollection = "collegeonboardings";
            projectApplicant = {
                college: "$applicantDetails.collegeUniversityDetails"
            };
        } else {
            throw new Error(`Unsupported applicantType: ${applicantType}`);
        }

        const candidates = await Application.aggregate([
            // Lookup job details
            {
                $lookup: {
                    from: "jobpostingtables",
                    localField: "job",
                    foreignField: "_id",
                    as: "jobDetails"
                }
            },
            {
                $match: {
                    "jobDetails.companyPosted": new mongoose.Types.ObjectId(companyId),
                    currentStatus: targetStatus,
                    // applicantType: applicantType,
                    jobType: jobType
                }
            },
            // left-outer join applicant details based on type
            {
                $lookup: {
                    from: fromCollection,
                    localField: "applicant",
                    foreignField: "_id",
                    as: "applicantDetails"
                }
            },
            {
                $unwind: {
                    path: "$applicantDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    currentStatus: 1,
                    statusHistory: 1,
                    jobTitle: "$jobDetails.jobRoles",
                    applicant: projectApplicant
                }
            }
        ]);

        return { success: true, response: candidates };
    } catch (error) {
        console.log("Error in fetchCandidatesbyStatus:", error.message);
        throw new Error("Failed to fetch");
    }
}

// // export async function getAcceptedOnCampusService(companyId) {
// //     try {

// //         const response = await Job.find({ companyPosted: companyId, openingFor: "Oncampus" }, { _id: 1 }).lean();

// //         let acceptedCandidates = [];
// //         for (let i = 0; i < response.length; i++) {
// //             const candidateData = await fetchAcceptedCandidatesService(response[i]._id);
// //             if (candidateData.data.length > 0) acceptedCandidates.push(candidateData);
// //         }

// //         // const result = await Application.aggregate([
// //         //     {
// //         //         $match: {
// //         //             job: mongoose.Types.ObjectId(jobId),
// //         //             currentStatus: "Offer Extended"
// //         //         }
// //         //     },
// //         // {
// //         //     $lookup: {
// //         //         from: "jobs",
// //         //         localField: "job",
// //         //         foreignField: "_id",
// //         //         as: "jobDetails"
// //         //     }
// //         // },
// //         // {
// //         //     $unwind: "$jobDetails"
// //         // },
// //         // {
// //         //     $match: {
// //         //         "jobDetails.jobType": "Oncampus"
// //         //     }
// //         // },
// //         // {
// //         //     $lookup: {
// //         //         from: "StudentOverview",
// //         //         localField: "user",
// //         //         foreignField: "_id",
// //         //         as: "userDetails"
// //         //     }
// //         // },
// //         // {
// //         //     $unwind: "$userDetails"
// //         // }
// //         // ]);

// //         return { success: true, data: acceptedCandidates };
// //     } catch (error) {
// //         console.log("Error: ", error.message);
// //         throw new Error("Failed to fetch");
// //     }
// // }

// // by company - same for getall, shortlisted, accepted candidates
// export async function getOffCampusApplicantsService(query) {
//     try {
//         const response = await OffCampusApplication.find(query)
//             .populate('user')
//             .lean();
//         return { success: true, data: response };
//     } catch (error) {
//         console.log("Error: ", error.message);
//         throw new Error("Failed to fetch");
//     }
// }

// // internship
// export async function checkInternshipExitence(jobId, userId) {
//     try {
//         const response = await InternshipApplication.find({ user: userId, job: jobId });
//         // console.log("res: ", response);
//         if (response?.length > 0) return true;
//     } catch (error) {
//         console.log("Error: ", error.message);
//         throw new Error("Failed to fetch");
//     }
//     return false;
// }

// // by company - same for getall, shortlisted, accepted candidates
// export async function getInternshipApplicantsService(query) {
//     try {
//         const response = await InternshipApplication.find(query)
//             .populate()
//             .lean();
//         return { success: true, data: response };
//     } catch (error) {
//         console.log("Error: ", error.message);
//         throw new Error("Failed to Save");
//     }
// }

// export async function createInternshipApplicationService(userId, jobId) {

//     try {
//         const newApplication = new InternshipApplication({
//             user: userId,
//             job: jobId,
//             statusHistory: [{ status: "Applied" }],
//             currentStatus: "Applied"
//         });
//         await newApplication.save();
//         return { success: true, message: 'Application submited!' };
//     } catch (error) {
//         console.log("Error: ", error.message);
//         throw new Error("Failed to Save");
//     }
// }

// export async function checkPoolCampusApplicationExitence(collegeId, jobId) {
//     try {
//         const response = await PoolCampusApplication.find({ college: collegeId, drive: jobId });
//         // console.log("res: ", response);
//         console.log(response.length);
//         if (response?.length > 0) return true;
//     } catch (error) {
//         console.log("Error: ", error.message);
//         throw new Error("Failed to fetch");
//     }
//     return false;
// }

// export async function poolcampusApplicationService(collegeId, jobId) {
//     try {
//         const newApplication = new PoolCampusApplication({
//             college: collegeId,
//             drive: jobId,
//             statusHistory: [{ status: "Applied" }],
//             currentStatus: "Applied"
//         });
//         await newApplication.save();
//         return { success: true, message: 'Application submited!' };
//     } catch (error) {
//         console.log("Error: ", error.message);
//         throw new Error("Failed to Save");
//     }
// }

// export async function checkOnCampusApplicationExitence(collegeId, jobId) {
//     try {
//         const response = await OnCampusApplication.find({ college: collegeId, drive: jobId });
//         // console.log("res: ", response);
//         console.log(response.length);
//         if (response?.length > 0) return true;
//     } catch (error) {
//         console.log("Error: ", error.message);
//         throw new Error("Failed to fetch");
//     }
//     return false;
// }

// export async function oncampusApplicationService(collegeId, jobId) {
//     try {
//         const newApplication = new OnCampusApplication({
//             college: collegeId,
//             drive: jobId,
//             statusHistory: [{ status: "Applied" }],
//             currentStatus: "Applied"
//         });
//         await newApplication.save();
//         return { success: true, message: 'Application submited!' };
//     } catch (error) {
//         console.log("Error: ", error.message);
//         throw new Error("Failed to Save");
//     }
// }

// export async function getOncampusApplicantsService(query) {
//     try {
//         const response = await OnCampusApplication.find(query)
//             .populate('drive')
//             .lean();
//         return { success: true, data: response };
//     } catch (error) {
//         console.log("Error: ", error.message);
//         throw new Error("Failed to Save");
//     }
// }