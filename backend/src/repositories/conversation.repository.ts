import { db } from "../configs/pgdbConnection"

export const conversationRepository = {
  getConversationsByUserId: async (userId: string) => {
    const result = await db.query(
      `
        SELECT c.conversation_id 
        FROM conversation c
        LEFT JOIN (
          SELECT conversation_id, created_at
          FROM message
          ORDER BY created_at DESC
          LIMIT 1
        ) m ON c.conversation_id = m.conversation_id
        WHERE fortune_teller_id = $1 OR customer_id = $1
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
      WHEN c.fortune_teller_id = $2 THEN CONCAT(u.fname,' ',u.lname)
      WHEN c.customer_id = $2 THEN ft.stage_name
      END AS name,
      m.message_text AS last_message
    FROM 
      CONVERSATION c
    LEFT JOIN USER_TABLE u ON c.customer_id = u.user_id
    LEFT JOIN FORTUNE_TELLER ft ON c.fortune_teller_id = ft.fortune_teller_id
    LEFT JOIN MESSAGE m ON c.conversation_id = m.conversation_id
    WHERE c.conversation_id = $1
    ORDER BY m.created_at DESC
    LIMIT 1
      `,
      [conversationId, userId]
    )
    return {
      name: conversationDetails.rows[0].name,
      lastMessage: conversationDetails.rows[0].last_message
    }
  },
  getMessagesByConversationId: async (conversationId: string, userId: string) => {
    const result = await db.query(
      `
        SELECT message_text, created_at, is_read,
        CASE 
          WHEN sender_id = $2 THEN 'SELF'
          WHEN sender_id <> $2 THEN 'OTHER'
        END AS sender
        FROM MESSAGE
        WHERE conversation_id = $1
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
            WHEN fortune_teller_id = $2 THEN (
                SELECT CONCAT(fname,' ',lname) FROM USER_TABLE 
                WHERE USER_TABLE.user_id = CONVERSATION.customer_id
            )
            WHEN customer_id = $2 THEN (
                SELECT stage_name FROM FORTUNE_TELLER
                WHERE FORTUNE_TELLER.fortune_teller_id = CONVERSATION.fortune_teller_id
            )
        END AS result
        FROM 
            CONVERSATION
        WHERE conversation_id = $1
    `,
      [conversationId, userId]
    )
    return result.rows
  },
  addMessage: async (conversationId: string, senderId: string, message: string) => {
    try {
      await db.query(
        `
          INSERT INTO MESSAGE(conversation_id, sender_id, message_text)
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
      const existedConversation = await db.query(
        `
          SELECT conversation_id
          FROM CONVERSATION
          WHERE fortune_teller_id = $1 AND customer_id = $2
        `,
        [fortunetellerId, customerId]
      )
      if (existedConversation.rows.length > 0)
        return { isSuccess: true, data: existedConversation.rows[0].conversation_id }
      await db.query(
        `
          INSERT INTO CONVERSATION(fortune_teller_id, customer_id)
          VALUES($1, $2)
        `,
        [fortunetellerId, customerId]
      )
      const result = await db.query(
        `
          SELECT conversation_id
          FROM CONVERSATION
          WHERE fortune_teller_id = $1 AND customer_id = $2`,
        [fortunetellerId, customerId]
      )
      return { isSuccess: true, data: result.rows[0].conversation_id }
    } catch (err) {
      return { isSuccess: false }
    }
  },
  readMessage: async (conversationId: string, userId: string) => {
    try {
      await db.query(
        `
          UPDATE MESSAGE
          SET is_read = true
          WHERE conversation_id = $1 AND sender_id <> $2
        `,
        [conversationId, userId]
      )
      return true
    } catch (err) {
      return false
    }
  },
  getUnreadMessagesByConversationId: async (conversationId: string, userId: string) => {
    const result = await db.query(
      `
        SELECT COUNT(*)
        FROM MESSAGE
        WHERE conversation_id = $1 AND sender_id <> $2 AND is_read = false
      `,
      [conversationId, userId]
    )
    return result.rows[0].count
  }
}
