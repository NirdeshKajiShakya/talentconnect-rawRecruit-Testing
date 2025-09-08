import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  college: String,
  degree: String,
  semester: String,
  specialization: String,
  cgpa: String,
  certificateUrl: String,
});

export default mongoose.model("Education", educationSchema);
