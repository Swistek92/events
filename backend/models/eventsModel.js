const mongoose = require('mongoose');
const validator = require('validator');

const eventModel = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Event must have first Name!'],
  },
  lastName: {
    type: String,
    required: [true, 'Event must have last Name!'],
  },
  email: {
    type: String,
    require: [true, 'Booking must have a price.'],
    validate: [validator.isEmail, 'please provide a valid email'],
  },
  date: {
    type: Date,
    required: [true, 'please chooise a event date'],
  },
});

const Events = mongoose.model('events', eventModel);

module.exports = Events;
