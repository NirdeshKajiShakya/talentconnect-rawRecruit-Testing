import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  companyPosted: { type: mongoose.Schema.Types.ObjectId, ref: "CompanyProfile"  , required: true }, // Reference to the company profile
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
  
}, { timestamps: true
});

const modelName = "CampusRegistration";
const Registration =
  mongoose.models[modelName] ||
  mongoose.model(modelName, registrationSchema, "campus_registrations"); // <- collection name

export default Registration;
