import { db } from "../configs/pgdbConnection"
import { RequestStatus } from "../models/request/request.model"

export const requestRepository = {
  updateRequestStatus: async (requestId: string, status: RequestStatus) => {
    try {
      await db.query(
        `
            UPDATE REQUEST
            SET status = $2
            WHERE request_id = $1;
            `,
        [requestId, status]
      )
      const fortuneTellerId = await db.query(
        `
            SELECT fortune_teller_id
            FROM REQUEST
            WHERE request_id = $1;
            `,
        [requestId]
      )
      return { isSuccess: true, fortuneTellerId: fortuneTellerId.rows[0].fortune_teller_id }
    } catch (err) {
      console.error(err)
      return { isSuccess: false }
    }
  },
  getPendingRequest: async () => {
    const result = await db.query(
      `
      SELECT r.request_id,r.fortune_teller_id, f.stage_name, f.identity_card_number, CONCAT(u.fname,' ',u.lname) as full_name, u.phone_number,f.identity_card_copy,u.profile_picture
      FROM REQUEST r
      JOIN FORTUNE_TELLER f ON r.fortune_teller_id = f.fortune_teller_id
      JOIN USER_TABLE u ON r.fortune_teller_id = u.user_id
      WHERE Status = 'PENDING'
      ORDER BY r.created_at 
    `
    )
    return result.rows.map((data) => {
      return {
        requestId: data.request_id,
        fortuneTellerId: data.fortune_teller_id,
        stagename: data.stage_name,
        identityCardNumber: data.identity_card_number,
        fullName: data.full_name,
        phoneNumber: data.phone_number,
        approvalPic: data.identity_card_copy,
        profilePic: data.profile_pic
      }
    })
  }
}
