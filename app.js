// MIT License
// Copyright (c) 2025 Parshav Shah
// See LICENSE file in the project root for full license information.


const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cron = require("node-cron");
const { spawn } = require("child_process");

const dotenv = require("dotenv");
dotenv.config();

const { sequelize } = require("./models");

const authRoutes = require("./routes/authRoutes");
const firmRoutes = require("./routes/firmRoutes");
const clientRoutes = require("./routes/clientRoutes");
const productRoutes = require("./routes/productRoutes");
const taxRoutes = require("./routes/taxRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const quotationRoutes = require("./routes/quotationRoutes");
const settingRoutes = require("./routes/settingRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentMethodRoutes = require("./routes/paymentMethodRoutes");
const indexRoutes = require("./routes/index");

const app = express();

// Session configuration
const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);


// Sync session store
sessionStore.sync();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"), { maxAge: 500000 }));

// Routes
app.use("/", indexRoutes);
app.use("/api/users", authRoutes);
app.use("/api/firms", firmRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/products", productRoutes);
app.use("/api/taxes", taxRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/quotations", quotationRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/payment-methods", paymentMethodRoutes);
app.use("/api/users", userRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;
