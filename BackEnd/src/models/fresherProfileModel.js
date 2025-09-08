import mongoose from 'mongoose';

const fresherProfileSchema = new mongoose.Schema({
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
    degreeCertificateUrl: String,
  },
  careerGoals: {
    interestedIndustryType: String,
    interestedJobRoles: [String],
    preferredJobLocations: [String],
    lookingFor: String,
    employmentType: [String],
    expectedSalary: String,
  },
  internshipTrainings: [
    {
      companyName: String,
      jobRole: String,
      startDate: Date,
      endDate: Date,
      description: String,
    },
  ],
  jobDetails: {
    jobTitle: String,
    location: String,
    startDate: Date,
    description: String,
  },
  skills: {
    skillList: [String],
    skillParagraph: String,
  },
  socialProfiles: {
    linkedinUrl: String,
    githubUrl: String,
    websiteUrl: String,
    resumeUrl: String,
  },
  certificationsUrls: [String],
  language: String,
  profileImageUrl: String,
  backgroundImageUrl: String,
  resumeUrl: String,
}, { timestamps: true });

export default mongoose.model('FresherProfile', fresherProfileSchema);
