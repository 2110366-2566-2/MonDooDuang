import express from "express"
import { loginUser, registerUser } from "../controllers/user.controller";

// Add routes here
const router = express.Router()
router.post("/", loginUser);
router.post("/", registerUser);

export default router
