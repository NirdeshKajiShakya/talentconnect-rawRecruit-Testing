 import { handleGoogleAuth } from '../../services/GoogleAuth.service.js';

// export const googleAuth = async (req, res) => {
//   try {
//     const { code, userType } = req.body;

//     const { token, user, isNewUser } = await handleGoogleAuth(code, userType);

//     res.cookie('authToken', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       success: true,
//       isNewUser,
//       user: {
//         _id: user._id,
//         email: user.email,
//         name: user.name,
//         userType: user.userType,
//         profileImage: user.profileImage,
//       },
//     });
//   } catch (error) {
//     console.error('Google Auth Error:', error);
//     res.status(error.status || 500).json({
//       success: false,
//       message: 'Google authentication failed',
//       error: error.message,
//     });
//   }
// };


// import { OAuth2Client } from 'google-auth-library';
// import jwt from 'jsonwebtoken';
// import Auth from '../../models/auth.js';

// const client = new OAuth2Client({
//   clientId: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// });

// export const googleAuth = async (req, res) => {
//   try {
//     const { code, userType } = req.body;

//     if (!code) {
//       return res.status(400).json({ message: 'Authorization code is required' });
//     }

//     // Exchange auth code for tokens
//     const { tokens } = await client.getToken({
//       code,
//       redirect_uri: 'postmessage'
//     });

//     // Verify ID token
//     const ticket = await client.verifyIdToken({
//       idToken: tokens.id_token,
//       audience: process.env.GOOGLE_CLIENT_ID
//     });

//     const payload = ticket.getPayload();
//     const { email, name, picture } = payload;

//     let user = await Auth.findOne({ email });
//     const isNewUser = !user;

//     if (isNewUser) {
//       if (!userType) {
//         return res.status(400).json({
//           message: 'User type is required for new registrations. Please sign up first.'
//         });
//       }
//       user = new Auth({
//         name,
//         email,
//         profileImage: picture,
//         authProvider: 'google',
//         userType
//       });
//       await user.save();
//     }

//     // Create JWT token
//     const token = jwt.sign(
//       { userId: user._id, email: user.email, userType: user.userType },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     // Set HTTP-only cookie
//     res.cookie('jwt', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
//     });

//     res.status(200).json({
//       success: true,
//       isNewUser,
//       user: {
//         _id: user._id,
//         email: user.email,
//         name: user.name,
//         userType: user.userType,
//         profileImage: user.profileImage,
//         onboardingCompleted: user.onboardingCompleted // <-- ADDED THIS LINE
//       },
//       token
//     });

//   } catch (error) {
//     console.error('Google Auth Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Google authentication failed',
//       error: error.message
//     });
//   }
// };


import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import Auth from '../../models/auth.js';

const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

export const googleAuth = async (req, res) => {
  try {
    const { code, userType } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'Authorization code is required' });
    }

    // Exchange auth code for tokens
    const { tokens } = await client.getToken({
      code,
      redirect_uri: 'postmessage'
    });

    // Verify ID token
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    let user = await Auth.findOne({ 
      $or: [
        { email },
        { googleId } // Also check by googleId for better matching
      ]
    });
    
    const isNewUser = !user;

    if (isNewUser) {
      if (!userType) {
        return res.status(400).json({
          message: 'User type is required for new registrations. Please sign up first.'
        });
      }
      user = new Auth({
        name,
        email,
        profileImage: picture,
        authProvider: 'google',
        googleId, // Store googleId for future reference
        userType
      });
      await user.save();
    } else {
      // Update existing user's information (name, profile image might change)
      user.name = name;
      user.profileImage = picture;
      user.authProvider = 'google';
      user.googleId = googleId;
      await user.save();
    }

    // Refresh user data from database to get latest onboarding status
    user = await Auth.findById(user._id);

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        userType: user.userType 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set HTTP-only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      success: true,
      isNewUser,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        profileImage: user.profileImage,
        onboardingCompleted: user.onboardingCompleted,
        onboardingStep: user.onboardingStep
      },
      token
    });

  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(500).json({
      success: false,
      message: 'Google authentication failed',
      error: error.message
    });
  }
};