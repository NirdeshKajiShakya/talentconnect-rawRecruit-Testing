import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
    {
        collegeName: { type: String, required: true },
        address: {
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
        },
        course: { type: [String], required: true },
        programs: { type: [String], required: true },
        contactingName: { type: String, required: true },
        contactNumber: { type: Number, required: true },
        contactingEmail: { type: String, required: true, match: /.+\@.+\..+/ },
        availableJobs: { type: [String], default: [] },
        workMode: { type: [String], required: false },
        comments: { type: String, default: "" },
    },
    { timestamps: true }
);

const College = mongoose.model("College", collegeSchema);
export default College;