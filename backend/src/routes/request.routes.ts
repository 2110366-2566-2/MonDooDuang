import express from "express"
import { requestController } from "../controllers/request/request.controller"

const router = express.Router()

router.post("/update-status", requestController.updateRequestStatus)
router.get("/get-pending", requestController.getPendingRequest)
router.post("/update-fortuneTellerTypeAndVerified", requestController.updateToFortuneTellerTypeAndVerified)

export default router
