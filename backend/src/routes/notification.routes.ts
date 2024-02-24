import express from "express"
import { notificationController } from "../controllers/notification/notification.controller"

const router = express.Router()

router.get("/:userId", notificationController.getNotifications)
router.get("/appointment/:notificationId", notificationController.getAppointmentNotification)

export default router
