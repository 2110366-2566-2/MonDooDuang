// /package/create-package
import express from "express"
import { packageController } from "../controllers/package/package.controller"

const router = express.Router()

router.post("/create-package", packageController.createPackage)
// router.get("/reportee/:conversationId/:userId", reportController.getReporteeId)

export default router