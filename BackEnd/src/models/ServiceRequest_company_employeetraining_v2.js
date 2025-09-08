import mongoose from "mongoose";
const { Schema } = mongoose;

const serviceRequestSchema = new Schema(
  {
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
  },
  {
    collection: "employee_training_requests",
  }
);

const serviceRequestModel = mongoose.model(
  "employee_training_requests",
  serviceRequestSchema
);

export default serviceRequestModel;
