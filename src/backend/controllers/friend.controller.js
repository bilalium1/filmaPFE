import Friend from "../models/friend.model.js";

// Ajouter un ami
export const addFriend = async (req, res) => {
  try {
    const { user_id, friend_id } = req.body;

    // Vérifie si l'amitié existe déjà dans un sens ou dans l'autre
    const existing = await Friend.findOne({
      $or: [
        { user_id, friend_id },
        { user_id: friend_id, friend_id: user_id }
      ]
    });

    if (existing) {
      return res.status(400).json({ message: "Amitié déjà existante" });
    }

    const newFriend = new Friend({ user_id, friend_id });
    await newFriend.save();

    res.status(201).json({ message: "Ami ajouté avec succès", data: newFriend });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de l'ami", error });
  }
};

// Récupérer les amis d'un utilisateur
export const getFriends = async (req, res) => {
  try {
    const { user_id } = req.params;

    const friends = await Friend.find({
      $or: [{ user_id: parseInt(user_id) }, { friend_id: parseInt(user_id) }]
    });

    const friendList = friends.map((f) => {
      return f.user_id === parseInt(user_id) ? f.friend_id : f.user_id;
    });

    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des amis", error });
  }
};

// Supprimer une relation d'amitié
export const removeFriend = async (req, res) => {
  try {
    const { user_id, friend_id } = req.body;

    const deleted = await Friend.findOneAndDelete({
      $or: [
        { user_id, friend_id },
        { user_id: friend_id, friend_id: user_id }
      ]
    });

    if (!deleted) {
      return res.status(404).json({ message: "Amitié non trouvée" });
    }

    res.status(200).json({ message: "Amitié supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error });
  }
};
