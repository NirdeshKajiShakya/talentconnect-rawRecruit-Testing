import mongoose from 'mongoose';

const AuthSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    default: null
  },
  profileImage: {
    type: String,
    default: null
  },
  linkedinId: {
    type: String,
    unique: true,
    sparse: true
  },
  isNewUser: { 
    type: Boolean,
    default: true
  },
  onboardingCompleted:{
    type: Boolean ,
    default : false 
  },
  onboardingStep:{
    type : Number ,
    default: 1
  },
  userType: {
    type: String,
    enum: ['candidate', 'college', 'company', 'student', 'fresher', 'professional', 'employer'],
    // default: 'candidate'
  },
  authProvider: {
    type: String,
    enum: ['manual', 'google', 'linkedin'],
    default: 'manual'
  },

  //  Added for password reset
  resetToken: String,
  resetTokenExpires: Date, 

  activeCompanyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyProfile',
    default: null,
  }

}, { timestamps: true });

export default mongoose.models.Auth || mongoose.model('Auth', AuthSchema);
