import express from "express"
import { fortuneTellerController } from "../controllers/fortuneTeller/fortuneTeller.controller"

const router = express.Router()
router.post("/create-fortuneTeller", fortuneTellerController.createFortuneTeller)
router.post("/create-fortuneTeller-request", fortuneTellerController.createFortuneTellerRequest)
router.patch("/update-fortuneTeller", fortuneTellerController.updateFortuneTeller)
router.post("/checkValid", fortuneTellerController.getFortuneTellerValid)
router.get("/detail/:fortuneTellerId", fortuneTellerController.getFortuneTellerDetail)
router.patch("/detail/update-detail/:fortuneTellerId", fortuneTellerController.updateFortuneTellerDetail)
router.post("/stageNameValid", fortuneTellerController.getStageNameValid)
router.get("/detail-page/:fortuneTellerId", fortuneTellerController.getFortuneTellerDisplayInfoById)
router.post("/create-package", fortuneTellerController.createPackage)
router.get("/package/:fortuneTellerId", fortuneTellerController.getPackageByFortuneTellerId)
router.get("/package-with-id/:fortuneTellerId", fortuneTellerController.getPackageIncludeIdByFortuneTellerId)
router.get("/review/:fortuneTellerId", fortuneTellerController.getReviewByFortuneTellerId)
router.get("/recommend", fortuneTellerController.getRecommendPackage)
router.get("/get-package/:packageId", fortuneTellerController.getPackageData)
router.patch("/update-package/:packageId", fortuneTellerController.updatePackage)
router.delete("/delete-package/:packageId", fortuneTellerController.deletePackage)

export default router
