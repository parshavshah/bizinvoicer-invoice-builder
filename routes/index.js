const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/auth");
const { INVOICE_STATUS, CURRENCY } = require("../utils/constants");

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
  res.render("login");
});

// register view
router.get("/register", (req, res, next) => {
  res.render("register");
});

// dashboard view
router.get("/dashboard", isAuthenticated, (req, res, next) => {
  res.render("dashboard");
});

// firms view
router.get("/firms", isAuthenticated, (req, res, next) => {
  res.render("firms");
});

// clients view
router.get("/clients", isAuthenticated, (req, res, next) => {
  res.render("clients");
});

router.get("/products", isAuthenticated, (req, res, next) => {
  res.render("products");
});
router.get("/taxes", isAuthenticated, (req, res, next) => {
  res.render("taxes");
});
router.get("/invoice/list", isAuthenticated, (req, res, next) => {
  res.render("invoice/list");
});
router.get("/invoice/create", isAuthenticated, (req, res, next) => {
  res.render("invoice/create");
});
router.get("/invoice/update/:id", isAuthenticated, (req, res, next) => {
  res.render("invoice/update");
});
router.get("/profile", isAuthenticated, (req, res, next) => {
  res.render("profile");
});
router.get("/change-password", isAuthenticated, (req, res, next) => {
  res.render("change-password");
});
router.get("/forgot-password", isAuthenticated, (req, res, next) => {
  res.render("dashboard");
});

module.exports = router;
