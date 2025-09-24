import mongoose from "mongoose";
import './panelMemberModel.js'
//testing purpose
const HackathonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a hackathon title'],
        trim: true,
        maxlength: [100, 'Hackathon title cannot be more than 100 characters']
    },
    subTitle: {
        type: String,
        trim: true,
        maxlength: [200, 'Sub-title cannot be more than 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [5000, 'Description cannot be more than 5000 characters']
    },
    goal: {
        type: String,
        required: [true, 'Please add a hackathon goal'],
        maxlength: [1000, 'Goal cannot be more than 1000 characters']
    },
    hackathonType: {
        type: String,
        required: [true, 'Please specify the hackathon type'],
        enum: ['In-person', 'Virtual', 'Hybrid']
    },
    mode: {
        type: String,
        enum: ['Online', 'Private', 'Hybrid']
    },
    visibility: {
        type: String,
        enum: ['public', 'private', 'invite-only']
    },
    participationType: {
        type: String,
        enum: ['Individual', 'Team', 'Both']
    },
    startDate: {
        type: Date,
        required: [true, 'Please add a start date']
    },
    endDate: {
        type: Date,
        required: [true, 'Please add an end date']
    },
    venue: {
        type: String,
        required: function () {
            return this.hackathonType !== 'Virtual';
        },
        maxlength: [200, 'Venue cannot be more than 200 characters']
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    bannerImage: {
        type: String,
        required: false // Made optional since we might not always have a logo
    },
    maxTeamSize: {
        type: Number,
        required: [true, 'Please specify the maximum team size'],
        min: [1, 'Team size must be at least 1']
    },
    maxParticipants: {
        type: Number,
        min: [1, 'Max participants must be at least 1']
    },
    maxTeams: {
        type: Number,
        min: [1, 'Max teams must be at least 1']
    },
    minTeamMembers: {
        type: Number,
        min: [1, 'Min team members must be at least 1']
    },
    maxTeamMembers: {
        type: Number,
        min: [1, 'Max team members must be at least 1']
    },
    numberOfRounds: {
        type: Number,
        default: 1,
        min: [1, 'Number of rounds must be at least 1'],
        max: [10, 'Number of rounds cannot exceed 10']
    },
    rounds: [
        {
            roundNumber: {
                type: Number,
                required: true
            },
            roundName: {
                type: String,
                required: true
            },
            startDate: {
                type: Date,
                required: true
            },
            endDate: {
                type: Date,
                required: true
            }
        }
    ],
    registrationDeadline: {
        type: Date
    },
    requirements: {
        type: String,
        maxlength: [2000, 'Requirements cannot be more than 2000 characters']
    },
    rules: {
        type: String,
        maxlength: [2000, 'Rules cannot be more than 2000 characters']
    },
    website: {
        type: String,
        validate: {
            validator: function(v) {
                return !v || /^https?:\/\/.+/.test(v);
            },
            message: 'Website must be a valid URL'
        }
    },
    contactEmail: {
        type: String,
        required: [true, 'Please add a contact email'],
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: 'Please provide a valid email address'
        }
    },
    tags: [{
        type: String,
        trim: true
    }],
    rewardsAndBenefits: [
        {
            title: {
                type: String,
                required: true
            },
            rank: {
                type: String, // Optional, e.g., 'Winner', '1st RunnerUp', 'All Participants'
            },
            type: {
                type: String,
                enum: ['Cash', 'Certificate', 'Swag', 'Goodies', 'Networking', 'Other'],
                default: 'Other'
            },
            amount: {
                type: Number, // Only for Cash or if any quantifiable item
            },

        }
    ],
    panelMembers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PanelMember'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

// Ensure end date is after start date
HackathonSchema.pre('validate', function (next) {
    if (this.endDate && this.startDate && this.endDate < this.startDate) {
        this.invalidate('endDate', 'End date must be after start date');
    }
    next();
});


const Hackathon = mongoose.model('Hackathon', HackathonSchema);
export default Hackathon;