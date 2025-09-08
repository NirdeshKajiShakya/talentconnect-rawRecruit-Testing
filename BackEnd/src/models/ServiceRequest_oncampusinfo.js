import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  date: String,
  time: String,
  message: String,
  termsAccepted: Boolean,
});

const Request = mongoose.model("Request", requestSchema);
export default Request;
