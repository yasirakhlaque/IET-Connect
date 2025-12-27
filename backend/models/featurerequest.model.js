import mongoose from 'mongoose';

const featureRequestSchema = new mongoose.Schema({
    // User who submitted the request
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    // User details captured at submission time
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    // Feature request details
    category: {
        type: String,
        required: true,
        enum: ['UI/UX', 'New Feature', 'Performance', 'Integration', 'Content', 'Other'],
        default: 'Other'
    },
    featureTitle: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    // Status tracking
    status: {
        type: String,
        enum: ['pending', 'under-review', 'approved', 'rejected', 'implemented'],
        default: 'pending'
    },
    // Admin notes
    adminNotes: {
        type: String,
        trim: true
    },
    // Priority level
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    }
}, {
    timestamps: true
});

// Index for faster queries
featureRequestSchema.index({ user: 1, createdAt: -1 });
featureRequestSchema.index({ status: 1, createdAt: -1 });
featureRequestSchema.index({ category: 1 });

export default mongoose.model('FeatureRequest', featureRequestSchema);
