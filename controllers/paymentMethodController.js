// Payment Method controller for handling payment method-related operations
const { validationResult } = require("express-validator");
const { PaymentMethod, Payment } = require("../models");

// Create a new payment method
exports.createPaymentMethod = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    const paymentMethod = await PaymentMethod.create({
      name,
      description,
    });

    res.status(201).json({
      message: "Payment method created successfully",
      paymentMethod,
    });
  } catch (error) {
    console.error("Create payment method error:", error);
    res.status(500).json({ message: "Error creating payment method" });
  }
};

// Get all payment methods
exports.getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(paymentMethods);
  } catch (error) {
    console.error("Get payment methods error:", error);
    res.status(500).json({ message: "Error fetching payment methods" });
  }
};

// Update a payment method
exports.updatePaymentMethod = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, description } = req.body;

    // Find payment method
    const paymentMethod = await PaymentMethod.findOne({
      where: { id },
    });

    if (!paymentMethod) {
      return res.status(404).json({ message: "Payment method not found" });
    }

    // Update payment method
    await paymentMethod.update({
      name,
      description,
    });

    res.json({
      message: "Payment method updated successfully",
      paymentMethod,
    });
  } catch (error) {
    console.error("Update payment method error:", error);
    res.status(500).json({ message: "Error updating payment method" });
  }
};

// Delete a payment method
exports.deletePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;

    // Find payment method
    const paymentMethod = await PaymentMethod.findOne({
      where: { id },
    });

    if (!paymentMethod) {
      return res.status(404).json({ message: "Payment method not found" });
    }

    // Check if payment method has any payments
    const paymentCount = await Payment.count({
      where: { paymentMethodId: id },
    });

    if (paymentCount > 0) {
      return res.status(400).json({
        message: "Cannot delete payment method with existing payments",
      });
    }

    // Delete payment method
    await paymentMethod.destroy();

    res.json({ message: "Payment method deleted successfully" });
  } catch (error) {
    console.error("Delete payment method error:", error);
    res.status(500).json({ message: "Error deleting payment method" });
  }
};
