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

const Subject = mongoose.model('Subject', subjectSchema);

export default Subject;