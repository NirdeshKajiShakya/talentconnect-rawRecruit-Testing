import PanelMember from '../models/panelMember.model.js';
import cloudinary from '../../config/cloudinary.js';


//Create a new panel member

export const createPanelMember = async (req, res, next) => {
  try {
    const { name, role, jobTitle, organization } = req.body;

    // Upload profile image to Cloudinary
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Please upload a profile image'
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'panel_member_profiles',
      width: 500,
      crop: 'scale'
    });

    // Create panel member
    const panelMember = await PanelMember.create({
      name,
      role,
      jobTitle,
      organization,
     // bio,
      profileImage: result.secure_url,
      hackathons: req.body.hackathons ? JSON.parse(req.body.hackathons) : []
    });

    res.status(201).json({
      success: true,
      data: panelMember
    });
  } catch (error) {
    next(error);
  }
};

//    Get all panel members

export const getPanelMembers = async (req, res, next) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(`/\b(gt|gte|lt|lte|in)\b/g, match => $${match}`);

    // Finding resource
    query = PanelMember.find(JSON.parse(queryStr)).populate('hackathons');

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await PanelMember.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const panelMembers = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: panelMembers.length,
      pagination,
      data: panelMembers
    });
  } catch (error) {
    next(error);
  }
};

//    Get single panel member

export const getPanelMember = async (req, res, next) => {
  try {
    const panelMember = await PanelMember.findById(req.params.id).populate('hackathons');

    if (!panelMember) {
      return res.status(404).json({
        success: false,
        error: `Panel member not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: panelMember
    });
  } catch (error) {
    next(error);
  }
};

//   Update panel member

export const updatePanelMember = async (req, res, next) => {
  try {
    let panelMember = await PanelMember.findById(req.params.id);

    if (!panelMember) {
      return res.status(404).json({
        success: false,
        error: `Panel member not found with id of ${req.params.id}`
      });
    }

    // Handle image upload if a new profile image is provided
    if (req.file) {
      // Delete previous image from Cloudinary
      const publicId = panelMember.profileImage
        .split('/')
        .slice(-2)
        .join('/')
        .split('.')[0];
      await cloudinary.uploader.destroy(publicId);

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'panel_member_profiles',
        width: 500,
        crop: 'scale'
      });

      req.body.profileImage = result.secure_url;
    }

    // Handle hackathons array if provided as a string
    if (req.body.hackathons && typeof req.body.hackathons === 'string') {
      req.body.hackathons = JSON.parse(req.body.hackathons);
    }

    panelMember = await PanelMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: panelMember
    });
  } catch (error) {
    next(error);
  }
};

//  Delete panel member

export const deletePanelMember = async (req, res, next) => {
  try {
    const panelMember = await PanelMember.findById(req.params.id);

    if (!panelMember) {
      return res.status(404).json({
        success: false,
        error: `Panel member not found with id of ${req.params.id}`
      });
    }

    // Delete profile image from Cloudinary
    if (panelMember.profileImage) {
      const publicId = panelMember.profileImage
        .split('/')
        .slice(-2)
        .join('/')
        .split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await panelMember.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};