import CompanyProfile from '../../models/companyDashboard/companyProfileModel.js'
import cloudinary from '../../../config/cloudinary.js'
import streamifier from 'streamifier';
import Auth from '../../models/auth.js'

// Utility for streaming upload
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

export const createCompanyProfile = async (req, res) => {

  try {
   
    const userId = req.user._id; // Assuming req.user._id is populated by secureRoute
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated or ID missing.' });
    }

    const {
      companyDetails,
      employerDetails ,
      hiringPreferences,
      kycDetails
    } = req.body;
 

    const files = req.files;
    const uploads = {};

    // Upload background image
    if (files?.backgroundImage?.[0]) {
      uploads.backgroundImageUrl = (await streamUpload(files.backgroundImage[0].buffer, 'companyBackgroundImages')).secure_url;
    }

    // Upload KYC documents (multiple)
    const kycDocs = [];
    if (files?.kycDocuments) {
      for (const doc of files.kycDocuments) {
        const uploaded = await streamUpload(doc.buffer, 'kycDocuments');
        kycDocs.push(uploaded.secure_url);
      }
    }
   
    // Create company profile
    const companyProfile = await CompanyProfile.create({
      userId,
      employerDetails : JSON.parse(employerDetails) ,
      companyDetails: JSON.parse(companyDetails),
      hiringPreferences: JSON.parse(hiringPreferences),
      kycDetails: {
        ...JSON.parse(kycDetails),
        kycDocuments: kycDocs
      },
      backgroundImageUrl: uploads.backgroundImageUrl || ''
    });

       // Update the user's role in the Auth model to "company"
    // await Auth.findByIdAndUpdate(userId, { userType: "company" });
    // console.log(`User ${req.user.email} userType updated to company`);

    // const updatedUser = await Auth.findById(userId).select("-password");
    // if (!updatedUser) {
    //   return res.status(404).json({ error: "User not found after update." });
    // }
    const updatedUser = await Auth.findByIdAndUpdate(
      userId,
      { 
        userType: "company", // Changed from "college" to "company"
        onboardingCompleted: true,
        onboardingStep: 6
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found after update." });
    }

    res.status(201).json({
      message: 'Company profile created successfully',
      profile: companyProfile,
      user: updatedUser // Send the updated user with onboardingCompleted: true
    });

   

  } catch (error) {
    console.error(error);
     if (error.code === 11000) {
      return res.status(409).json({ 
        message: 'A company profile already exists for this user.',
        error: error.message 
      });
    }
    res.status(500).json({
      message: 'Failed to create company profile',
      error: error.message
    });
  }
};

// Get company profile for logged-in user
export const getCompanyProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const companyProfile = await CompanyProfile.findOne({ userId })
      .select('-__v -createdAt -updatedAt')
      .lean();

    if (!companyProfile) {
      return res.status(404).json({ 
        message: 'Company profile not found' 
      });
    }

    res.status(200).json({
      message: 'Company profile retrieved successfully',
      profile: companyProfile
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to fetch company profile',
      error: error.message
    });
  }
};

// Update company profile
export const updateCompanyProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      companyDetails,
      hiringPreferences,
      kycDetails
    } = req.body;

    const files = req.files;
    const updates = {};
    const kycDocs = [];

    // Handle file uploads if they exist
    if (files?.backgroundImage?.[0]) {
      updates.backgroundImageUrl = (await streamUpload(
        files.backgroundImage[0].buffer,
        'companyBackgroundImages'
      )).secure_url;
    }

    if (files?.profileImage?.[0]) { // Handle profile image for update
      updates.profileImageUrl = (await streamUpload(
        files.profileImage[0].buffer,
        'companyProfileImages'
      )).secure_url;
    }


    if (files?.kycDocuments) {
      for (const doc of files.kycDocuments) {
        const uploaded = await streamUpload(doc.buffer, 'kycDocuments');
        kycDocs.push(uploaded.secure_url);
      }
    }

    // Prepare update object
    const updateData = {
      ...(companyDetails && { companyDetails: JSON.parse(companyDetails) }),
      ...(hiringPreferences && { hiringPreferences: JSON.parse(hiringPreferences) }),
      ...(kycDetails && {
        kycDetails: {
          ...JSON.parse(kycDetails),
          ...(kycDocs.length > 0 && { kycDocuments: kycDocs })
        }
      }),
      ...updates
    };

    // Find and update the profile
    const updatedProfile = await CompanyProfile.findOneAndUpdate(
      { userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        message: 'Company profile not found'
      });
    }

    res.status(200).json({
      message: 'Company profile updated successfully',
      profile: updatedProfile
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to update company profile',
      error: error.message
    });
  }
};