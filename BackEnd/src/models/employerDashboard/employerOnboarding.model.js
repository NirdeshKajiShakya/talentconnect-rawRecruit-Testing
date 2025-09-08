import mongoose from 'mongoose';

const employerOnboardingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth',
    required: true,
    unique: true,
  },

  employerDetails: {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    workEmail: { type: String, required: true },
    mobile: { type: String, required: true },
    linkedIn: { type: String },
    profileImageUrl: { type: String },
    backgroundImageUrl: { type: String },
  },

  companyDetails: {
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    state: { type: String },
    city: { type: String },
    country: { type: String },
    pincode: { type: String },
    companyType: { type: String },
    industryType: { type: String },
    establishedYear: { type: String },
    contactNumber: { type: String },
  },

  hiringPreferences: {
    jobRoles: [{ type: String }],
    hiringLocations: [{ type: String }],
    lookingFor: { type: String, enum: ['Job', 'Internship', 'Both'] },
    employmentTypes: [{ type: String, enum: ['Part-time', 'Full-time', 'Contract'] }],
  },
}, { timestamps: true });

export default mongoose.model('EmployerOnboarding', employerOnboardingSchema);
