const app = require('./app');
const connectDatabase = require('./db/Database');




process.on('uncaughtException', (err )=> {
  console.log(`ERROR: ${err.message}`);
  console.log('Shutting down due to uncaught exception');
}
);

if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({
    path: 'config/.env'
  });
}

connectDatabase();


const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});


process.on('unhandledRejection', (err) => {
  console.log(` Shutting down the server for ${err.message}`);
  console.log('Shutting down the server due to Unhandled Promise rejection');
  server.close(() => {
    process.exit(1);
  });
});