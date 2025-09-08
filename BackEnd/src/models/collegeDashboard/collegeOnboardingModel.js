import mongoose from 'mongoose';

const onboardingSchema = new mongoose.Schema({
  userId: { // Add this field
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth', // Assuming you have a User model
    required: true,
    unique: true // A user should only have one college onboarding profile
  },
  collegeUniversityDetails: {
    collegeName: String,
    collegeLocation: String ,
    state: String,
    city: String,
    country: String,
    pincode: String
  },
  placementCoordinatorDetails: {
    coordinatorName: String,
    designation: String,
    officialEmail: String,
    officialMobile: String,
    linkedinUrl: String
  },
  placementRecruitmentDetails: {
    programsOffered: [String],
    popularCoursesForRecruitment: [String],
    preferredHiringCompanies: [String],
    recruitmentServicesRequired: [String],
    collegeBrochureUrl: String
  },
  profileAchievements: {
    collegeWebsite: String,
    linkedinProfile: String
  },
  profileImage :{
     type : String ,
  },
  backgroundImage :{
    type : String ,
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

export default mongoose.model('CollegeOnboarding', onboardingSchema);
