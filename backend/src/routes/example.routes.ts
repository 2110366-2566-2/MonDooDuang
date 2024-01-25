import express from "express"
import { exampleController } from "../controllers/example/example.controller"

// Add routes here
const router = express.Router()
router.get("/test", exampleController.helloWorld)

export default router
