import OnboardingModel from '../models/studentonboardingmodel.js'

export async function getStudentService(studentId) {
    try {
        const StudentData = await OnboardingModel.find({ userId: studentId });
        return { success: true, data: StudentData };
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to fetch");
    }
}

export async function checkStudentService(studentId) {
    try {
        const student = await OnboardingModel.exists({ userId: studentId });
        // console.log(student);
        if (student) return true;
        return false;

    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Failed to fetch");
    }
}