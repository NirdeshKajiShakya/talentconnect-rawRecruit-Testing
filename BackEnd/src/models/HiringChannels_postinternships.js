// models/HiringChannels_postjob.js
import mongoose from "mongoose";
const jobSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyProfile', required: true },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract"],
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    preferredHiringLocation: {
      type: String,
      required: true,
    },
    numberOfOpenings: {
      type: Number,
      required: true,
    },
    monthlySalary: {
      type: Number,
      required: true,
    },
    salaryCurrency: {
      type: String,
      default: "USD",
    },
    jobDescription: {
      type: String,
      required: true,
    },
    minimumEducation: String,
    preferredFieldOfStudy: String,
    yearsOfExperience: String,
    skills: {
      type: [String],
      required: true,
    },
    certifications: [String],
    workAuthorization: String,
  },
  {
    timestamps: true,
    collection: "intern", // Changed collection name to jobpostings
  }
);

// Create and export the model with a unique name to avoid conflicts
const Intern = mongoose.model("intern", jobSchema);
export default Intern;
