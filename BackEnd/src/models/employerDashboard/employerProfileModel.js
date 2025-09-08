// models/employerProfileModel.js
import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: String,
  email: String,
  userType: String, // admin, recruiter, viewer
  status: String,   // active, pending, inactive
  jobRole: String,
  jobPosts: Number,
  resumeAccess: Boolean
});

const employerProfileSchema = new mongoose.Schema({
  companyName: String,
  description: String,
  companyType: String,
  industryType: String,
  numberOfEmployees: String,
  establishedYear: String,
  contactNumber: String,
  alternateNumber: String,
  companyLocation: String,
  state: String,
  city: String,
  country: String,
  pincode: String,
  companyWebsite: String,
  linkedinProfile: String,
  backgroundImage: String,
  profilePicture: String, // for page 1 of EmployerUsers
  employeeName: String,
  employeeDesignation: String,
  hiringPreferences: {
    jobRoles: [String],
    preferredHiringLocations: [String],
    lookingFor: String,
    employmentType: String,
  },
  companyVerification: {
    verificationDocuments: [String],
    tanNumber: String,
    gstNumber: String,
    companyRegNumber: String,
  },
  teamMembers: [teamMemberSchema] // for page 2 of EmployerUsers
}, {
  timestamps: true
});

const EmployerProfile = mongoose.model('EmployerProfile', employerProfileSchema);
export default EmployerProfile;
