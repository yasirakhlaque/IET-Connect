import Subject from '../models/subject.model.js';
import QuestionPaper from '../models/questionpaper.model.js';

// Get all subjects with optional filtering by branch and semester
export const getAllSubjects = async (req, res) => {
  try {
    const { branch, semester, page = 1, limit = 100 } = req.query;
    
    const filter = {};
    if (branch && branch !== 'All Branches') filter.branch = branch;
    if (semester && semester !== 'All Semesters') {
      const semNum = parseInt(semester.replace(/\D/g, ''));
      if (semNum) filter.semester = semNum;
    }

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Parallel execution for better performance
    const [totalCount, subjects] = await Promise.all([
      Subject.countDocuments(filter),
      Subject.find(filter)
        .select('name branch semester credits code') // Only select needed fields
        .sort({ branch: 1, semester: 1, name: 1 })
        .skip(skip)
        .limit(limitNum)
        .lean() // Use lean for better performance (returns plain JS objects)
    ]);

    // Optimize stats fetching with aggregation
    const subjectIds = subjects.map(s => s._id);
    const paperStats = await QuestionPaper.aggregate([
      {
        $match: {
          subject: { $in: subjectIds },
          approvalStatus: 'Approved'
        }
      },
      {
        $group: {
          _id: '$subject',
          count: { $sum: 1 },
          totalDownloads: { $sum: '$downloads' }
        }
      }
    ]);

    // Create a lookup map for O(1) access
    const statsMap = new Map(
      paperStats.map(stat => [stat._id.toString(), stat])
    );

    // Combine subjects with stats
    const subjectsWithStats = subjects.map(subject => ({
      ...subject,
      pyqs_available: statsMap.get(subject._id.toString())?.count || 0,
      downloads: statsMap.get(subject._id.toString())?.totalDownloads || 0,
    }));

    res.json({
      message: 'Subjects fetched successfully',
      count: subjectsWithStats.length,
      totalCount,
      currentPage: pageNum,
      totalPages: Math.ceil(totalCount / limitNum),
      subjects: subjectsWithStats,
    });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ 
      message: 'Error fetching subjects'
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
      message: 'Error fetching subject'
    });
  }
};