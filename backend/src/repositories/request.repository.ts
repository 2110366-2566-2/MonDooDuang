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
      SELECT r.request_id,r.fortune_teller_id, f.stagename, f.identitycardnumber, CONCAT(u.fname,' ',u.lname) as full_name, u.phonenumber,f.identitycardcopy,u.profilepicture
      FROM REQUEST r
      JOIN FORTUNE_TELLER f ON r.fortune_teller_id = f.fortunetellerid
      JOIN USER_TABLE u ON r.fortune_teller_id = u.userid
      WHERE Status = 'PENDING'
      ORDER BY r.created_at 
    `
    )
    return result.rows.map((data) => {
      return {
        requestId: data.request_id,
        fortuneTellerId: data.fortune_teller_id,
        stagename: data.stagename,
        identityCardNumber: data.identitycardnumber,
        fullName: data.full_name,
        phoneNumber: data.phonenumber,
        approvalPic: data.identitycardcopy,
        profilePic: data.profilepic
      }
    })
  }
}
