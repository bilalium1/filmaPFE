import Chat from "../models/Chat.model.js";
import mongoose from "mongoose";

// Créer un nouveau message
export const createMessage = async (req, res) => {
  try {
    const { user_id, friend_id, value } = req.body;
    const newMessage = new Chat({ user_id, friend_id, value });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'envoi du message", error });
  }
};

// Obtenir tous les messages entre deux utilisateurs
export const getMessages = async (req, res) => {
  try {
    const { user_id, friend_id } = req.params;

    const userObjectId = new mongoose.Types.ObjectId(user_id);
    const friendObjectId = new mongoose.Types.ObjectId(friend_id);

    const messages = await Chat.find({
      $or: [
        { user_id: userObjectId, friend_id: friendObjectId },
        { user_id: friendObjectId, friend_id: userObjectId }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des messages", error });
  }
};

// Supprimer un message par ID
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Chat.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Message non trouvé" });
    res.status(200).json({ message: "Message supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du message", error });
  }
};
