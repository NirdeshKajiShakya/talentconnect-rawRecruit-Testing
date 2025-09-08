// models/HiringDrive.js
import mongoose from "mongoose";


const HiringDriveSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyProfile', required: true },
  offCampusVenue: { type: String, required: true },
  studentStreams: [{ type: String, required: true }],
  criteria: { type: String },
  minPackage: {
    currency: { type: String, default: 'INR' },
    amount: { type: Number }
  },
  workLocations: [{ type: String }],
  jobRoles: [{ type: String }],
  workModes: [{ type: String, enum: ['Hybrid', 'On-site', 'Remote'] }],
  employmentTypes: [{ type: String, enum: ['Full-time', 'Part-time', 'Contract'] }],
  hiringStartDate: { type: Date },
  hiringEndDate: { type: Date },
  numberOfRounds: [{ type: String }],
  selectionProcess: [{ type: String }],
  contactPerson: {
    name: { type: String },
    designation: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    linkedin: { type: String }
  },
  minStudentsToBeHired: { type: Number }
}, { timestamps: true });

const HiringDrive = mongoose.model('HiringDrive', HiringDriveSchema);
export default HiringDrive;
