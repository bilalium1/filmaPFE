import Comment from "../models/comment.model.js";

// Créer un commentaire
export const createComment = async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obtenir tous les commentaires
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate('user_id', 'username email is_admin');
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtenir les commentaires d’un film spécifique
export const getCommentsByFilmId = async (req, res) => {
    try {
        const comments = await Comment.find({ film_id: req.params.film_id }).populate('user_id', 'username email is_admin');
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Supprimer un commentaire par ID
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) return res.status(404).json({ error: "Comment not found" });
        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Augmenter le nombre de likes d’un commentaire
export const likeComment = async (req, res) => {
  const userId = req.body.userId;
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ error: "Comment not found" });

    // If already liked, remove the like
    if (comment.likes.includes(userId)) {
      comment.likes.pull(userId);
    } else {
      comment.likes.push(userId);
      // Remove from dislikes if exists
      comment.dislikes.pull(userId);
    }

    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Augmenter le nombre de dislikes d’un commentaire
export const dislikeComment = async (req, res) => {
  const userId = req.body.userId;
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ error: "Comment not found" });

    // If already disliked, remove the dislike
    if (comment.dislikes.includes(userId)) {
      comment.dislikes.pull(userId);
    } else {
      comment.dislikes.push(userId);
      // Remove from likes if exists
      comment.likes.pull(userId);
    }

    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

