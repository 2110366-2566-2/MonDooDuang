import { environment } from "../constants/environment"
import { AppointmentNotificationTypes, NotificationType, NotificationTypes } from "../types/NotificationTypes"

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
  },
  updateNotificationType: async (
    type: NotificationType,
    notificationId: string
  ) => {
    const res = await fetch(`${environment.backend.url}/notification/update-notification-type`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type,
        notificationId
      })
    })
    const data = await res.json()
    return { isSuccess: data.success, message: data.message }
  }
}
