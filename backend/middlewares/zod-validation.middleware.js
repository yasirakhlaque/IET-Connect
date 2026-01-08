import { z } from 'zod';

// Helper to create validation middleware from Zod schema
export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      // Validate and sanitize in one go
      const validated = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Replace with validated & sanitized data
      // Note: In Express 5, req.query is read-only, so we modify it in place
      req.body = validated.body || req.body;
      req.params = validated.params || req.params;
      
      // For req.query, we need to modify in place (Express 5 compatibility)
      if (validated.query) {
        Object.keys(req.query).forEach(key => delete req.query[key]);
        Object.assign(req.query, validated.query);
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
};

// Custom validators
// Roll number format: YY + BRANCH + NUMBER
// Valid branches: CSE, EE, ME, CE, ECE
const rollnoRegex = /^\d{2}(CSE|ECE|EE|ME|CE)\d{2,3}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const mongoIdRegex = /^[0-9a-fA-F]{24}$/;

// Signup validation schema
export const signupSchema = z.object({
  body: z.object({
    name: z.string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters')
      .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
      .optional()
      .or(z.literal('')),
    
    rollno: z.string()
      .trim()
      .toUpperCase()
      .regex(rollnoRegex, 'Invalid roll number format. Must be like 23CSE137 (Valid branches: CSE, ECE, EE, ME, CE)'),
    
    email: z.string()
      .trim()
      .email('Invalid email format')
      .toLowerCase(),
    
    password: z.string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        passwordRegex,
        'Password must contain uppercase, lowercase, number, and special character (@$!%*?&)'
      ),
    
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),
});

// Login validation schema
export const loginSchema = z.object({
  body: z.object({
    email: z.string()
      .trim()
      .email('Invalid email format')
      .toLowerCase(),
    
    password: z.string()
      .min(1, 'Password is required'),
  }),
});

// Send reset code validation schema
export const sendResetCodeSchema = z.object({
  body: z.object({
    email: z.string()
      .trim()
      .email('Invalid email format')
      .toLowerCase(),
  }),
});

// Reset password validation schema
export const resetPasswordSchema = z.object({
  body: z.object({
    email: z.string()
      .trim()
      .email('Invalid email format')
      .toLowerCase(),
    
    resetCode: z.string()
      .trim()
      .length(6, 'Reset code must be 6 digits')
      .regex(/^\d{6}$/, 'Reset code must contain only numbers'),
    
    newPassword: z.string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        passwordRegex,
        'Password must contain uppercase, lowercase, number, and special character'
      ),
  }),
});

// Update profile validation schema
export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters')
      .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
      .optional(),
  }),
});

// Question paper upload validation schema
export const questionPaperUploadSchema = z.object({
  body: z.object({
    title: z.string()
      .trim()
      .min(3, 'Title must be at least 3 characters')
      .max(200, 'Title must be less than 200 characters'),
    
    year: z.string()
      .or(z.number())
      .transform((val) => parseInt(val.toString()))
      .refine((val) => val >= 2000 && val <= new Date().getFullYear() + 1, {
        message: 'Year must be between 2000 and current year',
      }),
    
    subject: z.string()
      .trim()
      .regex(mongoIdRegex, 'Invalid subject ID'),
    
    branch: z.string()
      .trim()
      .toUpperCase()
      .refine((val) => ['CSE', 'ME', 'ECE', 'EE', 'CE', 'CHE', 'IT', 'CSBS', 'AIDS'].includes(val), {
        message: 'Invalid branch',
      }),
    
    semester: z.string()
      .or(z.number())
      .transform((val) => parseInt(val.toString()))
      .refine((val) => val >= 1 && val <= 8, {
        message: 'Semester must be between 1 and 8',
      }),
    
    type: z.enum(['Periodic Test', 'Previous Year Question Paper', 'Question Bank'], {
      errorMap: () => ({ message: 'Invalid paper type' }),
    }),
    
    description: z.string()
      .trim()
      .max(500, 'Description must be less than 500 characters')
      .optional()
      .or(z.literal('')),
  }),
});

// Pagination query validation schema
export const paginationSchema = z.object({
  query: z.object({
    page: z.string()
      .optional()
      .transform((val) => val ? parseInt(val) : 1)
      .refine((val) => val >= 1, { message: 'Page must be a positive integer' }),
    
    limit: z.string()
      .optional()
      .transform((val) => val ? parseInt(val) : 20)
      .refine((val) => val >= 1 && val <= 100, {
        message: 'Limit must be between 1 and 100',
      }),
  }).passthrough(), // Allow other query params
});

// Feature request validation schema
export const featureRequestSchema = z.object({
  body: z.object({
    category: z.enum(['UI/UX', 'New Feature', 'Performance', 'Integration', 'Content', 'Other'], {
      errorMap: () => ({ message: 'Invalid category' }),
    }),
    
    featureTitle: z.string()
      .trim()
      .min(5, 'Title must be at least 5 characters')
      .max(100, 'Title must be less than 100 characters'),
    
    description: z.string()
      .trim()
      .min(20, 'Description must be at least 20 characters')
      .max(1000, 'Description must be less than 1000 characters'),
  }),
});

// Subject creation validation schema
export const subjectCreationSchema = z.object({
  body: z.object({
    name: z.string()
      .trim()
      .min(3, 'Subject name must be at least 3 characters')
      .max(100, 'Name must be less than 100 characters'),
    
    branch: z.string()
      .trim()
      .toUpperCase()
      .refine((val) => ['CSE', 'ME', 'ECE', 'EE', 'CE', 'CHE', 'IT', 'CSBS', 'AIDS'].includes(val), {
        message: 'Invalid branch',
      }),
    
    semester: z.number()
      .or(z.string().transform((val) => parseInt(val)))
      .refine((val) => val >= 1 && val <= 8, {
        message: 'Semester must be between 1 and 8',
      }),
    
    credits: z.number()
      .or(z.string().transform((val) => parseInt(val)))
      .refine((val) => val >= 1 && val <= 6, {
        message: 'Credits must be between 1 and 6',
      }),
    
    code: z.string()
      .trim()
      .max(20, 'Code must be less than 20 characters')
      .optional(),
  }),
});
