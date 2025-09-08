// to be delete

import mongoose from "mongoose";
import "./studentonboardingmodel.js";

const ApplicationSchema = new mongoose.Schema(
    {
        college: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CollegeOnboarding",
            required: true
        },
        drive: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CampusRegistration",
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

const OnCampusApplication = mongoose.model("OnCampusApplication", ApplicationSchema);
export default OnCampusApplication;