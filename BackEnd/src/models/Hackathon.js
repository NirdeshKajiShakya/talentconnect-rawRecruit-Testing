import mongoose from "mongoose";
import '../models/PanelMenber.js'

const HackathonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a hackathon title'],
        trim: true,
        maxlength: [100, 'Hackathon title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [5000, 'Description cannot be more than 5000 characters']
    },
    hackathonType: {
        type: String,
        required: [true, 'Please specify the hackathon type'],
        enum: ['In-person', 'Virtual', 'Hybrid']
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
    bannerImage: {
        type: String,
        required: true
    },

    maxTeamSize: {
        type: Number,
        required: [true, 'Please specify the maximum team size'],
        min: [1, 'Team size must be at least 1']
    },
    registrationDeadline: {
        type: Date
    },
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