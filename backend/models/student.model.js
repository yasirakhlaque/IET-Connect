import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: null,
    },
    rollno: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      match: /^\d{2}[A-Z]{2,4}\d{2,3}$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      trim: true,
      uppercase: true,
      default: null,
    },
    role: {
      type: String,
      enum: ['student'],
      default: 'student',
    },

    downloadHistory: [{
      questionPaper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionPaper',
      },
      downloadedAt: {
        type: Date,
        default: Date.now,
      },
    }],

    resetCode: {
      type: String,
      default: null,
    },
    resetCodeExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Add indexes for better query performance
// Note: email and rollno already have indexes from unique: true
studentSchema.index({ branch: 1 }); // For branch-based filtering
studentSchema.index({ createdAt: -1 }); // For sorting by join date


studentSchema.pre('save', function (next) {
  if (this.rollno) {
    this.rollno = this.rollno.toUpperCase();
    
    // Extract branch from roll number (e.g., 23CSE137 -> CSE)
    const branchMatch = this.rollno.match(/^\d{2}([A-Z]{2,4})\d{2,3}$/);
    if (branchMatch && branchMatch[1]) {
      this.branch = branchMatch[1];
    }
  }
  next();
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
