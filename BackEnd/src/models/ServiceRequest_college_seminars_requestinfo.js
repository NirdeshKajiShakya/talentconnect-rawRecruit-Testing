import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  date: String,
  time: String,
  message: String,
  termsAccepted: Boolean,
});

// Use a different collection name, e.g., "hiring_requests"
const modelName = "Seminarrequest";

const Request =
  mongoose.models[modelName] ||
  mongoose.model(modelName, requestSchema, "seminar_requests");

export default Request;
