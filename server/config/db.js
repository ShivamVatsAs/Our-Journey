const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB cluster.
    // The useNewUrlParser and useUnifiedTopology options are no longer needed
    // in recent versions of the Mongoose driver, so we've removed them.
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // Log a success message if the connection is established
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the error message and exit the process if connection fails
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
