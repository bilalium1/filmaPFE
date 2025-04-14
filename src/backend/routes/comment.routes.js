import express from 'express';
import { createComment, getAllComments, getCommentsByFilmId, deleteComment } from '../controllers/comment.controller.js';

const router = express.Router();

router.post("/", createComment);
router.get("/", getAllComments);
router.get("/film/:filmid", getCommentsByFilmId);
router.delete("/:id", deleteComment);

export default router;
