import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema({
  category: { type: String, required: true },
  skillset: [{ type: String, required: true }], // ✅ FIXED: should be an array of strings
  date: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String },
  termsAccepted: { type: Boolean, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Interview = mongoose.model("Interview", InterviewSchema);

export default Interview;
