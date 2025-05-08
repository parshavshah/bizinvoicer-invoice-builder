// Product routes for handling product/service-related endpoints
const express = require("express");
const { body } = require("express-validator");
const productController = require("../controllers/productController");
const { isAuthenticated } = require("../middleware/auth");
const multer = require("multer");
const upload = multer();

const router = express.Router();

// Validation middleware
const productValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ max: 255 })
    .withMessage("Product name must be less than 255 characters"),
  body("description").optional().trim(),
  body("sku")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("SKU must be less than 100 characters"),
  body("unit")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Unit must be less than 50 characters"),
  body("regularPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Regular price must be a positive number"),
];

// Routes
router.post(
  "/",
  isAuthenticated,
  upload.array(),
  productValidation,
  productController.createProduct
);
router.get("/", isAuthenticated, productController.getProducts);
router.put(
  "/:id",
  isAuthenticated,
  upload.array(),
  productValidation,
  productController.updateProduct
);
router.delete("/:id", isAuthenticated, productController.deleteProduct);

module.exports = router;
