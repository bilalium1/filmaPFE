// src/api_services/chat.service.js
import axios from 'axios';

const API_URL = '/api/chats'; // 🔁 Replace with your actual backend URL

const chatService = {
  // Create a new message
  sendMessage: async (user_id, friend_id, value) => {
    const response = await axios.post(`${API_URL}`, {
      user_id,
      friend_id,
      value,
    });
    return response.data;
  },

  // Get all messages between two users
  getConversation: async (user_id, friend_id) => {
    const response = await axios.get(`${API_URL}/${user_id}/${friend_id}`);
    return response.data;
  },

  // Delete a specific message
  deleteMessage: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};

export default chatService;
