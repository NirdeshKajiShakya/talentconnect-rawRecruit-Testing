import mongoose from 'mongoose';

const professionalProfileSchema = new mongoose.Schema({
  about: {
    name: String,
    email: String,
    mobileNumber: String,
    paragraph: String,
  },
  educationalBackground: {
    collegeUniversity: String,
    degree: String,
    yearOfGraduation: Number,
    currentCgpa: Number,
    degreeCertificateUrl: String,
  },
  careerGoals: {
    interestedIndustryType: String,
    interestedJobRoles: [String],
    preferredJobLocations: [String],
    employmentType: [String],
    lookingFor: String,
    currentSalary: String,
    expectedSalary: String,
  },
  jobDetails: {
    jobTitle: String,
    location: String,
    startDate: Date,
    description: String,
  },
  workExperience: [
    {
      companyName: String,
      jobRole: String,
      startDate: Date,
      endDate: Date,
      description: String,
      experienceCertificateUrl: String,
    }
  ],
  internationalWorkExperience: [
    {
      companyName: String,
      jobRole: String,
      startDate: Date,
      endDate: Date,
      description: String,
      experienceCertificateUrl: String,
    }
  ],
  awardsRecognitions: [
    {
      awardTitle: String,
      startDate: Date,
      endDate: Date,
      awardingOrganization: String,
    }
  ],
  leadershipExperience: [
    {
      companyName: String,
      jobRole: String,
      startDate: Date,
      endDate: Date,
      description: String,
      experienceCertificateUrl: String,
    }
  ],
  skills: {
    skillParagraph: String,
    skillList: [String],
  },
  socialProfiles: {
    linkedinUrl: String,
    githubUrl: String,
    portfolioUrl: String,
    resumeUrl: String,
  },
  certificationsUrls: [String],
  language: String,
  profileImageUrl: String,
  backgroundImageUrl: String,
  resumeUrl: String,
}, { timestamps: true });

const ProfessionalProfile = mongoose.model('ProfessionalProfile', professionalProfileSchema);

export default ProfessionalProfile;
