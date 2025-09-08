import mongoose from "mongoose";

const onDemandSchema = new mongoose.Schema({
  numberOfEmployees: {
    type: [String],
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  trainingMode: {
    type: String,
    enum: ["Virtual", "Classroom"],
    required: true,
  },
  evaluation: {
    type: String,
    enum: ["Examination", "Project"],
    required: true,
  },
  duration: {
    type: [String],
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

// 👇 Explicitly set collection name to "employer_branding"
const Employeerbranding = mongoose.model(
  "Employeerbranding",
  onDemandSchema,
  "employer_branding"
);

export default Employeerbranding;
