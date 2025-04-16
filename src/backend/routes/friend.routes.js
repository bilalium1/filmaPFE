import express from "express";
import {
  addFriend,
  getFriends,
  removeFriend
} from "../controllers/friend.controller.js";

const router = express.Router();

// Ajouter une amitié
router.post("/", addFriend);

// Récupérer les amis d'un utilisateur
router.get("/:user_id", getFriends);

// Supprimer une amitié
router.delete("/", removeFriend);

export default router;
