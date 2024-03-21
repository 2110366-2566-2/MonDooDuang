import { Speciality } from "../../pages/FortuneTellerDetailPage/types/PackageTypes"

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

export interface NotificationTypes {
  notificationId: string
  userId: string
  notificationType: NotificationType
  updatedAt: Date
}

export interface ChatNotificationTypes {
  otherName: string
  updatedAt: Date
}

export interface AppointmentNotificationTypes {
  appointmentId: string
  appointmentNotificationType: AppointmentNotificationType
  updatedAt: Date
  otherName: string
  appointmentDate: Date
  speciality: Speciality
  duration: number
  isCustomer: boolean
  conversationId: string
}
