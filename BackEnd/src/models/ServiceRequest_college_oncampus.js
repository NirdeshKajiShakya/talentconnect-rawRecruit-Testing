// models/Placement.js
import mongoose from "mongoose";

const roundSchema = new mongoose.Schema({
  numberOfStudents: Number,
  branch: String,
  skills: [String],
});

const placementSchema = new mongoose.Schema(
  {
    degree: String,
    lookingFor: String, // 'Job' | 'Internship' | 'Both'
    employmentType: String, // 'Part-time' | 'Full-time' | 'Contract'
    minimumSalary: {
      currency: String,
      amount: Number,
    },
    tentativeDate: Date,
    rounds: [roundSchema],
    collegeLocation: String,
    state: String,
    city: String,
    country: String,
    pincode: String,
    coordinatorName: String,
    coordinatorDesignation: String,
    officialEmail: String,
    officialMobile: String,
    linkedinProfile: String,
    minimumStudents: Number,
  },
  { timestamps: true }
);

const Placement = mongoose.model("oncampusPlacement", placementSchema);
export default Placement;
