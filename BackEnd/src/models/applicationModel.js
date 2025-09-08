import mongoose from "mongoose";

// applicationSchema
const ApplicationSchema = new mongoose.Schema(
    {
        applicant: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        applicantType: {
            type: String,
            required: true
        },
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "JobPostingTable",
            required: true
        },
        jobType: {
            type: String,
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

const Application = mongoose.model("Application", ApplicationSchema);
export default Application;