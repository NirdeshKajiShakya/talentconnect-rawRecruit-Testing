import Education from "../models/Onboarding_education.js";
import cloudinary from "../../config/cloudinary.js";
import streamifier from "streamifier";

export const submitEducationDetails = async (req, res) => {
  try {
    const { college, degree, semester, specialization, cgpa } = req.body;
    let certificateUrl = "";

    if (req.file) {
      const fileBuffer = req.file.buffer;

      const uploadStream = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              resource_type: "auto",
              folder: "education_certificates",
            },
            (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve(result);
            }
          );
          streamifier.createReadStream(fileBuffer).pipe(stream);
        });

      const result = await uploadStream();
      certificateUrl = result.secure_url;
    }

    const education = await Education.create({
      college,
      degree,
      semester,
      specialization,
      cgpa,
      certificateUrl,
    });

    res.status(201).json(education);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};
