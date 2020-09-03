const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Loading Environment Vars
dotenv.config({ path: './config/config.env' });

const app = express();

const PORT = process.env.PORT || 5000;

// Morgan Middleware for logging if dev mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  // console.log('morgan running');
}

app.listen(
  PORT,
  console.log(
    `App is in ${process.env.NODE_ENV} mode and listening on port ${PORT}!`
  )
);
