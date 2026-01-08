import helmet from 'helmet';
import hpp from 'hpp';

// Configure Helmet with appropriate settings
export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false, // Needed for Cloudinary
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Needed for CORS
});

// Custom MongoDB query sanitization (Express 5 compatible)
// Removes $ and . from user input to prevent NoSQL injection
export const sanitizeData = (req, res, next) => {
  const sanitize = (obj) => {
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach((key) => {
        // Check for suspicious patterns
        if (key.includes('$') || key.includes('.')) {
          console.warn(`⚠️ Potential NoSQL injection attempt detected - Key: ${key}`);
        }
        
        // Remove $ and . from keys
        if (key.startsWith('$') || key.includes('.')) {
          delete obj[key];
        } else if (typeof obj[key] === 'object') {
          sanitize(obj[key]);
        } else if (typeof obj[key] === 'string') {
          // Also check string values for injection attempts
          if (obj[key].includes('$') || obj[key].match(/^\s*\{/)) {
            console.warn(`⚠️ Suspicious value detected in ${key}: ${obj[key]}`);
          }
        }
      });
    }
    return obj;
  };

  // Sanitize body and params (mutable in Express 5)
  if (req.body) sanitize(req.body);
  if (req.params) sanitize(req.params);
  
  // For req.query in Express 5, we cannot reassign it
  // Instead, we sanitize in place by modifying/deleting properties
  if (req.query) sanitize(req.query);

  next();
};

// Prevent HTTP parameter pollution
export const preventParameterPollution = hpp({
  whitelist: [
    'branch', 
    'semester', 
    'year', 
    'type', 
    'subject',
    'page',
    'limit',
    'sort'
  ], // Allow these parameters to appear multiple times
});

// HTTPS redirect for production
export const httpsRedirect = (req, res, next) => {
  if (
    req.header('x-forwarded-proto') !== 'https' && 
    process.env.NODE_ENV === 'production'
  ) {
    return res.redirect(`https://${req.header('host')}${req.url}`);
  }
  next();
};

// Sanitize error messages in production
export const sanitizeErrors = (err, req, res, next) => {
  console.error('❌ Error occurred:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
    ip: req.ip,
  });

  // For production, don't expose error details
  if (process.env.NODE_ENV === 'production') {
    const statusCode = err.statusCode || 500;
    
    // Generic error messages for production
    const message = statusCode === 500 
      ? 'Internal server error' 
      : err.message || 'An error occurred';

    return res.status(statusCode).json({ 
      message,
      ...(statusCode !== 500 && { error: err.message })
    });
  }

  // For development, show full error details
  res.status(err.statusCode || 500).json({
    message: err.message,
    error: err.message,
    stack: err.stack,
  });
};

// Validate environment variables on startup
export const validateEnvVariables = () => {
  const required = [
    'MONGODB_URI',
    'JWT_SECRET',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'RESEND_API_KEY',
    'FROM_EMAIL',
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(key => console.error(`   - ${key}`));
    process.exit(1);
  }

  console.log('✅ All required environment variables are present');
};
