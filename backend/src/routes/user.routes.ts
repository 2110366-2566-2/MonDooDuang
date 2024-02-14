import express from "express"
import { userController } from "../controllers/user/user.controller"

const router = express.Router()
router.post("/login", userController.loginUser)
router.post("/register", userController.registerUser)

export default router
