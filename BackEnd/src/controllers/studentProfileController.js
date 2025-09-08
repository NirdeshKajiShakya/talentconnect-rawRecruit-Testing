// src/controllers/studentProfileController.js
import StudentProfile from '../models/StudentProfile.js';
import cloudinary from '../../config/cloudinary.js';
import streamifier from 'streamifier';

const streamUpload = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto', folder },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const createStudentProfile = async (req, res) => {
  try {
    const {
      about,
      educationalBackground,
      careerGoals,
      skills,
      socialProfiles,
      certificationsUrls,
    } = JSON.parse(req.body.data); // expecting JSON string in data field

    // Prepare file upload promises
    const uploads = {};

    if (req.files['profileImage']) {
      const profileImageRes = await streamUpload(req.files['profileImage'][0].buffer, 'rawrecruit/profileImages');
      uploads.profileImageUrl = profileImageRes.secure_url;
    }

    if (req.files['backgroundImage']) {
      const backgroundImageRes = await streamUpload(req.files['backgroundImage'][0].buffer, 'rawrecruit/backgroundImages');
      uploads.backgroundImageUrl = backgroundImageRes.secure_url;
    }

    if (req.files['resume']) {
      const resumeRes = await streamUpload(req.files['resume'][0].buffer, 'rawrecruit/resumes');
      uploads.resumeUrl = resumeRes.secure_url;
    }

    if (req.files['degreeCertificate']) {
      const degreeCertRes = await streamUpload(req.files['degreeCertificate'][0].buffer, 'rawrecruit/degreeCertificates');
      uploads.degreeCertificateUrl = degreeCertRes.secure_url;
    }

    // Merge educationalBackground with degreeCertificateUrl if uploaded
    const educationWithCert = {
      ...educationalBackground,
      degreeCertificateUrl: uploads.degreeCertificateUrl || educationalBackground.degreeCertificateUrl || '',
    };

    const profile = new StudentProfile({
      about,
      educationalBackground: educationWithCert,
      careerGoals,
      skills,
      socialProfiles,
      certificationsUrls,
      profileImageUrl: uploads.profileImageUrl || '',
      backgroundImageUrl: uploads.backgroundImageUrl || '',
      resumeUrl: uploads.resumeUrl || '',
    });

    await profile.save();

    res.status(201).json({ message: 'Student profile created successfully', profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create student profile', error: error.message });
  }
};
