// Payment Method routes for handling payment method-related endpoints
const express = require("express");
const { body } = require("express-validator");
const paymentMethodController = require("../controllers/paymentMethodController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

// Validation middleware
const paymentMethodValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Payment method name is required")
    .isLength({ max: 100 })
    .withMessage("Payment method name must be less than 100 characters"),
  body("description")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Description must be less than 255 characters"),
];

// Routes
router.post(
  "/",
  isAuthenticated,
  paymentMethodValidation,
  paymentMethodController.createPaymentMethod
);
router.get("/", isAuthenticated, paymentMethodController.getPaymentMethods);
router.put(
  "/:id",
  isAuthenticated,
  paymentMethodValidation,
  paymentMethodController.updatePaymentMethod
);
router.delete("/:id", isAuthenticated, paymentMethodController.deletePaymentMethod);

module.exports = router; 