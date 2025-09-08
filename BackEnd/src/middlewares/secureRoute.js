import jwt from "jsonwebtoken";
import Auth from "../models/auth.js";

 const secureRoute = async (req, res, next) => {

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

    // console.log("Token: ", token);

    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid Token" });
    }


    console.log("Decoded JWT Payload:", decoded);

    const user = await Auth.findById(decoded.userId).select("-password"); // current loggedin user
    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }

    req.user = user;
   
    next();
  } catch (error) {
    console.log("Error in secureRoute: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default secureRoute;


// import jwt from "jsonwebtoken";
// import Auth from "../models/auth.js";
// import mongoose from "mongoose";

// const secureRoute = async (req, res, next) => {
//   try {
//     console.log("🔐 SecureRoute called");
    
//     const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
//     console.log("Token present:", !!token);

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded userId:", decoded.userId);
//     console.log("Decoded email:", decoded.email);

//     // Check database connection
//     console.log("Mongoose state:", mongoose.connection.readyState);
    
//     // Try to find user with different approaches
//     const user = await Auth.findById(decoded.userId);
//     console.log("User found:", user ? "YES" : "NO");
    
//     if (!user) {
//       console.log("❌ User not found in database. Checking if ID format is correct...");
      
//       // Sometimes ID formatting issues occur
//       const allUsers = await Auth.find({});
//       console.log("All users in DB:", allUsers.map(u => u._id.toString()));
      
//       return res.status(401).json({ 
//         error: "No user found",
//         details: `User ${decoded.userId} not in database` 
//       });
//     }

//     const userWithoutPassword = user.toObject();
//     delete userWithoutPassword.password;
    
//     req.user = userWithoutPassword;
//     console.log("✅ User authenticated:", user.email);
   
//     next();
//   } catch (error) {
//     console.log("Error in secureRoute: ", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export default secureRoute