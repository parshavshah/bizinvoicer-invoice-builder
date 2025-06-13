// MIT License
// Copyright (c) 2025 Parshav Shah
// See LICENSE file in the project root for full license information.


// Quotation controller for handling quotation-related operations
const { validationResult } = require("express-validator");
const {
  Quotation,
  QuotationItem,
  QuotationItemTax,
  Client,
  Firm,
  Product,
  Tax,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");

// Create a new quotation with items and taxes
exports.createQuotation = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      clientId,
      firmId,
      quotationNumber,
      reference,
      issueDate,
      dueDate,
      notes,
      items,
    } = req.body;

    // Start transaction
    const result = await sequelize.transaction(async (t) => {
      // Create quotation
      const quotation = await Quotation.create(
        {
          clientId,
          firmId,
          quotationNumber,
          reference,
          issueDate,
          dueDate,
          notes,
          status: "draft",
          subtotal: 0,
          taxTotal: 0,
          total: 0,
        },
        { transaction: t }
      ).catch((error) => {
        console.log({ error });
      });

      let subtotal = 0;
      let taxTotal = 0;

      // Create quotation items and their taxes
      for (const item of items) {
        const {
          productId,
          description,
          name,
          quantity,
          unitPrice,
          discountPercent,
          taxes,
        } = item;

        // Calculate item subtotal
        const itemSubtotal = quantity * unitPrice * (1 - discountPercent / 100);
        subtotal += itemSubtotal;

        // Create quotation item
        const quotationItem = await QuotationItem.create(
          {
            quotationId: quotation.id,
            productId,
            name,
            description,
            quantity,
            unitPrice,
            discountPercent,
            subtotal: itemSubtotal,
          },
          { transaction: t }
        );

        // Create quotation item taxes
        for (const tax of taxes) {
          const { taxId, taxName, taxRate } = tax;
          const taxAmount = itemSubtotal * (taxRate / 100);
          taxTotal += taxAmount;

          await QuotationItemTax.create(
            {
              quotationItemId: quotationItem.id,
              taxId,
              taxName,
              taxRate,
              taxAmount,
            },
            { transaction: t }
          );
        }
      }

      // Update quotation totals
      await quotation.update(
        {
          subtotal,
          taxTotal,
          total: subtotal + taxTotal,
        },
        { transaction: t }
      );

      return quotation;
    });

    // Fetch complete quotation with items and taxes
    const quotation = await Quotation.findByPk(result.id, {
      include: [
        {
          model: QuotationItem,
          include: [QuotationItemTax],
        },
        Client,
        Firm,
      ],
    });

    res.status(201).json({
      message: "Quotation created successfully",
      quotation,
    });
  } catch (error) {
    console.error("Create quotation error:", error);
    res.status(500).json({ message: "Error creating quotation" });
  }
};

// Get single quotation by id
exports.getQuotationById = async (req, res) => {
  try {
    const { id } = req.params;

    const quotation = await Quotation.findOne({
      where: { id: id },
      include: [
        {
          model: QuotationItem,
          include: [QuotationItemTax],
        },
        Client,
        Firm,
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(quotation);
  } catch (error) {
    console.error("Get quotation error:", error);
    res.status(500).json({ message: "Error fetching quotation" });
  }
};

// Get all quotations
exports.getQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.findAll({
      where: {},
      include: [
        {
          model: QuotationItem,
          include: [QuotationItemTax],
        },
        Client,
        Firm,
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(quotations);
  } catch (error) {
    console.error("Get quotations error:", error);
    res.status(500).json({ message: "Error fetching quotations" });
  }
};

// Update a quotation
exports.updateQuotation = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const {
      clientId,
      firmId,
      quotationNumber,
      reference,
      issueDate,
      dueDate,
      notes,
      items,
    } = req.body;

    // Start transaction
    await sequelize.transaction(async (t) => {
      // Update quotation
      const quotation = await Quotation.findByPk(id, { transaction: t });
      if (!quotation) {
        throw new Error("Quotation not found");
      }
      await quotation.update(
        {
          clientId,
          firmId,
          quotationNumber,
          reference,
          issueDate,
          dueDate,
          notes,
        },
        { transaction: t }
      );

      // Delete existing items and taxes
      await QuotationItemTax.destroy({
        where: {
          quotationItemId: {
            [Op.in]: (
              await QuotationItem.findAll({
                where: { quotationId: id },
                attributes: ["id"],
                raw: true,
              })
            ).map((item) => item.id),
          },
        },
        transaction: t,
      });
      await QuotationItem.destroy({
        where: { quotationId: id },
        transaction: t,
      });

      // Re-create items and taxes
      let subtotal = 0;
      let taxTotal = 0;
      for (const item of items) {
        const {
          productId,
          description,
          name,
          quantity,
          unitPrice,
          discountPercent,
          taxes,
        } = item;
        const itemSubtotal = quantity * unitPrice * (1 - discountPercent / 100);
        subtotal += itemSubtotal;
        const quotationItem = await QuotationItem.create(
          {
            quotationId: quotation.id,
            productId,
            name,
            description,
            quantity,
            unitPrice,
            discountPercent,
            subtotal: itemSubtotal,
          },
          { transaction: t }
        );
        for (const tax of taxes) {
          const { taxId, taxName, taxRate } = tax;
          const taxAmount = itemSubtotal * (taxRate / 100);
          taxTotal += taxAmount;
          await QuotationItemTax.create(
            {
              quotationItemId: quotationItem.id,
              taxId,
              taxName,
              taxRate,
              taxAmount,
            },
            { transaction: t }
          );
        }
      }
      await quotation.update(
        {
          subtotal,
          taxTotal,
          total: subtotal + taxTotal,
        },
        { transaction: t }
      );
    });
    res.json({ message: "Quotation updated successfully" });
  } catch (error) {
    console.error("Update quotation error:", error);
    res.status(500).json({ message: "Error updating quotation" });
  }
};

// Delete a quotation
exports.deleteQuotation = async (req, res) => {
  try {
    const { id } = req.params;
    const quotation = await Quotation.findOne({ where: { id } });
    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }
    // Start transaction
    await sequelize.transaction(async (t) => {
      await QuotationItemTax.destroy({
        where: {
          quotationItemId: {
            [Op.in]: (
              await QuotationItem.findAll({
                where: { quotationId: id },
                attributes: ["id"],
                raw: true,
              })
            ).map((item) => item.id),
          },
        },
        transaction: t,
      });
      await QuotationItem.destroy({
        where: { quotationId: id },
        transaction: t,
      });
      await quotation.destroy({ transaction: t });
    });
    res.json({ message: "Quotation deleted successfully" });
  } catch (error) {
    console.error("Delete quotation error:", error);
    res.status(500).json({ message: "Error deleting quotation" });
  }
};


// Update invoice status
exports.updateQuotationStatus = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status } = req.body;

    // Find invoice and check ownership
    const invoice = await Quotation.findOne({
      where: {
        id,
      },
    });

    if (!invoice) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    // Update status
    await invoice.update({ status });

    res.json({
      message: "Quotation status updated successfully",
      invoice,
    });
  } catch (error) {
    console.error("Update invoice status error:", error);
    res.status(500).json({ message: "Error updating invoice status" });
  }
};
