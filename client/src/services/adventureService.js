import api from './api';

/**
 * Fetches all adventures from the server.
 * @returns {Promise<Array>} A list of adventure objects.
 */
export const getAdventures = async () => {
  try {
    const response = await api.get('/adventures');
    return response.data;
  } catch (error) {
    console.error('Error fetching adventures:', error);
    throw error;
  }
};

/**
 * Creates a new adventure.
 * @param {FormData} formData - The form data containing title, description, category, and image.
 * @returns {Promise<object>} The newly created adventure object.
 */
export const createAdventure = async (formData) => {
  try {
    const response = await api.post('/adventures', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating adventure:', error);
    throw error;
  }
};