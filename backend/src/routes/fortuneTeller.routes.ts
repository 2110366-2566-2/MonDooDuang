import express from "express"
import { fortuneTellerController } from "../controllers/fortuneTeller/fortuneTeller.controller"

const router = express.Router()
router.post("/create-fortuneTeller", fortuneTellerController.createFortuneTeller)
router.post("/create-fortuneTeller-request", fortuneTellerController.createFortuneTellerRequest)
router.patch("/update-fortuneTeller", fortuneTellerController.updateFortuneTeller)
router.post("/checkValid", fortuneTellerController.getFortuneTellerValid)
router.get("/detail/:fortuneTellerId", fortuneTelllerController.getFortuneTellerDetail)
router.patch("/detail/update-detail/:fortuneTellerId", fortuneTelllerController.updateFortuneTellerDetail)
router.post("/stageNameValid", fortuneTelllerController.getStageNameValid)
router.get("/detail-page/:fortuneTellerId", fortuneTellerController.getFortuneTellerDisplayInfoById)
router.get("/package/:fortuneTellerId", fortuneTellerController.getPackageByFortuneTellerId)
router.get("/review/:fortuneTellerId", fortuneTellerController.getReviewByFortuneTellerId)
router.get("/recommend", fortuneTellerController.getRecommendPackage)

export default router