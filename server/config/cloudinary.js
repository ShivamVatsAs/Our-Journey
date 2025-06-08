const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure the Cloudinary instance with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure a storage engine for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    // The name of the folder in your Cloudinary account where images will be stored
    folder: 'our-journey',
    // The format of the uploaded image
    format: async (req, file) => 'jpg',
    // A function to generate a unique public ID (filename) for each image
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

// Export the configured cloudinary instance and the storage engine
module.exports = { cloudinary, storage };