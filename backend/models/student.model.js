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


studentSchema.pre('save', function (next) {
  if (this.rollno) {
    this.rollno = this.rollno.toUpperCase();
  }
  next();
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
