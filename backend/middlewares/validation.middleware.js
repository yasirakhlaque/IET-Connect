import { body, query, validationResult } from 'express-validator';

// Middleware to check validation results
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Signup validation
export const validateSignup = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),

  body('rollno')
    .trim()
    .notEmpty()
    .withMessage('Roll number is required')
    .toUpperCase()
    .matches(/^\d{2}[A-Z]{2,4}\d{2,3}$/)
    .withMessage('Invalid roll number format (e.g., 23CSE137)'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail()
    .toLowerCase(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character (@$!%*?&)'),

  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm password is required')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),

  validate
];

// Login validation
export const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail()
    .toLowerCase(),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),

  validate
];

// Send reset code validation
export const validateSendResetCode = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail()
    .toLowerCase(),

  validate
];

// Reset password validation
export const validateResetPassword = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail()
    .toLowerCase(),

  body('resetCode')
    .trim()
    .notEmpty()
    .withMessage('Reset code is required')
    .isLength({ min: 6, max: 6 })
    .withMessage('Reset code must be 6 digits')
    .isNumeric()
    .withMessage('Reset code must contain only numbers'),

  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character'),

  validate
];

// Update profile validation
export const validateUpdateProfile = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),

  validate
];

// Question paper upload validation
export const validateQuestionPaperUpload = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),

  body('year')
    .notEmpty()
    .withMessage('Year is required')
    .isInt({ min: 2000, max: new Date().getFullYear() + 1 })
    .withMessage('Year must be between 2000 and current year'),

  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isMongoId()
    .withMessage('Invalid subject ID'),

  body('branch')
    .trim()
    .notEmpty()
    .withMessage('Branch is required')
    .toUpperCase()
    .isIn(['CSE', 'ME', 'ECE', 'EE', 'CE', 'CHE', 'IT', 'CSBS', 'AIDS'])
    .withMessage('Invalid branch'),

  body('semester')
    .notEmpty()
    .withMessage('Semester is required')
    .isInt({ min: 1, max: 8 })
    .withMessage('Semester must be between 1 and 8'),

  body('type')
    .trim()
    .notEmpty()
    .withMessage('Type is required')
    .isIn(['Periodic Test', 'Previous Year Question Paper', 'Question Bank'])
    .withMessage('Invalid paper type'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),

  validate
];

// Query parameter validation for pagination
export const validatePaginationQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),

  validate
];

// Feature request validation
export const validateFeatureRequest = [
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['UI/UX', 'New Feature', 'Performance', 'Integration', 'Content', 'Other'])
    .withMessage('Invalid category'),

  body('featureTitle')
    .trim()
    .notEmpty()
    .withMessage('Feature title is required')
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 20, max: 1000 })
    .withMessage('Description must be between 20 and 1000 characters'),

  validate
];

// Subject creation validation (admin)
export const validateSubjectCreation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Subject name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters'),

  body('branch')
    .trim()
    .notEmpty()
    .withMessage('Branch is required')
    .toUpperCase()
    .isIn(['CSE', 'ME', 'ECE', 'EE', 'CE', 'CHE', 'IT', 'CSBS', 'AIDS'])
    .withMessage('Invalid branch'),

  body('semester')
    .notEmpty()
    .withMessage('Semester is required')
    .isInt({ min: 1, max: 8 })
    .withMessage('Semester must be between 1 and 8'),

  body('credits')
    .notEmpty()
    .withMessage('Credits is required')
    .isInt({ min: 1, max: 6 })
    .withMessage('Credits must be between 1 and 6'),

  body('code')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Code must be less than 20 characters'),

  validate
];
