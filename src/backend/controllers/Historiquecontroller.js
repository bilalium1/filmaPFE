import HIS from "../models/historique.model.js";

// Créer un historique (ajouter un film regardé par un utilisateur)
export const createHistorique = async (req, res) => {
    try {
        const { userid, filmid } = req.body;

        const newHistorique = new HIS({ userid, filmid });
        await newHistorique.save();

        res.status(201).json(newHistorique);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Récupérer tous les historiques
export const getAllHistoriques = async (req, res) => {
    try {
        const historiques = await HIS.find();
        res.json(historiques);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Récupérer l'historique d'un utilisateur spécifique
export const getHistoriqueByUserId = async (req, res) => {
    try {
        const historiques = await HIS.find({ userid: req.params.userid });
        res.json(historiques);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Supprimer un historique (par ID)
export const deleteHistorique = async (req, res) => {
    try {
        const historique = await HIS.findByIdAndDelete(req.params.id);
        if (!historique) return res.status(404).json({ error: "Historique non trouvé." });

        res.json({ message: "Historique supprimé avec succès." });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
