import axios from 'axios';
import Auth from '../models/auth.js';

export const handleLinkedInAuth = async (code, userType) => {
  // 1. Exchange code for access token
  const tokenResponse = await axios.post(
    'https://www.linkedin.com/oauth/v2/accessToken',
    new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.VITE_LINKEDIN_REDIRECT_URI,
      client_id: process.env.VITE_LINKEDIN_CLIENT_ID,
      client_secret: process.env.VITE_LINKEDIN_CLIENT_SECRET,
    }).toString(),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  const { access_token } = tokenResponse.data;

  // 2. Fetch user profile from LinkedIn
  const profileResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const { email, given_name, family_name, name, picture } = profileResponse.data;

  let user = await Auth.findOne({ email });
  let isNewUser = false;

  if (!user) {
    user = new Auth({
      email,
      name: name || `${given_name || ''} ${family_name || ''}`.trim() || 'LinkedIn User',
      profileImage: picture || null,
      userType: userType || 'candidate',
      authProvider: 'linkedin',
    });
    await user.save();
    isNewUser = true;
  } else {
    if (!user.authProvider || user.authProvider === 'manual') {
      user.authProvider = 'linkedin';
      if (!user.name) user.name = name || `${given_name || ''} ${family_name || ''}`.trim() || 'LinkedIn User';
      if (!user.profileImage) user.profileImage = picture || null;
    }
    if (!user.userType && userType) {
      user.userType = userType;
    }
    await user.save();
  }

  return { user, isNewUser };
};
