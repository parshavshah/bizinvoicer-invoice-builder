// MIT License
// Copyright (c) 2025 Parshav Shah
// See LICENSE file in the project root for full license information.


const { Setting } = require("../models/index");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "public/uploads/logo";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, "logo-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload an image."), false);
    }
  },
}).single("softwareLogo");

// Get settings
exports.getSettings = async (req, res) => {
  try {
    const settings = await Setting.findOne();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update settings
exports.updateSettings = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      // Get existing settings
      let existingSettings = await Setting.findOne();

      if (!existingSettings) {
        existingSettings = {}
        existingSettings.softwareLogo = null;
      }

      // Prepare data for new setting using existing values as fallback
      const settingData = {
        dateFormat: req.body.dateFormat || existingSettings.dateFormat,
        applicationName: req.body.applicationName || existingSettings.applicationName,
        numberFormat: req.body.numberFormat || existingSettings.numberFormat,
        currency: req.body.currency || existingSettings.currency,
        softwareLogo: existingSettings.softwareLogo,
      };

      // If file was uploaded, update the logo path
      if (req.file) {
        settingData.softwareLogo = "/uploads/logo/" + req.file.filename;
      }

      // Delete existing settings
      await Setting.destroy({ where: {} });

      // Create new setting
      const setting = await Setting.create(settingData);
      res.json({ success: true, data: setting });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });
};
