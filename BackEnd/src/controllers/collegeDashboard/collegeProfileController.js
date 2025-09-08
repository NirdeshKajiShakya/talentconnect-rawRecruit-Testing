import CollegeProfile from '../../models/collegeDashboard/collegeProfileModel.js';
import cloudinary from '../../../config/cloudinary.js';
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

const safeParse = (data) => {
  try {
    return data ? JSON.parse(data) : {};
  } catch (err) {
    return {};
  }
};

const safeParseArray = (data) => {
  try {
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
};

export const createCollegeProfile = async (req, res) => {
  try {
    const {
      coordinatorName,
      designation,
      collegeDetails,
      placementCoordinatorDetails,
      placementAndRecruitmentDetails,
      collegeProfileAchievements,
      workshops,
      volunteering,
      awards
    } = req.body;

    const files = req.files;
    const uploads = {};

    if (files?.collegeImage?.[0]) {
      uploads.collegeImageUrl = (await streamUpload(files.collegeImage[0].buffer, 'collegeImages')).secure_url;
    }
    if (files?.backgroundImage?.[0]) {
      uploads.backgroundImageUrl = (await streamUpload(files.backgroundImage[0].buffer, 'collegeBackgroundImages')).secure_url;
    }
    if (files?.coordinatorImage?.[0]) {
      uploads.coordinatorImageUrl = (await streamUpload(files.coordinatorImage[0].buffer, 'placementCoordinatorImages')).secure_url;
    }
    if (files?.collegeBrochure?.[0]) {
      uploads.collegeBrochureUrl = (await streamUpload(files.collegeBrochure[0].buffer, 'collegeBrochures')).secure_url;
    }

    const profile = await CollegeProfile.create({
      coordinatorName,
      designation,
      collegeDetails: {
        ...safeParse(collegeDetails),
        collegeImageUrl: uploads.collegeImageUrl || '',
        backgroundImageUrl: uploads.backgroundImageUrl || ''
      },
      placementCoordinatorDetails: {
        ...safeParse(placementCoordinatorDetails),
        coordinatorImageUrl: uploads.coordinatorImageUrl || ''
      },
      placementAndRecruitmentDetails: {
        ...safeParse(placementAndRecruitmentDetails),
        collegeBrochureUrl: uploads.collegeBrochureUrl || ''
      },
      collegeProfileAchievements: safeParse(collegeProfileAchievements),
      workshops: safeParseArray(workshops),
      volunteering: safeParseArray(volunteering),
      awards: safeParseArray(awards)
    });

    res.status(201).json({ message: 'College profile created successfully', profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create college profile', error: error.message });
  }
};