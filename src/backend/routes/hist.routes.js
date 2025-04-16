import express from "express";
import {
    createHistorique,
    getAllHistoriques,
    getHistoriqueByUserId,
    deleteHistorique
} from "../controllers/historique.controller.js";

const router = express.Router();

router.post("/", createHistorique);
router.get("/", getAllHistoriques);
router.get("/:userid", getHistoriqueByUserId);
router.delete("/:id", deleteHistorique);

export default router;
