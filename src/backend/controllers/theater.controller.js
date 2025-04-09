import Theater from "../models/theater.model.js";

// Créer un nouveau théâtre
export const createTheater = async (req, res) => {
    try {
        const { filmid, hostid, name } = req.body;

        const newTheater = new Theater({ film_id, host_id, name });
        await newTheater.save();

        res.status(201).json(newTheater);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Récupérer tous les théâtres
export const getAllTheaters = async (req, res) => {
    try {
        const theaters = await Theater.find();
        res.json(theaters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Récupérer les théâtres par film (id du film)
export const getTheatersByFilmId = async (req, res) => {
    try {
        const theaters = await Theater.find({ filmid: req.params.film_id });
        res.json(theaters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Récupérer les théâtres par host (id de l'hôte)
export const getTheatersByHostId = async (req, res) => {
    try {
        const theaters = await Theater.find({ hostid: req.params.host_id });
        res.json(theaters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Supprimer un théâtre par ID
export const deleteTheater = async (req, res) => {
    try {
        const theater = await Theater.findByIdAndDelete(req.params.id);
        if (!theater) return res.status(404).json({ error: "Théâtre non trouvé." });

        res.json({ message: "Théâtre supprimé avec succès." });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
