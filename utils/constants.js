const USER_ROLES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
};

const DATE_FORMATS = {
  "MM/DD/YYYY": "MM/DD/YYYY",
  "MM/DD/YYYY": "MM/DD/YYYY",
  "DD/MM/YYYY": "DD/MM/YYYY",
  "YYYY/MM/DD": "YYYY/MM/DD",
  "DD-MM-YYYY": "DD-MM-YYYY",
  "YYYY-MM-DD": "YYYY-MM-DD",
  "MM-DD-YYYY": "MM-DD-YYYY",
};

const PAYMENT_STATUS = {
  pending: "Pending",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

const INVOICE_STATUS = {
  draft: "Draft",
  sent: "Sent",
  paid: "Paid",
  overdue: "Overdue",
  cancelled: "Cancelled",
};

const CURRENCY = {
  USD: ["USD", "US Dollar", "$"],
  EUR: ["EUR", "Euro", "€"],
  GBP: ["GBP", "British Pound", "£"],
  INR: ["INR", "Indian Rupee", "₹"],
  CAD: ["CAD", "Canadian Dollar", "CA$"],
  AUD: ["AUD", "Australian Dollar", "A$"],
  JPY: ["JPY", "Japanese Yen", "¥"],
  CNY: ["CNY", "Chinese Yuan", "¥"],
};

const NUMBER_FORMAT = {
  US: "1,234.56 (US)",
  EU: "1.234,56 (EU)",
  SPACE: "1 234.56 (Space)",
};

const PERMISSIONS = [
  {
    name: "CLIENT",
    actions: ["CREATE", "UPDATE", "DELETE", "LIST", "VIEW_SINGLE"],
  },
  {
    name: "FIRM",
    actions: ["CREATE", "UPDATE", "DELETE", "LIST", "VIEW_SINGLE"],
  },
  {
    name: "INVOICE",
    actions: ["CREATE", "UPDATE", "DELETE", "LIST", "VIEW_SINGLE"],
  },
  {
    name: "QUOTATION",
    actions: ["CREATE", "UPDATE", "DELETE", "LIST", "VIEW_SINGLE"],
  },
  {
    name: "PRODUCT",
    actions: ["CREATE", "UPDATE", "DELETE", "LIST", "VIEW_SINGLE"],
  },
  {
    name: "TAX",
    actions: ["CREATE", "UPDATE", "DELETE", "LIST", "VIEW_SINGLE"],
  },
  {
    name: "USER",
    actions: ["CREATE", "UPDATE", "DELETE", "LIST"],
  },
  {
    name: "PAYMENT_METHOD",
    actions: ["CREATE", "UPDATE", "DELETE", "LIST", "VIEW_SINGLE"],
  },
];

module.exports = {
  USER_ROLES,
  NUMBER_FORMAT,
  DATE_FORMATS,
  INVOICE_STATUS,
  CURRENCY,
  PERMISSIONS,
  PAYMENT_STATUS,
};
