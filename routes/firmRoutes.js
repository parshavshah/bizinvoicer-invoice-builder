// Firm routes for handling company/firm-related endpoints 
const express = require('express');
const { body } = require('express-validator');
const firmController = require('../controllers/firmController');
const { isAuthenticated } = require('../middleware/auth');
const upload = require('../utils/fileUpload');

const router = express.Router();

// Validation middleware
const firmValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Firm name is required')
    .isLength({ max: 255 })
    .withMessage('Firm name must be less than 255 characters'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('phone')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Phone number must be less than 50 characters'),
  body('website')
    .optional()
    .isURL()
    .withMessage('Please enter a valid website URL'),
  body('taxNumber')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Tax number must be less than 100 characters'),
  body('defaultCurrency')
    .optional()
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be a 3-letter code (e.g., USD)')
];

// Routes
router.post('/', isAuthenticated, upload.single('logo'), firmValidation, firmController.createFirm);
router.get('/', isAuthenticated, firmController.getFirms);
router.put('/:id', isAuthenticated, upload.single('logo'), firmValidation, firmController.updateFirm);
router.delete('/:id', isAuthenticated, firmController.deleteFirm);

module.exports = router; 