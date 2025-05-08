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

module.exports = {
  INVOICE_STATUS,
  CURRENCY,
};
