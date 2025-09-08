import Registration from "../models/HiringChannels_oncampusregister.js";
import collegeOnboardingModel from "../models/collegeDashboard/collegeOnboardingModel.js";
import CompanyProfile from "../models/companyDashboard/companyProfileModel.js";
// import { oncampusApplicationService, poolcampusApplicationService } from "../services/Application.service.js";
import OnCampusApplication from "../models/oncampusApplicationModel.js";
import { JobPostingTable } from "../models/jobPostingsModel.js";

export const submitRegistration = async (req, res) => {
  try {

    const userId = req.user._id;

    const companyProfile = await CompanyProfile.findOne({ userId });

    if (!companyProfile) {
      return res.status(404).json({ error: "Company profile not found" });
    }

    const registration = new Registration({
      ...req.body,
      companyPosted: companyProfile._id, // Store the company ID
    });
    console.log("Registration Data:", registration);
    await registration.save();
    //console.log("Registration saved successfully");
    res.status(201).json({
      success: true,
      //  message: "Pool campus hiring request submitted successfully",
      data: registration,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllRegistrations = async (req, res) => {
  try {

    const response = await Registration.find()
      .populate({
        path: 'companyPosted',
        select: 'companyDetails profileImage', // Add fields you need
      })
      .lean();
    //  console.log("API Response:", JSON.stringify(response, null, 2));
    res.status(200).json({ success: true, data: response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getRegistrationDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await JobPostingTable.findById(id)
      .populate({
        path: 'companyPosted',
        select: 'companyDetails profileImage hiringPreferences',
      })
      .lean();

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



// export const getCompanyOnCampusHiringWithApplications = async (req, res) => {
//     try {
//         const authUserId = req.user._id;
//         const companyProfile = await CompanyProfile.findOne({ userId: authUserId });

//         if (!companyProfile) {
//             return res.status(404).json({ message: "Company profile not found for this user." });
//         }

//         const companyId = companyProfile._id; 
//         const currentDate = new Date(); 


//         const companyHiringData = await Registration.aggregate([
//             {

//                 $match: {
//                     companyPosted: companyId,
//                     //  endDate: { $gte: new Date() } 
//                 }
//             },
//             {

//                 $lookup: {
//                     from: OnCampusApplication.collection.name, 
//                     localField: "_id",
//                     foreignField: "drive",
//                     as: "applications"
//                 }
//             },
//             {

//                 $addFields: {
//                     applicationCount: { $size: "$applications" }
//                 }
//             },
//             {

//                 $project: {
//                     companyPosted: 1,
//                     degree: 1,
//                     preferredLocations:  { $arrayElemAt: ["$preferredLocations", 0] },
//                     lookingFor: 1,
//                     employmentType: 1,
//                     minimumSalary: 1,
//                     startDate: 1,
//                     endDate: 1,
//                     rounds: 1,
//                     selectionProcess: 1,
//                     contactPerson: 1,
//                     contactDesignation: 1,
//                     email: 1,
//                     mobile: 1,
//                     linkedin: 1,
//                     minimumStudents: 1,
//                     createdAt: 1,
//                     updatedAt: 1,
//                     applicationCount: 1, // Include the calculated application count
//                     "applications.college": 1, // Include college ID from applications
//                     "applications.currentStatus": 1 // Include current status from applications
//                 }
//             },
//             {

//                 $lookup: {
//                     from: "collegeonboardings", 
//                     localField: "applications.college", 
//                     foreignField: "_id",
//                     as: "appliedCollegesDetails" 
//                 }
//             },
//             {

//                 $project: {
//                     applications: 0,
//                 }
//             }
//         ]);

//          console.log("Company Hiring Data:", companyHiringData);
//         if (companyHiringData.length === 0) {
//             return res.status(200).json({ message: "No active on-campus hiring drives found for this company.", data: [] });
//         }


//         res.status(200).json({
//             success: true,
//             count: companyHiringData.length,
//             data: companyHiringData,
//         });

//     } catch (error) {
//         console.error("Error fetching company on-campus hiring data:", error);
//         res.status(500).json({ message: "Internal server error." });
//     }
// };


// export const getCollegesForOnCampusJob = async (req, res) => {
//     try {
//         const { jobId } = req.params; // Get the job/drive ID from request parameters

//         // Find all on-campus applications for the given drive ID
//         const applications = await OnCampusApplication.find({ drive: jobId })
//             .populate({
//                 path: 'college', // Populate the 'college' field
//                 select: 'collegeUniversityDetails placementCoordinatorDetails,placementRecruitmentDetails, profileImage', // Select specific fields from CollegeOnboarding
//                 model: 'CollegeOnboarding' // Explicitly specify the model to populate from
//             })
//             .lean(); // Return plain JavaScript objects


//         const colleges = applications.map(app => ({
//             ...app.college.collegeUniversityDetails,
//             coordinator: app.college.placementCoordinatorDetails, 
//             profileImage: app.college.profileImage, 
//             recruitmentDetails: app.college.placementRecruitmentDetails,
//             applicationId: app._id, 
//             appliedAt: app.createdAt 
//         }));


//         res.status(200).json({ success: true, data: colleges });

//     } catch (error) {
//         console.error("Error fetching colleges for on-campus job:", error);
//         res.status(500).json({ message: "Internal server error." });
//     }
// };


export const getCompanyOnCampusHiringWithApplications = async (req, res) => {
  try {
    const authUserId = req.user._id;
    const companyProfile = await CompanyProfile.findOne({ userId: authUserId });

    if (!companyProfile) {
      return res.status(404).json({ message: "Company profile not found for this user." });
    }

    const companyId = companyProfile._id;

    const companyHiringData = await Registration.aggregate([
      {
        $match: {
          companyPosted: companyId,
        }
      },
      {
        // Lookup applications related to this drive
        $lookup: {
          from: OnCampusApplication.collection.name,
          localField: "_id",
          foreignField: "drive",
          as: "applications"
        }
      },
      {
        // Calculate the count of applications
        $addFields: {
          applicationCount: { $size: "$applications" }
        }
      },
      {
        // Project only the fields needed for the list view
        $project: {
          _id: 1, // The drive ID itself
          degree: 1,
          preferredLocations: 1, // Keep as is, let frontend handle array display
          lookingFor: 1, // This can serve as "Drive Title / Roles"
          employmentType: 1,
          endDate: 1, // For "End Date"
          applicationCount: 1, // For "Applications" column
          startDate: 1, // For drive period in detail view
          // Do NOT include detailed college data here
        }
      }
    ]);

    // console.log("Company Hiring Data (List View):", companyHiringData); // Uncomment for debugging
    if (companyHiringData.length === 0) {
      return res.status(200).json({ message: "No active on-campus hiring drives found for this company.", data: [] });
    }

    res.status(200).json({
      success: true,
      count: companyHiringData.length,
      data: companyHiringData,
    });

  } catch (error) {
    console.error("Error fetching company on-campus hiring data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


export const getCollegesForOnCampusJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // First, fetch the FULL details of the On-Campus Drive without select()
    // This is the main change to get all fields.
    const driveDetails = await Registration.findById(jobId).lean();

    if (!driveDetails) {
      return res.status(404).json({ success: false, message: "On-Campus Drive not found." });
    }

    // Then, fetch all applications for this drive and populate college details
    const applications = await OnCampusApplication.find({ drive: jobId })
      .populate({
        path: 'college',
        select: `
          collegeUniversityDetails.collegeName
          collegeUniversityDetails.city
          collegeUniversityDetails.state
          collegeUniversityDetails.country
          collegeUniversityDetails.pincode
          collegeUniversityDetails.collegeProfilePdf
          collegeUniversityDetails.collegeDescriptionPdf
          placementRecruitmentDetails.placementRate
          placementRecruitmentDetails.highestPackage
          placementRecruitmentDetails.averagePackage
          profileAchievements.collegeWebsite
          profileAchievements.linkedinProfile
          profileImage
        `,
        model: 'CollegeOnboarding'
      })
      .lean();

    // Now, map and merge ALL driveDetails with each application
    const colleges = applications.map(app => ({
      // Application specific data
      applicationId: app._id,
      appliedAt: app.createdAt,
      currentStatus: app.currentStatus,

      // College details from populated data
      collegeName: app.college?.collegeUniversityDetails?.collegeName || 'Not Specified',
      city: app.college?.collegeUniversityDetails?.city || 'Not Specified',
      state: app.college?.collegeUniversityDetails?.state || 'Not Specified',
      country: app.college?.collegeUniversityDetails?.country || 'Not Specified',
      pincode: app.college?.collegeUniversityDetails?.pincode || 'Not Specified',
      profileImage: app.college?.profileImage || null,
      collegeProfilePdf: app.college?.collegeUniversityDetails?.collegeProfilePdf || null,
      collegeDescriptionPdf: app.college?.collegeUniversityDetails?.collegeDescriptionPdf || null,
      collegeWebsite: app.college?.profileAchievements?.collegeWebsite || null,
      linkedinProfile: app.college?.profileAchievements?.linkedinProfile || null, // College's LinkedIn
      placementRate: app.college?.placementRecruitmentDetails?.placementRate || 'Not Specified',
      highestPackage: app.college?.placementRecruitmentDetails?.highestPackage || 'Not Specified',
      averagePackage: app.college?.placementRecruitmentDetails?.averagePackage || 'Not Specified',

      // Use the spread operator to include ALL fields from driveDetails
      ...driveDetails,
    }));

    res.status(200).json({ success: true, data: colleges });

  } catch (error) {
    console.error("Error fetching colleges for on-campus job:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export async function getOncampusCollegeApplication(req, res) {
  const collegeId = req.user._id;

  try {
    const college = await collegeOnboardingModel.find({ userId: collegeId });
    if (!college) return res.status(404).json({ error: "Invalid college" });

    // console.log(college[0]);

    const query = {};
    query.college = college[0]._id;

    const response = await getOncampusApplicantsService(query);
    // console.log(response);

    if (response.success) res.status(200).json(response);
    else res.status(404).json(response);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ Error: "Internal server error" });
  }
}