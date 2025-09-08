import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    employmentType: {
      type: String,
      enum: ["Full-time", "Internship"],
      required: true,
    },
    location: { type: String, required: true },
    status: { type: String, enum: ["Published", "Draft"], default: "Draft" },
    deadline: { type: Date, required: true },
    views: { type: Number, default: 0 },
    applications: { type: Number, default: 0 },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
const Job = mongoose.models.Job || mongoose.model("Job", jobSchema); // use singular
export default Job;
