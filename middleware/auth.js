// MIT License
// Copyright (c) 2025 Parshav Shah
// See LICENSE file in the project root for full license information.

/**
 * Middleware to check if user is authenticated
 */
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.redirect("/login");
  }
};

module.exports = {
  isAuthenticated,
};
