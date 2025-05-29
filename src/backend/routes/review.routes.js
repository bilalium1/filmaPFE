import express from "express";
import {
    createReview,
    getAllReviews,
    getReviewsByFilmId,
    updateReview,
    deleteReview
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", createReview);
router.get("/", getAllReviews);
router.get("/film/:film_id", getReviewsByFilmId);
router.put("/", updateReview);
router.delete("/", deleteReview);

export default router;
