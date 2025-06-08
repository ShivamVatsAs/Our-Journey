const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
// Make sure to import the new generateCaption function
const { getMemories, uploadMemory, generateCaption } = require('../controllers/memoryController');

// Initialize multer with the Cloudinary storage engine
const upload = multer({ storage });

// Routes for the base '/api/memories' path
router.route('/')
  .get(getMemories)
  .post(upload.single('image'), uploadMemory);

// @route   POST /api/memories/:id/caption
// @desc    Generates a caption for a specific memory
// @access  Private
// This new route handles the caption generation for a photo with a specific ID.
router.post('/:id/caption', generateCaption);

module.exports = router;
