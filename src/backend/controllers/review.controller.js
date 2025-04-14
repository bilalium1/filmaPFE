import Review from "../models/review.model.js";

// Ajouter un avis
export const createReview = async (req, res) => {
    try {
        const { userid, filmid, rating, review } = req.body;

        // Vérifier si l'utilisateur a déjà laissé un avis pour ce film
        const existingReview = await Review.findOne({ userid, filmid });
        if (existingReview) {
            return res.status(400).json({ error: "Vous avez déjà laissé un avis pour ce film." });
        }

        const newReview = new Review({ userid, filmid, rating, review });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Récupérer tous les avis
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Récupérer les avis pour un film spécifique
export const getReviewsByFilmId = async (req, res) => {
    try {
        const reviews = await Review.find({ filmid: req.params.filmid });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mettre à jour un avis
export const updateReview = async (req, res) => {
    try {
        const updated = await Review.findOneAndUpdate(
            { userid: req.body.userid, filmid: req.body.filmid },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ error: "Avis non trouvé." });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Supprimer un avis
export const deleteReview = async (req, res) => {
    try {
        const { userid, filmid } = req.body;
        const deleted = await Review.findOneAndDelete({ userid, filmid });
        if (!deleted) return res.status(404).json({ error: "Avis non trouvé." });
        res.json({ message: "Avis supprimé avec succès." });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
