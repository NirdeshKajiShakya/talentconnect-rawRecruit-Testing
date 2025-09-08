import Auth from '../../models/auth.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../../utils/sendEmail.js';

const resetTokens = {}; // In-memory storage (for demo only)

export const sendResetLink = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Auth.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = crypto.randomBytes(32).toString('hex');
    resetTokens[token] = { email, expires: Date.now() + 15 * 60 * 1000 }; // 15 min

    const resetLink = `https://jolly-muffin-48e006.netlify.app/reset-password/${token}`; // Frontend route

    await sendEmail(
      email,
      'Password Reset Link',
      `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 15 minutes.</p>`
    );

    res.status(200).json({ message: 'Reset link sent to email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Email could not be sent' });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const data = resetTokens[token];
    if (!data || data.expires < Date.now()) {
      return res.status(400).json({ message: 'Token expired or invalid' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Auth.findOneAndUpdate({ email: data.email }, { password: hashedPassword });

    delete resetTokens[token];

    res.status(200).json({ message: 'Password successfully reset' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to reset password' });
  }
};
