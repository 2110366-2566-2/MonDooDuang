import express from "express"
import { fortuneTelllerController } from "../controllers/fortuneTeller/fortuneTeller.controllers"


const router = express.Router()

router.patch("/update-detail", fortuneTelllerController.updateFortuneTellerDetail)
router.get("detail/:fortuneTellerId", fortuneTelllerController.getFortuneTellerDetail)

export default router