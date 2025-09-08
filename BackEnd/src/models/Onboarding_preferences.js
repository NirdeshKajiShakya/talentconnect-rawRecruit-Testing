import mongoose from "mongoose";

const preferencesSchema = new mongoose.Schema({
  industries: [String],
  roles: [String],
  locations: [String],
  jobType: String,
  employmentType: String,
});

export default mongoose.model("Preferences", preferencesSchema);
