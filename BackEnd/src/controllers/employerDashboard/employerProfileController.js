
import CompanyProfile from '../../models/companyDashboard/companyProfileModel.js';
import cloudinary from '../../../config/cloudinary.js';
import streamifier from 'streamifier';
import Auth from '../../models/auth.js'

// Helper function to upload a file stream to Cloudinary
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

// POST: Create onboarding profile
export const createEmployerOnboarding = async (req, res) => {
    try {
        const userId = req.user._id;

        if (await CompanyProfile.findOne({ userId })) {
            return res.status(400).json({ message: 'Onboarding already exists for this user.' });
        }

        const { employerDetails, companyDetails, hiringPreferences } = req.body;
        const files = req.files;
        const uploads = {};

        // Handle file uploads
        if (files?.profileImage?.[0]) {
            uploads.profileImageUrl = (await streamUpload(files.profileImage[0].buffer, 'employerProfileImages')).secure_url;
        }
        if (files?.backgroundImage?.[0]) {
            uploads.backgroundImageUrl = (await streamUpload(files.backgroundImage[0].buffer, 'employerBackgroundImages')).secure_url;
        }

        // Create the new document
        const onboardingData = await CompanyProfile.create({
            userId,
            ...uploads, 
            employerDetails: JSON.parse(employerDetails),
            companyDetails: JSON.parse(companyDetails),
            hiringPreferences: JSON.parse(hiringPreferences),
        });

       const updatedUser = await Auth.findByIdAndUpdate(
            userId,
            { 
                userType: "employer",
                onboardingCompleted: true, // Set onboarding as completed
                onboardingStep: 6 // Set to final step
            },
            { new: true } // Return the updated document
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found after update." });
        }

        res.status(201).json({
           message: 'Onboarding created successfully.',
           profile: onboardingData,
           user: updatedUser
         });
    } catch (error) {
        console.error('Error in createEmployerOnboarding:', error);
        res.status(500).json({ message: 'Failed to create onboarding.', error: error.message });
    }
};

// GET: Fetch onboarding profile
export const getEmployerOnboarding = async (req, res) => {
 
    try {
        const userId = req.user._id;
        const onboarding = await CompanyProfile.findOne({ userId }).select('-__v').lean();
        //console.log(onboarding);
        if (!onboarding) {
            return res.status(404).json({ message: 'No onboarding data found.' });
        }
     //   console.log("Employer data aa rha hai ");
        res.status(200).json({ message: 'Success', profile: onboarding });
    } catch (error) {
        console.error('Error in getEmployerOnboarding:', error);
        res.status(500).json({ message: 'Failed to fetch onboarding.', error: error.message });
    }
};

// PUT: Update onboarding profile
export const updateEmployerOnboarding = async (req, res) => {
    try {
        const userId = req.user._id;
        const { employerDetails, companyDetails, hiringPreferences } = req.body;
        const files = req.files;
        const updates = {};

        // Handle file uploads and add them to the root of the update object
        if (files?.profileImage?.[0]) {
            // FIX: Update the root `profileImageUrl` field
            updates.profileImageUrl = (await streamUpload(files.profileImage[0].buffer, 'employerProfileImages')).secure_url;
        }
        if (files?.backgroundImage?.[0]) {
            // FIX: Update the root `backgroundImageUrl` field
            updates.backgroundImageUrl = (await streamUpload(files.backgroundImage[0].buffer, 'employerBackgroundImages')).secure_url;
        }

        // Use dot notation to update nested fields without overwriting entire objects
        if (employerDetails) {
            Object.entries(JSON.parse(employerDetails)).forEach(([key, value]) => {
                updates[`employerDetails.${key}`] = value;
            });
        }
        if (companyDetails) {
            Object.entries(JSON.parse(companyDetails)).forEach(([key, value]) => {
                updates[`companyDetails.${key}`] = value;
            });
        }
        if (hiringPreferences) {
            Object.entries(JSON.parse(hiringPreferences)).forEach(([key, value]) => {
                updates[`hiringPreferences.${key}`] = value;
            });
        }
        
        const updatedProfile = await CompanyProfile.findOneAndUpdate(
            { userId },
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'No onboarding profile found to update.' });
        }

        res.status(200).json({ message: 'Onboarding updated successfully.', profile: updatedProfile });
    } catch (error) {
        console.error('Error in updateEmployerOnboarding:', error);
        res.status(500).json({ message: 'Failed to update onboarding.', error: error.message });
    }
};

// POST: Upload a single image (profile or background)
export const uploadSingleImage = async (req, res) => {
    try {
        const userId = req.user._id;
        const { imageType } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No image file provided.' });
        }
        if (!imageType || (imageType !== 'profile' && imageType !== 'background')) {
            return res.status(400).json({ message: 'Invalid imageType. Must be "profile" or "background".' });
        }

        const folder = imageType === 'profile' ? 'employerProfileImages' : 'employerBackgroundImages';
        const imageUrl = (await streamUpload(file.buffer, folder)).secure_url;

        // FIX: Determine the correct root-level field name
        const updateField = imageType === 'profile' ? 'profileImageUrl' : 'backgroundImageUrl';

        const updatedProfile = await CompanyProfile.findOneAndUpdate(
            { userId: userId },
            { $set: { [updateField]: imageUrl } },
            { new: true, runValidators: true } // Removed upsert to prevent creating a doc with just an image
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Employer profile not found. Please complete onboarding first.' });
        }

        res.status(200).json({
            message: `${imageType} image uploaded successfully!`,
            imageUrl: imageUrl,
            profile: updatedProfile
        });
    } catch (error) {
        console.error('Error in uploadSingleImage:', error);
        res.status(500).json({ message: 'Failed to upload image.', error: error.message });
    }
};