const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/auth");
const {
  getSettings,
  getStaticDropdown,
  getHome,
  getLogin,
  getRegister,
  getDashboard,
  getResourceView,
  getInvoiceList,
  getInvoiceCreate,
  getInvoiceUpdate,
  getInvoiceView,
  getProfile,
  getChangePassword,
  setUserPermissions,
  getForgotPassword,
  getQuotationCreate,
  getQuotationList,
  getQuotationUpdate,
  getQuotationView,
} = require("../controllers/indexController");

// Settings route
router.get("/setting", isAuthenticated, getSettings);

// Static dropdown data
router.get("/static-dropdown", getStaticDropdown);

// Public routes
router.get("/", getHome);
router.get("/login", getLogin);
router.get("/register", getRegister);

// Dashboard route
router.get("/dashboard", isAuthenticated, getDashboard);

// Resource routes
router.get("/firms", isAuthenticated, (req, res) =>
  getResourceView(req, res, "firms")
);
router.get("/payment-methods", isAuthenticated, (req, res) =>
  getResourceView(req, res, "payment-methods")
);
router.get("/clients", isAuthenticated, (req, res) =>
  getResourceView(req, res, "clients")
);
router.get("/products", isAuthenticated, (req, res) =>
  getResourceView(req, res, "products")
);
router.get("/taxes", isAuthenticated, (req, res) =>
  getResourceView(req, res, "taxes")
);
router.get("/users", isAuthenticated, (req, res) =>
  getResourceView(req, res, "users")
);

// Invoice routes
router.get("/invoice/list", isAuthenticated, getInvoiceList);
router.get("/invoice/create", isAuthenticated, getInvoiceCreate);
router.get("/invoice/update/:id", isAuthenticated, getInvoiceUpdate);
router.get("/invoice/view/:id", isAuthenticated, getInvoiceView);

// Quoutation routes
router.get("/quotation/list", isAuthenticated, getQuotationList);
router.get("/quotation/create", isAuthenticated, getQuotationCreate);
router.get("/quotation/update/:id", isAuthenticated, getQuotationUpdate);
router.get("/quotation/view/:id", isAuthenticated, getQuotationView);

// User profile routes
router.get("/profile", isAuthenticated, getProfile);
router.get("/change-password", isAuthenticated, getChangePassword);
router.get("/forgot-password", isAuthenticated, getForgotPassword);
router.get("/user-permissions", isAuthenticated, setUserPermissions);

module.exports = router;
