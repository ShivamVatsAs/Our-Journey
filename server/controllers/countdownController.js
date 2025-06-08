const Countdown = require('../models/Countdown');

/**
 * @desc    Get the shared countdown date
 * @route   GET /api/countdown
 * @access  Private
 */
const getCountdownDate = async (req, res) => {
  try {
    // Find the one and only countdown document
    const countdown = await Countdown.findOne({ name: 'sharedCountdown' });
    if (countdown) {
      res.json(countdown);
    } else {
      // If no date has ever been set, send a 404 status
      res.status(404).json({ message: 'No countdown date has been set.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Set or update the shared countdown date
 * @route   POST /api/countdown
 * @access  Private
 */
const setCountdownDate = async (req, res) => {
  const { targetDate } = req.body;
  if (!targetDate) {
    return res.status(400).json({ message: 'Target date is required.' });
  }

  try {
    // This command finds the document and updates it.
    // If it doesn't exist, 'upsert: true' creates it.
    const countdown = await Countdown.findOneAndUpdate(
      { name: 'sharedCountdown' },
      { targetDate },
      { new: true, upsert: true }
    );
    res.status(200).json(countdown);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getCountdownDate, setCountdownDate };