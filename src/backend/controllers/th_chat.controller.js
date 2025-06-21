import Theater_chat from "../models/th_chat.model.js";

// Créer un message pour une salle
export const createTheaterMessage = async (req, res) => {
    try {
        const { user_id, theater_id, message } = req.body;

        const newMessage = new Theater_chat({ user_id, theater_id, message });
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Récupérer tous les messages
export const getAllTheaterMessages = async (req, res) => {
    try {
        const messages = await Theater_chat.find().populate("user_id", "username");
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Récupérer les messages d'une salle spécifique
export const getMessagesByTheaterId = async (req, res) => {
    try {
        const messages = await Theater_chat.find({ theater_id: req.params.theater_id }).populate("user_id", "username");
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Supprimer un message (par ID du message)
export const deleteTheaterMessage = async (req, res) => {
    try {
        const message = await Theater_chat.findByIdAndDelete(req.params.id);
        if (!message) return res.status(404).json({ error: "Message non trouvé." });

        res.json({ message: "Message supprimé avec succès." });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
