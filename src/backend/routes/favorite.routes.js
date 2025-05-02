import express from "express";
import {
    addFavorite,
    getAllFavorites,
    getFavoritesByUser,
    removeFavorite
} from "../controllers/favorite.controller.js";

const router = express.Router();

router.post("/", addFavorite); // ajouter un favori
router.get("/", getAllFavorites); // tous les favoris
router.get("/user/:id_user", getFavoritesByUser); // favoris d'un utilisateur
router.delete("/", removeFavorite); // supprimer un favori (via body)

export default router;
