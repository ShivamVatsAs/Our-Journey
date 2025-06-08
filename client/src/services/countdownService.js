import api from './api';

/**
 * Fetches the shared countdown date from the server.
 * @returns {Promise<object|null>} The countdown data or null if not set.
 */
export const getCountdownDate = async () => {
  try {
    const response = await api.get('/countdown');
    return response.data;
  } catch (error) {
    // If the error is 404 (Not Found), it just means no date has been set.
    // This is not a critical error, so we can return null.
    if (error.response && error.response.status === 404) {
      return null;
    }
    // For any other error, log it and re-throw it.
    console.error('Error fetching countdown date:', error);
    throw error;
  }
};

/**
 * Sends a new target date to the server to be saved.
 * @param {string} date - The new target date in ISO format.
 * @returns {Promise<object>} The updated countdown data from the server.
 */
export const setCountdownDate = async (date) => {
  try {
    const response = await api.post('/countdown', { targetDate: date });
    return response.data;
  } catch (error) {
    console.error('Error setting countdown date:', error);
    throw error;
  }
};