// User controller for handling user-related operations 
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { User } = require('../models');
const { sendEmail } = require('../utils/emailService');

// Register a new user
exports.register = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    // Send welcome email
    const welcomeEmailHtml = `
      <h1>Welcome to InvoiceMate!</h1>
      <p>Dear ${firstName},</p>
      <p>Thank you for registering with InvoiceMate. We're excited to have you on board!</p>
      <p>You can now start creating and managing your invoices with ease.</p>
      <p>Best regards,<br>The InvoiceMate Team</p>
    `;

    await sendEmail({
      to: email,
      subject: 'Welcome to InvoiceMate!',
      html: welcomeEmailHtml
    });

    // Set user session
    req.session.user = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Set user session
    req.session.user = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Logout user
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
}; 