import express from "express"
import { notificationController } from "../controllers/notification/notification.controller"

const router = express.Router()

router.get("/:userId", notificationController.getNotifications)
router.get(
  "/appointment/:notificationId/:userId",
  notificationController.getAppointmentNotification
)
router.post("/update-notification-type",
  notificationController.updateNotificationType
)
router.get(
  "/chat/:notificationId/:userId",
  notificationController.getChatNotification
)

export default router
