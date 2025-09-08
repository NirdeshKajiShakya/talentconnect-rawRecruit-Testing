import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Auth from '../../models/auth.js';
// import dotenv from 'dotenv';
import BasicDetails from '../../models/Onboarding_basicdetails.js';

// dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Helper function to generate token and set cookie
const createTokenAndSaveCookie = (userId, email, res, userType) => {
  const token = jwt.sign(
    { userId, email, userType },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('jwt', token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production', // secure in production
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/'
  });

  return token;
};

export const signup = async (req, res) => {
  //console.log("User Type", userType);

  try {
    const { email, password, userType } = req.body;


    if (!email || !password || !userType) { 
      return res.status(400).json({
        message: "Email, password and userType are required"
      });
    }

  
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await Auth.create({
      email,
      password: hashedPassword,
      userType 
    });


    const token = createTokenAndSaveCookie(newUser._id, newUser.email, res, newUser.userType);

    res.status(201).json({
      message: "Signup successful",
      user: {
        _id: newUser._id,
        email: newUser.email,
        userType: newUser.userType ,
        onboardingCompleted : newUser.onboardingCompleted
      },
      token
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

 
    const token = createTokenAndSaveCookie(user._id, user.email, res, user.userType);

    // Get basic details if they exist
    const basicDetails = await Auth.findById(user._id);

    // Send response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        email: user.email,
        userType: user.userType,
        name: basicDetails?.name || user.name,
        basicDetails: basicDetails,
        onboardingCompleted : user.onboardingCompleted
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const logout = async (req, res) => {
  // console.log("hero");
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: 'none',
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    });
    //localStorage.removeItem() ;
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Optional: Add this if you need to get all users (excluding current user)
export const allUsers = async (req, res) => {
  console.log("hey Budy")
  try {
    const loggedInUserId = req.user._id;  // Assuming userId is set in req from JWT

    if (!loggedInUserId) {
      console.error("Error in allUsers Controller: loggedInUserId is missing after secureRoute");
      return res.status(401).json({ message: "Unauthorized: User ID not found." });
    }

    const filteredUsers = await Auth.find({
      _id: { $ne: loggedInUserId }
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in allUsers Controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};