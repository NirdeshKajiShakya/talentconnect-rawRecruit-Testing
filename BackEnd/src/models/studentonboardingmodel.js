import mongoose from "mongoose";

const leadershipSchema = new mongoose.Schema({
  organization: String,
  role: String,
  startDate: String,
  endDate: String,
  description: String,
  certificate: String, 
});
const internationalExperienceSchema = new mongoose.Schema({
  country: String,     
  role: String,     
  startDate: String,
  endDate: String, 
  description: String, 
  certificate: String, 

});


const awardSchema = new mongoose.Schema({
  title: String,
  organization: String,
  startDate: String,
  endDate: String,
  description: String,
});


const onboardingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      unique: true, 
    },
    resume: String,
    name: String,
    email: { type: String, required: true },
    phone: { type: String, required: true },
    profileType: {
      type: String,
      enum: ["student", "fresher", "professional"],
      required: true,
    },

    // Education
    college: String,
    degree: String,
    semester: String,
    specialization: String,
    cgpa: String,
    yearOfGraduation: String,
    degreeCertificate: String, 

    
    industry: [String],
    jobRoles: [String],
    locations: [String],
    expectedSalaryCurrency: String,
    expectedSalaryAmount: String,
    currentSalaryCurrency: String,
    currentSalaryAmount: String,
    lookingFor: { type: String, enum: ["Job", "Internship", "Both"] },
    employmentType: {
      type: String,
      enum: ["part time", "full time", "contract"],
    },

   
    experiences: [
      {
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String,
        experienceCertificate: String,
      },
    ],

    leadership: [leadershipSchema],

    internationalExperience: [internationalExperienceSchema],

    awards: [awardSchema],
    skills: [String],
    certifications: String,
    linkedin: String,
    github: String,
    portfolio: String,
    backgroundImage: String,
    profileImage: String,
    project: String,
    referralSource: String,
  },
  { timestamps: true }
);

const OnboardingModel = mongoose.model("Onboarding", onboardingSchema);
export default OnboardingModel;