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
  }
}
