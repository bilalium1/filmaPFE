import axios from 'axios';

const API_BASE_URL = '/api'; // Adjust as needed

const theaterService = {
  // Create a new theater
  createTheater: async (data) => {
    const response = await axios.post(`${API_BASE_URL}/theaters`, data);
    return response.data;
  },

  // Get all theaters
  getAllTheaters: async () => {
    const response = await axios.get(`${API_BASE_URL}/theaters`);
    return response.data;
  },

  // Get theaters by film ID
  getTheatersByFilmId: async (filmId) => {
    const response = await axios.get(`${API_BASE_URL}/theaters/film/${filmId}`);
    return response.data;
  },

  // Get theaters by host ID
  getTheatersByHostId: async (hostId) => {
    const response = await axios.get(`${API_BASE_URL}/theaters/host/${hostId}`);
    return response.data;
  },

  // Delete theater by ID
  deleteTheater: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/theaters/${id}`);
    return response.data;
  },
};

export default theaterService;
