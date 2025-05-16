// Quotation routes for handling quotation-related endpoints
const express = require("express");
const { body } = require("express-validator");
const quotationController = require("../controllers/quotationController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

// Validation middleware
const quotationValidation = [
  body("clientId")
    .notEmpty()
    .withMessage("Client is required")
    .isInt()
    .withMessage("Invalid client ID"),
  body("firmId")
    .notEmpty()
    .withMessage("Firm is required")
    .isInt()
    .withMessage("Invalid firm ID"),
  body("quotationNumber")
    .trim()
    .notEmpty()
    .withMessage("Quotation number is required")
    .isLength({ max: 50 })
    .withMessage("Quotation number must be less than 50 characters"),
  body("reference")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Reference must be less than 100 characters"),
  body("issueDate")
    .notEmpty()
    .withMessage("Issue date is required")
    .isDate()
    .withMessage("Invalid issue date"),
  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isDate()
    .withMessage("Invalid due date"),
  body("notes").optional().trim(),
  body("items")
    .isArray()
    .withMessage("Items must be an array")
    .notEmpty()
    .withMessage("At least one item is required"),
  body("items.*.productId")
    .optional()
    .isInt()
    .withMessage("Invalid product ID"),
  body("items.*.description")
    .trim()
    .notEmpty()
    .withMessage("Item description is required"),
  body("items.*.quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isFloat({ min: 0 })
    .withMessage("Quantity must be a positive number"),
  body("items.*.unitPrice")
    .notEmpty()
    .withMessage("Unit price is required")
    .isFloat({ min: 0 })
    .withMessage("Unit price must be a positive number"),
  body("items.*.discountPercent")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount percent must be between 0 and 100"),
  body("items.*.taxes").isArray().withMessage("Taxes must be an array"),
  body("items.*.taxes.*.taxId")
    .notEmpty()
    .withMessage("Tax ID is required")
    .isInt()
    .withMessage("Invalid tax ID"),
  body("items.*.taxes.*.taxName")
    .trim()
    .notEmpty()
    .withMessage("Tax name is required")
    .isLength({ max: 100 })
    .withMessage("Tax name must be less than 100 characters"),
  body("items.*.taxes.*.taxRate")
    .notEmpty()
    .withMessage("Tax rate is required")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Tax rate must be between 0 and 100"),
];

const statusValidation = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["draft", "sent", "accepted", "rejected", "cancelled"])
    .withMessage("Invalid status"),
];

// Routes
router.post(
  "/",
  isAuthenticated,
  quotationValidation,
  quotationController.createQuotation
);
router.get("/", isAuthenticated, quotationController.getQuotations);
router.get("/:id", isAuthenticated, quotationController.getQuotationById);
router.put(
  "/:id",
  isAuthenticated,
  quotationValidation,
  quotationController.updateQuotation
);
router.patch(
  "/:id/status",
  isAuthenticated,
  statusValidation,
  quotationController.updateQuotationStatus
);
router.delete("/:id", isAuthenticated, quotationController.deleteQuotation);

module.exports = router;
