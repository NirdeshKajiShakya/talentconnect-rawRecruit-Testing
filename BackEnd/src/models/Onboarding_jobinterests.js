import mongoose from "mongoose";

const jobPreferenceSchema = new mongoose.Schema(
  {
    industry: String,
    jobRole: String,
    location: String,
    lookingFor: {
      type: String,
      enum: ["Job", "Internship", "Both"],
    },
    employmentType: {
      type: String,
      enum: ["Part time", "Full time", "Contract"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("JobPreference", jobPreferenceSchema);
