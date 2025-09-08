
import mongoose from 'mongoose';
const companyProfileSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth', 
    required: true,
    unique: true 
  },
  employerDetails: {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    workEmail: { type: String, required: true },
    mobile: { type: String },
    linkedIn: { type: String },
   
  },
  companyDetails: {
    companyName: { type: String, required: true },
    description: { type: String },
    companyType: { type: String },
    industryType: { type: String },
    numberOfEmployees: { type: String },
    establishedYear: { type: String },
    companyLinkedin: { type: String },
    websiteUrl: { type: String },
    phoneNumber: { type: String },
    alternatePhoneNumber: { type: String },
    companyLocation: { type: String },
    state: { type: String },
    city: { type: String },
    country: { type: String },
    pincode: { type: String },
    collegeWebsite: {type : String} ,
    linkedinUrl: {type : String},
 
    location: { type: String },
    contactNumber: { type: String },
  },
  hiringPreferences: {
    // Original Fields
    hiringPara: { type: String },
    jobRoles: [{ type: String }],
    hiringLocations: [{ type: String }],
    lookingFor: { type: String, enum: ['job', 'internship', 'both'] },
    employmentType: [{ type: String }], // e.g. part-time, full-time, contract
  
  },

  
  kycDetails: {
    kycDocuments: [{ type: String }], // array of URLs
    TAN: { type: String },
    GSTNumber: { type: String },
    companyRegistrationNumber: { type: String }, // CIN/LLPIN
    kycStatus: { type: String },
    photoVerificationStatus: { type: String },
    aadharNumber: { type: String },
    nameOnAadharCard: { type: String },
    addressLabel: { type: String },
    address: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    pincode: { type: String },
    GSTIN: { type: String }
  },
  
  backgroundImageUrl: { type: String },
  profileImageUrl: {type : String}

}, { timestamps: true });

const CompanyProfile = mongoose.model('CompanyProfile', companyProfileSchema);

export default CompanyProfile;