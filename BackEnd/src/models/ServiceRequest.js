import mongoose from "mongoose";
const { Schema, model } = mongoose;

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

const serviceRequestModel = mongoose.model(
  "servicerequest",
  serviceRequestSchema
);
export default serviceRequestModel;
