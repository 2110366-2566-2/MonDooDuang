import { Request, Response } from "express"
import { notificationService } from "../../services/notification/notification.services"
import { TypedRequestBody } from "../../types/request"

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

const updateNotificationType = async (req: TypedRequestBody<{ type: string, notificationId: string }>, res: Response) => {
  const { type, notificationId } = req.body
  const isSuccess = await notificationService.updateNotificationType(notificationId, type)
  if (!isSuccess) return res.status(400).json({ success: false, message: "Failed to update notification type" })
  res.status(200).json({ success: isSuccess, message: "Notification type updated" })
}

const getChatNotification = async (req: Request, res: Response) => {
  const notificationId = req.params.notificationId
  const userId = req.params.userId

  const notification = await notificationService.getChatNotification(notificationId, userId)
  if (notification === null) {
    return res.status(400).json({ success: false })
  }

  res.status(200).json({ success: true, data: notification })
}

export const notificationController = {
  getNotifications,
  getAppointmentNotification,
  updateNotificationType
  getChatNotification
}
