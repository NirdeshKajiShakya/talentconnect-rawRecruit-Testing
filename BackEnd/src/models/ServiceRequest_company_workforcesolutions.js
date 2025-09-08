import mongoose from "mongoose";
const { Schema } = mongoose;

const serviceRequestSchema = new Schema({
  counselingtype: {
    type: Number,
    required: true,
    enum: [1, 2, 3],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudentOverview",
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

// ✅ Prevent OverwriteModelError during hot reloads or repeated imports
const serviceRequestModel =
  mongoose.models.servicerequest ||
  mongoose.model("servicerequest", serviceRequestSchema);

export default serviceRequestModel;
