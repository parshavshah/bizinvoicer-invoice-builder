const express = require("express");
const router = express.Router();
const settingController = require("../controllers/settingController");
const permissionController = require("../controllers/permissionController");

// Get settings
router.get("/", settingController.getSettings);

// Update settings
router.post("/", settingController.updateSettings);

// update the user permissions
router.put("/permissions", permissionController.createOrUpdateRolePermission);

module.exports = router;
