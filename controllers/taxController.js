const { validationResult } = require("express-validator");
const { Tax } = require("../models");

// Create a new tax
exports.createTax = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, rate, description } = req.body;

    const tax = await Tax.create({
      name,
      rate,
      description,
    });

    res.status(201).json({
      message: "Tax created successfully",
      tax,
    });
  } catch (error) {
    console.error("Create tax error:", error);
    res.status(500).json({ message: "Error creating tax" });
  }
};

// Get all taxes for the logged-in user
exports.getTaxes = async (req, res) => {
  try {
    const taxes = await Tax.findAll({
      where: {},
      order: [["createdAt", "DESC"]],
    });

    res.json(taxes);
  } catch (error) {
    console.error("Get taxes error:", error);
    res.status(500).json({ message: "Error fetching taxes" });
  }
};

// Update a tax
exports.updateTax = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, rate, description } = req.body;

    // Find tax and check ownership
    const tax = await Tax.findOne({
      where: {
        id,
      },
    });

    if (!tax) {
      return res.status(404).json({ message: "Tax not found" });
    }

    // Update tax
    await tax.update({
      name,
      rate,
      description,
    });

    res.json({
      message: "Tax updated successfully",
      tax,
    });
  } catch (error) {
    console.error("Update tax error:", error);
    res.status(500).json({ message: "Error updating tax" });
  }
};

// Delete a tax
exports.deleteTax = async (req, res) => {
  try {
    const { id } = req.params;

    // Find tax and check ownership
    const tax = await Tax.findOne({
      where: {
        id,
      },
    });

    if (!tax) {
      return res.status(404).json({ message: "Tax not found" });
    }

    // Delete tax
    await tax.destroy();

    res.json({ message: "Tax deleted successfully" });
  } catch (error) {
    console.error("Delete tax error:", error);
    res.status(500).json({ message: "Error deleting tax" });
  }
};
