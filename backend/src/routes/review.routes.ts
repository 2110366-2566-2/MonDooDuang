import express from "express"
import { reviewController } from "../controllers/review/review.controller"

const router = express.Router()

router.post("/create-review", reviewController.createReview)

export default router