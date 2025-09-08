// ServiceRequest_college_registration.js - Updated Schema
import mongoose from "mongoose";

const seminarRegistrationSchema = new mongoose.Schema(
  {
    numberOfStudents: {
      type: String,
      required: true,
    },
    typesOfSeminar: {
      type: [String],
      required: true,
    },
    evaluationBasedOn: {
      type: String,
      enum: ["Virtual", "Classroom"],
      default: "Virtual",
    },
    numberOfHoursDays: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SeminarRegistration = mongoose.model(
  "SeminarRegistration",
  seminarRegistrationSchema
);

export default SeminarRegistration;
