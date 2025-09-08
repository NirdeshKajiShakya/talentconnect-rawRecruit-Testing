import ProfessionalProfile from '../models/professionalProfileModel.js';
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

// ✅ Safe JSON parse helper
const safeJsonParse = (value) => {
  if (!value || value === 'undefined') return null;
  try {
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
};

export const createProfessionalProfile = async (req, res) => {
  try {
    const {
      about,
      educationalBackground,
      careerGoals,
      jobDetails,
      workExperience,
      internationalWorkExperience,
      awardsRecognitions,
      leadershipExperience,
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

    const handleCertificateUploads = async (section, folder) => {
      const parsedSection = safeJsonParse(section);
      if (!parsedSection || !Array.isArray(parsedSection)) return [];

      return await Promise.all(parsedSection.map(async (entry, index) => {
        if (files?.[`${folder}_${index}`]?.[0]) {
          const certUrl = await streamUpload(files[`${folder}_${index}`][0].buffer, `${folder}Certificates`);
          entry.experienceCertificateUrl = certUrl.secure_url;
        }
        return entry;
      }));
    };

    const professionalProfile = await ProfessionalProfile.create({
      about: safeJsonParse(about),
      educationalBackground: {
        ...safeJsonParse(educationalBackground),
        degreeCertificateUrl: uploads.degreeCertificateUrl || '',
      },
      careerGoals: safeJsonParse(careerGoals),
      jobDetails: safeJsonParse(jobDetails),
      workExperience: await handleCertificateUploads(workExperience, 'workExperience'),
      internationalWorkExperience: await handleCertificateUploads(internationalWorkExperience, 'internationalWorkExperience'),
      awardsRecognitions: safeJsonParse(awardsRecognitions),
      leadershipExperience: await handleCertificateUploads(leadershipExperience, 'leadershipExperience'),
      skills: safeJsonParse(skills),
      socialProfiles: {
        ...safeJsonParse(socialProfiles),
        resumeUrl: uploads.resumeUrl || '',
      },
      certificationsUrls: safeJsonParse(certificationsUrls),
      language,
      profileImageUrl: uploads.profileImageUrl || '',
      backgroundImageUrl: uploads.backgroundImageUrl || '',
      resumeUrl: uploads.resumeUrl || '',
    });

    res.status(201).json({ message: 'Professional profile created successfully', profile: professionalProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create professional profile', error: error.message });
  }
};
