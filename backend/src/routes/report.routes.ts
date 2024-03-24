import express from "express"
import { reportController } from "../controllers/report/report.controller"

const router = express.Router()

router.post("/create-report", reportController.createReport)
router.get("/reportee/:conversationId/:userId", reportController.getReporteeId)
router.get("/get-reports", reportController.getAllReport)
router.post("/update-report", reportController.updateReport)
router.post("/update-report-appointment", reportController.updateReportAndAppointment)
router.post("/update-report-ban", reportController.updateReportAndBan)

export default router
