import express from "express"
import { fortuneTellerController } from "../controllers/fortuneTeller/fortuneTeller.controller"

const router = express.Router()
router.post("/create-fortuneTeller", fortuneTellerController.createFortuneTellerRegister)
router.post("/create-fortuneTeller-request", fortuneTellerController.createFortuneTellerRequest)
router.patch("/update-fortuneTeller", fortuneTellerController.updateFortuneTellerRegister)
router.post("/checkValid", fortuneTellerController.getFortuneTellerValid)
router.get("/detail-page/:fortuneTellerId", fortuneTellerController.getFortuneTellerDisplayInfoById)
router.get("/package/:fortuneTellerId", fortuneTellerController.getPackageByFortuneTellerId)
router.get("/review/:fortuneTellerId", fortuneTellerController.getReviewByFortuneTellerId)
router.get("/recommend", fortuneTellerController.getRecommendPackage)

export default router
