import { notificationRepository } from "../../repositories/notification.repository"

export const notificationService = {
  getNotifications: async (userId: string) => {
    const notifications = notificationRepository.getNotifications(userId)
    return notifications
  },

  getAppointmentNotification: async (notificationId: string, userId: string) => {
    const notification = notificationRepository.getAppointmentNotification(notificationId, userId)
    return notification
  }
}
