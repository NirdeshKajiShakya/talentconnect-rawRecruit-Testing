import PoolCampusHiring from '../models/HiringChannelPoolCampusModel.js'
// import collegeOnboardingModel from '../models/collegeDashboard/collegeOnboardingModel.js';
import CompanyProfile from '../models/companyDashboard/companyProfileModel.js'
// import { checkPoolCampusApplicationExitence, poolcampusApplicationService } from '../services/Application.service.js';
import PoolCampusApplication from '../models/poolcampusApplicationModel.js';


export const poolCampusRegister = async (req, res) => {
  try {
    const userId = req.user._id;

    const companyProfile = await CompanyProfile.findOne({ userId });

    if (!companyProfile) {
      return res.status(404).json({ error: "Company profile not found" });
    }
    const poolCampusHiring = new PoolCampusHiring({
      ...req.body,
      companyId: companyProfile._id,
    })

    await poolCampusHiring.save();
    res.status(201).json({
      success: true,
      //  message: "Pool campus hiring request submitted successfully",
      data: poolCampusHiring,
    });
  } catch (err) {
    //  message: "Error creating pool campus hiring request",
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

export const getAllRegistrations = async (req, res) => { 
   try {
    const response = await JobPostingTable.find({ 
     jobType: "Pool-campus",
     visibleTo: "College"
    })
     .populate({
       path: 'companyPosted',
       select: 'companyDetails profileImage',
     })
     .lean()
     .sort({ createdAt: -1 });

 res.status(200).json({ success: true, data: response });

} catch (err) {
 console.error(err);
 res.status(500).json({ error: err.message });
 }
};

export const getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await PoolCampusHiring.findById(id)
      .populate({
        path: 'companyId',
        select: 'companyDetails profileImage hiringPreferences',
      })
      .lean();
    res.status(200).json(response);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}


// export async function getPoolCampusApplicationByCollege(req, res) {
//   const collegeId = req.user._id;

//   // console.log("ids", collegeId, " ", jobId);

//   try {
//     const college = await collegeOnboardingModel.find({ userId: collegeId });

//     const application = await poolcampusApplicationService(college[0]._id, jobId);
//     res.status(201).json({ msg: "Application Submitted" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Internal Server" });
//   }
// }

export const getCompanyPoolCampusHiringWithApplications = async (req, res) => {
  try {
    const authUserId = req.user._id;;

    const companyProfile = await CompanyProfile.findOne({ userId: authUserId });

    if (!companyProfile) {
      return res.status(404).json({ message: "Company profile not found for this user." });
    }

    const companyId = companyProfile._id;
    const currentDate = new Date(); // Get the current date

    const companyHiringData = await PoolCampusHiring.aggregate([
      {
        $match: {
          companyId: companyId, // Filter by the specific company's ID
          placementEndDate: { $gte: currentDate } // Filter where placementEndDate is today or in the future
        }
      },
      {
        $lookup: {
          from: PoolCampusApplication.collection.name,
          localField: "_id",
          foreignField: "drive",
          as: "applications"
        }
      },
      {
        $addFields: {
          applicationCount: { $size: "$applications" }
        }
      },
      {
        $project: {
          companyId: 1,
          venue: 1,
          collegeTypes: 1,
          studentStreams: 1,
          criteria: 1,
          minPackage: 1,
          workLocations: 1,
          jobRoles: 1,
          workMode: 1,
          employmentType: 1,
          placementStartDate: 1,
          placementEndDate: 1,
          numberOfRounds: 1,
          selectionProcess: 1,
          contactPerson: 1,
          minStudents: 1,
          createdAt: 1,
          updatedAt: 1,
          applicationCount: 1,
          "applications.college": 1,
          "applications.currentStatus": 1
        }
      },
      {
        $lookup: {
          from: "collegeonboardings",
          localField: "applications.college",
          foreignField: "_id",
          as: "appliedCollegesDetails"
        }
      },
      {
        $project: {
          applications: 0,
        }
      }
    ]);

    if (companyHiringData.length === 0) {
      return res.status(200).json({ message: "No active pool campus hiring drives found for this company.", data: [] });
    }

    res.status(200).json({
      success: true,
      count: companyHiringData.length,
      data: companyHiringData,
    });

  } catch (error) {
    console.error("Error fetching company pool campus hiring data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// controllers/hiringChannelPoolCampus.controller.js
export const getCollegesForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await PoolCampusApplication.find({ drive: jobId })
      .populate({
        path: 'college',
        select: 'collegeUniversityDetails placementCoordinatorDetails profileImage',
        model: 'CollegeOnboarding'
      })
      .lean();

    const colleges = applications.map(app => ({
      ...app.college.collegeUniversityDetails,
      coordinator: app.college.placementCoordinatorDetails,
      profileImage: app.college.profileImage,
      applicationId: app._id,
      appliedAt: app.createdAt
    }));

    res.status(200).json({ success: true, data: colleges });
  } catch (error) {
    console.error("Error fetching colleges for job:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};