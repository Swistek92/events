const Event = require('../models/eventsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.addEvent = catchAsync(async (req, res, next) => {
  try {
    const doc = await Event.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});
