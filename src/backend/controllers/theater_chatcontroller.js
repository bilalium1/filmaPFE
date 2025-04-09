import Theater from "../models/theater.model.js";

// Créer un message pour une salle
export const createTheaterMessage = async (req, res) => {
    try {
        const { userid, theaterid, message } = req.body;

        const newMessage = new Theater({ userid, theaterid, message });
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Récupérer tous les messages
export const getAllTheaterMessages = async (req, res) => {
    try {
        const messages = await Theater.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Récupérer les messages d'une salle spécifique
export const getMessagesByTheaterId = async (req, res) => {
    try {
        const messages = await Theater.find({ theaterid: req.params.theaterid });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Supprimer un message (par ID du message)
export const deleteTheaterMessage = async (req, res) => {
    try {
        const message = await Theater.findByIdAndDelete(req.params.id);
        if (!message) return res.status(404).json({ error: "Message non trouvé." });

        res.json({ message: "Message supprimé avec succès." });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
