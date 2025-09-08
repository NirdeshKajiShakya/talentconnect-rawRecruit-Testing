import mongoose from "mongoose";
import "./studentonboardingmodel.js";

const ApplicationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Onboarding",
            required: true
        },
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Intern",
            required: true
        },
        statusHistory: [
            {
                status: {
                    type: String,
                    // enum: [
                    //     "Applied",
                    //     "Application Sent",
                    //     "Awaiting Recruiter Action",
                    //     "Rejected",
                    //     "Shortlisted",
                    //     "Interview Scheduled",
                    //     "Offer Extended",
                    // ],
                    required: true
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        currentStatus: {
            type: String,
            // enum: [
            //     "Applied",
            //     "Application Sent",
            //     "Awaiting Recruiter Action",
            //     "Shortlisted",
            //     "Interview Scheduled",
            //     "Offer Extended",
            //     "Rejected"
            // ],
            default: "Applied"
        }
    },
    { timestamps: true }
);

const InternshipApplication = mongoose.model("InternshipApplication", ApplicationSchema);
export default InternshipApplication;