import axios from 'axios';

const API_BASE_URL = 'http://172.25.2.116:80';

export const fetchData = async <T>(endpoint: string) : Promise<T> => {
  const response = await axios.get(`${API_BASE_URL}${endpoint}`);
  return response.data;
};

