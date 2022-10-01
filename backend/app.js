const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const AppError = require('./utils/appError');
const eventsRouter = require('./routes/eventsRoutes');
const app = express();
const cors = require('cors');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));
  app.get('/', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'fontend', 'build', 'index.html'))
  );
  console.log('api is running  😀😅 PRODUCTION MODE ');
} else {
  console.log('api is running  😀😅 DEVELOPMENT MODE ');
  app.get('/', (req, res) => {
    res.send('api is running  😀😅 ');
  });
}

app.use(cors());
app.options('*', cors());

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.use('/api/v1/events', eventsRouter);

app.all('*', (req, res, next) => {
  if (req.originalUrl === '/bundle.js.map') {
    return;
  }
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 404;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
