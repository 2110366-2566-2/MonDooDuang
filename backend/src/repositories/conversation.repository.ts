import { db } from "../configs/pgdbConnection"

export const conversationRepository = {
  getConversationsByUserId: async (userId: string) => {
    const result = await db.query(
      `
        SELECT c.conversationid 
        FROM conversation c
        LEFT JOIN (
          SELECT conversationid, created_at
          FROM message
          ORDER BY created_at DESC
          LIMIT 1
        ) m ON c.conversationid = m.conversationid
        WHERE fortunetellerid = $1 OR customerid = $1
        ORDER BY m.created_at
      `,
      [userId]
    )
    return result.rows
  },
  getNameWithLastMessage: async (conversationId: string, userId: string) => {
    const conversationDetails = await db.query(
      `
      SELECT 
      CASE 
      WHEN c.fortunetellerid = $2 THEN CONCAT(u.fname,' ',u.lname)
      WHEN c.customerid = $2 THEN ft.stagename
      END AS name,
      m.messagetext AS lastMessage
    FROM 
      CONVERSATION c
    LEFT JOIN USER_TABLE u ON c.customerid = u.userid
    LEFT JOIN FORTUNE_TELLER ft ON c.fortunetellerid = ft.fortunetellerid
    LEFT JOIN MESSAGE m ON c.conversationid = m.conversationid
    WHERE c.conversationid = $1
    ORDER BY m.created_at DESC
    LIMIT 1
      `,
      [conversationId, userId]
    )
    return {
      name: conversationDetails.rows[0].name,
      lastMessage: conversationDetails.rows[0].lastmessage
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
  getNameByConversationId: async (conversationId: string, userId: string) => {
    const result = await db.query(
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
    return result.rows
  },
  addMessage: async (conversationId: string, senderId: string, message: string) => {
    try {
      await db.query(
        `
          INSERT INTO MESSAGE(conversationid, senderid, messageText)
          VALUES($1, $2, $3)
        `,
        [conversationId, senderId, message]
      )
      return true
    } catch (err) {
      return false
    }
  },
  createConversation: async (fortunetellerId: string, customerId: string) => {
    try {
      await db.query(
        `
          INSERT INTO CONVERSATION(fortunetellerid, customerid)
          VALUES($1, $2)
        `,
        [fortunetellerId, customerId]
      )
      const result = await db.query(
        `
          SELECT conversationid
          FROM CONVERSATION
          WHERE fortunetellerid = $1 AND customerid = $2`,
        [fortunetellerId, customerId]
      )
      return { isSuccess: true, data: result.rows[0].conversationid }
    } catch (err) {
      return { isSuccess: false, data: null }
    }
  }
}
