import { response } from "express";
import {
    ChangeStatusService,
    createApplicationService,
    fetchApplicationStatusService,
    fetchApplicationsByJobService,
    fetchCandidatesbyStatus,
    fetchCollegeApplicationsByJobService,

    getApplicationService,
    getSavedJobsService,
    saveJobService,
    // getApplicationService, 
    // getOffCampusApplicantsService, fetchShortlistedCandidates, fetchInternshipApplicationService, fetchApplicationStatusService
} from "../services/applicationService.js";
import { getCollegeEmail, getCollegeService } from "../services/collegeService.js";
import { getCompanyEmail, getCompanyService, getEmployerService } from "../services/companyService.js";
// import { checkJobListingOpportunityService, checkOpportunityService } from "../services/Job.service.js";
import { getCandidatEmail, getStudentService } from "../services/studentService.js";
import sendStatusChangeEmail from "../utils/sendStatusChangeEmail.js";
import sendScheduledInterviewEmail from "../utils/sendScheduledInterviewEmail.js";
// import { getCompanyProfile } from "./CompanyDashboard/companyProfileController.js";

// save opportunity
export async function saveJobByUser(req, res) {
    const { jobId, jobType } = req.body;
    const userId = req.user._id;
    const userType = req.user?.userType;

    try {
        let user;
        switch (userType) {
            case 'student':
                user = await getStudentService(userId);
                break;
            case 'fresher':
                user = await getStudentService(userId);
                break;
            case 'professional':
                user = await getStudentService(userId);
                break;
            case 'college':
                user = await getCollegeService(userId);
                break;
            case 'company':
                user = await getCompanyService(userId);
                break;
            case 'employer':
                user = await getEmployerService(req.user);
                break;
            default:
                break;
        }

        if (!jobId || !user) return res.status(404).json({ msg: "User or Job not found!" });
        // if (await getApplicationService(user.data[0]._id, req.user.userType, jobId, jobType).success === true) return res.status(403).json({ msg: "Already Applied" });

        const application = await saveJobService(user?.data[0]._id, userType, jobId, jobType);
        if (application.success === false) return res.status(403).json({ msg: application.message });
        res.status(201).json(application);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// get saved opportunities
export async function fetchSavedJobs(req, res) {
    // const { applicantType } = req.params;
    const userId = req.user._id;
    const userType = req.user.userType;

    try {
        let user;
        switch (userType) {
            case 'student':
            case 'fresher':
            case 'professional':
                user = await getStudentService(userId)
                break;
            case 'college':
                user = await getCollegeService(userId)
                break;
            case 'company':
                user = await getCompanyService(userId)
                break;
            default:
                break;
        }

        if (!userType || !user) return res.status(404).json({ msg: "User not found!" });

        const application = await getSavedJobsService(user?.data[0]._id);
        // if (application.success !== true) return res.status(403).json({ msg: application });
        if (application.success === true) return res.status(200).json(application.data);
        res.status(503).json(application);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// apply for opportunity

// offcampus
export async function createOffcampusApplication(req, res) {
    const { jobId } = req.body;
    const userId = req.user._id;

    try {
        const user = await getStudentService(userId);

        // if (!userId || !jobId) return res.status(404).json({ msg: "Fields missing" });
        if (!jobId || !user) return res.status(404).json({ msg: "User or Job not found!" });

        const application = await createApplicationService(user.data[0]._id, req.user.userType, jobId, "Off-campus");
        if (application.success === false) return res.status(403).json({ msg: application.message });

        res.status(201).json(application);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// joblisting
export async function createJobListingApplication(req, res) {
    const { jobId } = req.body;
    const userId = req.user._id;

    if (!userId || !jobId) return res.status(404).json({ msg: "Fields missing" });

    try {
        const user = await getStudentService(userId);

        if (!jobId || !user) return res.status(404).json({ msg: "User or Job not found!" });

        const application = await createApplicationService(user.data[0]._id, req.user.userType, jobId, "Job-listing");
        if (application.success === false) return res.status(403).json({ msg: application.message });

        res.status(201).json(application);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// internship
export async function createIntershipApplication(req, res) {
    const { internshipId } = req.body;
    const userId = req.user._id;

    try {
        // to get userId from user database
        const user = await getStudentService(userId);

        if (!user || !internshipId) return res.status(404).json({ msg: "Invalid" });

        const application = await createApplicationService(user.data[0]._id, req.user.userType, internshipId, "Internship");
        if (application.success === false) return res.status(403).json({ msg: application.message });

        res.status(201).json(application);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// referral
export async function createReferralApplication(req, res) {
    const { referralId } = req.body;
    const userId = req.user._id;

    try {
        // to get userId from user database
        const user = await getStudentService(userId);
        console.log(user, " ", referralId);
        if (!user || !referralId) return res.status(404).json({ msg: "Invalid" });

        const application = await createApplicationService(user.data[0]._id, req.user.userType, referralId, "Referral");
        if (application.success === false) return res.status(403).json({ msg: application.message });

        res.status(201).json(application);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// oncampus
export async function createOncampusApplication(req, res) {
    const { jobId } = req.body;
    const userId = req.user._id;
    const userType = req.user?.userType;

    try {
        let user;
        switch (userType) {
            case 'college':
                user = await getCollegeService(userId);
                break;
            case 'company':
                user = await getCompanyService(userId);
                break;
            case 'employer':
                user = await getEmployerService(req.user);
                break;
            default:
                break;
        }
        if (user.data.length == 0 || !user || !jobId) return res.status(404).json({ msg: "User or job not found!" });

        const application = await createApplicationService(user.data[0]._id, req.user.userType, jobId, "On-campus");
        if (application.success === false) return res.status(403).json({ msg: application.message });

        res.status(201).json(application);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// poolcampus
export async function createPoolcampusApplication(req, res) {
    const { jobId } = req.body;
    const userId = req.user._id;
    const userType = req.user?.userType;

    try {
        let user;
        switch (userType) {
            case 'college':
                user = await getCollegeService(userId);
                break;
            case 'company':
                user = await getCompanyService(userId);
                break;
            case 'employer':
                user = await getEmployerService(req.user);
                break;
                
            default:
                break;
        }
        if (user.data.length == 0 || !user || !jobId) return res.status(404).json({ msg: "User or job not found!" });
        // if (await getApplicationService(user.data[0]._id, req.user.userType, jobId, "Pool-campus") === true) return res.status(403).json({ msg: "Already Applied" });

        const application = await createApplicationService(user.data[0]._id, req.user.userType, jobId, "Pool-campus");
        if (application.success === false) return res.status(403).json({ msg: application.message });

        res.status(201).json(application);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// campus-internship
export async function createCampusInternshipApplication(req, res) {
    const { jobId } = req.body;
    const userId = req.user._id;

    try {
        // to get collegeId from college database
        const user = await getCollegeService(userId);

        if (!user || !jobId) return res.status(404).json({ msg: "Invalid" });
        if (await getApplicationService(user.data[0]._id, req.user.userType, jobId, "Internship") === true) return res.status(403).json({ msg: "Already Applied" });

        const application = await createApplicationService(user.data[0]._id, req.user.userType, jobId, "Internship");
        if (application.success === false) return res.status(403).json(application);

        res.status(201).json(application);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// get application details by candidate
export async function getUserApplicationStatus(req, res) {
    const userId = req.user._id;
    const userType = req.user.userType;
    const { jobType } = req.params;

    try {
        let user;
        switch (userType) {
            case 'college':
                user = await getCollegeService(userId);
                break;
            case 'company':
                user = await getCompanyService(userId);
                break;
            case 'student':
            case 'fresher':
            case 'professional':
                user = await getStudentService(userId);
                break;
            default:
                break;
        }

        if (!user || !jobType) return res.status(404).json({ error: "invalid user or job" });

        const response = await fetchApplicationStatusService(user.data[0]._id, jobType, userType);
        // console.log(response);

        if (response.success) res.status(200).json(response);
        else res.status(404).json(response);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ Error: "Internal server error" });
    }
}

// action by company
// offcampus and joblisting
export async function getApplicationsByJob(req, res) {
    const { jobId, jobType, targetStatus } = req.query;
    if (!jobId || !jobType) return res.status(404).json({ msg: "Job not found!" });

    try {
        const response = await fetchApplicationsByJobService(jobId, jobType, targetStatus);

        // to be implement -- sorting feature like ATS

        res.status(200).json(response.data);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ Error: "Internal server error" });
    }
}

// oncampus and poolcampus
export async function getCollegeApplicationsByJob(req, res) {
    const { jobId, jobType, targetStatus } = req.query;
    const userType = req.user.userType;
    if (!jobId || !jobType || !targetStatus) return res.status(404).json({ msg: "Job not found with given criteria!" });

    try {
        const response = await fetchCollegeApplicationsByJobService(jobId, jobType, userType, targetStatus);

        // to be implement -- sorting feature like ATS

        res.status(200).json(response.data);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ Error: "Internal server error" });
    }
}

// shortlist/accept candidate/college
export async function shortlistApplicant(req, res) {
    const { applicationId } = req.params;
    const { jobRole } = req.body;
    if (!applicationId) return res.status(404).json({ msg: "Application not found!" });
    try {
        const response = await ChangeStatusService(applicationId, "Shortlisted");

        if (response.success === true) {
            // service -> send mail to candidate
            let applicantMail;
            switch (response.data.applicantType) {
                case ('student'):
                case ('fresher'):
                case ('professional'):
                    applicantMail = await getCandidatEmail(response.data.applicant);
                    break;
                case ('college'):
                    applicantMail = await getCollegeEmail(response.data.applicant);
                    break;
                case ('company'):
                    applicantMail = await getCompanyEmail(response.data.applicant);
                    break;
                default:
                    break;
            }
            if (applicantMail.success) {
                sendStatusChangeEmail(applicantMail.email, response.data.currentStatus, response.data._id, jobRole, /*companyName*/);  // should make this function async but nonblocking
            }

            return res.status(200).json(response);
        }
        return res.status(404).json(response);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ Error: "Internal server error" });
    }
}

// shortList applicant of company by college
export async function shortlistApplicantForCompany(req, res) {
    const { applicationId } = req.params;
    const { jobRole } = req.body;
    if (!applicationId) return res.status(404).json({ msg: "Application not found!" });
    try {
        const response = await ChangeStatusService(applicationId, "Shortlisted");

        if (response.success === true) {
            // service -> send mail to company
            const companyMail = await getCompanyService(response.data.applicant);
            const companyData = companyMail.data ? companyMail.data[0] : null;
            const workEmail = companyData?.employerDetails?.workEmail;

            if (companyMail.success && workEmail) {
                sendStatusChangeEmail(
                    workEmail,
                    response.data.currentStatus,
                    response.data._id,
                    jobRole
                );
            }

            return res.status(200).json(response);
        }
        return res.status(404).json(response);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ Error: "Internal server error" });
    }
}

export async function rejectApplicant(req, res) {
    const { applicationId } = req.params;
    const { jobRole } = req.body;
    if (!applicationId) return res.status(404).json({ msg: "Application not found!" });
    try {
        const response = await ChangeStatusService(applicationId, "Rejected");

        if (response.success === true) {
            // service -> send mail to candidate
            let applicantMail;
            switch (response.data.applicantType) {
                case ('student'):
                case ('fresher'):
                case ('professional'):
                    applicantMail = await getCandidatEmail(response.data.applicant);
                    break;
                case ('college'):
                    applicantMail = await getCollegeEmail(response.data.applicant);
                    break;
                case ('company'):
                    applicantMail = await getCompanyEmail(response.data.applicant);
                    break;
                case ('employer'):
                    applicantMail = await getCompanyEmail(response.data.applicant);
                    break;
                default:
                    break;
            }
            if (applicantMail.success) {
                sendStatusChangeEmail(applicantMail.email, response.data.currentStatus, response.data._id, jobRole, /*companyName*/);  // should make this function async but nonblocking
            }

            return res.status(200).json(response);
        }
        return res.status(404).json(response);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ Error: "Internal server error" });
    }
}

// New backend function for college rejecting company applications
export async function rejectCompanyApplicationByCollege(req, res) {
    const { applicationId } = req.params;
    const { jobRole } = req.body;

    if (!applicationId) return res.status(404).json({ msg: "Application not found!" });

    try {
        const response = await ChangeStatusService(applicationId, "Rejected");

        if (response.success === true) {
            // For college rejecting company, we need to send email to the COMPANY
            const companyMail = await getCompanyService(response.data.applicant);
            const companyData = companyMail.data ? companyMail.data[0] : null;
            const workEmail = companyData?.employerDetails?.workEmail;

            console.log("Company work email for rejection:", workEmail);

            if (companyMail.success && workEmail) {
                sendStatusChangeEmail(
                    workEmail,
                    response.data.currentStatus,
                    response.data._id,
                    jobRole
                );
            }

            return res.status(200).json(response);
        }

        return res.status(404).json(response);
    } catch (error) {
        console.log("Error in rejectCompanyApplicationByCollege: ", error);
        res.status(500).json({ Error: "Internal server error" });
    }
}

export async function acceptApplicant(req, res) {
    const { applicationId } = req.params;
    const { jobRole } = req.body;
    if (!applicationId) return res.status(404).json({ msg: "Application not found!" });
    try {
        const response = await ChangeStatusService(applicationId, "Accepted");

        if (response.success === true) {
            // service -> send mail to candidate
            let applicantMail;
            switch (response.data.applicantType) {
                case ('student'):
                case ('fresher'):
                case ('professional'):
                    applicantMail = await getCandidatEmail(response.data.applicant);
                    break;
                case ('college'):
                    applicantMail = await getCollegeEmail(response.data.applicant);
                    break;
                case ('company'):
                    applicantMail = await getCompanyEmail(response.data.applicant);
                    break;
                default:
                    break;
            }
            if (applicantMail.success) {
                sendStatusChangeEmail(applicantMail.email, response.data.currentStatus, response.data._id, jobRole, /*companyName*/);  // should make this function async but nonblocking
            }

            return res.status(200).json(response);
        }
        return res.status(404).json(response);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ Error: "Internal server error" });
    }
}

// getAllshortlistedcandidates
export async function getShortlistedCandidatesByCompany(req, res) {
    const companyId = req.user._id;
     const userType = req.user?.userType;

    const { applicantType, jobType } = req.query;

    if (!applicantType || !jobType) return res.status(404).json({ msg: "Applicant not defined!" });

    try {
        let profileId ;
        switch(userType){
            case 'company':
                const company = await getCompanyService(companyId);
                if (!company || !company.success || company.data.length === 0) {
                    return res.status(404).json({ msg: "Company profile not found!" });
                }
                profileId = company.data[0]._id;
            break;
            case 'employer':
                const employer = await getEmployerService(req.user) ;
                if (!employer || !employer.success || employer.data.length === 0) {
                    return res.status(404).json({ msg: employer.msg || "Employer profile not found!" });
                }
                profileId = employer.data[0]._id;
                break;
            default:
                return res.status(403).json({ msg: "This user type cannot access this resource." });
            }    

        
      
    const response = await fetchCandidatesbyStatus(profileId, "Shortlisted", applicantType, jobType, "companyPosted");
        // console.log(response);
        res.status(200).json(response);

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ Error: "Internal server error" });
    }
}

// get shortlist comapny for the college 
export async function getShortlistedCompaniesForCollege(req, res) {
    const collegeId = req.user.id;
    const { applicantType, jobType } = req.query;
    if (!applicantType || !jobType) return res.status(404).json({ msg: "Applicant not defined!" });
    try {
        const college = await getCollegeService(collegeId);
        if (!college) return res.status(404).json({ msg: "college not found!" });
    const response = await fetchCandidatesbyStatus(college.data[0]._id, "Shortlisted", applicantType, jobType, "collegePosted");
        res.status(200).json(response);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ Error: "Internal Server error" });
    }
}

// getAllAcceptedcandidates
export async function getAcceptedCandidatesByCompany(req, res) {
    const companyId = req.user._id;
    const { applicantType, jobType } = req.query;
    if (!applicantType || !jobType) return res.status(404).json({ msg: "Applicant not defined!" });

    try {
        const company = await getEmployerService(companyId);
        if (!company) return res.status(404).json({ msg: "company not found!" });
    const response = await fetchCandidatesbyStatus(company.data[0]._id, "Accepted", applicantType, jobType, "companyPosted");
        // console.log(response);
        res.status(200).json(response);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ Error: "Internal server error" });
    }
}

// schdule Interview
export async function scheduleInterview(req, res) {
    const companyId = req.user._id;
    const { applicantId, applicantType, jobRole } = req.body;
    const { date, time, meetLink, message } = req.body.data;
    console.log("data", applicantId, applicantType, date, meetLink, jobRole);
    if (!date || !time || !meetLink || !jobRole) return res.status(404).json({ msg: "required fields missing" });

    try {
        const company = await getCompanyService(companyId);
        if (!company) return res.status(404).json({ msg: "company not found!" });

        if (company.success === true) {
            const companyName = company.data[0].companyDetails.companyName;
            let applicantMail;
            switch (applicantType) {
                case ('student'):
                case ('fresher'):
                case ('professional'):
                    applicantMail = await getCandidatEmail(applicantId);
                    break;
                case ('college'):
                    applicantMail = await getCollegeEmail(applicantId);
                    break;
                case ('company'):
                    applicantMail = await getCompanyEmail(applicantId);
                    break;
                default:
                    return res.status(404).json({ msg: "Invalid User!" });
            }
            const response = await sendScheduledInterviewEmail(applicantMail.email, date, time, message, meetLink, jobRole, companyName);
            res.status(200).json({ success: true, msg: "Interview Scheduled!" });
        }
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ Error: "Internal server error" });
    }
}