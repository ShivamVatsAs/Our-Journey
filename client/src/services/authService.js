import api from './api';

/**
 * Sends a login request to the server.
 * @param {object} credentials - The user's credentials.
 * @param {string} credentials.user - The name of the user ('Shivam' or 'Arya').
 * @param {string} credentials.password - The shared password.
 * @returns {Promise<object>} The response data from the server.
 */
export const loginUser = async (credentials) => {
  try {
    // Make a POST request to the '/api/auth/login' endpoint
    const response = await api.post('/auth/login', credentials);
    // Return the data from the response (e.g., { user: 'Shivam', message: '...' })
    return response.data;
  } catch (error) {
    // If there's an error (e.g., wrong password), throw the error response
    // so the component can handle it.
    throw error.response.data;
  }
};
