const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    });


// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
    }
  
    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password' });
    }
  
    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, 'secretKey', { expiresIn: '1h' });
    res.header('auth-token', token).json({ token });
  });

// logout
router.get('/logout', (req, res) => {
    // Clear the token
    res.header('auth-token', null).json({ message: 'Logged out successfully' });
  });

module.exports = router;