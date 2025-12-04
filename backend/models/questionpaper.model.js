import mongoose from 'mongoose';

const questionPaperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    branch: {
      type: String,
      required: true,
      trim: true,
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    pdfUrl: {
      type: String,
      required: true,
    },
    pdfPublicId: {
      type: String,
      default: null,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    rejectionReason: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      enum: ["Periodic Test", "Previous Year Question Paper", "Question Bank"],
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    downloads: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Add indexes for faster queries
questionPaperSchema.index({ subject: 1, approvalStatus: 1 }); // For subject paper queries
questionPaperSchema.index({ approvalStatus: 1 }); // For admin approval queries
questionPaperSchema.index({ uploadedBy: 1 }); // For user's uploads
questionPaperSchema.index({ branch: 1, semester: 1 }); // For filtering
questionPaperSchema.index({ createdAt: -1 }); // For sorting by date

const QuestionPaper = mongoose.model('QuestionPaper', questionPaperSchema);

export default QuestionPaper;