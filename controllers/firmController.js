// MIT License
// Copyright (c) 2025 Parshav Shah
// See LICENSE file in the project root for full license information.


// Firm controller for handling company/firm-related operations
const { validationResult } = require("express-validator");
const { Firm, Invoice } = require("../models");
const fs = require("fs");
const path = require("path");

// Create a new firm
exports.createFirm = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      address,
      city,
      state,
      postalCode,
      country,
      phone,
      email,
      website,
      taxNumber,
    } = req.body;

    // Handle logo upload
    let logoPath = null;
    if (req.file) {
      logoPath = `/uploads/${req.file.filename}`;
    }

    const firm = await Firm.create({
      name,
      address,
      city,
      state,
      postalCode,
      country,
      phone,
      email,
      website,
      taxNumber,
      logoPath,
    });

    res.status(201).json({
      message: "Firm created successfully",
      firm,
    });
  } catch (error) {
    console.error("Create firm error:", error);
    res.status(500).json({ message: "Error creating firm" });
  }
};

// Get all firms for the logged-in user
exports.getFirms = async (req, res) => {
  try {
    const firms = await Firm.findAll({
      where: {},
      order: [["createdAt", "DESC"]],
    });

    res.json(firms);
  } catch (error) {
    console.error("Get firms error:", error);
    res.status(500).json({ message: "Error fetching firms" });
  }
};

// Update a firm
exports.updateFirm = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const {
      name,
      address,
      city,
      state,
      postalCode,
      country,
      phone,
      email,
      website,
      taxNumber,
    } = req.body;

    // Find firm and check ownership
    const firm = await Firm.findOne({
      where: {
        id,
      },
    });

    if (!firm) {
      return res.status(404).json({ message: "Firm not found" });
    }

    // Handle logo upload
    let logoPath = firm.logoPath;
    if (req.file) {
      // Delete old logo if exists
      if (firm.logoPath) {
        const oldLogoPath = path.join(__dirname, "../public", firm.logoPath);
        if (fs.existsSync(oldLogoPath)) {
          fs.unlinkSync(oldLogoPath);
        }
      }
      logoPath = `/uploads/${req.file.filename}`;
    }

    // Update firm
    await firm.update({
      name,
      address,
      city,
      state,
      postalCode,
      country,
      phone,
      email,
      website,
      taxNumber,
      logoPath,
    });

    res.json({
      message: "Firm updated successfully",
      firm,
    });
  } catch (error) {
    console.error("Update firm error:", error);
    res.status(500).json({ message: "Error updating firm" });
  }
};

// Delete a firm
exports.deleteFirm = async (req, res) => {
  try {
    const { id } = req.params;

    // Find firm and check ownership
    const firm = await Firm.findOne({
      where: {
        id,
      },
    });

    if (!firm) {
      return res.status(404).json({ message: "Firm not found" });
    }

    // Check if firm has any invoices
    const invoiceCount = await Invoice.count({
      where: { firmId: id },
    });

    if (invoiceCount > 0) {
      return res.status(400).json({
        message: "Cannot delete firm with existing invoices",
      });
    }

    // Delete logo file if exists
    if (firm.logoPath) {
      const logoPath = path.join(__dirname, "../public", firm.logoPath);
      if (fs.existsSync(logoPath)) {
        fs.unlinkSync(logoPath);
      }
    }

    // Delete firm
    await firm.destroy();

    res.json({ message: "Firm deleted successfully" });
  } catch (error) {
    console.error("Delete firm error:", error);
    res.status(500).json({ message: "Error deleting firm" });
  }
};
