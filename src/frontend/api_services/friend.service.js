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
  const res = await axios.delete(`${API_URL}/remove`, {
    data: {               // <---- wrap your payload inside data
      user_id: userId,
      friend_id: friendId,
    },
  });
  return res.data;
},


  // ✅ Récupérer toutes les relations d'amitié
  getAllFriendRelations: async () => {
    const res = await axios.get(`${API_URL}/all`);
    return res.data;
  },

  // ✅ Vérifier si deux utilisateurs sont amis
  checkIfFriends: async (userId1, userId2) => {
    const res = await axios.get(`${API_URL}/check/${userId1}/${userId2}`);
    return res.data; // returns { areFriends: true/false }
  },
};

export default friendService;
