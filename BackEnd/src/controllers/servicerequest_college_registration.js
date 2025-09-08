// import SeminarRegistration from "../models/ServiceRequest_college_registration.js";

// export const createSeminarRegistration = async (req, res) => {
//   try {
//     console.log("Received request body:", req.body);

//     // Handle both old and new field names for compatibility
//     const {
//       numberOfStudents,
//       numberOfEmployees, // old field name
//       seminarTypes,
//       skillTypes, // old field name
//       evaluationType,
//       duration,
//       hoursOrDays, // old field name
//     } = req.body;

//     // Map old field names to new ones
//     const mappedData = {
//       numberOfStudents: numberOfStudents || numberOfEmployees,
//       seminarTypes: seminarTypes || skillTypes,
//       evaluationType,
//       duration: duration || hoursOrDays,
//     };

//     // Validate required fields using mapped data
//     if (!mappedData.numberOfStudents) {
//       return res.status(400).json({
//         success: false,
//         message: "Number of students is required.",
//       });
//     }

//     if (
//       !mappedData.seminarTypes ||
//       !Array.isArray(mappedData.seminarTypes) ||
//       mappedData.seminarTypes.length === 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "At least one seminar type is required.",
//       });
//     }

//     if (!mappedData.evaluationType) {
//       return res.status(400).json({
//         success: false,
//         message: "Evaluation type is required.",
//       });
//     }

//     if (!mappedData.duration) {
//       return res.status(400).json({
//         success: false,
//         message: "Duration is required.",
//       });
//     }

//     // Create new registration with mapped data
//     const registration = new SeminarRegistration({
//       numberOfStudents: mappedData.numberOfStudents,
//       seminarTypes: mappedData.seminarTypes,
//       evaluationType: mappedData.evaluationType,
//       duration: mappedData.duration,
//     });

//     console.log("Attempting to save:", registration);

//     const savedRegistration = await registration.save();

//     console.log("Successfully saved:", savedRegistration);

//     res.status(201).json({
//       success: true,
//       message: "Registration created successfully",
//       data: savedRegistration,
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };
