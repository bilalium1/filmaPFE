import axios from "axios";

const API_URL = "/api/friends"; // adjust as needed

const friendService = {
  // Ajouter un ami
  addFriend: async (userId, friendId) => {
    const res = await axios.post(`${API_URL}/add`, {
      user_id: userId,
      friend_id: friendId,
    });
    return res.data;
  },

  // Récupérer les amis d'un utilisateur
  getFriends: async (userId) => {
    const res = await axios.get(`${API_URL}/${userId}`);
    return res.data;
  },

  // Supprimer un ami
  removeFriend: async (userId, friendId) => {
    const res = await axios.post(`${API_URL}/remove`, {
      user_id: userId,
      friend_id: friendId,
    });
    return res.data;
  },
};

export default friendService;
