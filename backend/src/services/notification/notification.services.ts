import { NotificationType } from "../../models/notification/notification.model"
import { notificationRepository } from "../../repositories/notification.repository"

export const notificationService = {
  getNotifications: async (userId: string) => {
    const notifications = await notificationRepository.getNotifications(userId)
    return notifications
  },

  getAppointmentNotification: async (notificationId: string, userId: string) => {
    const notification = await notificationRepository.getAppointmentNotification(
      notificationId,
      userId
    )
    return notification
  },

  updateNotificationType: async (notificationId: string, type: NotificationType) => {
    const isSuccess = await notificationRepository.updateNotificationType(notificationId, type)
    return isSuccess
  },

  getChatNotification: async (notificationId: string, userId: string) => {
    const notification = await notificationRepository.getChatNotification(
      notificationId,
      userId
    )
    return notification
  }
}
