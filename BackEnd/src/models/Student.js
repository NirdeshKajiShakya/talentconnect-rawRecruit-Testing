// src/models/studentOverviewModel.js

import mongoose from 'mongoose';

const studentOverviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String, // Cloudinary URL
      default: '',
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    collegeName: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    branchOfStudy: {
      type: String,
      required: true,
    },
    cgpa: {
      type: Number,
      required: true,
    },
    linkedinUrl: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
    portfolioUrl: {
      type: String,
    },
    resumeUrl: {
      type: String, // Cloudinary resume link
    },
    about: {
      type: String,
    },
    skills: [
      {
        type: String,
      },
    ],
    interestedIndustry: {
      type: String,
    },
    interestedJobRoles: [
      {
        type: String,
      },
    ],
    preferredJobLocations: [
      {
        type: String,
      },
    ],
    lookingFor: {
      type: String,
      enum: ['Internship'],
    },
    employmentType: {
      type: String,
      enum: ['Full-Time', 'Remote'],
    },
    language: {
      type: String,
      enum: ['English'],
    },
    opportunityApplied:{
      type: [String],
    }
  },
  { timestamps: true }
);

const StudentOverview = mongoose.model('StudentOverview', studentOverviewSchema);

export default StudentOverview;