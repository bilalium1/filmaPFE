import Friend from "../models/friend.model.js";
import mongoose from "mongoose";

// Ajouter un ami
export const addFriend = async (req, res) => {
  try {
    const { user_id, friend_id } = req.body;

    // Vérifie si l'amitié existe déjà dans un sens ou dans l'autre
    const existing = await Friend.findOne({
      $or: [
        { user_id, friend_id },
        { user_id: friend_id, friend_id: user_id }
      ]
    });

    if (existing) {
      return res.status(400).json({ message: "Amitié déjà existante" });
    }

    const newFriend = new Friend({ user_id, friend_id });
    await newFriend.save();

    res.status(201).json({ message: "Ami ajouté avec succès", data: newFriend });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de l'ami", error });
  }
};

// Récupérer les amis d'un utilisateur
export const getFriends = async (req, res) => {
  try {
    const { user_id } = req.params;
    console.log("user id:", user_id);

    // Cast properly to ObjectId
    const objectUserId = new mongoose.Types.ObjectId(user_id);

    const friends = await Friend.find({
      $or: [
        { user_id: objectUserId },
        { friend_id: objectUserId }
      ]
    }).populate("user_id", "username")
    .populate("friend_id", "username");

    const friendList = friends.map((f) =>
      f.user_id.equals(objectUserId) ? f.friend_id : f.user_id
    );

    res.status(200).json(friendList);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de la récupération des amis",
      error
    });
  }
};

// Supprimer une relation d'amitié
export const removeFriend = async (req, res) => {
  try {
    const { user_id, friend_id } = req.body;

    const deleted = await Friend.findOneAndDelete({
      $or: [
        { user_id, friend_id },
        { user_id: friend_id, friend_id: user_id }
      ]
    });

    if (!deleted) {
      return res.status(404).json({ message: "Amitié non trouvée" });
    }

    res.status(200).json({ message: "Amitié supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error });
  }
};

// Récupérer toutes les relations d'amitié (admin/debug)
export const getAllFriendRelations = async (req, res) => {
  try {
    const allRelations = await Friend.find({});
    res.status(200).json(allRelations);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des relations", error });
  }
};

// Vérifie si deux utilisateurs sont amis
export const areFriends = async (req, res) => {
  try {
    const { user_id1, user_id2 } = req.params;

    const relation = await Friend.findOne({
      $or: [
        { user_id: user_id1, friend_id: user_id2 },
        { user_id: user_id2, friend_id: user_id1 }
      ]
    });

    if (relation) {
      return res.status(200).json({ areFriends: true });
    } else {
      return res.status(200).json({ areFriends: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la vérification", error });
  }
};

