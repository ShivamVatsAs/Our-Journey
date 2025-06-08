const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const { getAdventures, createAdventure } = require('../controllers/adventureController');

// Initialize multer with the Cloudinary storage engine
const upload = multer({ storage });

// Define the routes for the base '/api/adventures' path
router.route('/')
  // GET /api/adventures - Fetches all adventures
  .get(getAdventures)
  // POST /api/adventures - Creates a new adventure.
  // The 'upload.single('image')' middleware processes the file upload
  // from the form field named 'image' before the controller logic runs.
  .post(upload.single('image'), createAdventure);

module.exports = router;