import mongoose from "mongoose";

const roundSchema = new mongoose.Schema({
    number: Number,
    numberOfStudents: Number,
    branch: String,
    skills: [String],
});

const campusPlacementSchema = new mongoose.Schema(
    {
        campusId: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true },
        collegeName: String,
        degree: [String],
        lookingFor: String,
        employmentType: String,
        minimumSalary: {
            currency: String,
            amount: String,
        },
        placementDate: String,
        rounds: [roundSchema],
        collegeLocation: String,
        state: String,
        city: String,
        country: String,
        pincode: String,
        coordinatorName: String,
        coordinatorDesignation: String,
        email: String,
        phone: String,
        linkedin: String,
        minimumStudentsToBePlaced: [String],
    },
    { timestamps: true }
);

//  Fix: Avoid OverwriteModelError during hot-reloads or multiple imports
const CampusPlacement = mongoose.models.CampusPlacement || mongoose.model("CampusPlacement", campusPlacementSchema);

export default CampusPlacement;
