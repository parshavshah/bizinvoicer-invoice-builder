const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/auth");
const { INVOICE_STATUS, CURRENCY } = require("../utils/constants");

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

router.get("/static-dropdown", (req, res) => {
  res.json({
    INVOICE_STATUS,
    CURRENCY,
  });
});

const commonFunction = (req, res, next) => {
  res.render("index", { title: "Express" });
};

router.get("/", commonFunction);
router.get("/home", commonFunction);

// login view
router.get("/login", (req, res, next) => {
  res.render("login", {
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

// register view
router.get("/register", (req, res, next) => {
  res.render("register", {
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

// dashboard view
router.get("/dashboard", isAuthenticated, (req, res, next) => {
  res.render("dashboard", {
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

// firms view
router.get("/firms", isAuthenticated, (req, res, next) => {
  res.render("firms", {
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

// clients view
router.get("/clients", isAuthenticated, (req, res, next) => {
  res.render("clients", {
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

// products view
router.get("/products", isAuthenticated, (req, res, next) => {
  res.render("products", {
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

// taxes view
router.get("/taxes", isAuthenticated, (req, res, next) => {
  res.render("taxes", {
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

router.get("/invoice/list", isAuthenticated, (req, res, next) => {
  res.render("invoice/list", {
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});
router.get("/invoice/create", isAuthenticated, (req, res, next) => {
  res.render("invoice/create", {
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});
router.get("/invoice/update/:id", isAuthenticated, async (req, res, next) => {

  const {id} = req.params;

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

  res.render("invoice/update", {
    invoice,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});
router.get("/invoice/view/:id", isAuthenticated, async (req, res, next) => {

  const {id} = req.params;

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

  res.render("invoice/view", {
    invoice: invoice,
    CURRENCY : CURRENCY,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

// user profile view
router.get("/profile", isAuthenticated, (req, res, next) => {
  res.render("profile", {
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

// change password view
router.get("/change-password", isAuthenticated, (req, res, next) => {
  res.render("change-password", {
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

// forgot password view
router.get("/forgot-password", isAuthenticated, (req, res, next) => {
  res.render("dashboard", {
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

module.exports = router;
