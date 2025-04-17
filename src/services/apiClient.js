import axios from 'axios';

const API = import.meta.env.VITE_API_BACKEND;

export const get = async (endpoint) => {
  try {
    const response = await axios.get(`${API}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const post = async (endpoint, data) => {
    try {
      const response = await axios.post(`${API}${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  };
  