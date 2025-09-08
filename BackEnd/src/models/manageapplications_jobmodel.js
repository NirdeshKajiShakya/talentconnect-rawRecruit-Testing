import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  company: {
    name: String,
    website: String,
    industry: String,
    hqLocation: String,
  },
  roleTitle: {
    type: String,
    required: true,
  },
  eligibleBranches: {
    type: [String],
    default: [],
  },
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Internship"],
    required: true,
  },
  compensation: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    default: "Multiple Locations",
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  hiringProcess: [
    {
      stepTitle: String,
      description: String,
    },
  ],
  attachments: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Updated model name: CompanyJob
const CompanyJob =
  mongoose.models.CompanyJob || mongoose.model("CompanyJob", jobSchema);

export default CompanyJob;
