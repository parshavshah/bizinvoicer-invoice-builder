const { validationResult } = require('express-validator');
const { Client, Invoice } = require('../models');

// Create a new client
exports.createClient = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      contactPerson,
      email,
      phone,
      address,
      city,
      state,
      postalCode,
      country,
      taxNumber,
      notes
    } = req.body;

    const client = await Client.create({
      userId: req.session.user.id,
      name,
      contactPerson,
      email,
      phone,
      address,
      city,
      state,
      postalCode,
      country,
      taxNumber,
      notes
    });

    res.status(201).json({
      message: 'Client created successfully',
      client
    });
  } catch (error) {
    console.error('Create client error:', error);
    res.status(500).json({ message: 'Error creating client' });
  }
};

// Get all clients for the logged-in user
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.findAll({
      where: { userId: req.session.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.json(clients);
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({ message: 'Error fetching clients' });
  }
};

// Update a client
exports.updateClient = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const {
      name,
      contactPerson,
      email,
      phone,
      address,
      city,
      state,
      postalCode,
      country,
      taxNumber,
      notes
    } = req.body;

    // Find client and check ownership
    const client = await Client.findOne({
      where: {
        id,
        userId: req.session.user.id
      }
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Update client
    await client.update({
      name,
      contactPerson,
      email,
      phone,
      address,
      city,
      state,
      postalCode,
      country,
      taxNumber,
      notes
    });

    res.json({
      message: 'Client updated successfully',
      client
    });
  } catch (error) {
    console.error('Update client error:', error);
    res.status(500).json({ message: 'Error updating client' });
  }
};

// Delete a client
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    // Find client and check ownership
    const client = await Client.findOne({
      where: {
        id,
        userId: req.session.user.id
      }
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Check if client has any invoices
    const invoiceCount = await Invoice.count({
      where: { clientId: id }
    });

    if (invoiceCount > 0) {
      return res.status(400).json({
        message: 'Cannot delete client with existing invoices'
      });
    }

    // Delete client
    await client.destroy();

    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Delete client error:', error);
    res.status(500).json({ message: 'Error deleting client' });
  }
}; 