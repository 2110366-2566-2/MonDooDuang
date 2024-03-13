import express from "express"
import { exampleController } from "../controllers/example/example.controller"
import { middleware } from "../middlewares/auth"

// Protect is a subset of authorize, so you don't need to use both
const router = express.Router()
router.get("/customer", middleware.protect, exampleController.helloWorld)
router.get("/fortune-teller", middleware.authorize("FORTUNE_TELLER"), exampleController.helloWorld)
router.get("/admin", middleware.authorize("ADMIN"), exampleController.helloWorld)

export default router
