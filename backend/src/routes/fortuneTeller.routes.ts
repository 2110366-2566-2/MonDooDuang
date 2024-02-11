import express from "express"
import { fortuneTellerController } from "../controllers/fortuneTeller/fortuneTeller.controller"

const router = express.Router()
router.get("/detail-page/:fortuneTellerId", fortuneTellerController.getFortuneTellerbyId)
router.get("/package/:fortuneTellerId", fortuneTellerController.getPackageByFortuneTellerId)
router.get("/review/:fortuneTellerId", fortuneTellerController.getReviewByFortuneTellerId)

export default router
