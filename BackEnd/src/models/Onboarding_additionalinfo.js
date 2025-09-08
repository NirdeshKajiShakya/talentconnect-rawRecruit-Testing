import mongoose from "mongoose";

const additionalInfoSchema = new mongoose.Schema({
  skills: [String],
  certifications: String,
  linkedin: String,
  github: String,
  portfolio: String,
  projectUrl: String,
  referralSource: String,
});

export default mongoose.model("AdditionalInfo", additionalInfoSchema);
