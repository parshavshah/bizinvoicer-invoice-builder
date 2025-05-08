var express = require("express");
var router = express.Router();
const { INVOICE_STATUS, CURRENCY } = require("../utils/constants");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/static-dropdown", (req, res) => {
  res.json({
    INVOICE_STATUS,
    CURRENCY,
  });
});

module.exports = router;

// Main routes file to combine all route modules
