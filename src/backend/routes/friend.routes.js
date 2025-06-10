import express from "express";
import {
  addFriend,
  getFriends,
  removeFriend
} from "../controllers/friend.controller.js";

const router = express.Router();

router.post("/add", addFriend);
router.get("/:user_id", getFriends);
router.delete("/remove", removeFriend);

export default router;
