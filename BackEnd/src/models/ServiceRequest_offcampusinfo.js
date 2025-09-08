import mongoose from "mongoose";

const offCampusInfoSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String },
  acceptedTerms: { type: Boolean, default: false },
});

const OffCampusInfo = mongoose.model("OffCampusInfo", offCampusInfoSchema);
export default OffCampusInfo;
