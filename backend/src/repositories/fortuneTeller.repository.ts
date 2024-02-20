import { db } from "../configs/pgdbConnection"
import { FortuneTellerRegisterSchema, RequestSchema } from "../models/fortuneTeller/fortuneTeller.model"
import { FortuneTellerDetailSchema } from "../models/fortuneTellerDetail/fortuneTellerDetail.model"

export const fortuneTellerRepository = {

  // create fortuneTeller
  createFortuneTeller: async (fortuneTeller: FortuneTellerRegisterSchema) => {
    try {
      await db.query(
        `
            INSERT INTO FORTUNE_TELLER (fortunetellerid, identitycardnumber, identitycardcopy)
            VALUES($1, $2, $3);
        `,
        [fortuneTeller.fortuneTellerId, fortuneTeller.identityCardNumber, fortuneTeller.identityCardCopy]
      )
      return true
    } catch (err) {
      return false
    }
  },

  // create request
  createFortuneTellerRequest: async (request: RequestSchema) => {
    try {
      await db.query(
        `
                INSERT INTO REQUEST (fortune_teller_id, status)
                VALUES($1, $2);
            `,
        [request.fortuneTellerId, request.status]
      )
      return true
    } catch (err) {
      return false
    }
  },

  updateFortuneTeller: async (fortuneTeller: FortuneTellerRegisterSchema) => {
    try {
      await db.query(
        `
              UPDATE fortune_teller
              SET identitycardnumber = $2, identitycardcopy = $3
              WHERE fortunetellerid = $1
          `,
        [fortuneTeller.fortuneTellerId, fortuneTeller.identityCardNumber, fortuneTeller.identityCardCopy]
      )
      return true
    } catch (err) {
      return false
    }
  },

  updateFortuneTellerRequest: async (request: RequestSchema) => {
    try {
      await db.query(
        `
                UPDATE request
                SET status =  'PENDING'
                WHERE fortune_teller_id = '${request.fortuneTellerId}';
            `
      )

      return true
    } catch (err) {
      return false
    }
  },

  getFortuneTellerValid: async (fortuneTellerId: string) => {
    try {
      const query = await db.query(
        `SELECT isverified 
      FROM fortune_teller
      WHERE fortunetellerid = '${fortuneTellerId}' `
      )
      if (query.rowCount === 0) return false
      return true
    } catch (err) {
      return null
    }
  },

  getFortuneTellerDisplayInfoById: async (fortuneTellerId: string): Promise<null | FortuneTellerDetailSchema> => {
    const result = await db.query(
      `SELECT description, stageName, totalScore, totalReview, profilePicture
            FROM FORTUNE_TELLER
            JOIN USER_TABLE
            ON FORTUNE_TELLER.fortuneTellerId = USER_TABLE.userID
            WHERE FortuneTellerId = $1;`,
      [fortuneTellerId]
    )

    if (result.rows.length === 0) return null
    return {
      description: result.rows[0].description,
      stageName: result.rows[0].stagename,
      totalScore: result.rows[0].totalscore,
      totalReview: result.rows[0].totalreview,
      profilePicture: result.rows[0].profilepicture
    }
  }
}
