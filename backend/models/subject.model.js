import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        branch: {
            type: String,
            required: true,
            enum: ['CSE', 'ME', 'ECE', 'EE', 'CE', 'CHE'],
        },
        semester: {
            type: Number,
            required: true,
            min: 1,
            max: 8,
        },
        credits: {
            type: Number,
            required: true,
            min: 1,
            max: 6,
        },
        code: {
            type: String,
            trim: true,
        },
    }, 
    { timestamps: true }
);

// Compound unique index to allow same subject name for different branches/semesters
subjectSchema.index({ name: 1, branch: 1, semester: 1 }, { unique: true });

// Additional indexes for faster filtering and sorting
subjectSchema.index({ branch: 1, semester: 1 }); // For branch+semester queries
subjectSchema.index({ semester: 1 }); // For semester-only queries
subjectSchema.index({ branch: 1 }); // For branch-only queries
subjectSchema.index({ name: 'text' }); // For text search on name

const Subject = mongoose.model('Subject', subjectSchema);

export default Subject;