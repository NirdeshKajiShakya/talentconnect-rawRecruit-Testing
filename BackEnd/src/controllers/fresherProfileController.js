import FresherProfile from '../models/fresherProfileModel.js';
import cloudinary from '../../config/cloudinary.js';
import streamifier from 'streamifier';

const streamUpload = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto', folder: `rawrecruit/${folder}` },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const createFresherProfile = async (req, res) => {
  try {
    const {
      about,
      educationalBackground,
      careerGoals,
      internshipTrainings,
      jobDetails,
      skills,
      socialProfiles,
      certificationsUrls,
      language
    } = req.body;

    const files = req.files;

    const uploads = {};

    if (files?.profileImage?.[0]) {
      uploads.profileImageUrl = (await streamUpload(files.profileImage[0].buffer, 'profileImages')).secure_url;
    }
    if (files?.backgroundImage?.[0]) {
      uploads.backgroundImageUrl = (await streamUpload(files.backgroundImage[0].buffer, 'backgroundImages')).secure_url;
    }
    if (files?.resume?.[0]) {
      uploads.resumeUrl = (await streamUpload(files.resume[0].buffer, 'resumes')).secure_url;
    }
    if (files?.degreeCertificate?.[0]) {
      uploads.degreeCertificateUrl = (await streamUpload(files.degreeCertificate[0].buffer, 'degreeCertificates')).secure_url;
    }

    const fresherProfile = await FresherProfile.create({
      about: JSON.parse(about),
      educationalBackground: {
        ...JSON.parse(educationalBackground),
        degreeCertificateUrl: uploads.degreeCertificateUrl || '',
      },
      careerGoals: JSON.parse(careerGoals),
      internshipTrainings: JSON.parse(internshipTrainings),
      jobDetails: JSON.parse(jobDetails),
      skills: JSON.parse(skills),
      socialProfiles: {
        ...JSON.parse(socialProfiles),
        resumeUrl: uploads.resumeUrl || '',
      },
      certificationsUrls: JSON.parse(certificationsUrls),
      language,
      profileImageUrl: uploads.profileImageUrl || '',
      backgroundImageUrl: uploads.backgroundImageUrl || '',
      resumeUrl: uploads.resumeUrl || '',
    });

    res.status(201).json({ message: 'Fresher profile created successfully', profile: fresherProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create fresher profile', error: error.message });
  }
};
