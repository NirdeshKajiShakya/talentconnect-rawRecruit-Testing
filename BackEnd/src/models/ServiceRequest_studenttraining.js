// models/StudentTraining.js
import mongoose from "mongoose";

const studentTrainingSchema = new mongoose.Schema(
  {
    numberOfStudents: [String],
    typesOfSkills: [String],
    modeOfTraining: String, // 'Virtual' | 'Classroom'
    evaluationBasedOn: String, // 'Examination' | 'Project'
    numberOfHoursOrDays: [String],
  },
  { timestamps: true }
);

const StudentTraining = mongoose.model(
  "StudentTraining",
  studentTrainingSchema
);

export default StudentTraining;
