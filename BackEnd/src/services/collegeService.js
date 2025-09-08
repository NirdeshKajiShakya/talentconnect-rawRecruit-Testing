import collegeOnboardingModel from "../models/collegeDashboard/collegeOnboardingModel.js";

export async function getCollegeService(userId) {
    try {
        const college = await collegeOnboardingModel.find({ userId: userId }).lean();
        return { success: true, data: college };
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to fetch");
    }
}