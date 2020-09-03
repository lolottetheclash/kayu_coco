const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');

const connectDb = require('./config/db');

// Loading Environment Vars
dotenv.config({ path: './config/config.env' });

// Connection to DB
connectDb();

const app = express();

const PORT = process.env.PORT || 5000;

// Routes files
const travels = require('./routes/travels');

// Morgan Middleware for logging if dev mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount Routers
app.use('/api/v1/travels', travels);

const server = app.listen(
  PORT,
  console.log(
    `App is in ${process.env.NODE_ENV} mode and listening on port ${PORT}!`
      .yellow.bold
  )
);

// Handling Rejected Promise
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.underline.bold);
  // Close server & exit process
  server.close(() => process.exit(1));
});
