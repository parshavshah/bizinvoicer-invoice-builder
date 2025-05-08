// Tax routes for handling tax-related endpoints
const express = require("express");
const { body } = require("express-validator");
const taxController = require("../controllers/taxController");
const { isAuthenticated } = require("../middleware/auth");
const multer = require("multer");
const upload = multer();

const router = express.Router();

// Validation middleware
const taxValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Tax name is required")
    .isLength({ max: 100 })
    .withMessage("Tax name must be less than 100 characters"),
  body("rate")
    .notEmpty()
    .withMessage("Tax rate is required")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Tax rate must be between 0 and 100"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("Description must be less than 255 characters"),
];

// Routes
router.post(
  "/",
  isAuthenticated,
  upload.array(),
  taxValidation,
  taxController.createTax
);
router.get("/", isAuthenticated, taxController.getTaxes);
router.put(
  "/:id",
  isAuthenticated,
  upload.array(),
  taxValidation,
  taxController.updateTax
);
router.delete("/:id", isAuthenticated, taxController.deleteTax);

module.exports = router;
