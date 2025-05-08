var express = require("express");
var router = express.Router();
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
router.get("/login", commonFunction);
router.get("/register", commonFunction);
router.get("/firms", commonFunction);
router.get("/clients", commonFunction);
router.get("/products", commonFunction);
router.get("/taxes", commonFunction);
router.get("/invoice/list", commonFunction);
router.get("/invoice/create", commonFunction);
router.get("/invoice/update/:id", commonFunction);
router.get("/profile", commonFunction);
router.get("/change-password", commonFunction);
router.get("/forgot-password", commonFunction);

module.exports = router;
