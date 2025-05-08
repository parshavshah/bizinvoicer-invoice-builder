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
  res.render("login", { BASE_URL: process.env.BASE_URL });
});

// register view
router.get("/register", (req, res, next) => {
  res.render("register", { BASE_URL: process.env.BASE_URL });
});

// dashboard view
router.get("/dashboard", isAuthenticated, (req, res, next) => {
  res.render("dashboard", { BASE_URL: process.env.BASE_URL });
});

// firms view
router.get("/firms", isAuthenticated, (req, res, next) => {
  res.render("firms", { BASE_URL: process.env.BASE_URL });
});

// clients view
router.get("/clients", isAuthenticated, (req, res, next) => {
  res.render("clients", { BASE_URL: process.env.BASE_URL });
});

// products view
router.get("/products", isAuthenticated, (req, res, next) => {
  res.render("products", { BASE_URL: process.env.BASE_URL });
});

// taxes view
router.get("/taxes", isAuthenticated, (req, res, next) => {
  res.render("taxes", { BASE_URL: process.env.BASE_URL });
});

router.get("/invoice/list", isAuthenticated, (req, res, next) => {
  res.render("invoice/list", { BASE_URL: process.env.BASE_URL });
});
router.get("/invoice/create", isAuthenticated, (req, res, next) => {
  res.render("invoice/create", { BASE_URL: process.env.BASE_URL });
});
router.get("/invoice/update/:id", isAuthenticated, (req, res, next) => {
  res.render("invoice/update", { BASE_URL: process.env.BASE_URL });
});

// user profile view
router.get("/profile", isAuthenticated, (req, res, next) => {
  res.render("profile", { BASE_URL: process.env.BASE_URL });
});

// change password view
router.get("/change-password", isAuthenticated, (req, res, next) => {
  res.render("change-password", { BASE_URL: process.env.BASE_URL });
});

// forgot password view
router.get("/forgot-password", isAuthenticated, (req, res, next) => {
  res.render("dashboard", { BASE_URL: process.env.BASE_URL });
});

module.exports = router;
