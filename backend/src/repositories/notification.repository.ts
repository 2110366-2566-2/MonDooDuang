import { db } from "../configs/pgdbConnection"
import {
  AppointmentNotificationSchema,
  AppointmentNotificationType,
  NotificationSchema,
  NotificationType
} from "../models/notification/notification.model"

export const notificationRepository = {
  createNotification: async (
    userId: string,
    type: NotificationType
  ): Promise<{ isSuccess: boolean, notificationId: string }> => {
    try {
      const result = await db.query(
        `
        INSERT INTO NOTIFICATION (user_id, type)
        VALUES($1, $2)
        RETURNING *;
        `,
        [userId, type]
      )
      return { isSuccess: true, notificationId: result.rows[0].notification_id }
    } catch (err) {
      return { isSuccess: false, notificationId: "" }
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
      return { isSuccess: true }
    } catch (err) {
      return { isSuccess: false }
    }
  },
  createChatNotification: async (notificationId: string, conversationId: string) => {
    try {
      await db.query(
        `
          INSERT INTO CHAT_NOTIFICATION (notification_id, conversation_id)
          VALUES($1, $2)
          RETURNING *;
        `,
        [notificationId, conversationId]
      )
      return { isSuccess: true }
    } catch (err) {
      return { isSuccess: false }
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
        SELECT AN.appointment_id, AN.type, AN.updated_at, A.customer_id, A.fortune_teller_id, A.appointment_date, P.speciality, P.duration, C.conversation_id FROM APPOINTMENT_NOTIFICATION AS AN
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
        appointmentId: result.rows[0].appointment_id,
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
  },
  updateNotificationType: async (notificationId: string, type: NotificationType) => {
    try {
      await db.query(
        `
          UPDATE NOTIFICATION
          SET type = $1
          WHERE notification_id = $2;
        `, [type, notificationId]
      )
      return true
    } catch (err) {
      return false
    }
  },
  getChatNotification: async (notificationId: string, userId: string) => {
    try {
      const result = await db.query(
        `
            WITH conversationId AS (
              SELECT conversation_id, updated_at
              FROM CHAT_NOTIFICATION
              WHERE notification_id = $1
          ), otherId AS (
              SELECT
                  CASE
                      WHEN $2 = customer_id THEN fortune_teller_id
                      WHEN $2 = fortune_teller_id THEN customer_id
                  END AS other_id
              FROM conversation
              WHERE conversation.conversation_id = (SELECT conversation_id FROM conversationId)
          ), otherName AS (
            SELECT CONCAT(fname,' ',lname) AS full_name
            FROM USER_TABLE
            WHERE user_id = (SELECT other_id FROM otherId WHERE other_id IS NOT NULL)
          )
          SELECT otherName.full_name, conversationId.updated_at
          FROM otherName, conversationId;
        `,
        [notificationId, userId]
      )
      return { otherName: result.rows[0].full_name, updatedAt: result.rows[0].updated_at }
    } catch (err) {
      return null
    }
  },
  getNotificationIdByAppointmentIdAndType: async (appointmentId: string, type: AppointmentNotificationType): Promise<null | string> => {
    try {
      const result = await db.query(
        `
        SELECT notification_id FROM APPOINTMENT_NOTIFICATION 
        WHERE appointment_id = $1
        AND type = $2
        `,
        [appointmentId, type]
      )
      if (result.rows.length === 0) return null
      return result.rows[0].notification_id
    } catch (err) {
      return null
    }
  }
}
