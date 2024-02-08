import { db } from "../configs/pgdbConnection"

export const chatRepository = {
  getConversationsByUserId: async (userId: string) => {
    const result = await db.query(
      `
      SELECT conversationid FROM conversation WHERE fortunetellerid = $1 OR customerid = $1
      ORDER BY created_at DESC
      `,
      [userId]
    )
    return result.rows
  },
  getNameWithLastMessage: async (conversationId: string, userId: string) => {
    const name = await db.query(
      `
        SELECT 
        CASE 
            WHEN fortunetellerid = $2 THEN (
                SELECT CONCAT(fname,' ',lname) FROM USER_TABLE 
                WHERE USER_TABLE.userid = CONVERSATION.customerid
            )
            WHEN customerid = $2 THEN (
                SELECT stagename FROM FORTUNE_TELLER
                WHERE FORTUNE_TELLER.fortunetellerid = CONVERSATION.fortunetellerid
            )
        END AS result
        FROM 
            CONVERSATION
        WHERE conversationid = $1
    `,
      [conversationId, userId]
    )
    const lastMessage = await db.query(
      `
        SELECT MESSAGE.messagetext 
        FROM MESSAGE
        WHERE MESSAGE.conversationid = $1
        ORDER BY created_at DESC
        LIMIT 1
    `,
      [conversationId]
    )
    return {
      name: name.rows,
      lastMessage: lastMessage.rows
    }
  },
  getMessagesByConversationId: async (conversationId: string, userId: string) => {
    const result = await db.query(
      `
        SELECT messagetext, created_at, isRead,
        CASE 
          WHEN senderid = $2 THEN 'SELF'
          WHEN senderid <> $2 THEN 'OTHER'
        END AS sender
        FROM MESSAGE
        WHERE conversationid = $1
        ORDER BY created_at
      `,
      [conversationId, userId]
    )
    return result.rows
  },
  addMessage: async (conversationId: string, senderId: string, message: string) => {
    await db.query(
      `
        INSERT INTO MESSAGE(conversationid, senderid, messageText)
        VALUES($1, $2, $3)
      `,
      [conversationId, senderId, message]
    )
  }
}
