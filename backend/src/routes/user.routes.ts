import express from "express"
import { userController } from "../controllers/user.controller"

// Add routes here
const router = express.Router()
router.get("/", userController.helloWorld)

export default router
