const { RolePermission } = require("../models");

// Create or update a role permission
exports.createOrUpdateRolePermission = async (req, res) => {
  try {
    const { role, action, module, allowed } = req.body;
    if (!role || !action || !module || !allowed) {
      return res
        .status(400)
        .json({ message: "role, action, module, and allowed are required." });
    }

    // Find if a record exists
    let permission = await RolePermission.findOne({
      where: { role, action, module },
    });

    if (permission) {
      // Update allowed if record exists
      permission.allowed = allowed;
      await permission.save();
      return res
        .status(200)
        .json({ message: "Permission updated successfully", data: permission });
    } else {
      // Create new record if not exists
      permission = await RolePermission.create({
        role,
        action,
        module,
        allowed,
      });
      return res
        .status(201)
        .json({ message: "Permission created successfully", data: permission });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
