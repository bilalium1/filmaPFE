import express from "express";

import { createFilm, getFilm, getFilmId, updateFilm, deleteFilm } from "../controllers/film.controller.js";

const router = express.Router();

router.get("/", getFilm);
router.get("/:id", getFilmId);
router.post("/", createFilm);
router.put("/:id", updateFilm);
router.delete("/:id", deleteFilm);

export default router;