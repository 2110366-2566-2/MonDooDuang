import { db } from "../configs/pgdbConnnection"

export const chatRepository = {
  getConversationsByUserId: async (userId: string) => {
    const result = await db.query(
      "SELECT conversationid FROM conversation WHERE fortunetellerid = $1 OR customerid = $1",
      [userId]
    )
    return result.rows
  }
}
