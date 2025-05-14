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

const {
  INVOICE_STATUS,
  CURRENCY,
  DATE_FORMATS,
  NUMBER_FORMAT,
  USER_ROLES,
} = require("../utils/constants");

// Helper function to get application settings
const getApplicationSettings = async () => {
  const setting = await Setting.findOne();
  return setting;
};

// Settings view
const getSettings = async (req, res) => {
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
};

// Static dropdown data
const getStaticDropdown = (req, res) => {
  res.json({
    INVOICE_STATUS,
    CURRENCY,
  });
};

// Home/Index view
const getHome = async (req, res) => {
  const { applicationName, softwareLogo, currency, numberFormat, dateFormat } =
    await getApplicationSettings();

  res.render("index", {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
  });
};

// Login view
const getLogin = async (req, res) => {
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
};

// Register view
const getRegister = async (req, res) => {
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
};

// Dashboard view
const getDashboard = async (req, res, next) => {
  try {
    const [
      firmCount,
      clientCount,
      productCount,
      taxCount,
      invoiceCount,
      invoiceStatusCounts,
      invoiceStatusAmountsRaw
    ] = await Promise.all([
      Firm.count({ where: {} }),
      Client.count({ where: {} }),
      Product.count({ where: {} }),
      Tax.count({ where: {} }),
      Invoice.count({ where: {} }),
      Invoice.findAll({
        where: {},
        attributes: [
          "status",
          [sequelize.fn("COUNT", sequelize.col("id")), "count"],
        ],
        group: ["status"],
      }),
      Invoice.findAll({
        where: {},
        attributes: [
          "status",
          [sequelize.fn("SUM", sequelize.col("total")), "amount"],
        ],
        group: ["status"],
      })
    ]);

    const statusCounts = {};
    invoiceStatusCounts.forEach((item) => {
      statusCounts[item.status] = parseInt(item.get("count"));
    });

    const statusAmounts = {};
    invoiceStatusAmountsRaw.forEach((item) => {
      statusAmounts[item.status] = parseFloat(item.get("amount")) || 0;
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
      invoiceStatusAmounts: statusAmounts,
      INVOICE_STATUS,
      CURRENCY,
    });
  } catch (error) {
    next(error);
  }
};

// Resource views (Firms, Clients, Products, Taxes)
const getResourceView = async (req, res, view) => {
  const { applicationName, softwareLogo, currency, numberFormat, dateFormat } =
    await getApplicationSettings();

  res.render(view, {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    USER_ROLES,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
};

// Invoice views
const getInvoiceList = async (req, res) => {
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
};

const getInvoiceCreate = async (req, res) => {
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
};

const getInvoiceUpdate = async (req, res) => {
  const { applicationName, softwareLogo, currency, numberFormat, dateFormat } =
    await getApplicationSettings();

  const { id } = req.params;

  const invoice = await Invoice.findOne({
    where: { id: id },
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
};

const getInvoiceView = async (req, res) => {
  const { id } = req.params;

  const { applicationName, softwareLogo, currency, numberFormat, dateFormat } =
    await getApplicationSettings();

  const invoice = await Invoice.findOne({
    where: { id: id },
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
};

// User profile views
const getProfile = async (req, res) => {
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
};

const getChangePassword = async (req, res) => {
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
};

const getForgotPassword = async (req, res) => {
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
};

module.exports = {
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
  getForgotPassword,
};
