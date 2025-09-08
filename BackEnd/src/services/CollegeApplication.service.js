import '../models/College.js';

import CollegeApplication from "../models/CollegeApplication.js";

export async function AcceptCampusRequestService(companyId, collegeId) {

    try {
        const newApplication = new CollegeApplication({
            college: collegeId,
            company: companyId,
            statusHistory: [{ status: "Applied" }],
            currentStatus: "Applied"
        });
        await newApplication.save();
        return { success: true, message: 'Application submited!' };
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to Save");
    }
}

export async function getAcceptedCampusRequestService(companyId) {

    try {
        const applications = await CollegeApplication.find({ company: companyId }).populate('college').lean();
        return { success: true, data: applications };
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to Save");
    }
}