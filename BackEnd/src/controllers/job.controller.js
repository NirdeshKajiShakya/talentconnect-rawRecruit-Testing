import { fetchInternshipByIdService, fetchInternshipService, fetchJobListingOpportunityService, fetchOpportunityService } from "../services/Job.service.js";
import { getStudentService } from "../services/Student.service.js";

// export async function createJob(req, res) {
//     // link path: only allowed to company (middleware implemetation)

//     try {
//         const response = await createOpportunityService(req.body, req.params.companyId);
//         res.status(201).json(response);
//     } catch (error) {
//         res.status(500).json({ error: "Internal server error" });
//     }
// }

export async function fetchOnCampusOpportunities(req, res) {
    // link path: only allowed to college (middleware implemetation)

    const query = {};
    query.openingFor = "Oncampus";

    try {
        const response = await fetchOpportunityService(query);
        if (response.success) res.status(200).json({ data: response.data });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function fetchInternshipOpportunities(req, res) {
    const userType = req.user.userType;
    // console.log("usertype: ", userType)
    // const { openingFor } = req.query;

    // const query = {};
    // if (openingFor) query.openingFor = openingFor;
    // else query.openingFor = 'Offcampus'
    // query.yearsOfExperience=yearsOfExperience;

    let yearsOfExperience;
    if (userType === 'student' || userType === 'fresher') yearsOfExperience = 0;
    else if (userType === 'professional') yearsOfExperience = 1;
    else return res.status(403).json({ msg: "Invalid user" });

    try {
        const response = await fetchInternshipService(yearsOfExperience);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function findOffcampusOpportunityById(req, res) {
    const jobId = req.params.jobId;

    const query = {};
    query._id = jobId;
    try {
        const response = await fetchOpportunityService(query);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}
export async function findJobListingOpportunityById(req, res) {
    const jobId = req.params.jobId;

    const query = {};
    query._id = jobId;
    try {
        const response = await fetchJobListingOpportunityService(query);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function findOpportunityById(req, res) {
    const internshipId = req.params.jobId;

    try {
        const response = await fetchInternshipByIdService(internshipId);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}