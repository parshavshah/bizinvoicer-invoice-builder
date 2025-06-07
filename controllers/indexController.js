const {
  PaymentMethod,
  Invoice,
  InvoiceItem,
  Setting,
  Payment,
  InvoiceItemTax,
  QuotationItem,
  QuotationItemTax,
  Quotation,
  RolePermission,
  Client,
  Firm,
  Product,
  Tax,
  User,
  sequelize,
} = require("../models");

const {
  INVOICE_STATUS,
  CURRENCY,
  DATE_FORMATS,
  NUMBER_FORMAT,
  USER_ROLES,
  PERMISSIONS,
} = require("../utils/constants");

// Helper function to get application settings
const getApplicationSettings = async () => {
  let setting = await Setting.findOne({ raw: true });
  const dbRolePermission = await RolePermission.findAll({ raw: true });
  const permissions = {};
  dbRolePermission.forEach((rp) => {
    permissions[`${rp.role}_${rp.module}_${rp.action}`] =
      rp.allowed == "yes" ? true : false;
  });

  setting = {
    ...{ permissions },
    ...{ PERMISSIONS: PERMISSIONS },
    ...setting,
  };
  console.log(setting);
  return setting;
};

// Settings view
const getSettings = async (req, res) => {
  const {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    permissions,
  } = await getApplicationSettings();

  res.render("setting", {
    permissions,
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
  const {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    permissions,
  } = await getApplicationSettings();

  res.render("index", {
    permissions,
    applicationName,
    softwareLogo,
    currency,
    BASE_URL: process.env.BASE_URL,
    numberFormat,
    dateFormat,
  });
};

// Login view
const getLogin = async (req, res) => {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }

  const {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    permissions,
  } = await getApplicationSettings();

  res.render("login", {
    permissions,
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

  // Check if any user exists
  const userCount = await User.count();
  if (userCount > 0) {
    // If users exist, redirect to login
    return res.redirect("/login?syssetup=done");
  }

  const {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    permissions,
  } = await getApplicationSettings();

  res.render("register", {
    permissions,
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
      invoiceStatusAmountsRaw,
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
      }),
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
      permissions,
    } = await getApplicationSettings();

    res.render("dashboard", {
      permissions,
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
  const {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    permissions,
  } = await getApplicationSettings();

  res.render(view, {
    permissions,
    applicationName,
    softwareLogo,
    CURRENCY,
    currency,
    numberFormat,
    dateFormat,
    USER_ROLES,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
};

// Quotation views
const getQuotationList = async (req, res) => {
  const {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    permissions,
  } = await getApplicationSettings();

  res.render("quotation/list", {
    permissions,
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

const getQuotationCreate = async (req, res) => {
  const {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    permissions,
  } = await getApplicationSettings();

  res.render("quotation/create", {
    permissions,
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
};

const getQuotationUpdate = async (req, res) => {
  const {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    permissions,
  } = await getApplicationSettings();

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

  res.render("quotation/update", {
    permissions,
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    quotation,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
};

const getQuotationView = async (req, res) => {
  const { id } = req.params;

  const {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    permissions,
  } = await getApplicationSettings();

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

  res.render("quotation/view", {
    permissions,
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    quotation: quotation,
    CURRENCY: CURRENCY,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
};

// User profile views
const getProfile = async (req, res) => {
  const {
    permissions,
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
  } = await getApplicationSettings();

  res.render("profile", {
    permissions,
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
  const {
    permissions,
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
  } = await getApplicationSettings();

  res.render("change-password", {
    applicationName,
    permissions,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
};

const getForgotPassword = async (req, res) => {
  const {
    permissions,
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
  } = await getApplicationSettings();
  res.render("dashboard", {
    applicationName,
    permissions,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
};

const setUserPermissions = async (req, res) => {
  const {
    permissions,
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
  } = await getApplicationSettings();

  const dbRolePermission = await RolePermission.findAll({ raw: true });
  const existingRolePermissions = {};
  dbRolePermission.forEach((rp) => {
    if (!existingRolePermissions[rp.role]) {
      existingRolePermissions[rp.role] = {};
    }
    if (!existingRolePermissions[rp.role][rp.module]) {
      existingRolePermissions[rp.role][rp.module] = {};
    }
    existingRolePermissions[rp.role][rp.module][rp.action] = rp.allowed;
  });

  res.render("permissions", {
    existingRolePermissions,
    PERMISSIONS,
    permissions,
    roles: Object.values(USER_ROLES),
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    user: req.session.user,
    BASE_URL: process.env.BASE_URL,
  });
};

// Invoice views
const getInvoiceList = async (req, res) => {
  const {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    permissions,
  } = await getApplicationSettings();

  res.render("invoice/list", {
    permissions,
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
  const {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    permissions,
  } = await getApplicationSettings();

  res.render("invoice/create", {
    permissions,
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
  const {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    permissions,
  } = await getApplicationSettings();

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
    permissions,
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

  const {
    applicationName,
    softwareLogo,
    currency,
    numberFormat,
    dateFormat,
    permissions,
  } = await getApplicationSettings();

  const invoice = await Invoice.findOne({
    where: { id: id },
    include: [
      {
        model: InvoiceItem,
        include: [InvoiceItemTax],
      },
      {
        model: Payment,
        include: [PaymentMethod],
      },
      Client,
      Firm,
    ],
    order: [["createdAt", "DESC"]],
  });

  res.render("invoice/view", {
    permissions,
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
  setUserPermissions,
  getQuotationCreate,
  getQuotationList,
  getQuotationUpdate,
  getQuotationView,
};
