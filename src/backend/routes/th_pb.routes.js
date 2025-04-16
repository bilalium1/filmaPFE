import express from "express";
import {
  createPlayback,
  getAllPlaybackStates,
  getPlaybackById,
  updatePlayback,
  deletePlayback,
} from "../controllers/theaterPlaybackController.js";

const router = express.Router();

router.post("/", createPlayback);
router.get("/", getAllPlaybackStates);
router.get("/:id", getPlaybackById);
router.put("/:id", updatePlayback);
router.delete("/:id", deletePlayback);

export default router;
