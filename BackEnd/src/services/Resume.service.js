import Resume from "../models/Resume.js";

export async function saveParsedResumeService(resumeData) {
    try {
        const newResume = new Resume(resumeData);
        await newResume.save();
        return { success: true, message: "Resume saved!" }
    } catch (error) {
        console.log(error);
        throw new Error("Failed to save resume");
    }
}

export async function fetchAllResumeService(experience) {
    try {
        // will replace by based on prefered job role
        const response = await Resume.find({yearsOfExperience:experience});
        // console.log(response);
        return { success: true, data: response }
    } catch (error) {
        console.log(error);
        throw new Error("Failed: ", error);
    }
}