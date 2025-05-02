import Favorite from "../models/favorite.model.js";

// Ajouter un film aux favoris
export const addFavorite = async (req, res) => {
    try {
        const { id_user, id_film, media_type } = req.body;

        // Vérifie si le favori existe déjà pour éviter les doublons
        const existing = await Favorite.findOne({ id_user, id_film, media_type });
        if (existing) {
            return res.status(400).json({ error: "Ce film est déjà dans les favoris." });
        }

        const favorite = new Favorite({ id_user, id_film, media_type });
        await favorite.save();
        res.status(201).json(favorite);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Récupérer tous les favoris
export const getAllFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find();
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Récupérer les favoris d'un utilisateur
export const getFavoritesByUser = async (req, res) => {
    try {
        const favorites = await Favorite.find({ id_user: req.params.id_user });
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Supprimer un favori (par user et film)
export const removeFavorite = async (req, res) => {
    try {
      const { id_user, id_film, media_type } = req.body;
  
      // Validate required fields
      if (!id_user || !id_film || !media_type) {
        return res.status(400).json({ 
          error: "Les champs id_user et id_film sont requis" 
        });
      }
  
      // Check if favorite exists first
      const exists = await Favorite.findOne({ id_user, id_film, media_type });
      if (!exists) {
        return res.status(404).json({ 
          error: "Favori non trouvé",
          details: `User: ${id_user}, Film: ${id_film}`
        });
      }
  
      // Delete the favorite
      await Favorite.findOneAndDelete({ id_user, id_film, media_type });
      
      // Successful deletion (204 No Content)
      res.status(204).end();
      
    } catch (err) {
      console.error("Delete error:", err);
      res.status(500).json({ 
        error: "Erreur serveur",
        details: err.message 
      });
    }
  };
