import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    company: String,
    jobRole: String,
    startDate: String,
    endDate: String,
    description: String,
    experienceCertificate: { type: String, default: '' }
});

const awardSchema = new mongoose.Schema({
    awardTitle: String,
    startDate: String,
    endDate: String,
    awardingOrganization: String
});

const educationSchema = new mongoose.Schema({
    degree: String,
    currentCgpa: String,
    collegeName: String,
    passingOutYear: String,
    degreeCertificate: { type: String, default: '' }
});

const jobDetailSchema = new mongoose.Schema({
    jobTitle: String,
    location: String,
    startingDate: String,
    description: String
});

const professionalProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    name: String,
    email: String,
    profileImage: String,
    backgroundImage: String,
    linkedinUrl: String,
    githubUrl: String,
    portfolioUrl: String,
    resume: String,
    education: educationSchema,
    about: String,
    mobileNumber: String,
    skills: [String],
    interestedIndustryType: String,
    interestedJobRoles: [String],
    jobDetails: jobDetailSchema,
    preferredJobLocations: [String],
    currentSalary: String,
    expectedSalary: String,
    lookingFor: String,
    employmentType: String,
    languages: [String],
    workExperience: [experienceSchema],
    internationalExperience: [experienceSchema],
    awardsRecognitions: [awardSchema],
    leadershipExperience: [experienceSchema],
    skillsDescription: String,
    certificationsUrl: [String]
}, { timestamps: true });

export default mongoose.model('ProfessionalProfile', professionalProfileSchema);