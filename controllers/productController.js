// MIT License
// Copyright (c) 2025 Parshav Shah
// See LICENSE file in the project root for full license information.


const { validationResult } = require("express-validator");
const { Product, InvoiceItem } = require("../models");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, sku, unit, regularPrice } = req.body;

    const product = await Product.create({
      name,
      description,
      sku,
      unit,
      regularPrice: regularPrice || 0.0,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Error creating product" });
  }
};

// Get all products for the logged-in user
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {},
      order: [["createdAt", "DESC"]],
    });

    res.json(products);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, description, sku, unit, regularPrice } = req.body;

    // Find product and check ownership
    const product = await Product.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product
    await product.update({
      name,
      description,
      sku,
      unit,
      regularPrice,
    });

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find product and check ownership
    const product = await Product.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if product has any invoice items
    const invoiceItemCount = await InvoiceItem.count({
      where: { productId: id },
    });

    if (invoiceItemCount > 0) {
      return res.status(400).json({
        message: "Cannot delete product with existing invoice items",
      });
    }

    // Delete product
    await product.destroy();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};
