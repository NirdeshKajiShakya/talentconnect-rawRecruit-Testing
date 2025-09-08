import mongoose from "mongoose";

const PanelMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    role: {
        type: String,
        required: [true, 'Please specify the role'],
        enum: ['Jury', 'Mentor']
    },
    jobTitle: {
        type: String,
        required: [true, 'Please add a job title']
    },
    organization: {
        type: String,
        required: [true, 'Please add an organization']
    },
    bio: {
        type: String
    },
    profileImage: {
        type: String,
        required: true,
        match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)/, 'Please use a valid URL with HTTP or HTTPS']
    },
    hackathons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hackathon'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const PanelMember = mongoose.model('PanelMember', PanelMemberSchema);
export default PanelMember;