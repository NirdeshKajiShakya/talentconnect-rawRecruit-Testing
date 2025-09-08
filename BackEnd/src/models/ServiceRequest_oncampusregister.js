import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  degree: [String],
  preferredLocations: [String],
  lookingFor: String,
  employmentType: String,
  minimumSalary: String,
  startDate: String,
  endDate: String,
  rounds: [String],
  selectionProcess: [String],
  contactPerson: String,
  contactDesignation: String,
  email: String,
  mobile: String,
  linkedin: String,
  minimumStudents: [String],
});

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;
