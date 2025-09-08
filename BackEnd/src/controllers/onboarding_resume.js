import Resume from "../models/Onboarding_resume.js";

export const uploadResume = async (req, res) => {
  try {
    const { fileUrl } = req.body; // Assume file is uploaded and URL is provided
    const resume = await Resume.create({ fileUrl });
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
