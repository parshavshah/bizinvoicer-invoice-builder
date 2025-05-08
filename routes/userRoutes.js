// User routes for handling user-related endpoints 
const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');

const router = express.Router();

// Validation middleware
const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
];

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const profileValidation = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
];

// Routes
router.post('/register', registerValidation, userController.register);
router.post('/login', loginValidation, userController.login);
router.get('/logout', userController.logout);
router.get('/profile', userController.getProfile);
router.put('/profile', profileValidation, userController.updateProfile);

module.exports = router; 