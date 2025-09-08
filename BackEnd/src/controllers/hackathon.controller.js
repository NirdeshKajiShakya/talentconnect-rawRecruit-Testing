import Hackathon from "../models/Hackathon.js";
// import cloudinary from '../config/cloudinary.js';

// export const createHackathon = async (req, res, next) => {
//     try {
//         const {
//             title,
//             description,
//             hackathonType,
//             startDate,
//             endDate,
//             venue,
//             maxTeamSize,
//             registrationDeadline,
//             rewardsAndBenefits
//         } = req.body;

//         // Upload banner image to Cloudinary
//         if (!req.file) {
//             return res.status(400).json({
//                 success: false,
//                 error: 'Please upload a banner image'
//             });
//         }

//         const result = await cloudinary.uploader.upload(req.file.path, {
//             folder: 'hackathon_banners',
//             width: 1200,
//             crop: 'scale'
//         });

//         // Create hackathon
//         const hackathon = await Hackathon.create({
//             title,
//             description,
//             hackathonType,
//             startDate,
//             endDate,
//             venue,
//             bannerImage: result.secure_url,
//             maxTeamSize,
//             registrationDeadline,
//             rewardsAndBenefits: rewardsAndBenefits ? JSON.parse(rewardsAndBenefits) : []
//         });

//         res.status(201).json({
//             success: true,
//             data: hackathon
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// @desc    Update hackathon
export const updateHackathon = async (req, res, next) => {
    try {
        let hackathon = await Hackathon.findById(req.params.id);

        if (!hackathon) {
            return res.status(404).json({
                success: false,
                error: `Hackathon not found with id of ${req.params.id}`
            });
        }

        // Handle image upload if a new banner is provided
        if (req.file) {
            // Delete previous image from Cloudinary
            const publicId = hackathon.bannerImage
                .split('/')
                .slice(-2)
                .join('/')
                .split('.')[0];
            await cloudinary.uploader.destroy(publicId);

            // Upload new image
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'hackathon_banners',
                width: 1200,
                crop: 'scale'
            });

            req.body.bannerImage = result.secure_url;
        }

        // Handle rewards and benefits if provided as a string
        if (req.body.rewardsAndBenefits && typeof req.body.rewardsAndBenefits === 'string') {
            req.body.rewardsAndBenefits = JSON.parse(req.body.rewardsAndBenefits);
        }

        hackathon = await Hackathon.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: hackathon
        });
    } catch (error) {
        next(error);
    }
};

export const deleteHackathon = async (req, res, next) => {
    try {
        const hackathon = await Hackathon.findById(req.params.id);

        if (!hackathon) {
            return res.status(404).json({
                success: false,
                error: `Hackathon not found with id of ${req.params.id}`
            });
        }

        // Delete banner image from Cloudinary
        if (hackathon.bannerImage) {
            const publicId = hackathon.bannerImage
                .split('/')
                .slice(-2)
                .join('/')
                .split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        await hackathon.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};

//   Get all hackathons
export const getHackathons = async (req, res, next) => {
    try {
        const hackathons = await Hackathon.find()
            // .populate('panelMembers')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: hackathons.length,
            data: hackathons
        });
    } catch (error) {
        next(error);
    }
};

//  Get single hackathon
export const getHackathon = async (req, res, next) => {
    try {
        const hackathon = await Hackathon.findById(req.params.id).populate([
            { path: 'panelMembers' },
            // { path: 'teams' }
        ]);

        if (!hackathon) {
            return res.status(404).json({
                success: false,
                error: `Hackathon not found with id of ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            data: hackathon
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add panel member to hackathon
// @route   PUT /api/v1/hackathons/:id/panel-members/:memberId
// @access  Private (Admin)
// export const addPanelMember = async (req, res, next) => {
//   try {
//     const hackathon = await Hackathon.findById(req.params.id);
//     const memberId = req.params.memberId;

//     if (!hackathon) {
//       return res.status(404).json({
//         success: false,
//         error: Hackathon not found with id of ${req.params.id}
//       });
//     }

//     // Check if member already exists in panel
//     if (hackathon.panelMembers.includes(memberId)) {
//       return res.status(400).json({
//         success: false,
//         error: Panel member is already added to this hackathon
//       });
//     }

//     hackathon.panelMembers.push(memberId);
//     await hackathon.save();

//     res.status(200).json({
//       success: true,
//       data: hackathon
//     });
//   } catch (error) {
//     next(error);
//   }
// };