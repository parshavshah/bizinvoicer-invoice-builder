// Client routes for handling client-related endpoints
const express = require("express");
const { body } = require("express-validator");
const clientController = require("../controllers/clientController");
const { isAuthenticated } = require("../middleware/auth");
var multer = require("multer");

var upload = multer();

const router = express.Router();

// Validation middleware
const clientValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Client name is required")
    .isLength({ max: 255 })
    .withMessage("Client name must be less than 255 characters"),
  body("contactPerson")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Contact person name must be less than 100 characters"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  body("phone")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Phone number must be less than 50 characters"),
  body("city")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("City must be less than 100 characters"),
  body("state")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("State must be less than 100 characters"),
  body("postalCode")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Postal code must be less than 20 characters"),
  body("country")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Country must be less than 100 characters"),
  body("taxNumber")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Tax number must be less than 100 characters"),
];

// Routes
router.post(
  "/",
  isAuthenticated,
  upload.array(),
  clientValidation,
  clientController.createClient
);
router.get("/", isAuthenticated, clientController.getClients);
router.put(
  "/:id",
  isAuthenticated,
  upload.array(),
  clientValidation,
  clientController.updateClient
);
router.delete("/:id", isAuthenticated, clientController.deleteClient);

module.exports = router;
