import express from "express";

import { getUsers, createUser, updateUser, deleteUser } from "../controllers/user.controller.js"

const router = express.Router();

router.get("/", getUsers);
router.get("/", createUser);
router.get("/:id", updateUser);
router.get("/:id", deleteUser);

export default router;