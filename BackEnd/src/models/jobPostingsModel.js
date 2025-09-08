import mongoose from "mongoose";

const jobPostingSchema = new mongoose.Schema({
    
    
    companyPosted: { type: mongoose.Schema.Types.ObjectId, ref: "CompanyProfile" }, 
    candidatePosted: { type: mongoose.Schema.Types.ObjectId, ref: "Onboarding" },
    collegePosted: { type: mongoose.Schema.Types.ObjectId, ref: "CollegeOnboarding" },
    jobType :{
        type: String,
        required : true ,
        enum : ["Off-campus" , "On-campus", "Pool-campus" , "Job-posting", "Internship" , "Refferral"]
    },
    visibleTo: {
        type: String,
        enum: ["All", "College", "Company" ],
        default: "All"
    },
    state: { type: String },
    city: { type: String },
    country: { type: String },
    pincode: { type: String },
    degree: [String],
    location: {type: [String], required: true},

    collegeTypes: [{ type: String }], 
    jobTitle: { type: String },
    jobCategory: { type: String},
    venue : { type: String }, 
    jobStatus: {
        type: String,   
        enum: ["Open" , "Closed" , "Pending" ],
        default: "Pending" 
    },
    lookingFor: {
        type: String,
        enum: ["Job", "Internship", "Both"],
    },
    employmentType: {
        type: String,
        enum: ["Part-time", "Full-time", "Contract"],
    },
    workMode: {
        type: String,
        enum: ["Hybrid", "On-site", "Remote"],
    },
    description : { type: String,  },
    jobRoles: [{ type: String }], 
    minPackage:{
        currency: { type: String },
        amount: { type: Number }
    },
    studentStreams: [{ type: String }], 

    startDate: { type: Date,  },
    endDate:{ type: Date },
    rounds: [{ type: String }],
    selectionProcess: [{ type: String }],
    numberOfOpenings: { type: Number },
    numberOfStudent : [{type : String}],
    contactPerson: {
        name: { type: String },
        designation: { type: String },
        email: { type: String},
        mobile: { type: String },
        linkedin: { type: String }
    },
    minEducation: {
        type: String,
    },
    yearsOfExperience: {
        type: String,
    },
    skills: [{ type: String }],
    certifications: [{ type: String }],
    workAuthorization: {
        type: String,
    },
    workAchievements: [{ type: String }],
    minimumStudents: { type: String }, 

}, { timestamps: true });

export const JobPostingTable = mongoose.models.JobPostingTable || mongoose.model("JobPostingTable", jobPostingSchema);