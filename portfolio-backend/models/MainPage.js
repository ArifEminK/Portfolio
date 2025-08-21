const mongoose = require('mongoose');

const mainPageSchema = new mongoose.Schema({
    // Dil bilgisi
    locale: {
        type: String,
        required: [true, 'Locale is required'],
        enum: ['tr', 'en', 'de'],
        default: 'tr',
        index: true
    },
    
    // Temel bilgiler (çok dilli)
    greeting: {
        tr: {
            type: String,
            required: [true, 'Turkish greeting is required'],
            trim: true,
            maxlength: [200, 'Turkish greeting cannot be more than 200 characters']
        },
        en: {
            type: String,
            required: [true, 'English greeting is required'],
            trim: true,
            maxlength: [200, 'English greeting cannot be more than 200 characters']
        },
        de: {
            type: String,
            required: [true, 'German greeting is required'],
            trim: true,
            maxlength: [200, 'German greeting cannot be more than 200 characters']
        }
    },
    description: {
        tr: {
            type: String,
            required: [true, 'Turkish description is required'],
            trim: true,
            maxlength: [500, 'Turkish description cannot be more than 500 characters']
        },
        en: {
            type: String,
            required: [true, 'English description is required'],
            trim: true,
            maxlength: [500, 'English description cannot be more than 500 characters']
        },
        de: {
            type: String,
            required: [true, 'German description is required'],
            trim: true,
            maxlength: [500, 'German description cannot be more than 500 characters']
        }
    },
    profilePhotoUrl: {
        type: String,
        required: [true, 'Profile photo URL is required'],
        trim: true,
        validate: {
            validator: function(v) {
                return /^https?:\/\/.+/.test(v);
            },
            message: 'Profile photo must be a valid URL'
        }
    },
    
    // Animasyonlu metinler (çok dilli)
    animatedTexts: [{
        text: {
            tr: {
                type: String,
                required: [true, 'Turkish animated text is required'],
                trim: true,
                maxlength: [100, 'Turkish animated text cannot be more than 100 characters']
            },
            en: {
                type: String,
                required: [true, 'English animated text is required'],
                trim: true,
                maxlength: [100, 'English animated text cannot be more than 100 characters']
            },
            de: {
                type: String,
                required: [true, 'German animated text is required'],
                trim: true,
                maxlength: [100, 'German animated text cannot be more than 100 characters']
            }
        },
        order: {
            type: Number,
            required: true,
            min: 1
        },
        isActive: {
            type: Boolean,
            default: true
        }
    }],
    
    // Meta bilgiler
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Animasyonlu metinleri sırala
mainPageSchema.pre('save', function(next) {
    if (this.animatedTexts && this.animatedTexts.length > 0) {
        this.animatedTexts.sort((a, b) => a.order - b.order);
    }
    next();
});

// Virtual field - aktif animasyonlu metinler
mainPageSchema.virtual('activeAnimatedTexts').get(function() {
    if (!this.animatedTexts) return [];
    return this.animatedTexts
        .filter(text => text.isActive)
        .sort((a, b) => a.order - b.order);
});

// Index'ler
mainPageSchema.index({ locale: 1, isActive: 1 });
mainPageSchema.index({ 'animatedTexts.isActive': 1 });

const MainPage = mongoose.model('MainPage', mainPageSchema);

module.exports = MainPage;
