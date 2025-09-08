import mongoose from 'mongoose';

const collegeProfileSchema = new mongoose.Schema({
  coordinatorName: String,
  designation: String,

  collegeDetails: {
    para: String,
    collegeUniversityName: String,
    establishedYear: String,
    collegeWebsiteUrl: String,
    phoneNumber: String,
    alternatePhoneNumber: String,
    collegeLocation: String,
    state: String,
    city: String,
    country: String,
    pincode: String,
    collegeImageUrl: String,
    backgroundImageUrl: String
  },
   
  placementCoordinatorDetails: {
    para: String,
    coordinatorName: String,
    coordinatorImageUrl: String,
    designation: String,
    officialEmailId: String,
    officialContactNumber: String,
    linkedinProfile: String
  },

  placementAndRecruitmentDetails: {
    para: String,
    programsOffered: [String],
    popularCoursesForRecruitment: [String],
    preferredHiringCompanies: [String],
    recruitmentServicesRequired: [String],
    collegeBrochureUrl: String
  },

  collegeProfileAchievements: {
    collegeWebsite: String,
    linkedinProfile: String
  },

  workshops: [
    {
      workshopName: String,
      startDate: Date,
      endDate: Date,
      description: String
    }
  ],

  volunteering: [
    {
      eventName: String,
      startDate: Date,
      endDate: Date,
      description: String
    }
  ],

  awards: [
    {
      awardTitle: String,
      startDate: Date,
      endDate: Date,
      awardingOrganization: String
    }
  ]
}, { timestamps: true });

export default mongoose.model('CollegeProfile', collegeProfileSchema);
