const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const dotenv = require("dotenv");
dotenv.config();

const { sequelize } = require("./models");

const userRoutes = require("./routes/userRoutes");
const firmRoutes = require("./routes/firmRoutes");
const clientRoutes = require("./routes/clientRoutes");
const productRoutes = require("./routes/productRoutes");
const taxRoutes = require("./routes/taxRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const settingRoutes = require("./routes/settingRoutes");
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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", indexRoutes);
app.use("/api/users", userRoutes);
app.use("/api/firms", firmRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/products", productRoutes);
app.use("/api/taxes", taxRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/settings", settingRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;
