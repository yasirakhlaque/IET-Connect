import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/student.model.js';
import { sendEmail } from '../utils/mailer.js';

export const signup = async (req, res) => {
  try {
    let { name, rollno, email, password, confirmPassword } = req.body;

    // Sanitize inputs
    name = name?.trim();
    rollno = rollno?.trim().toUpperCase();
    email = email?.trim().toLowerCase();

    // Validate required fields
    if (!rollno || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword)
      return res.status(400).json({ message: 'Passwords do not match' });

    const existing = await Student.findOne({
      $or: [{ email }, { rollno }],
    });

    if (existing) return res.status(400).json({ message: 'Student already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const student = await Student.create({
      name: name || null,
      rollno,
      email,
      password: hashed,
    });

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ message: 'An error occurred during signup. Please try again.' });
  }
};


export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Sanitize inputs
    email = email?.trim().toLowerCase();

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      message: 'Login successful',
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        rollno: student.rollno,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: 'An error occurred during login. Please try again.' });
  }
};

export const sendResetCode = async (req, res) => {
  try {
    let { email } = req.body;
    email = email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: 'Email not found' });

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    student.resetCode = resetCode;
    student.resetCodeExpiry = Date.now() + 10 * 60 * 1000;
    await student.save();

    await sendEmail(email, 'Password Reset Code', `Your code is: ${resetCode}`);
    res.json({ message: 'Reset code sent' });
  } catch (err) {
    console.error("RESET CODE ERROR:", err);
    res.status(500).json({ message: 'Failed to send reset code. Please try again.' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    let { email, resetCode, newPassword } = req.body;
    email = email?.trim().toLowerCase();

    if (!email || !resetCode || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const student = await Student.findOne({ email });

    if (!student || student.resetCode !== resetCode || Date.now() > student.resetCodeExpiry) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    student.password = await bcrypt.hash(newPassword, 10);
    student.resetCode = undefined;
    student.resetCodeExpiry = undefined;
    await student.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Reset error', error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const studentId = req.user.id; // From auth middleware

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update name if provided
    if (name !== undefined) {
      student.name = name.trim() || null;
    }

    await student.save();

    res.json({
      message: 'Profile updated successfully',
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        rollno: student.rollno,
      },
    });
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ message: 'Update error', error: err.message });
  }
};


export const totalUsers = async (req, res) => {
  try {
    const usersCount = await Student.countDocuments();
    res.json({ totalUsers: usersCount });
  } catch (err) {
    console.error("TOTAL USERS ERROR:", err);
    res.status(500).json({ message: 'Error fetching total users', error: err.message });
  }
}