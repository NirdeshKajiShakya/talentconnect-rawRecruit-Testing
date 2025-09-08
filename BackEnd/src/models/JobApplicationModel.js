// to be delete

import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyJob",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming user model exists
    required: true,
  },
  status: {
    type: String,
    enum: ["Registered", "Shortlisted", "Rejected"],
    default: "Registered",
  },
  appliedOn: {
    type: Date,
    default: Date.now,
  },
});

const JobApplication =
  mongoose.models.JobApplication ||
  mongoose.model("JobApplication", jobApplicationSchema);

export default JobApplication;
