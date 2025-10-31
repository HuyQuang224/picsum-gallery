import axios from 'axios';

const BASE_URL = 'https://picsum.photos';

/**
 * fetchPhotos
 * @param {number} page - the page number to request (1-based)
 * @param {number} limit - how many items per page
 * @returns {Promise<Array>} array of photo metadata from Picsum
 */
export const fetchPhotos = async (page = 1, limit = 20) => {
  const res = await axios.get(`${BASE_URL}/list?page=${page}&limit=${limit}`);
  return res.data;
};
