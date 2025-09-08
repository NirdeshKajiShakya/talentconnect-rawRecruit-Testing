import HiringDrive from '../models/HiringChannelOffCampusRegister.js';

import CompanyProfile from '../models/companyDashboard/companyProfileModel.js'

export const offCampusRegister = async (req, res) =>{
  try {
    const userId = req.user._id ; 
     
    const companyProfile = await CompanyProfile.findOne({ userId });

    if (!companyProfile) {
      return res.status(404).json({ error: "Company profile not found" });
    }
  
    const hiringDrive = new HiringDrive({
      ...req.body,
      companyId: companyProfile._id, 
    });

    await hiringDrive.save();
     res.status(201).json({
      success: true,
    //  message: "Off-campus job posted successfully",
      data: hiringDrive,
    });  
  } catch (err) {
   // message: "Error creating off-campus job",
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

export const getOffCampusRegistrations = async (req, res) => {
  try {
    const registrations = await HiringDrive.find().sort({ createdAt: -1 }).lean();
    res.status(200).json({ success: true, data: registrations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



