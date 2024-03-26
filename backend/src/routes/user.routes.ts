import express from "express"
import { userController } from "../controllers/user/user.controller"

const router = express.Router()
router.post("/login", userController.loginUser)
router.post("/register", userController.registerUser)
router.get("/account/:userId", userController.getUserInformation)
router.put("/account/:userId", userController.updateUserInformation)

export default router
