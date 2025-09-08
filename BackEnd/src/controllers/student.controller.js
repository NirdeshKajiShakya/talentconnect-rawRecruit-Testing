// This file is used for testing only
// Done by sheetal
import StudentOverview from "../models/Student.js";

// @desc    Create a new student profile
// this is done by others i only use for testing
export const createStudentOverview = async (req, res) => {
  try {
    const {
      name,
      email,
      mobileNumber,
      collegeName,
      batch,
      branchOfStudy,
      cgpa,
      linkedinUrl,
      githubUrl,
      portfolioUrl,
      resumeUrl,
      about,
      skills,
      interestedIndustry,
      interestedJobRoles,
      preferredJobLocations,
      lookingFor,
      employmentType,
      language,
      opportunityApplied,
    } = req.body;

    const studentOverview = new StudentOverview({
      name,
      email,
      mobileNumber,
      collegeName,
      batch,
      branchOfStudy,
      cgpa,
      linkedinUrl,
      githubUrl,
      portfolioUrl,
      resumeUrl,
      about,
      skills,
      interestedIndustry,
      interestedJobRoles,
      preferredJobLocations,
      lookingFor,
      employmentType,
      language,
      opportunityApplied,
    });

    const savedStudent = await studentOverview.save();
    res.status(201).json({ success: true, data: savedStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
