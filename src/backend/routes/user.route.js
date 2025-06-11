import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserId,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUserId);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;