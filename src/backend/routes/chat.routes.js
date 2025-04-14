import express from "express";
import {
  createMessage,
  getMessages,
  deleteMessage,
} from "../controllers/chat.controller.js";

const router = express.Router();

// Créer un message
router.post("/", createMessage);

// Récupérer les messages entre deux utilisateurs
router.get("/:user_id/:friend_id", getMessages);

// Supprimer un message
router.delete("/:id", deleteMessage);

export default router;
