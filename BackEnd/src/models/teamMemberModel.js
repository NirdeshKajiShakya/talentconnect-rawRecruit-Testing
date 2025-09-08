import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  // The company this member belongs to
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyProfile',
    required: true,
  },
  
  // The user's account ID (this is added after they accept the invitation)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth',
    default: null, // It's null until the user accepts
  },

  // The email address the invitation was sent to
  invitedEmail: {
    type: String,
    required: true,
    trim: true,
  },

  // The role assigned to this team member
  role: {
    type: String,
    enum: ['Admin', 'Recruiter', 'Viewer'],
    required: true,
  },

  // The status of the invitation and membership
  status: {
    type: String,
    enum: ['Pending', 'Active', 'Inactive', 'reject'],
    default: 'Pending',
  },
}, { 
  timestamps: true,
  // This ensures you don't send multiple pending invites to the same email for the same company
  indexes: [{ unique: true, fields: ['companyId', 'invitedEmail'] }]
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
export default TeamMember;