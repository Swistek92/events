process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 😀 SHUTTING DOWN...');
  console.log(err.name, err.message);

  process.exit(1);
});

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const AppError = require('./utils/appError');

dotenv.config();

const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => console.log('DB connect successfully'))
  .catch((error) => new AppError('cant connect db ', error, 404));

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`BACKEND serv listen on ${PORT}!!!`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unhandle rejection! 😀😅 Shutting down');
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECIVED, shutting down greatfully 😀😅😀😅😀😅');
  server.close(() => {
    console.log('😀😅😀😅 process terminated');
  });
});
