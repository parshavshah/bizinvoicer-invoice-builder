const INVOICE_STATUS = {
  draft: "draft",
  sent: "sent",
  paid: "paid",
  overdue: "overdue",
  cancelled: "cancelled",
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

module.exports = {
  INVOICE_STATUS,
  CURRENCY,
};
