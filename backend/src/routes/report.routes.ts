import express from "express"
import { reportController } from "../controllers/report/report.controller"

const router = express.Router()

router.post("/create-report", reportController.createReport)
router.get("/reportee/:conversationId/:userId", reportController.getReporteeId)

export default router