import { db } from "../configs/pgdbConnection"
import { NotificationType } from "../models/notification/notification.model"

export const notificationRepository = {
  createNotification: async (userId: string, type: NotificationType) => {
    try {
      await db.query(
        `
            INSERT INTO NOTIFICATION (userid, type)
            VALUES($1, $2);
        `,
        [userId, type]
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
