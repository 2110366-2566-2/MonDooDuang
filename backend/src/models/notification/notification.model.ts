import { Speciality } from "../package/package.model"

export type NotificationType =
  | "VERIFICATION"
  | "CANCELED_VERIFICATION"
  | "CHAT"
  | "APPOINTMENT"
  | "HIDDEN"

export type AppointmentNotificationType =
  | "NEW"
  | "ACCEPT"
  | "DENY"
  | "CANCEL"
  | "REMINDER"
  | "COMPLETE"

export interface NotificationSchema {
  notificationId: string
  userId: string
  notificationType: NotificationType
  updatedAt: Date
}

export interface AppointmentNotificationSchema {
  appointmentNotificationType: AppointmentNotificationType
  updatedAt: Date
  otherName: string
  appointmentDate: Date
  speciality: Speciality
  duration: number
}
