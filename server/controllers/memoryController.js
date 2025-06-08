const Memory = require('../models/Memory');
const fetch = require('node-fetch');

// Helper function to fetch an image and convert it to base64
const imageToGenerativePart = async (url, mimeType) => {
  const response = await fetch(url);
  const buffer = await response.buffer();
  return {
    inlineData: {
      data: buffer.toString('base64'),
      mimeType,
    },
  };
};

/**
 * @desc    Fetches all memories from the database.
 * @route   GET /api/memories
 */
const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find({}).sort({ createdAt: -1 });
    res.status(200).json(memories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Uploads a new memory photo.
 * @route   POST /api/memories
 */
const uploadMemory = async (req, res) => {
  const { uploadedBy } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a file' });
  }
  try {
    const newMemory = new Memory({
      imageUrl: req.file.path,
      uploadedBy,
      caption: '', // Caption starts as an empty string
    });
    const savedMemory = await newMemory.save();
    res.status(201).json(savedMemory);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Generates a caption for a specific memory using Gemini Vision.
 * @route   POST /api/memories/:id/caption
 */
const generateCaption = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    const prompt = "Write a short, romantic, one-sentence caption for this photo of a couple, Shivam and Arya.";
    
    // Convert the image URL to a format Gemini can understand
    const imageParts = [await imageToGenerativePart(imageUrl, 'image/jpeg')];

    const payload = {
      contents: [{ parts: [{ text: prompt }, ...imageParts] }],
    };

    // --- CHANGE HERE ---
    // Updated the model from 'gemini-pro-vision' to the newer 'gemini-1.5-flash'
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Gemini API Error:', errorBody);
      throw new Error('Failed to generate caption from Gemini API.');
    }

    const result = await response.json();
    const captionText = result.candidates[0]?.content?.parts[0]?.text || 'A moment to cherish.';

    // Find the memory by its ID and update it with the new caption
    const updatedMemory = await Memory.findByIdAndUpdate(
      req.params.id,
      { caption: captionText },
      { new: true } // Return the updated document
    );

    if (!updatedMemory) {
        return res.status(404).json({ message: 'Memory not found' });
    }

    res.status(200).json(updatedMemory);

  } catch (error) {
    console.error('Error in generateCaption:', error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

module.exports = { getMemories, uploadMemory, generateCaption };