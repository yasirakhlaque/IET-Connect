import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import { validateEnvVariables } from "./middlewares/security.middleware.js";

dotenv.config();

// Validate environment variables before starting
validateEnvVariables();

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
    console.log("Failed to start server: ", err);
});
