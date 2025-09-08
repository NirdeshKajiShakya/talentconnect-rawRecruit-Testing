import OnboardingModel from "../models/studentonboardingmodel.js";
import Auth from "../models/auth.js"; // Import the Auth model
import cloudinary from "../../config/cloudinary.js"; // Assuming cloudinary config is here
import streamifier from "streamifier";

// Utility for streaming upload
const streamUpload = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: `rawrecruit/${folder}` },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const getAllOnboardingForms = async (req, res) => {
  try {
    const forms = await OnboardingModel.find({});
    res.status(200).json({
      message: "Successfully fetched all onboarding forms.",
      data: forms,
    });
  } catch (error) {
    console.error("Error fetching all onboarding forms:", error);
    res.status(500).json({
      message: "Internal server error while fetching forms.",
      error: error.message,
    });
  }
};

// export const submitOnboardingForm = async (req, res) => {
//   try {
//     if (!req.user || !req.user._id) {
//       return res
//         .status(401)
//         .json({ error: "Unauthorized: User not authenticated." });
//     }

//     const {
//       name,
//       email,
//       phone,
//       profileType,
//       college,
//       degree,
//       semester,
//       specialization,
//       cgpa,
//       yearOfGraduation,
//       industry,
//       jobRoles,
//       locations,
//       expectedSalaryCurrency,
//       expectedSalaryAmount,
//       currentSalaryCurrency,
//       currentSalaryAmount,
//       lookingFor,
//       employmentType,
//       skills,
//       certifications,
//       linkedin,
//       github,
//       portfolio,
//       referralSource,
//       experiences,
//       leadership,
//       internationalExperience,
//       awards,     

//     } = req.body; 

//     const newEntry = new OnboardingModel({
//       userId: req.user._id,
//       name,
//       email,
//       phone,
//       profileType: profileType,
//       college,
//       degree,
//       semester,
//       specialization,
//       cgpa,
//       yearOfGraduation,
//       industry: industry ? industry.split(",") : [],
//       jobRoles: jobRoles ? jobRoles.split(",") : [],
//       locations: locations ? locations.split(",") : [],
//       expectedSalaryCurrency,
//       expectedSalaryAmount,
//       currentSalaryCurrency,
//       currentSalaryAmount,
//       lookingFor,
//       employmentType,
//       skills: skills ? skills.split(",") : [],
//       certifications,
//       linkedin,
//       github,
//       portfolio,
//       referralSource,
//       experiences: experiences ? JSON.parse(experiences) : [],

//       leadership: leadership ? JSON.parse(leadership) : [],
//       internationalExperience: internationalExperience ? JSON.parse(internationalExperience) : [],
//       awards: awards ? JSON.parse(awards) : [],
//     });

//     const files = req.files;
//     const uploads = {};

//     // Upload resume
//     if (files?.resume?.[0]) {
//       uploads.resumeUrl = (
//         await streamUpload(files.resume[0].buffer, "resumes")
//       ).secure_url;
//       newEntry.resume = uploads.resumeUrl;
//     }

//     // Upload degree certificate
//     if (files?.degreeCertificate?.[0]) {
//       uploads.degreeCertificateUrl = (
//         await streamUpload(files.degreeCertificate[0].buffer, "degreeCertificates")
//       ).secure_url;
//       newEntry.degreeCertificate = uploads.degreeCertificateUrl;
//     }

//     // Upload project
//     if (files?.project?.[0]) {
//       uploads.projectUrl = (
//         await streamUpload(files.project[0].buffer, "projects")
//       ).secure_url;
//       newEntry.project = uploads.projectUrl;
//     }

//     // Upload background image
//     if (files?.backgroundImage?.[0]) {
//       uploads.backgroundImageUrl = (
//         await streamUpload(files.backgroundImage[0].buffer, "userBackgroundImages")
//       ).secure_url;
//       newEntry.backgroundImage = uploads.backgroundImageUrl;
//     }

//     // Upload profile image
//     if (files?.profileImage?.[0]) {
//       uploads.profileImageUrl = (
//         await streamUpload(files.profileImage[0].buffer, "userProfileImages")
//       ).secure_url;
//       newEntry.profileImage = uploads.profileImageUrl;
//     }

//     // Experience certificates (optional, multiple)
//     if (files?.experienceCertificate && newEntry.experiences) {
//       const experienceCerts = files.experienceCertificate;
//       for (let i = 0; i < newEntry.experiences.length && i < experienceCerts.length; i++) {
//         const uploadedCert = await streamUpload(
//           experienceCerts[i].buffer,
//           "experienceCertificates"
//         );
//         newEntry.experiences[i].experienceCertificate = uploadedCert.secure_url;
//       }
//     }

//     if (files?.leadershipCertificate && newEntry.leadership) {
//       const leadershipCerts = files.leadershipCertificate;
//       for (let i = 0; i < newEntry.leadership.length && i < leadershipCerts.length; i++) {
//         const uploadedCert = await streamUpload(
//           leadershipCerts[i].buffer,
//           "leadershipCertificates"
//         );
//         newEntry.leadership[i].certificate = uploadedCert.secure_url;
//       }
//     }

//     if (files?.internationalExperienceCertificate && newEntry.internationalExperience) {
//       const internationalCerts = files.internationalExperienceCertificate;
//       for (let i = 0; i < newEntry.internationalExperience.length && i < internationalCerts.length; i++) {
//         const uploadedCert = await streamUpload(
//           internationalCerts[i].buffer,
//           "internationalExperienceCertificates"
//         );
//         newEntry.internationalExperience[i].certificate = uploadedCert.secure_url;
//       }
//     }

//     if (files?.awardCertificate && newEntry.awards) {
//       const awardCerts = files.awardCertificate;
//       for (let i = 0; i < newEntry.awards.length && i < awardCerts.length; i++) {
//         const uploadedCert = await streamUpload(
//           awardCerts[i].buffer,
//           "awardCertificates"
//         );
//         newEntry.awards[i].certificate = uploadedCert.secure_url;
//       }
//     }

//     await newEntry.save();

//     let finalUserTypeForResponse = "candidate";
//     if (profileType) {
//       let authUserType = profileType.toLowerCase();
//       if (authUserType === "student") authUserType = "student";
//       else if (authUserType === "fresher") authUserType = "fresher";
//       else if (authUserType === "professional") authUserType = "professional";
//       else authUserType = "candidate";

//       await Auth.findByIdAndUpdate(req.user._id, { userType: authUserType });
//       console.log(`User ${req.user.email} userType updated to ${authUserType}`);
//       finalUserTypeForResponse = authUserType;
//     }

//     const updatedUser = await Auth.findById(req.user._id).select("-password") ;
    
//      if (!updatedUser) {
//       return res.status(404).json({ error: "User not found after update." });
//     }
    
//     res.status(201).json({
//       message: "Form submitted successfully!",
//       profileType: profileType,
//       userType: finalUserTypeForResponse,
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error("Form submission error (backend):", error);
//     res
//       .status(500)
//       .json({ error: "Form submission failed.", details: error.message });
//   }
// };

export const submitOnboardingForm = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User not authenticated." });
    }

   
    const updateData = {
      userId: req.user._id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      profileType: req.body.profileType,
      college: req.body.college,
      degree: req.body.degree,
      semester: req.body.semester,
      specialization: req.body.specialization,
      cgpa: req.body.cgpa,
      yearOfGraduation: req.body.yearOfGraduation,
      expectedSalaryCurrency: req.body.expectedSalaryCurrency,
      expectedSalaryAmount: req.body.expectedSalaryAmount,
      currentSalaryCurrency: req.body.currentSalaryCurrency,
      currentSalaryAmount: req.body.currentSalaryAmount,
      lookingFor: req.body.lookingFor,
      employmentType: req.body.employmentType,
      certifications: req.body.certifications,
      linkedin: req.body.linkedin,
      github: req.body.github,
      portfolio: req.body.portfolio,
      referralSource: req.body.referralSource,
    
      industry: req.body.industry ? req.body.industry.split(",") : [],
      jobRoles: req.body.jobRoles ? req.body.jobRoles.split(",") : [],
      locations: req.body.locations ? req.body.locations.split(",") : [],
      skills: req.body.skills ? req.body.skills.split(",") : [],
      experiences: req.body.experiences ? JSON.parse(req.body.experiences) : [],
      leadership: req.body.leadership ? JSON.parse(req.body.leadership) : [],
      internationalExperience: req.body.internationalExperience ? JSON.parse(req.body.internationalExperience) : [],
      awards: req.body.awards ? JSON.parse(req.body.awards) : [],
    };

    const files = req.files;

    
    if (files?.resume?.[0]) {
      const upload = await streamUpload(files.resume[0].buffer, "resumes");
      updateData.resume = upload.secure_url;
    }
    if (files?.degreeCertificate?.[0]) {
      const upload = await streamUpload(files.degreeCertificate[0].buffer, "degreeCertificates");
      updateData.degreeCertificate = upload.secure_url;
    }
    if (files?.project?.[0]) {
      const upload = await streamUpload(files.project[0].buffer, "projects");
      updateData.project = upload.secure_url;
    }
    if (files?.backgroundImage?.[0]) {
      const upload = await streamUpload(files.backgroundImage[0].buffer, "userBackgroundImages");
      updateData.backgroundImage = upload.secure_url;
    }
    if (files?.profileImage?.[0]) {
      const upload = await streamUpload(files.profileImage[0].buffer, "userProfileImages");
      updateData.profileImage = upload.secure_url;
    }


    if (files?.experienceCertificate && updateData.experiences) {
      const experienceCerts = files.experienceCertificate;
      for (let i = 0; i < updateData.experiences.length && i < experienceCerts.length; i++) {
        const uploadedCert = await streamUpload(
          experienceCerts[i].buffer,
          "experienceCertificates"
        );
        updateData.experiences[i].experienceCertificate = uploadedCert.secure_url;
      }
    }

  
    if (files?.leadershipCertificate && updateData.leadership) {
      const leadershipCerts = files.leadershipCertificate;
      for (let i = 0; i < updateData.leadership.length && i < leadershipCerts.length; i++) {
        const uploadedCert = await streamUpload(
          leadershipCerts[i].buffer,
          "leadershipCertificates"
        );
        updateData.leadership[i].certificate = uploadedCert.secure_url;
      }
    }


    if (files?.internationalExperienceCertificate && updateData.internationalExperience) {
      const internationalCerts = files.internationalExperienceCertificate;
      for (let i = 0; i < updateData.internationalExperience.length && i < internationalCerts.length; i++) {
        const uploadedCert = await streamUpload(
          internationalCerts[i].buffer,
          "internationalExperienceCertificates"
        );
        updateData.internationalExperience[i].certificate = uploadedCert.secure_url;
      }
    }


    if (files?.awardCertificate && updateData.awards) {
      const awardCerts = files.awardCertificate;
      for (let i = 0; i < updateData.awards.length && i < awardCerts.length; i++) {
        const uploadedCert = await streamUpload(
          awardCerts[i].buffer,
          "awardCertificates"
        );
        updateData.awards[i].certificate = uploadedCert.secure_url;
      }
    }

    
    const updatedOnboarding = await OnboardingModel.findOneAndUpdate(
      { userId: req.user._id }, 
      { $set: updateData },     
      { upsert: true, new: true, runValidators: true } 
    );

   
    let finalUserTypeForResponse = "candidate";
    let authUserType = "candidate";
    
    if (req.body.profileType) {
      authUserType = req.body.profileType.toLowerCase();
      if (authUserType === "student") authUserType = "student";
      else if (authUserType === "fresher") authUserType = "fresher";
      else if (authUserType === "professional") authUserType = "professional";
      else authUserType = "candidate";

      finalUserTypeForResponse = authUserType;
    }

    // Update user with onboarding completed status
    const updatedUser = await Auth.findByIdAndUpdate(
      req.user._id,
      { 
        userType: authUserType,
        onboardingCompleted: true, // Set onboarding as completed
        onboardingStep: 6 // Set to final step
      },
      { new: true } // Return the updated document
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found after update." });
    }

    console.log(`User ${req.user.email} updated: userType=${authUserType}, onboardingCompleted=true`);

    res.status(201).json({
      message: "Form submitted successfully!",
      profileType: req.body.profileType,
      userType: finalUserTypeForResponse,
      user: updatedUser,
      onboarding: updatedOnboarding
    });
  } catch (error) {
    console.error("Form submission error (backend):", error);
    
    if (error.code === 11000) {
      return res.status(409).json({ error: "A profile for this user already exists." });
    }
    res
      .status(500)
      .json({ error: "Form submission failed.", details: error.message });
  }
};

export const getOnboardingForm = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized: User not authenticated." });
    }

    // No need to exclude binary data if storing URLs
    const entry = await OnboardingModel.findOne({ userId: req.user._id });

    if (!entry) {
      return res.status(404).json({ error: "Onboarding entry not found for this user." });
    }

    res.json(entry);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch data.", details: error.message });
  }
};


export const updateOnboardingForm = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized: User not authenticated." });
    }

    let existingEntry = await OnboardingModel.findOne({ userId: req.user._id });
    const updates = { ...req.body };
    const files = req.files;

    // Parse stringified arrays/objects from form data
    const fieldsToParse = ['jobRoles', 'locations', 'industry', 'skills'];
    fieldsToParse.forEach(field => {
        if (updates[field]) updates[field] = updates[field].split(',');
    });

    const jsonFields = ['experiences', 'leadership', 'internationalExperience', 'awards'];
    jsonFields.forEach(field => {
        if (updates[field]) updates[field] = JSON.parse(updates[field]);
    });

    // Handle single file uploads
    const fileFields = {
        resume: 'resumes',
        degreeCertificate: 'degreeCertificates',
        project: 'projects',
        backgroundImage: 'userBackgroundImages',
        profileImage: 'userProfileImages'
    };
    for (const field in fileFields) {
        if (files?.[field]?.[0]) {
            updates[field] = (await streamUpload(files[field][0].buffer, fileFields[field])).secure_url;
        }
    }

    // Handle multiple certificate uploads
    const certFileFields = {
      experienceCertificate: { modelField: 'experiences', certField: 'experienceCertificate', folder: 'experienceCertificates'},
      leadershipCertificate: { modelField: 'leadership', certField: 'certificate', folder: 'leadershipCertificates'},
      internationalExperienceCertificate: { modelField: 'internationalExperience', certField: 'certificate', folder: 'internationalExperienceCertificates'},
    };

    for (const fieldName in certFileFields) {
        if (files?.[fieldName] && updates[certFileFields[fieldName].modelField]) {
            const certs = files[fieldName];
            let certIndex = 0;
            for (let i = 0; i < updates[certFileFields[fieldName].modelField].length; i++) {
                // If the experience item doesn't have a certificate URL and there are certs left to assign
                if (!updates[certFileFields[fieldName].modelField][i][certFileFields[fieldName].certField] && certIndex < certs.length) {
                    const uploadedCert = await streamUpload(certs[certIndex].buffer, certFileFields[fieldName].folder);
                    updates[certFileFields[fieldName].modelField][i][certFileFields[fieldName].certField] = uploadedCert.secure_url;
                    certIndex++;
                }
            }
        }
    }
    
    // Update or create the entry
    let updated;
    if (existingEntry) {
      updated = await OnboardingModel.findByIdAndUpdate(existingEntry._id, updates, { new: true, runValidators: true });
    } else {
      const newEntry = new OnboardingModel({ userId: req.user._id, ...updates });
      updated = await newEntry.save();
    }

    if (!updated) return res.status(404).json({ error: "Entry not found." });

    // Update userType in Auth model if profileType is updated
    if (updates.profileType) {
      let authUserType = "candidate"; // default
      const profileTypeLower = updates.profileType.toLowerCase();
      if (["student", "fresher", "professional"].includes(profileTypeLower)) {
          authUserType = profileTypeLower;
      }
      await Auth.findByIdAndUpdate(req.user._id, { userType: authUserType });
      console.log(`User ${req.user.email} userType updated to ${authUserType}`);
    }

    res.json({ message: "Form updated successfully.", data: updated });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Update failed.", details: error.message });
  }
};