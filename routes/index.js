const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/auth");
const {
  INVOICE_STATUS,
  CURRENCY,
  DATE_FORMATS,
  NUMBER_FORMAT,
} = require("../utils/constants");

const { validationResult } = require("express-validator");
const {
  Invoice,
  InvoiceItem,
  Setting,
  InvoiceItemTax,
  Client,
  Firm,
  Product,
  Tax,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");

const getApplicationSettings = async () => {
  const setting = await Setting.findOne();
  return setting;
};

// settings view
router.get("/setting", isAuthenticated, async (req, res, next) => {
  const { applicationName, softwareLogo, currency, numberFormat, dateFormat } =
    await getApplicationSettings();

  res.render("setting", {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    DATE_FORMATS,
    NUMBER_FORMAT,
    CURRENCY,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

router.get("/static-dropdown", (req, res) => {
  res.json({
    INVOICE_STATUS,
    CURRENCY,
  });
});

router.get("/", async (req, res, next) => {
  const { applicationName, softwareLogo, currency, numberFormat, dateFormat } =
    await getApplicationSettings();

  res.render("index", {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
  });
});

router.get("/home", async (req, res, next) => {
  const { applicationName, softwareLogo, currency, numberFormat, dateFormat } =
    await getApplicationSettings();

  res.render("index", {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
  });
});

// login view
router.get("/login", async (req, res, next) => {
  // Check if user is already logged in
  if (req.session.user) {
    return res.redirect("/dashboard");
  }

  const { applicationName, softwareLogo, currency, numberFormat, dateFormat } =
    await getApplicationSettings();

  res.render("login", {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

// register view
router.get("/register", async (req, res, next) => {
  // Check if user is already logged in
  if (req.session.user) {
    return res.redirect("/dashboard");
  }

  const { applicationName, softwareLogo, currency, numberFormat, dateFormat } =
    await getApplicationSettings();

  res.render("register", {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

// dashboard view
router.get("/dashboard", isAuthenticated, async (req, res, next) => {
  try {
    const [
      firmCount,
      clientCount,
      productCount,
      taxCount,
      invoiceCount,
      invoiceStatusCounts,
    ] = await Promise.all([
      Firm.count({ where: { userId: req.session.user.id } }),
      Client.count({ where: { userId: req.session.user.id } }),
      Product.count({ where: { userId: req.session.user.id } }),
      Tax.count({ where: { userId: req.session.user.id } }),
      Invoice.count({ where: { userId: req.session.user.id } }),
      Invoice.findAll({
        where: { userId: req.session.user.id },
        attributes: [
          "status",
          [sequelize.fn("COUNT", sequelize.col("id")), "count"],
        ],
        group: ["status"],
      }),
    ]);

    // Transform invoice status counts into a more usable format
    const statusCounts = {};
    invoiceStatusCounts.forEach((item) => {
      statusCounts[item.status] = parseInt(item.get("count"));
    });

    const {
      applicationName,
      softwareLogo,
      currency,
      numberFormat,
      dateFormat,
    } = await getApplicationSettings();

    res.render("dashboard", {
      user: req.session.user,
      applicationName,
      softwareLogo,
      currency,
      numberFormat,
      dateFormat,
      BASE_URL: process.env.BASE_URL,
      counts: {
        firms: firmCount,
        clients: clientCount,
        products: productCount,
        taxes: taxCount,
        invoices: invoiceCount,
      },
      invoiceStatusCounts: statusCounts,
      INVOICE_STATUS,
    });
  } catch (error) {
    next(error);
  }
});

// firms view
router.get("/firms", isAuthenticated, async (req, res, next) => {
  const { applicationName, softwareLogo, currency, numberFormat, dateFormat } =
    await getApplicationSettings();

  res.render("firms", {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

// clients view
router.get("/clients", isAuthenticated, async (req, res, next) => {
  const { applicationName, softwareLogo, currency, numberFormat, dateFormat } =
    await getApplicationSettings();

  res.render("clients", {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

// products view
router.get("/products", isAuthenticated, async (req, res, next) => {
  const { applicationName, softwareLogo, currency, numberFormat, dateFormat } =
    await getApplicationSettings();

  res.render("products", {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

// taxes view
router.get("/taxes", isAuthenticated, async (req, res, next) => {
  const { applicationName, softwareLogo, currency, numberFormat, dateFormat } =
    await getApplicationSettings();

  res.render("taxes", {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

router.get("/invoice/list", isAuthenticated, async (req, res, next) => {
  const { applicationName, softwareLogo, currency, numberFormat, dateFormat } =
    await getApplicationSettings();

  res.render("invoice/list", {
    CURRENCY,
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});
router.get("/invoice/create", isAuthenticated, async (req, res, next) => {
  const { applicationName, softwareLogo, currency, numberFormat, dateFormat } =
    await getApplicationSettings();

  res.render("invoice/create", {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});
router.get("/invoice/update/:id", isAuthenticated, async (req, res, next) => {
  const { applicationName, softwareLogo, currency, numberFormat, dateFormat } =
    await getApplicationSettings();

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

  res.render("invoice/update", {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    invoice,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});
router.get("/invoice/view/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  const { applicationName, softwareLogo, currency, numberFormat, dateFormat } =
    await getApplicationSettings();

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
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    invoice: invoice,
    CURRENCY: CURRENCY,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

// user profile view
router.get("/profile", isAuthenticated, async (req, res, next) => {
  const { applicationName, softwareLogo, currency, numberFormat, dateFormat } =
    await getApplicationSettings();

  res.render("profile", {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

// change password view
router.get("/change-password", isAuthenticated, async (req, res, next) => {
  const { applicationName, softwareLogo, currency, numberFormat, dateFormat } =
    await getApplicationSettings();

  res.render("change-password", {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

// forgot password view
router.get("/forgot-password", isAuthenticated, async (req, res, next) => {
  const { applicationName, softwareLogo, currency, numberFormat, dateFormat } =
    await getApplicationSettings();
  res.render("dashboard", {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
});

module.exports = router;
