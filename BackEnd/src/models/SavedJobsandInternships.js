import mongoose from "mongoose";

const { Schema, model } = mongoose;

const jobSchema = new Schema(
  {
    employmentType: {
      type: String,
      required: [true, "Employment type is required"],
      enum: ["Full-time", "Part-time", "Contract"],
      default: "Full-time",
    },
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    locations: {
      type: [String],
      required: [true, "At least one location is required"],
      validate: {
        validator: (array) => array.length > 0,
        message: "At least one location must be provided",
      },
    },
    numberOfOpenings: {
      type: Number,
      required: [true, "Number of openings is required"],
      min: [1, "Number of openings must be at least 1"],
    },
    salary: {
      amount: {
        type: Number,
        required: [true, "Salary amount is required"],
        min: [0, "Salary amount cannot be negative"],
      },
      currency: {
        type: String,
        required: [true, "Currency is required"],
        default: "INR",
      },
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
    },
    selectionCriteria: {
      fieldOfStudy: {
        type: String,
        required: [true, "Field of study is required"],
      },
      educationLevel: {
        type: String,
        required: [true, "Education level is required"],
      },
      experience: {
        type: String,
        required: [true, "Experience level is required"],
      },
      certification: {
        type: String,
        default: "",
      },
      workAuthorization: {
        type: String,
        default: "",
      },
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Full-text index for search
jobSchema.index({ title: "text", description: "text" });

const Job = mongoose.models.Job || model("Job", jobSchema);
export default Job;
