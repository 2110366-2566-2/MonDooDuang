import { environment } from "../constants/environment"
import { AppointmentNotificationTypes, NotificationTypes } from "../types/NotificationTypes"

export const NotificationService = {
  getNotifications: async (userId: string): Promise<NotificationTypes[]> => {
    const response = await fetch(`${environment.backend.url}/notification/${userId}`)
    const notifications = await response.json()
    return notifications.data
  },
  getAppointmentNotification: async (
    notificationId: string,
    userId: string
  ): Promise<AppointmentNotificationTypes> => {
    const response = await fetch(
      `${environment.backend.url}/notification/appointment/${notificationId}/${userId}`
    )
    const appointmentNotification = await response.json()
    return appointmentNotification.data
  }
}
