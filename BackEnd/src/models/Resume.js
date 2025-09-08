import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },

        // parsed details
        skills: [
            {
                type: String,
            },
        ],
        interestedJobRoles: [
            {
                type: String,
            },
        ],
        interestedIndustry: {
            type: String,
        },
        preferredJobLocations: [
            {
                type: String,
            },
        ],
        yearsOfExperience: String
    },
    { timestamps: true }
);

const Resume = mongoose.model("Resume", JobSchema);
export default Resume;