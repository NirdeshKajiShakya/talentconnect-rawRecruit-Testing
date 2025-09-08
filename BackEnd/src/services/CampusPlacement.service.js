import CampusPlacement from "../models/CampusPlacement.js";

export async function campusPlacementRegistrationService(campusData) {
    try {
        const newRegistration = new CampusPlacement(campusData);
        await newRegistration.save();

        return { success: true, message: "Campus Placement registration successful" };

    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to register");
    }
}

export async function getCollegesService() {
    try {
        const response = await CampusPlacement.find({}, { degree: 1, collegeName: 1, collegeLocation: 1 }).lean();
        return { success: true, data: response };
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to fetch");
    }
}

export async function getCollegeDetailService(campusId) {
    try {
        const response = await CampusPlacement.findById(campusId).populate({
            path:"campusId",
            // select:""
        }).lean();
        return { success: true, data: response };
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to fetch");
    }
}