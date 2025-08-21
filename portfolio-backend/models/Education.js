const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    institution: {
        type: String,
        required: [true, 'Institution is required'],
        trim: true,
        maxlength: [200, 'Institution cannot be more than 200 characters']
    },
    period: {
        type: String,
        required: [true, 'Period is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        enum: {
            values: ['education', 'certificate'],
            message: 'Type must be either "education" or "certificate"'
        }
    },
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    },
    certificateUrl: {
        type: String,
        required: false,
        validate: {
            validator: function(v) {
                return !v || /^https?:\/\/.+/.test(v);
            },
            message: 'Certificate URL must be a valid URL'
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual field for duration
educationSchema.virtual('duration').get(function() {
    if (this.startDate && this.endDate) {
        const diffTime = Math.abs(this.endDate - this.startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} days`;
    }
    return this.period;
});

// Index for better query performance
educationSchema.index({ type: 1, startDate: -1 });
educationSchema.index({ institution: 1 });

const Education = mongoose.model('Education', educationSchema);

module.exports = Education; 