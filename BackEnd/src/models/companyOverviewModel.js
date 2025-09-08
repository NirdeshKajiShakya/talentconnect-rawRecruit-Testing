import mongoose from 'mongoose';

const companyOverviewSchema = new mongoose.Schema({
    // --- Section 1: Company Details ---
    companyName: { type: String },
    companyDescription: { type: String },
    companyDetails: { type: String },
    companyType: { type: String },
    industryType: { type: String },
    numberOfEmployees: { type: String },
    establishedYear: { type: Number },
    websiteURL: { type: String },
    companyLinkedIn: { type: String },
    phoneNumber: { type: String },
    alternatePhoneNumber: { type: String },
    companyLocation: { type: String },
    pincode: { type: String },
    state: { type: String },
    city: { type: String },
    country: { type: String },

    // --- Section 2: Employer Details ---
    employerName: { type: String },
    employerPhoto: { type: String }, // Optional: Image URL
    designation: { type: String },
    workEmail: { type: String, unique: true },
    employerPhoneNumber: { type: String },
    employerLinkedIn: { type: String },

    // --- Section 3: Hiring Preferences ---
    hiringPreferencesText: { type: String },
    jobRoles: { type: [String] },
    hiringLocations: { type: [String] },
    lookingFor: { type: [String] }, // e.g., ['Job', 'Internship']
    employmentType: { type: [String] }, // e.g., ['Full-time', 'Part-time']

    // --- Section 4: Company Verification & KYC ---
    kycStatus: { type: String },
    photoVerificationStatus: { type: String },
    aadharNumber: { type: String },
    nameOnAadhar: { type: String },
    addressLabel: { type: String },
    address: { type: String },
    kycPincode: { type: String },
    verificationDocuments: { type: [String] }, // Multiple docs (URLs)
    tanNumber: { type: String },
    gstin: { type: String },
    registrationNumber: { type: String },

    // --- Section 5: Company Profiles ---
    profileLinkedIn: { type: String },
    profileWebsite: { type: String },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const CompanyOverview = mongoose.model('CompanyOverview', companyOverviewSchema);

export default CompanyOverview;