import express from "express"
import { fortuneTelllerController } from "../controllers/fortuneTeller/fortuneTeller.controllers"

const router = express.Router()

router.get("/detail/:fortuneTellerId", fortuneTelllerController.getFortuneTellerDetail)
router.patch("/detail/update-detail/:fortuneTellerId", fortuneTelllerController.updateFortuneTellerDetail)

export default router
