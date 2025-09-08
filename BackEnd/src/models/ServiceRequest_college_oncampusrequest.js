import mongoose from "mongoose";

const requestInfoSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    acceptTerms: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const RequestInfo = mongoose.model("oncampuscollegerequest", requestInfoSchema);
export default RequestInfo;
