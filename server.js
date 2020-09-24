const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cookieParser = require('cookie-parser');

const connectDb = require('./config/db');
const errorHandler = require('./middlewares/error');

// Loading Environment Vars
dotenv.config({ path: './config/config.env' });

// Connection to DB
connectDb();

const app = express();

// Body parser: Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// const PORT = process.env.PORT || 5000;

// Routes files
const travels = require('./routes/travels');
const cities = require('./routes/cities');
const users = require('./routes/users');
const auth = require('./routes/auth');

// Morgan Middleware for logging if dev mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount Routers
app.use('/api/v1/travels', travels);
app.use('/api/v1/cities', cities);
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);

// const server = app.listen(
//   PORT,
//   console.log(
//     `App is in ${process.env.NODE_ENV} mode and listening on port ${PORT}!`
//       .yellow.bold
//   )
// );

// Errors Middleware Handler
app.use(errorHandler);

// Handling Rejected Promise
// process.on('unhandledRejection', (err, promise) => {
//   console.log(`Error: ${err.message}`.red.underline.bold);
//   // Close server & exit process
//   server.close(() => process.exit(1));
// });

module.exports = app;
