import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../backend/.env") });

const testToken = () => {
  const secret = process.env.RESET_TOKEN_SECRET || process.env.JWT_SECRET || "fallback";
  console.log("Using secret:", secret);
  
  try {
    const token = jwt.sign({ test: "data" }, secret, { expiresIn: "15m" });
    console.log("Token generated successfully:", token);
    
    const decoded = jwt.verify(token, secret);
    console.log("Token verified successfully:", decoded);
  } catch (error) {
    console.error("JWT Error:", error.message);
  }
};

testToken();
