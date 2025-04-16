import express from "express";
import {
  createStream,
  getAllStreams,
  getStreamsByFilm,
  updateStream,
  deleteStream,
} from "../controllers/stream.controller.js";

const router = express.Router();

router.post("/", createStream);
router.get("/", getAllStreams);
router.get("/film/:film_id", getStreamsByFilm);
router.put("/:id", updateStream);
router.delete("/:id", deleteStream);

export default router;
