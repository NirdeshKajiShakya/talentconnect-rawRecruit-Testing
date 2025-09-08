// to be delete

import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
    {
        college: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "College",
            required: true
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CompanyOverview",
            required: true
        },
        statusHistory: [
            {
                status: {
                    type: String,
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
            default: "Applied"
        }
    },
    { timestamps: true }
);

const CollegeApplication = mongoose.model("CollegeApplication", ApplicationSchema);
export default CollegeApplication;