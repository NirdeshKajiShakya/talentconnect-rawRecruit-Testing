import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  employmentType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract"],
    required: true,
  },
  numberOfOpenings: { type: Number, required: true },
  locations: {
    type: [String],
    required: true,
    validate: [
      (val) => val.length > 0,
      "At least one location must be provided",
    ],
  },
  selectionCriteria: {
    educationLevel: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    experience: { type: Number, required: true },
    skills: [String],
    certifications: [String],
    workAuth: String,
  },
  salary: {
    amount: { type: Number, required: true },
    currency: { type: String },
    type: { type: String, enum: ["Monthly", "Annual"] },
  },
});

const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);
export default Job;
