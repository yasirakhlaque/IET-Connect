import Subject from '../models/subject.model.js';
import QuestionPaper from '../models/questionpaper.model.js';

// Get all subjects with optional filtering by branch and semester
export const getAllSubjects = async (req, res) => {
  try {
    const { branch, semester } = req.query;
    
    const filter = {};
    if (branch) filter.branch = branch;
    if (semester) filter.semester = parseInt(semester);

    const subjects = await Subject.find(filter).sort({ branch: 1, semester: 1, name: 1 }).lean();

    // Get stats for each subject from question papers
    const subjectsWithStats = await Promise.all(
      subjects.map(async (subject) => {
        const papers = await QuestionPaper.find({ 
          subject: subject._id, 
          approvalStatus: 'Approved' 
        });
        
        const totalDownloads = papers.reduce((sum, paper) => sum + (paper.downloads || 0), 0);
        
        return {
          ...subject,
          pyqs_available: papers.length,
          downloads: totalDownloads,
        };
      })
    );

    res.json({
      message: 'Subjects fetched successfully',
      count: subjectsWithStats.length,
      subjects: subjectsWithStats,
    });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ 
      message: 'Error fetching subjects', 
      error: error.message 
    });
  }
};

// Get single subject by ID
export const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await Subject.findById(id);

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.json({
      message: 'Subject fetched successfully',
      subject,
    });
  } catch (error) {
    console.error('Error fetching subject:', error);
    res.status(500).json({ 
      message: 'Error fetching subject', 
      error: error.message 
    });
  }
};