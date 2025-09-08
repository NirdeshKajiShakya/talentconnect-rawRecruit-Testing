import mongoose from "mongoose";

const offCampusRegisterSchema = new mongoose.Schema({
  venue: String,
  degree: [String],
  criteria: String,
  package: {
    amount: Number,
    currency: String,
  },
  workLocation: [String],
  jobRoles: [String],
  mode: String,
  employmentType: [String],
  placementStartDate: String,
  placementEndDate: String,
  numberOfRounds: [String],
  processOfSelection: [String],
  contactPerson: {
    name: String,
    designation: String,
    email: String,
    mobile: String,
    linkedin: String,
  },
  minimumStudents: [String],
});

const OffCampusRegister = mongoose.model(
  "OffCampusRegister",
  offCampusRegisterSchema
);
export default OffCampusRegister;
