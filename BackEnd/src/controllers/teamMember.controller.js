import TeamMember from "../models/teamMemberModel.js";
import Auth from '../models/auth.js' ;
import CompanyProfile from "../models/companyDashboard/companyProfileModel.js";
import EmployerOnboarding from '../models/employerDashboard/employerOnboarding.model.js';




import Notification from '../models/notificationModel.js';



export const searchEmployers = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(200).json([]);
        }

        const users = await Auth.find({
            email: { $regex: `^${email}`, $options: 'i' },
            userType: 'employer'
        })
        .select('name email')
        .limit(10);

        res.status(200).json(users);

    } catch (error) {
        console.error('Error searching for employers:', error);
        res.status(500).json({ message: 'Server error while searching for employers.' });
    }
};



export const inviteTeamMember = async (req, res) => {
    const { email, role } = req.body;
    const adminUserId = req.user._id;

    if (!email || !role) {
        return res.status(400).json({ message: 'Email and role are required.' });
    }

    try {
        const companyProfile = await CompanyProfile.findOne({ userId: adminUserId });
        if (!companyProfile) {
            return res.status(404).json({ message: 'Admin user does not have a company profile.' });
        }
        const companyId = companyProfile._id;

        const userToInvite = await Auth.findOne({ email, userType: 'employer' });
        if (!userToInvite) {
            return res.status(404).json({ message: `No employer found with the email: ${email}` });
        }

        const existingInvitation = await TeamMember.findOne({ companyId, invitedEmail: email });
        if (existingInvitation) {
            return res.status(409).json({ message: `This user has already been invited to the team.` });
        }

        const newTeamMember = new TeamMember({
            companyId,
            userId: userToInvite._id,
            invitedEmail: email,
            role,
            status: 'Pending',
        });
        await newTeamMember.save();
        
        // ✅ ADDED: Create a notification for the invited user
        const notification = new Notification({
            recipientId: userToInvite._id,
            senderId: adminUserId,
            type: 'TEAM_INVITATION',
            message: `${companyProfile.companyDetails.companyName} has invited you to join their team as a ${role}.`,
            referenceId: newTeamMember._id, // Link notification to the invitation
        });
        await notification.save();

        res.status(201).json({ 
            message: 'Invitation sent successfully.',
            invitation: newTeamMember 
        });

    } catch (error) {
        console.error('Error inviting team member:', error);
        res.status(500).json({ message: 'Server error while sending invitation.' });
    }
};

// MODIFIED: To handle the choice of working mode
export const acceptInvitation = async (req, res) => {
    const acceptingUserId = req.user._id;
    const { invitationId, workMode } = req.body; // workMode can be 'company' or 'independent'

    if (!invitationId || !workMode) {
        return res.status(400).json({ message: 'Invitation ID and work mode are required.' });
    }

    try {
        const invitation = await TeamMember.findById(invitationId);
        if (!invitation) {
            return res.status(404).json({ message: 'Invitation not found.' });
        }
        if (invitation.userId.toString() !== acceptingUserId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to accept this invitation.' });
        }
        if (invitation.status !== 'Pending') {
            return res.status(400).json({ message: `This invitation is already ${invitation.status.toLowerCase()}.` });
        }

        // Update invitation status
        invitation.status = 'Active';
        await invitation.save();

        //  ADDED: Update user's active company if they choose to work for the company
        if (workMode === 'company') {
            await Auth.findByIdAndUpdate(acceptingUserId, { activeCompanyId: invitation.companyId });
        }

        // Mark the related notification as read
        await Notification.findOneAndUpdate(
            { type: 'TEAM_INVITATION', referenceId: invitation._id },
            { read: true }
        );
        
        const company = await CompanyProfile.findById(invitation.companyId).select('companyDetails.companyName');

        res.status(200).json({
            message: 'Invitation accepted successfully!',
            teamMember: invitation,
            companyName: company.companyDetails.companyName,
        });

    } catch (error) {
        console.error('Error accepting invitation:', error);
        res.status(500).json({ message: 'Server error while accepting invitation.' });
    }
};

//   Controller to get pending invitations for the logged-in user
export const getPendingInvitations = async (req, res) => {
    try {
        const invitations = await TeamMember.find({ 
            userId: req.user._id, 
            status: 'Pending' 
        })
        .populate({
            path: 'companyId',
            select: 'companyDetails.companyName companyDetails.description profileImageUrl'
        })
        .sort({ createdAt: -1 });

        if (!invitations) {
            return res.status(200).json([]);
        }

        const formattedInvitations = invitations.map(inv => ({
            _id: inv._id,
            companyName: inv.companyId.companyDetails.companyName,
            companyDescription: inv.companyId.companyDetails.description,
            companyLogo: inv.companyId.profileImageUrl,
            role: inv.role,
            invitedOn: inv.createdAt,
        }));

        res.status(200).json(formattedInvitations);

    } catch (error) {
        console.error('Error fetching pending invitations:', error);
        res.status(500).json({ message: 'Server error while fetching invitations.' });
    }
};

// Get all notifications for the logged-in user
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipientId: req.user._id })
            .populate('senderId', 'name profileImage') // Get sender's name and image
            .sort({ createdAt: -1 });
        
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Mark a single notification as read
export const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found.' });
        }
        
        // Ensure the user owns this notification
        if (notification.recipientId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized.' });
        }

        notification.read = true;
        await notification.save();

        res.status(200).json(notification);
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getTeamMembers = async (req, res) => {
    try {
        // 1. Find the company profile of the admin.
        const companyProfile = await CompanyProfile.findOne({ userId: req.user._id });
        if (!companyProfile) {
            return res.status(404).json({ message: 'Company profile not found for the user.' });
        }

        // 2. Find all team members for that company (without populating yet).
        const teamMembers = await TeamMember.find({ companyId: companyProfile._id }).lean();

        // 3. Format the response and fetch the name from EmployerOnboarding for each member.
        const formattedMembersPromises = teamMembers.map(async (member) => {
            let memberName = 'User Not Found'; // Default name

            // If the member has a userId, try to find their name.
            if (member.userId) {
                // Look for the user in the EmployerOnboarding collection first.
                const onboardingProfile = await CompanyProfile.findOne(
                    { userId: member.userId },
                    { 'employerDetails.name': 1 } // Projection to get only the name for efficiency
                ).lean();

                if (onboardingProfile && onboardingProfile.employerDetails && onboardingProfile.employerDetails.name) {
                    memberName = onboardingProfile.employerDetails.name;
                }
            }

            return {
                id: member._id,
                name: memberName,
                email: member.invitedEmail,
                status: member.status,
                userType: member.role,
                jobRole: 'N/A', 
                jobPosts: true,
                resumeAccess: true,
            };
        });

        // Wait for all the name lookups to complete.
        const formattedMembers = await Promise.all(formattedMembersPromises);
        
        res.status(200).json(formattedMembers);

    } catch (error) {
        console.error('Error fetching team members:', error);
        res.status(500).json({ message: 'Server error while fetching team members.' });
    }
};
export const getMyActiveCompanies = async (req, res) => {
    try {
        const activeMemberships = await TeamMember.find({ 
            userId: req.user._id, 
            status: 'Active' 
        })
        .populate({
            path: 'companyId',
            select: 'companyDetails.companyName profileImageUrl'
        });

        if (!activeMemberships) {
            return res.status(200).json([]);
        }

        // Format the data cleanly for the frontend
        const companies = activeMemberships.map(member => ({
            _id: member.companyId._id,
            name: member.companyId.companyDetails.companyName,
            logo: member.companyId.profileImageUrl,
        }));

        res.status(200).json(companies);

    } catch (error) {
        console.error('Error fetching user\'s active companies:', error);
        res.status(500).json({ message: 'Server error while fetching active companies.' });
    }
};


export const switchActiveProfile = async (req, res) => {
    try {
        const { profileId } = req.body; // 'profileId' is the companyId or null
        const userId = req.user._id;

        // This database update logic is correct.
        const updatedUser = await Auth.findByIdAndUpdate(
            userId, 
            { activeCompanyId: profileId },
            { new: true } // This ensures the updated document is returned
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        // The key is that you correctly return the updated user object.
        res.status(200).json({
            message: 'Profile switched successfully.',
            user: updatedUser
        });

    } catch (error) {
        console.error('Error switching profile:', error);
        res.status(500).json({ message: 'Server error while switching profile.' });
    }
};

export const getCompanyMember = async (req, res) => {
    try {
        const { activeCompanyId } = req.user;

        // 1. If user is in "Independent" mode (no active company), return an empty list.
        if (!activeCompanyId) {
            return res.status(200).json([]);
        }

        // 2. Find all active team members for the current company.
        const teamMembers = await TeamMember.find({
            companyId: activeCompanyId,
            status: 'Active'
        }).lean(); // .lean() for better performance

        if (!teamMembers.length) {
            return res.status(200).json([]);
        }

        // 3. Get all user IDs to fetch their details in one go.
        const userIds = teamMembers.map(member => member.userId);

        // 4. Fetch all user details (name, email) from the Auth collection efficiently.
        const usersAuthDetails = await Auth.find({
            '_id': { $in: userIds }
        }).select('name email').lean();
        
        // Create a map for easy lookup: { userId: { name, email } }
        const userDetailsMap = usersAuthDetails.reduce((map, user) => {
            map[user._id.toString()] = { name: user.name, email: user.email };
            return map;
        }, {});

        // 5. Combine the data into the final format for the frontend.
        const formattedMembers = teamMembers.map(member => {
            const userDetails = userDetailsMap[member.userId.toString()];
            return {
                id: member._id,
                name: userDetails ? userDetails.name : 'User Not Found',
                email: member.invitedEmail, // Use invitedEmail as the reliable source
                status: member.status,
                userType: member.role, // 'Admin', 'Recruiter', etc.
                jobRole: 'N/A', // You can add this field to your TeamMember model if needed
                jobPosts: true, // You can add permission fields to your model
                resumeAccess: true, // You can add permission fields to your model
            };
        });

        res.status(200).json(formattedMembers);

    } catch (error) {
        console.error('Error fetching team members:', error);
        res.status(500).json({ message: 'Server error while fetching team members.' });
    }
    
};

export const leaveCompany = async (req, res) => {
    try {
        const userId = req.user._id;
        const { companyId } = req.params;

        // 1. Find the user's specific membership record.
        const membership = await TeamMember.findOne({ userId, companyId });

        if (!membership) {
            return res.status(404).json({ message: "You are not a member of this company." });
        }

        // 2. IMPORTANT: Prevent the owner from leaving the company.
        // They must transfer ownership or delete the company instead.
        if (membership.role === 'Owner') {
            return res.status(403).json({ 
                message: "As the company owner, you cannot leave. Please transfer ownership or delete the company." 
            });
        }

        // 3. Remove the team member record from the database.
        await TeamMember.findByIdAndDelete(membership._id);

        // 4. Check if the user's active profile was the one they just left.
        // If so, reset their profile to "Independent" (null).
        if (req.user.activeCompanyId && req.user.activeCompanyId.toString() === companyId) {
            const updatedUser = await Auth.findByIdAndUpdate(
                userId,
                { $set: { activeCompanyId: null } },
                { new: true }
            ).select('-password');

            return res.status(200).json({
                message: `You have successfully left the company. Your profile has been set to Independent.`,
                user: updatedUser,
            });
        }

        // 5. If they left a company they weren't active in, just send success.
        res.status(200).json({ 
            message: "You have successfully left the company.",
            user: req.user // Return the existing user object
        });

    } catch (error) {
        console.error("Error leaving company:", error);
        res.status(500).json({ message: "Server error while trying to leave the company." });
    }
};


export const removeTeamMember = async (req, res) => {
    try {
        const { memberId } = req.params; // The ID of the member to be removed
        const requestingUserId = req.user._id; // The ID of the user making the request (e.g., an admin)

        // 1. Find the team member record that is targeted for deletion
        const memberToRemove = await TeamMember.findById(memberId);
        if (!memberToRemove) {
            return res.status(404).json({ message: "Team member not found." });
        }
        
        // 2. Business Rule: Prevent the owner from being removed via this endpoint.
        if (memberToRemove.role === 'Owner') {
            return res.status(400).json({ message: "The company owner cannot be removed. Please transfer ownership first." });
        }

        // 3. Find the membership details of the user making the request to check their role.
        // They must be a member of the same company to have any rights.
        const companyId = memberToRemove.companyId;
        const requestingUserMembership = await TeamMember.findOne({ 
            userId: requestingUserId, 
            companyId: companyId 
        });

        // 4. Authorization Check:
        // The requesting user must be a member AND have an 'Admin' or 'Owner' role.
        if (!requestingUserMembership || !['Admin', 'Owner'].includes(requestingUserMembership.role)) {
            return res.status(403).json({ message: "You do not have permission to remove members from this team." });
        }

        // 5. If all checks pass, delete the team member record.
        await TeamMember.findByIdAndDelete(memberId);

        res.status(200).json({ message: "Team member removed successfully." });

    } catch (error) {
        console.error("Error removing team member:", error);
        res.status(500).json({ message: "Server error while removing team member." });
    }
};

export const declineInvitation = async (req, res) => {
    const { id: invitationId } = req.params;
    const decliningUserId = req.user._id;

    try {
        const invitation = await TeamMember.findById(invitationId);
        if (!invitation) {
            return res.status(404).json({ message: 'Invitation not found.' });
        }
        if (invitation.userId.toString() !== decliningUserId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to decline this invitation.' });
        }
        if (invitation.status !== 'Pending') {
            return res.status(400).json({ message: `This invitation has already been actioned.` });
        }

        // Update the invitation status to 'reject'
        invitation.status = 'reject';
        await invitation.save();

        res.status(200).json({ message: 'Invitation declined successfully.' });
    } catch (error) {
        console.error('Error declining invitation:', error);
        res.status(500).json({ message: 'Server error while declining invitation.' });
    }
};