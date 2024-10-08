const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require('dotenv').config();

const authRouter = require("./routes/auth");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const productsRouter = require("./routes/products");
const orderRoutes = require('./routes/orders');

const app = express();

const options = {
  explorer: true
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// view engine setup (não precisa no projeto)
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/login", authRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use('/orders', orderRoutes);
app.use("/products", productsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
