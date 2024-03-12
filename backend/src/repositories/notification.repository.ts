import { db } from "../configs/pgdbConnection"
import {
  AppointmentNotificationType,
  NotificationType
} from "../models/notification/notification.model"

export const notificationRepository = {
  createNotification: async (userId: string, type: NotificationType) => {
    try {
      const result = await db.query(
        `
            INSERT INTO NOTIFICATION (user_id, type)
            VALUES($1, $2)
            RETURNING notification_id;
        `,
        [userId, type]
      )
      return result.rows[0].notification_id
    } catch (err) {
      return null
    }
  },
  createAppointmentNotification: async (
    notificationId: string,
    type: AppointmentNotificationType,
    appointmentId: string
  ) => {
    try {
      await db.query(
        `
            INSERT INTO APPOINTMENT_NOTIFICATION (notification_id, type, appointment_id)
            VALUES($1, $2, $3)
        `,
        [notificationId, type, appointmentId]
      )
      return true
    } catch (err) {
      return false
    }
  },
  getNotifications: async (userId: string) => {
    try {
      const result = await db.query(
        `
        SELECT * FROM NOTIFICATION 
        WHERE user_id = $1
        AND type != $2
        `,
        [userId, "HIDDEN"]
      )
      return result.rows
    } catch (err) {
      return false
    }
  },
  getAppointmentNotification: async (notificationId: string) => {
    try {
      const result = await db.query(
        `
        SELECT * FROM APPOINTMENT_NOTIFICATION 
        WHERE notification_id = $1
        `,
        [notificationId]
      )
      return result.rows
    } catch (err) {
      return false
    }
  }
}
