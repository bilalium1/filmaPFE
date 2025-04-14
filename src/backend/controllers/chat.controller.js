import Chat from "../models/Chat.nodel.js";

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

    const messages = await Chat.find({
      $or: [
        { user_id: parseInt(user_id), friend_id: parseInt(friend_id) },
        { user_id: parseInt(friend_id), friend_id: parseInt(user_id) }
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
