import CompanyOverview from '../models/companyOverviewModel.js';

export async function createProfileService(profileData) {
    try {
        const newProfileData = new CompanyOverview(profileData);
        await newProfileData.save();

        return { success: true, msg: "profile created" };
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to create profile");
    }
}