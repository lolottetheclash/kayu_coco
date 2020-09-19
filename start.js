const app = require('./server');

const PORT = process.env.PORT || 5000;

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
