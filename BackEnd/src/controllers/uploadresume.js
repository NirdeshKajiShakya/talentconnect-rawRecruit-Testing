// controllers/uploadResume.controller.js
import UploadResume from "../models/ServiceRequest_uploadresume.js";

export const uploadResume = async (req, res) => {
  try {
    const studentId = req.body.student; // or from token (req.user.id)
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newResume = new UploadResume({
      student: studentId,
      resumeUrl: `/uploads/resumes/${file.filename}`, // Or Cloudinary URL
      originalFilename: file.originalname,
      fileType: file.mimetype,
    });

    await newResume.save();

    res.status(201).json({
      message: "Resume uploaded successfully",
      data: newResume,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};
