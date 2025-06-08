const Adventure = require('../models/Adventure');

/**
 * @desc    Fetches all adventures from the database.
 * @route   GET /api/adventures
 * @access  Private
 */
const getAdventures = async (req, res) => {
  try {
    // Find all documents in the Adventure collection, sorted by creation date.
    const adventures = await Adventure.find({}).sort({ createdAt: -1 });
    res.status(200).json(adventures);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Creates a new adventure on the dream board.
 * @route   POST /api/adventures
 * @access  Private
 */
const createAdventure = async (req, res) => {
  // Extract title, description, and category from the request body.
  const { title, description, category } = req.body;
  // 'req.file' contains info about the uploaded image from Multer/Cloudinary.
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload an image' });
  }

  try {
    // Create a new adventure document with the form data and Cloudinary URL.
    const newAdventure = new Adventure({
      title,
      description,
      category,
      imageUrl: req.file.path,
    });

    // Save the new document to the database.
    const savedAdventure = await newAdventure.save();
    res.status(201).json(savedAdventure);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getAdventures, createAdventure };
