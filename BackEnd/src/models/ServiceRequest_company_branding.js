// models/ServiceRequest_company_branding.js
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const companyBrandingSchema = new Schema({
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

const serviceRequestModel =
  mongoose.models.company_branding ||
  model("company_branding", companyBrandingSchema, "company_branding");

export default serviceRequestModel;
