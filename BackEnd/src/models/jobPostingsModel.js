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
    // jobStatus: {
    //     type: String,   
    //     enum: ["Open" , "Closed" , "Pending" ],
    //     default: "Pending" 
    // },
    lookingFor: {
        type: String,
        enum: ["Job", "Internship", "Both"],
    },
    employmentType: {
        type: [String],
        enum: ["Part-time", "Full-time", "Contract"],
    },
    workMode: {
        type: [String],
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
    noOfplacedStudents : {type : String} ,
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

    internshipDuration: { type: String },

    eligibilityCriteria: { 
        type: String 
    },
    amenitiesRequired: [{ 
        type: String 
    }],
     benefits: [{ 
        type: String 
    }],

}, { timestamps: true });

// Add a virtual property for jobStatus
jobPostingSchema.virtual('jobStatus').get(function() {
    const now = new Date();
    const startDate = this.startDate ? new Date(this.startDate) : null;
    const endDate = this.endDate ? new Date(this.endDate) : null;

    if (!startDate || !endDate) {
        return 'Pending'; // Default status if dates are missing
    }
    
    // Set both dates to start of the day to compare only the date
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    
    if (today < start) {
        return 'Pending';
    } else if (today >= start && today <= end) {
        return 'Open';
    } else {
        return 'Closed';
    }
});

// Ensure virtuals are included when converting to JSON
jobPostingSchema.set('toJSON', { virtuals: true });
jobPostingSchema.set('toObject', { virtuals: true });

export const JobPostingTable = mongoose.models.JobPostingTable || mongoose.model("JobPostingTable", jobPostingSchema);