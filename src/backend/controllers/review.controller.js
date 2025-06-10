import Review from "../models/review.model.js";

// Ajouter un avis
export const createReview = async (req, res) => {
    try {
        const { user_id, film_id, rating, review, media_type } = req.body;

        // Vérifier si l'utilisateur a déjà laissé un avis pour ce film
        const existingReview = await Review.findOne({ user_id, film_id });
        if (existingReview) {
            return res.status(400).json({ error: "Vous avez déjà laissé un avis pour ce film." });
        }

        const newReview = new Review({ user_id, film_id, rating, review, media_type });
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
        const reviews = await Review.find({ film_id: req.params.film_id }).populate("user_id", "username email is_admin location sexe");
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mettre à jour un avis
export const updateReview = async (req, res) => {
    try {
        const updated = await Review.findOneAndUpdate(
            { user_id: req.body.user_id, film_id: req.body.film_id },
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
        const { user_id, film_id } = req.body;
        const deleted = await Review.findOneAndDelete({ user_id, film_id });
        if (!deleted) return res.status(404).json({ error: "Avis non trouvé." });
        res.json({ message: "Avis supprimé avec succès." });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
