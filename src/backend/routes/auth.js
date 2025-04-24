 // src/backend/routes/auth.js
import express from 'express'
import jwt from "jsonwebtoken"
import { body, validationResult } from "express-validator"
import User from '../models/user.model.js'

const router = express.Router();

// Register
router.post('/register', 
    [
      body('email').isEmail().normalizeEmail(), // Normalizes email (lowercase + trim)
      body('password').isLength({ min: 6 }),
      body('username').isLength({ min: 3 })
    ],
    async (req, res) => {
      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { username, email, password } = req.body;
      const normalizedEmail = email.toLowerCase().trim(); // Force lowercase + trim
  
      try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
          return res.status(400).json({ error: "Email already exists" });
        }
  
        // Create and save user (password is hashed via pre-save hook)
        const user = new User({ username, email: normalizedEmail, password, is_admin : false });
        await user.save();
  
        res.status(201).json({ message: 'User registered!' });
      } catch (err) {
        if (err.code === 11000) { // MongoDB duplicate key (fallback check)
          res.status(400).json({ error: 'Email already exists' });
        } else {
          console.error("Registration error:", err);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    }
  );

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Invalid credentials hh' });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  // Generate JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });
  res.json({ token });
});

// src/backend/routes/auth.js
// auth.js (backend)
router.get('/me', async (req, res) => {


  console.log(req.headers);
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password'); // Exclude password
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      is_admin: user.isAdmin // Include any other relevant fields
    });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;