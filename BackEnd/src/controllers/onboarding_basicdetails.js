import BasicDetail from "../models/Onboarding_basicdetails.js";
export const submitBasicDetails = async (req, res) => {
  try {
    console.log("Hello");
    const { name, email, mobile, profileType } = req.body;
    // const userId = req.user?._id ;

    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!mobile) return res.status(400).json({ message: "Mobile is required" });
    if (!profileType)
      return res.status(400).json({ message: "Profile type is required" });
    // if (!userId) return res.status(400).json({ message: "User ID is required" });

    if (!email || !name || !mobile || !profileType) {
      return res.status(400).json({ message: "Invalid input data" });
    }
    console.log("Incoming Request Body:", req.body);

    const basicDetails = new BasicDetail({ name, email, mobile, profileType });
    console.log("Basic Details Object:", basicDetails);
    await basicDetails.save();
    res.status(201).json(basicDetails);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
