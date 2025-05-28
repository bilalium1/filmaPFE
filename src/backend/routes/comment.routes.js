import express from 'express';
import { createComment, getAllComments, getCommentsByFilmId, deleteComment, likeComment, dislikeComment } from '../controllers/comment.controller.js';

const router = express.Router();

router.post("/", createComment);
router.get("/", getAllComments);
router.get("/film/:film_id", getCommentsByFilmId);
router.delete("/:id", deleteComment);
router.patch("/like/:id", likeComment);
router.patch("/dislike/:id", dislikeComment);

export default router;
