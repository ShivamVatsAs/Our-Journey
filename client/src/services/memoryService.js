import api from './api';

/**
 * Fetches all memory objects from the server.
 * @returns {Promise<Array>} A list of memory objects.
 */
export const getMemories = async () => {
  try {
    const response = await api.get('/memories');
    return response.data;
  } catch (error) {
    console.error('Error fetching memories:', error);
    throw error;
  }
};

/**
 * Uploads a new memory image.
 * @param {FormData} formData - The form data containing the image and uploadedBy fields.
 * @returns {Promise<object>} The newly created memory object.
 */
export const uploadMemory = async (formData) => {
  try {
    const response = await api.post('/memories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading memory:', error);
    throw error;
  }
};

/**
 * Requests a new caption for a specific memory.
 * @param {string} memoryId - The ID of the memory.
 * @param {string} imageUrl - The URL of the image to be analyzed.
 * @returns {Promise<object>} The updated memory object with the new caption.
 */
export const generateCaptionForMemory = async (memoryId, imageUrl) => {
    try {
        const response = await api.post(`/memories/${memoryId}/caption`, { imageUrl });
        return response.data;
    } catch (error) {
        console.error('Error generating caption:', error);
        throw error;
    }
};