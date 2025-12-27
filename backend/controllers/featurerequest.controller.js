import FeatureRequest from '../models/featurerequest.model.js';

// @desc    Create a new feature request
// @route   POST /api/feature-requests
// @access  Private (authenticated users only)
export const createFeatureRequest = async (req, res) => {
    try {
        const { name, email, category, featureTitle, description } = req.body;

        // Validate required fields
        if (!name || !email || !category || !featureTitle || !description) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

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
            message: 'Failed to submit feature request',
            error: error.message
        });
    }
};

// @desc    Get feature requests by current user
// @route   GET /api/feature-requests/my-requests
// @access  Private
export const getMyFeatureRequests = async (req, res) => {
    try {
        const featureRequests = await FeatureRequest.find({ user: req.user.id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: featureRequests.length,
            featureRequests
        });
    } catch (error) {
        console.error('Error fetching user feature requests:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch your feature requests',
            error: error.message
        });
    }
};

