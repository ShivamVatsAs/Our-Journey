const mongoose = require('mongoose');

const CountdownSchema = new mongoose.Schema({
  // A unique name to easily find our single countdown document
  name: {
    type: String,
    default: 'sharedCountdown',
    unique: true,
  },
  // The target date for the countdown
  targetDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Countdown', CountdownSchema);