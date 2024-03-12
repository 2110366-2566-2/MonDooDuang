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
  }
}
