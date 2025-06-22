import express from "express";
import {
  addFriend,
  getFriends,
  removeFriend,
  getAllFriendRelations,
  areFriends,
} from "../controllers/friend.controller.js";

const router = express.Router();

router.post("/add", addFriend);
router.get("/:user_id", getFriends);
router.delete("/remove", removeFriend);
router.get("/", getAllFriendRelations);
router.get("/check/:user_id1/:user_id2", areFriends);


export default router;
