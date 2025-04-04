import express from "express";

import { getUsers, createUser, updateUser, deleteUser } from "../controllers/user.controller.js"

const router = express.router();

router.get("/", getUsers);
router.get("/", createUser);
router.get("/", updateUser);
router.get("/", deleteUser);

export default router;