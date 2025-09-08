import EmployerProfile from '../../models/employerDashboard/employerProfileModel.js';
import cloudinary from '../../../config/cloudinary.js';
import streamifier from 'streamifier';

// 📄 PAGE 1: Upload background image + profile picture + profile details
export const updateEmployerUserDetails = async (req, res) => {
  try {
    const {
      companyWebsite,
      employeeName,
      employeeDesignation,
      linkedinProfile,
      numberOfEmployees,
      establishedYear
    } = req.body;

    let backgroundImageUrl = '';
    let profilePictureUrl = '';

    // 📷 Upload background image using streamifier
    if (req.files?.backgroundImage) {
      const uploadBackground = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'employer/backgrounds' },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(req.files.backgroundImage[0].buffer).pipe(stream);
        });
      };
      const result = await uploadBackground();
      backgroundImageUrl = result.secure_url;
    }

    // 📷 Upload profile picture using streamifier
    if (req.files?.profilePicture) {
      const uploadProfilePic = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'employer/profilePictures' },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(req.files.profilePicture[0].buffer).pipe(stream);
        });
      };
      const result = await uploadProfilePic();
      profilePictureUrl = result.secure_url;
    }

    const profile = await EmployerProfile.findOne({ companyWebsite });
    if (!profile) return res.status(404).json({ message: 'Employer not found' });

    // Update fields
    profile.employeeName = employeeName;
    profile.employeeDesignation = employeeDesignation;
    profile.linkedinProfile = linkedinProfile;
    profile.numberOfEmployees = numberOfEmployees;
    profile.establishedYear = establishedYear;
    if (backgroundImageUrl) profile.backgroundImage = backgroundImageUrl;
    if (profilePictureUrl) profile.profilePicture = profilePictureUrl;

    await profile.save();
    return res.status(200).json({ message: 'Employer user details updated', profile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating employer user details' });
  }
};

// 📄 PAGE 2: Get all team members


export const getTeamMembers = async (req, res) => {
  try {
    const profiles = await EmployerProfile.find({}, 'teamMembers'); // Only fetch teamMembers

    // Flatten all teamMembers arrays into one
    const allTeamMembers = profiles.flatMap(profile => profile.teamMembers);

    return res.status(200).json({
      message: 'All team members fetched successfully',
      teamMembers: allTeamMembers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching team members' });
  }
};


export const addTeamMember = async (req, res) => {
  try {
    const { profileId, teamMember } = req.body;
    if (!profileId) return res.status(400).json({ message: 'profileId is required' });

    const profile = await EmployerProfile.findById(profileId);
    if (!profile) return res.status(404).json({ message: 'Employer profile not found' });

    profile.teamMembers.push(teamMember);
    await profile.save();

    return res.status(201).json({ message: 'Team member added', teamMembers: profile.teamMembers });
  } catch (err) {
    res.status(500).json({ message: 'Error adding team member' });
  }
};

// ✅ GET Team Member by Email
export const getTeamMemberByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const profile = await EmployerProfile.findOne({ 'teamMembers.email': email });
    if (!profile) return res.status(404).json({ message: 'Team member not found in any profile' });

    const member = profile.teamMembers.find(member => member.email === email);
    if (!member) return res.status(404).json({ message: 'Team member not found' });

    res.status(200).json({ message: 'Team member found', member });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching team member' });
  }
};

// 🔄 UPDATE Team Member by Email
export const updateTeamMemberByEmail = async (req, res) => {
  try {
    const { email, updates } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const profile = await EmployerProfile.findOne({ 'teamMembers.email': email });
    if (!profile) return res.status(404).json({ message: 'Team member not found in any profile' });

    const member = profile.teamMembers.find(member => member.email === email);
    if (!member) return res.status(404).json({ message: 'Team member not found' });

    Object.assign(member, updates);
    await profile.save();

    res.status(200).json({ message: 'Team member updated', teamMembers: profile.teamMembers });
  } catch (err) {
    res.status(500).json({ message: 'Error updating team member' });
  }
};

// ❌ DELETE Team Member by Email
export const deleteTeamMemberByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const profile = await EmployerProfile.findOne({ 'teamMembers.email': email });
    if (!profile) return res.status(404).json({ message: 'Team member not found in any profile' });

    const memberIndex = profile.teamMembers.findIndex(member => member.email === email);
    if (memberIndex === -1) return res.status(404).json({ message: 'Team member not found' });

    profile.teamMembers.splice(memberIndex, 1);
    await profile.save();

    res.status(200).json({ message: 'Team member deleted', teamMembers: profile.teamMembers });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting team member' });
  }
};
