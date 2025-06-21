import Theater from "../models/theater.model.js";

// Créer un nouveau théâtre
export const createTheater = async (req, res) => {
    try {
        const { film_id, host_id, title, is_private, code, media_type } = req.body;

        const newTheater = new Theater({ film_id, host_id, title, is_private, code, media_type});
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
        const theaters = await Theater.find({ film_id: req.params.film_id });
        res.json(theaters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Récupérer les théâtres par host (id de l'hôte)
export const getTheatersByHostId = async (req, res) => {
    try {
        const theaters = await Theater.find({ host_id: req.params.host_id });
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

export const getTheaterById = async (req, res) => {
    try {
        const theater = await Theater.findById(req.params.id).populate("host_id", "username");
        if (!theater) {
            return res.status(404).json({ error: "Théâtre non trouvé." });
        }
        res.json(theater);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
