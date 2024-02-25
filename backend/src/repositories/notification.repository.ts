import { db } from "../configs/pgdbConnection"
import {
  AppointmentNotificationSchema,
  NotificationSchema,
  NotificationType
} from "../models/notification/notification.model"

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

      if (result.rows.length === 0) return null

      const packages: NotificationSchema[] = result.rows.map((row) => ({
        notificationId: row.notification_id,
        userId: row.user_id,
        notificationType: row.type,
        updatedAt: row.updated_at
      }))

      return packages
    } catch (err) {
      return false
    }
  },
  getAppointmentNotification: async (
    notificationId: string,
    userId: string
  ): Promise<null | boolean | AppointmentNotificationSchema> => {
    try {
      const result = await db.query(
        `
        SELECT AN.type, AN.updated_at, A.customer_id, A.fortune_teller_id, A.appointment_date, P.speciality, P.duration  FROM APPOINTMENT_NOTIFICATION AS AN
        INNER JOIN APPOINTMENT AS A ON A.appointment_id = AN.appointment_id
        INNER JOIN PACKAGE AS P ON A.package_id = P.package_id
        WHERE AN.notification_id = $1;
        `,
        [notificationId]
      )

      if (result.rows.length === 0) return null

      let otherName = ""

      if (userId === result.rows[0].customer_id) {
        const stageName = await db.query(
          `
          SELECT stage_name FROM FORTUNE_TELLER
          WHERE fortune_teller_id = $1;
          `,
          [result.rows[0].fortune_teller_id]
        )
        otherName = stageName.rows[0].stage_name
      } else {
        const fullName = await db.query(
          `
          SELECT fname,lname
          FROM user_table
          WHERE user_id = $1;
          `,
          [result.rows[0].customer_id]
        )
        otherName = fullName.rows[0].fname + " " + fullName.rows[0].lname
      }

      return {
        appointmentNotificationType: result.rows[0].type,
        updatedAt: result.rows[0].updated_at,
        otherName: otherName,
        appointmentDate: result.rows[0].appointment_date,
        speciality: result.rows[0].speciality,
        duration: result.rows[0].duration
      }
    } catch (err) {
      return false
    }
  }
}
