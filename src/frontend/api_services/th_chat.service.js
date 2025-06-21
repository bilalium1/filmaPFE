import axios from "axios";

const API_BASE_URL = "/api";

const theaterChatService = {
  // Create a new message in a theater
  createMessage: async (data) => {
    const response = await axios.post(`${API_BASE_URL}/theater-chat`, data);
    return response.data;
  },

  // Get all messages
  getAllMessages: async () => {
    const response = await axios.get(`${API_BASE_URL}/theater-chat`);
    return response.data;
  },

  // Get messages for a specific theater
  getMessagesByTheaterId: async (theaterId) => {
    const response = await axios.get(`${API_BASE_URL}/theater-chat/theater/${theaterId}`);
    return response.data;
  },

  // Delete a message by ID
  deleteMessage: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/theater-chat/${id}`);
    return response.data;
  },
};

export default theaterChatService;
