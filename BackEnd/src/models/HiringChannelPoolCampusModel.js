// models/poolCampusHiringModel.js
import mongoose from 'mongoose';

const poolCampusHiringSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyProfile', required: true },  
  venue: { type: String, required: true }, // Pool Campus Hiring Venue
  collegeTypes: [{ type: String }],        // Type of College
  studentStreams: [{ type: String }],      // Student Stream / Degree
  criteria: { type: String },

  minPackage: {
    currency: { type: String },
    amount: { type: Number }
  },

  workLocations: [{ type: String }],
  jobRoles: [{ type: String }],
  workMode: { type: String, enum: ['Hybrid', 'On-site', 'Remote'] },
  employmentType: { type: String, enum: ['Part-time', 'Full-time', 'Contract'] },

  placementStartDate: { type: Date },
  placementEndDate: { type: Date },

  numberOfRounds: [{ type: String }],
  selectionProcess: [{ type: String }],

  contactPerson: {
    name: { type: String },
    designation: { type: String },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    linkedin: { type: String }
  },

  minStudents: { type: String }, // e.g., "1-5", "10+", etc.

}, { timestamps: true });

const PoolCampusHiring = mongoose.model('PoolCampusHiring', poolCampusHiringSchema);
export default PoolCampusHiring;
