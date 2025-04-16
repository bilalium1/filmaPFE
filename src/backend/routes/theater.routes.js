import express from "express";
import {
    createTheater,
    getAllTheaters,
    getTheatersByFilmId,
    getTheatersByHostId,
    deleteTheater
} from "../controllers/theater.controller.js";

const router = express.Router();

router.post("/", createTheater);
router.get("/", getAllTheaters);
router.get("/film/:filmid", getTheatersByFilmId);
router.get("/host/:hostid", getTheatersByHostId);
router.delete("/:id", deleteTheater);

export default router;
