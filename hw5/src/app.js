var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var loginRouter = require('./modules/login/login.router');
var adminRouter = require('./modules/admin/admin.router');
var productRouter = require('./modules/products/product.router');
var productDetailRouter = require('./modules/productDetails/product.detail.router');
var categoriesRouter = require('./modules/categories/categories.router');
var userRouter = require('./modules/users/user.router');
var userDetailRouter = require('./modules/userDetails/user.details.router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({ secret: 'nordict-shop', cookie: { maxAge: 60 * 60 * 1000 } }));

app.use('/', [
  loginRouter,
  adminRouter,
  productRouter,
  productDetailRouter,
  categoriesRouter,
  userRouter,
  userDetailRouter
]);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.start = (PORT, MONGO_URL) => {
	mongoose
		.connect(MONGO_URL)
		.then(() => {
			debug('Database connect success');
			app.listen(PORT, () => console.log('App started and listening on port', PORT));
		})
		.catch(err => {
			debug('Database connection error:' + err);
		});
};

module.exports = app;
