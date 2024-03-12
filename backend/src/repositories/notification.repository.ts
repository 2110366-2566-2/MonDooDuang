import { db } from "../configs/pgdbConnection"
import {
  AppointmentNotificationSchema,
  AppointmentNotificationType,
  NotificationSchema,
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
  getNotifications: async (userId: string): Promise<null | NotificationSchema[]> => {
    try {
      const result = await db.query(
        `
        SELECT * FROM NOTIFICATION 
        WHERE user_id = $1
        AND type != $2
        ORDER BY updated_at DESC
        `,
        [userId, "HIDDEN"]
      )

      const packages: NotificationSchema[] = result.rows.map((row) => ({
        notificationId: row.notification_id,
        userId: row.user_id,
        notificationType: row.type,
        updatedAt: row.updated_at
      }))

      return packages
    } catch (err) {
      return null
    }
  },
  getAppointmentNotification: async (
    notificationId: string,
    userId: string
  ): Promise<null | AppointmentNotificationSchema> => {
    try {
      const result = await db.query(
        `
        SELECT AN.type, AN.updated_at, A.customer_id, A.fortune_teller_id, A.appointment_date, P.speciality, P.duration, C.conversation_id FROM APPOINTMENT_NOTIFICATION AS AN
        INNER JOIN APPOINTMENT AS A ON A.appointment_id = AN.appointment_id
        INNER JOIN PACKAGE AS P ON A.package_id = P.package_id
        INNER JOIN CONVERSATION AS C ON A.customer_id = C.customer_id AND A.fortune_teller_id = C.fortune_teller_id
        WHERE AN.notification_id = $1;
        `,
        [notificationId]
      )

      let otherName = ""
      let isCustomer = true

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
        isCustomer = false
      }

      return {
        appointmentNotificationType: result.rows[0].type,
        updatedAt: result.rows[0].updated_at,
        otherName,
        appointmentDate: result.rows[0].appointment_date,
        speciality: result.rows[0].speciality,
        duration: result.rows[0].duration,
        isCustomer,
        conversationId: result.rows[0].conversation_id
      }
    } catch (err) {
      return null
    }
  }
}
