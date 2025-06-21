// routes/theaterChat.routes.js
import express from "express";
import {
  createTheaterMessage,
  getAllTheaterMessages,
  getMessagesByTheaterId,
  deleteTheaterMessage,
} from "../controllers/th_chat.controller.js";

const router = express.Router();

router.post("/", createTheaterMessage);
router.get("/", getAllTheaterMessages);
router.get("/theater/:theater_id", getMessagesByTheaterId);
router.delete("/:id", deleteTheaterMessage);

export default router;
