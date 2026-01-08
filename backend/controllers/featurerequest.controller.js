import FeatureRequest from '../models/featurerequest.model.js';

// @desc    Create a new feature request
// @route   POST /api/feature-requests
// @access  Private (authenticated users only)
export const createFeatureRequest = async (req, res) => {
    try {
        const { name, email, category, featureTitle, description } = req.body;

        // Create feature request with authenticated user
        const featureRequest = await FeatureRequest.create({
            user: req.user.id, // From auth middleware
            name,
            email,
            category,
            featureTitle,
            description,
            status: 'pending'
        });

        // Populate user details
        await featureRequest.populate('user', 'name email rollno branch');

        res.status(201).json({
            success: true,
            message: 'Feature request submitted successfully',
            featureRequest
        });
    } catch (error) {
        console.error('Error creating feature request:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit feature request'
        });
    }
};

// @desc    Get feature requests by current user (with pagination)
// @route   GET /api/feature-requests/my-requests
// @access  Private
export const getMyFeatureRequests = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        // Get total count
        const total = await FeatureRequest.countDocuments({ user: req.user.id });

        // Fetch paginated results
        const featureRequests = await FeatureRequest.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum)
            .lean();

        res.status(200).json({
            success: true,
            featureRequests,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(total / limitNum),
                totalItems: total,
                itemsPerPage: limitNum,
                hasNextPage: pageNum < Math.ceil(total / limitNum),
                hasPrevPage: pageNum > 1,
            },
        });
    } catch (error) {
        console.error('Error fetching user feature requests:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch your feature requests'
        });
    }
};

