import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import Auth from '../models/auth.js';

const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

export const handleGoogleAuth = async (code, userType) => {
  if (!code) {
    throw new Error('Authorization code is required');
  }

  const { tokens } = await client.getToken({ code, redirect_uri: 'postmessage' });

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { email, name, picture } = payload;

  let user = await Auth.findOne({ email });
  const existingUser = user;

  if (!user) {
    if (!userType) {
      const error = new Error('User type is required for new registrations. Sign up first with google');
      error.status = 400;
      throw error;
    }

    user = new Auth({
      name,
      email,
      profileImage: picture,
      authProvider: 'google',
      userType,
    });

    await user.save();
  } else {
    if (!user.userType && userType) {
      user.userType = userType;
      await user.save();
    }
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email, userType: user.userType },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    token,
    user,
    isNewUser: Boolean(!existingUser),
  };
};
