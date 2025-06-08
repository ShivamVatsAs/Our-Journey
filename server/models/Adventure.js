const mongoose = require('mongoose');

// Define the schema for the Adventure collection
const AdventureSchema = new mongoose.Schema({
  // The title of the adventure, e.g., "Trip to Paris".
  title: {
    type: String,
    required: true,
  },
  
  // A short description of the dream.
  description: {
    type: String,
    required: true,
  },
  
  // The URL of the inspirational image, provided by Cloudinary.
  imageUrl: {
    type: String,
    required: true,
  },
  
  // The category of the adventure.
  // The 'enum' property ensures it can only be one of the two specified values.
  category: {
    type: String,
    enum: ["Places We'll Go", "Tastes We'll Share"],
    required: true,
  },
  
  // The date when the adventure was added.
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Adventure model
module.exports = mongoose.model('Adventure', AdventureSchema);