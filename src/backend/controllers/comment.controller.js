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
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtenir les commentaires d’un film spécifique
export const getCommentsByFilmId = async (req, res) => {
    try {
        const comments = await Comment.find({ filmid: req.params.filmid });
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
