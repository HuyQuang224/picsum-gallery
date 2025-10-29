import axios from 'axios';
const BASE_URL = 'https://picsum.photos/v2';

export const fetchPhotos = async (page = 1, limit = 20) => {
  const res = await axios.get(`${BASE_URL}/list?page=${page}&limit=${limit}`);
  return res.data;
};
