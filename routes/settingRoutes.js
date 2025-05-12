const express = require("express");
const router = express.Router();
const settingController = require("../controllers/settingController");

// Get settings
router.get("/", settingController.getSettings);

// Update settings
router.post("/", settingController.updateSettings);

module.exports = router;
