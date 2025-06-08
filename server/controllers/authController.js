/**
 * @desc    Logs in a user by checking the shared password.
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  // Extract user and password from the request body
  const { user, password } = req.body;

  // Compare the submitted password with the one in our environment variables
  const isMatch = (password === process.env.SHARED_PASSWORD);

  // Check if the user is either Shivam or Arya and if the password matches
  if ((user === 'Shivam' || user === 'Arya') && isMatch) {
    // If successful, send back a success message and the user's name
    res.status(200).json({
      user: user,
      message: 'Login successful!',
    });
  } else {
    // If credentials are incorrect, send a 401 Unauthorized status and an error message
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = { loginUser };