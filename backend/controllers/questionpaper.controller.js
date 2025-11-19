import multer from 'multer';
import QuestionPaper from '../models/questionpaper.model.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinary.service.js';

// Configure multer for memory storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
});

// Upload a new question paper
export const uploadQuestionPaper = async (req, res) => {
  try {
    const { title, year, subject, branch, semester, type, description } = req.body;
    const file = req.file;

    console.log('Upload request received:', {
      hasFile: !!file,
      fileSize: file?.size,
      fileName: file?.originalname,
      mimeType: file?.mimetype,
      hasBuffer: !!file?.buffer,
      bufferLength: file?.buffer?.length,
      bodyFields: Object.keys(req.body)
    });

    // Validate required fields
    if (!title || !year || !subject || !branch || !semester || !type) {
      return res.status(400).json({ 
        message: 'Missing required fields' 
      });
    }

    // Validate file exists
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Validate file type
    if (file.mimetype !== 'application/pdf') {
      return res.status(400).json({ message: 'Only PDF files are allowed' });
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return res.status(400).json({ message: 'File size must be less than 10MB' });
    }

    // Validate file buffer
    if (!file.buffer || file.buffer.length === 0) {
      return res.status(400).json({ message: 'File buffer is empty' });
    }

    console.log('Uploading to Cloudinary...');
    // Upload to Cloudinary
    const { url, public_id } = await uploadToCloudinary(file, 'iet_connect/question-papers');
    console.log('Cloudinary upload successful:', { url, public_id });

    // Save to database
    const questionPaper = await QuestionPaper.create({
      title,
      year: parseInt(year),
      subject,
      branch,
      semester: parseInt(semester),
      type,
      description: description || '',
      pdfUrl: url,
      pdfPublicId: public_id,
      uploadedBy: req.user.id,
      approvalStatus: 'Pending',
    });

    console.log('Question paper saved to DB:', questionPaper._id);

    res.status(201).json({
      message: 'Question paper uploaded successfully',
      questionPaper: {
        id: questionPaper._id,
        title: questionPaper.title,
        status: questionPaper.approvalStatus,
      },
    });
  } catch (error) {
    console.error('Error uploading question paper:', error);
    res.status(500).json({ 
      message: 'Error uploading question paper', 
      error: error.message 
    });
  }
};

// Get all approved question papers
export const getQuestionPapers = async (req, res) => {
  try {
    const { branch, semester, subject, year, type } = req.query;

    const filter = { approvalStatus: 'Approved' };
    
    if (branch) filter.branch = branch;
    if (semester) filter.semester = parseInt(semester);
    if (subject) filter.subject = subject;
    if (year) filter.year = parseInt(year);
    if (type) filter.type = type;

    const questionPapers = await QuestionPaper.find(filter)
      .populate('uploadedBy', 'name rollno email')
      .populate('subject', 'name branch semester credits code')
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      message: 'Question papers fetched successfully',
      count: questionPapers.length,
      questionPapers,
    });
  } catch (error) {
    console.error('Error fetching question papers:', error);
    res.status(500).json({ 
      message: 'Error fetching question papers', 
      error: error.message 
    });
  }
};

// Get single question paper by ID
export const getQuestionPaperById = async (req, res) => {
  try {
    const { id } = req.params;

    const questionPaper = await QuestionPaper.findById(id)
      .populate('uploadedBy', 'name rollno email')
      .populate('subject', 'name branch semester credits code');

    if (!questionPaper) {
      return res.status(404).json({ message: 'Question paper not found' });
    }

    if (questionPaper.approvalStatus !== 'Approved' && req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'This question paper is not yet approved' });
    }

    res.json({
      message: 'Question paper fetched successfully',
      questionPaper: {
        ...questionPaper.toObject(),
        downloadUrl: questionPaper.pdfUrl,
      },
    });
  } catch (error) {
    console.error('Error fetching question paper:', error);
    res.status(500).json({ 
      message: 'Error fetching question paper', 
      error: error.message 
    });
  }
};

// Get user's uploads
export const getMyUploads = async (req, res) => {
  try {
    const questionPapers = await QuestionPaper.find({ uploadedBy: req.user.id })
      .populate('uploadedBy', 'name rollno email')
      .populate('subject', 'name branch semester credits code')
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      message: 'Your uploads fetched successfully',
      count: questionPapers.length,
      questionPapers,
    });
  } catch (error) {
    console.error('Error fetching user uploads:', error);
    res.status(500).json({ 
      message: 'Error fetching uploads', 
      error: error.message 
    });
  }
};

// View question paper - just redirect to Cloudinary URL
export const viewQuestionPaper = async (req, res) => {
  try {
    const { id } = req.params;
    const questionPaper = await QuestionPaper.findById(id);

    if (!questionPaper) {
      return res.status(404).json({ message: "Question paper not found" });
    }

    if (questionPaper.approvalStatus !== "Approved" && req.user?.role !== "admin") {
      return res.status(403).json({ message: "This question paper is not yet approved" });
    }

    // Simply redirect to the Cloudinary URL
    res.redirect(questionPaper.pdfUrl);
  } catch (error) {
    console.error("Error viewing question paper:", error);
    res.status(500).json({
      message: "Error viewing question paper",
      error: error.message,
    });
  }
};

// Download question paper - return URL with proper filename info
export const downloadQuestionPaper = async (req, res) => {
  try {
    const { id } = req.params;
    const questionPaper = await QuestionPaper.findById(id);

    if (!questionPaper) {
      return res.status(404).json({ message: "Question paper not found" });
    }

    if (questionPaper.approvalStatus !== "Approved" && req.user?.role !== "admin") {
      return res.status(403).json({ message: "This question paper is not yet approved" });
    }

    // Increment download count
    await QuestionPaper.findByIdAndUpdate(id, { $inc: { downloads: 1 } });

    // Create a proper filename
    const sanitizedTitle = questionPaper.title.replace(/[^a-z0-9\s]/gi, "_").toLowerCase();
    const filename = `${sanitizedTitle}_${questionPaper.year}.pdf`;

    const downloadUrl = questionPaper.pdfUrl;

    // Return JSON with URL and filename for frontend to handle
    res.json({
      message: "Download URL generated successfully",
      downloadUrl: downloadUrl,
      filename: filename,
    });
  } catch (error) {
    console.error("Error downloading question paper:", error);
    res.status(500).json({
      message: "Error downloading question paper",
      error: error.message,
    });
  }
};
