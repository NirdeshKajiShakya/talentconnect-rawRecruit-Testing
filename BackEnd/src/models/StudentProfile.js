// src/models/StudentProfile.js
import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema({
  about: {
    name: String,
    gmail: String,
    mobileNumber: String,
    aboutParagraph: String,
  },
  educationalBackground: {
    collegeUniversity: String,
    degree: String,
    branch: String,
    passingYear: Number,
    cgpa: Number,
    degreeCertificateUrl: String, // optional file URL
  },
  careerGoals: {
    interestedIndustryType: { type: String, enum: ['IT Industry'] },
    interestedJobRoles: [{ type: String, enum: ['Software Engineer', 'Data Analyst'] }],
    preferredJobLocations: [{ type: String, enum: ['noida', 'delhi', 'gurgaon', 'bangalore', 'pune', 'mumbai', 'hyderabad'] }],
    lookingFor: { type: String, enum: ['job', 'internship', 'both'] },
    employmentType: [{ type: String, enum: ['full-time', 'part-time', 'contract', 'remote'] }],
  },
  skills: [String],
  socialProfiles: {
    linkedinUrl: String,
    githubUrl: String,
    portfolioUrl: String,
    resumeUrl: String,
  },
  certificationsUrls: [String],
  profileImageUrl: String,
  backgroundImageUrl: String,
  resumeUrl: String,
}, { timestamps: true });

const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);
export default StudentProfile;
