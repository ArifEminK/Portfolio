const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters'],
        unique: true
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        enum: {
            values: ['language', 'tool', 'program', 'framework', 'database'],
            message: 'Type must be one of: language, tool, program, framework, database'
        }
    },
    level: {
        type: String,
        required: [true, 'Level is required'],
        enum: {
            values: ['beginner', 'intermediate', 'advanced', 'expert'],
            message: 'Level must be one of: beginner, intermediate, advanced, expert'
        }
    },
    description: {
        type: String,
        required: false,
        trim: true,
        maxlength: [300, 'Description cannot be more than 300 characters']
    },
    color: {
        type: String,
        required: false,
        validate: {
            validator: function(v) {
                return /^#[0-9A-F]{6}$/i.test(v);
            },
            message: 'Color must be a valid hex color code'
        }
    },
    yearsOfExperience: {
        type: Number,
        required: false,
        min: [0, 'Years of experience cannot be negative'],
        max: [50, 'Years of experience cannot exceed 50']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Otomatik renk atama fonksiyonu
const getSkillColor = (type) => {
    switch (type) {
        case 'language':
            return '#3B82F6'; // Mavi
        case 'program':
            return '#10B981'; // Yeşil
        case 'tool':
            return '#8B5CF6'; // Mor
        case 'framework':
            return '#F59E0B'; // Turuncu
        case 'database':
            return '#06B6D4'; // Cyan
        default:
            return '#6B7280'; // Gri
    }
};

// Pre-save middleware - otomatik renk atama
skillSchema.pre('save', function(next) {
    if (!this.color) {
        this.color = getSkillColor(this.type);
    }
    next();
});

// Virtual field for experience level
skillSchema.virtual('experienceLevel').get(function() {
    if (this.yearsOfExperience) {
        if (this.yearsOfExperience < 1) return 'Yeni başlayan';
        if (this.yearsOfExperience < 3) return 'Deneyimli';
        if (this.yearsOfExperience < 5) return 'Uzman';
        return 'Master';
    }
    return this.level;
});

// Index for better query performance
skillSchema.index({ type: 1, level: 1 });
skillSchema.index({ isActive: 1 });
skillSchema.index({ title: 'text', description: 'text' });

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill; 