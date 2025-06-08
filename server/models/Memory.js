const mongoose = require('mongoose');

// Define the schema for the Memory collection
const MemorySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: String,
    enum: ['Shivam', 'Arya'],
    required: true,
  },
  // Add a new field to store the AI-generated caption
  caption: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Memory model
module.exports = mongoose.model('Memory', MemorySchema);