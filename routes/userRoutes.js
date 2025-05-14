// User routes for handling user-related endpoints
const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const userValidation = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 100 })
    .withMessage('First name must be less than 100 characters'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 100 })
    .withMessage('Last name must be less than 100 characters')
];

// Routes
router.get('/', isAuthenticated, userController.getUsers);
router.get('/:id', isAuthenticated, userController.getUserById);
router.post('/', isAuthenticated, userValidation, userController.createUser);
router.put('/:id', isAuthenticated, userValidation, userController.updateUser);
router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router; 