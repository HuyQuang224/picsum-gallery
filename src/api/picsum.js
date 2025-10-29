import axios from 'axios';
const BASE_URL = 'https://picsum.photos';

export const fetchPhotos = async (page = 1, limit = 20) => {
  const res = await axios.get(`${BASE_URL}/v2/list?page=${page}&limit=${limit}`);
  return res.data;
};
