import mongoose from "mongoose";

const uploadResumeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentOverview", // or your actual student model name
      required: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    originalFilename: {
      type: String,
    },
    fileType: {
      type: String,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const UploadResume = mongoose.model("UploadResume", uploadResumeSchema);
export default UploadResume;
