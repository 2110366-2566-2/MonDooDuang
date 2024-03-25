import express from "express"
import { timetableController } from "../controllers/timetable/timetable.controller"

const router = express.Router()
router.post("/:id", timetableController.getTimetable)

export default router
