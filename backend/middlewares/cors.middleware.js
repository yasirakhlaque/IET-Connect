import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// Split and trim whitespace from each origin
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
    ? process.env.CORS_ALLOWED_ORIGINS.split(",").map(origin => origin.trim())
    : [];

console.log("Allowed CORS Origins:", allowedOrigins);

const corsOptions = {
    origin: function (origin, callback) {
        console.log("Request from origin:", origin);
        
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            console.log("CORS blocked origin:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

export default cors(corsOptions);