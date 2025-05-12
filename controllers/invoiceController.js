// Invoice controller for handling invoice-related operations
const { validationResult } = require("express-validator");
const {
  Invoice,
  InvoiceItem,
  InvoiceItemTax,
  Client,
  Firm,
  Product,
  Tax,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");

// Create a new invoice with items and taxes
exports.createInvoice = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      clientId,
      firmId,
      invoiceNumber,
      reference,
      issueDate,
      dueDate,
      notes,
      items,
    } = req.body;

    // Start transaction
    const result = await sequelize.transaction(async (t) => {
      // Create invoice
      const invoice = await Invoice.create(
        {
          userId: req.session.user.id,
          clientId,
          firmId,
          invoiceNumber,
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
      );

      let subtotal = 0;
      let taxTotal = 0;

      // Create invoice items and their taxes
      for (const item of items) {
        const {
          productId,
          description,
          quantity,
          unitPrice,
          discountPercent,
          taxes,
        } = item;

        // Calculate item subtotal
        const itemSubtotal = quantity * unitPrice * (1 - discountPercent / 100);
        subtotal += itemSubtotal;

        // Create invoice item
        const invoiceItem = await InvoiceItem.create(
          {
            invoiceId: invoice.id,
            productId,
            description,
            quantity,
            unitPrice,
            discountPercent,
            subtotal: itemSubtotal,
          },
          { transaction: t }
        );

        // Create invoice item taxes
        for (const tax of taxes) {
          const { taxId, taxName, taxRate } = tax;
          const taxAmount = itemSubtotal * (taxRate / 100);
          taxTotal += taxAmount;

          await InvoiceItemTax.create(
            {
              invoiceItemId: invoiceItem.id,
              taxId,
              taxName,
              taxRate,
              taxAmount,
            },
            { transaction: t }
          );
        }
      }

      // Update invoice totals
      await invoice.update(
        {
          subtotal,
          taxTotal,
          total: subtotal + taxTotal,
        },
        { transaction: t }
      );

      return invoice;
    });

    // Fetch complete invoice with items and taxes
    const invoice = await Invoice.findByPk(result.id, {
      include: [
        {
          model: InvoiceItem,
          include: [InvoiceItemTax],
        },
        Client,
        Firm,
      ],
    });

    res.status(201).json({
      message: "Invoice created successfully",
      invoice,
    });
  } catch (error) {
    console.error("Create invoice error:", error);
    res.status(500).json({ message: "Error creating invoice" });
  }
};

// Get single invoices for the logged-in user
exports.getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findOne({
      where: { id: id, userId: req.session.user.id },
      include: [
        {
          model: InvoiceItem,
          include: [InvoiceItemTax],
        },
        Client,
        Firm,
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(invoice);
  } catch (error) {
    console.error("Get invoice error:", error);
    res.status(500).json({ message: "Error fetching invoice" });
  }
};

// Get all invoices for the logged-in user
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      where: { userId: req.session.user.id },
      include: [
        {
          model: InvoiceItem,
          include: [InvoiceItemTax],
        },
        Client,
        Firm,
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(invoices);
  } catch (error) {
    console.error("Get invoices error:", error);
    res.status(500).json({ message: "Error fetching invoices" });
  }
};

// Update an invoice
exports.updateInvoice = async (req, res) => {
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
      invoiceNumber,
      reference,
      issueDate,
      dueDate,
      notes,
      items,
    } = req.body;

    // Find invoice and check ownership
    const invoice = await Invoice.findOne({
      where: {
        id,
        userId: req.session.user.id,
      },
    });

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Start transaction
    const result = await sequelize.transaction(async (t) => {
      // Update invoice
      await invoice.update(
        {
          clientId,
          firmId,
          invoiceNumber,
          reference,
          issueDate,
          dueDate,
          notes,
        },
        { transaction: t }
      );

      // Delete existing items and taxes
      await InvoiceItemTax.destroy({
        where: {
          invoiceItemId: {
            [Op.in]: invoice.InvoiceItems ?  invoice.InvoiceItems.map((item) => item.id):[],
          },
        },
        transaction: t,
      });

      await InvoiceItem.destroy({
        where: { invoiceId: invoice.id },
        transaction: t,
      });

      let subtotal = 0;
      let taxTotal = 0;

      // Create new invoice items and their taxes
      for (const item of items) {
        const {
          productId,
          description,
          quantity,
          unitPrice,
          discountPercent,
          taxes,
        } = item;

        // Calculate item subtotal
        const itemSubtotal = quantity * unitPrice * (1 - discountPercent / 100);
        subtotal += itemSubtotal;

        // Create invoice item
        const invoiceItem = await InvoiceItem.create(
          {
            invoiceId: invoice.id,
            productId,
            description,
            quantity,
            unitPrice,
            discountPercent,
            subtotal: itemSubtotal,
          },
          { transaction: t }
        );

        // Create invoice item taxes
        for (const tax of taxes) {
          const { taxId, taxName, taxRate } = tax;
          const taxAmount = itemSubtotal * (taxRate / 100);
          taxTotal += taxAmount;

          await InvoiceItemTax.create(
            {
              invoiceItemId: invoiceItem.id,
              taxId,
              taxName,
              taxRate,
              taxAmount,
            },
            { transaction: t }
          );
        }
      }

      // Update invoice totals
      await invoice.update(
        {
          subtotal,
          taxTotal,
          total: subtotal + taxTotal,
        },
        { transaction: t }
      );

      return invoice;
    });

    // Fetch complete invoice with items and taxes
    const updatedInvoice = await Invoice.findByPk(result.id, {
      include: [
        {
          model: InvoiceItem,
          include: [InvoiceItemTax],
        },
        Client,
        Firm,
      ],
    });

    res.json({
      message: "Invoice updated successfully",
      invoice: updatedInvoice,
    });
  } catch (error) {
    console.error("Update invoice error:", error);
    res.status(500).json({ message: "Error updating invoice" });
  }
};

// Update invoice status
exports.updateInvoiceStatus = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status } = req.body;

    // Find invoice and check ownership
    const invoice = await Invoice.findOne({
      where: {
        id,
        userId: req.session.user.id,
      },
    });

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Update status
    await invoice.update({ status });

    res.json({
      message: "Invoice status updated successfully",
      invoice,
    });
  } catch (error) {
    console.error("Update invoice status error:", error);
    res.status(500).json({ message: "Error updating invoice status" });
  }
};

// Delete an invoice
exports.deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    // Find invoice and check ownership
    const invoice = await Invoice.findOne({
      where: {
        id,
        userId: req.session.user.id,
      },
    });

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Start transaction
    await sequelize.transaction(async (t) => {
      // Delete invoice item taxes
      await InvoiceItemTax.destroy({
        where: {
          invoiceItemId: {
            [Op.in]: invoice.InvoiceItems
              ? invoice.InvoiceItems.map((item) => item.id)
              : [],
          },
        },
        transaction: t,
      });

      // Delete invoice items
      await InvoiceItem.destroy({
        where: { invoiceId: invoice.id },
        transaction: t,
      });

      // Delete invoice
      await invoice.destroy({ transaction: t });
    });

    res.json({ message: "Invoice deleted successfully" });
  } catch (error) {
    console.error("Delete invoice error:", error);
    res.status(500).json({ message: "Error deleting invoice" });
  }
};
