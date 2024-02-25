import { Request, Response } from "express"
import { notificationService } from "../../services/notification/notification.services"

const getNotifications = async (req: Request, res: Response) => {
  const userId = req.params.userId

  const notifications = await notificationService.getNotifications(userId)
  if (notifications === null) {
    return res.status(400).json({ success: false })
  }

  res.status(200).json({ success: true, data: notifications })
}

const getAppointmentNotification = async (req: Request, res: Response) => {
  const notificationId = req.params.notificationId
  const userId = req.params.userId

  const notification = await notificationService.getAppointmentNotification(notificationId, userId)
  if (notification === null) {
    return res.status(400).json({ success: false })
  }

  res.status(200).json({ success: true, data: notification })
}

export const notificationController = {
  getNotifications,
  getAppointmentNotification
}
