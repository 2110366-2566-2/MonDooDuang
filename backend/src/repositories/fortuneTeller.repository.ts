import { db } from "../configs/pgdbConnection"
import { FortuneTellerRegisterSchema, RequestSchema, FortuneTellerAccountDetailSchema } from "../models/fortuneTeller/fortuneTeller.model"
import { FortuneTellerDetailSchema } from "../models/fortuneTellerDetail/fortuneTellerDetail.model"
import { PackageWithIdSchema } from "../models/package/package.model"

export const fortuneTellerRepository = {

  // create fortuneTeller
  createFortuneTeller: async (fortuneTeller: FortuneTellerRegisterSchema) => {
    try {
      await db.query(
        `
            INSERT INTO FORTUNE_TELLER (fortune_teller_id, identity_card_number, identity_card_copy)
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
              SET identity_card_number = $2, identity_card_copy = $3
              WHERE fortune_teller_id = $1
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
        `SELECT is_verified 
      FROM fortune_teller
      WHERE fortune_teller_id = '${fortuneTellerId}' `
      )
      if (query.rowCount === 0) return false
      return true
    } catch (err) {
      return null
    }
  },

  getFortuneTellerDisplayInfoById: async (fortuneTellerId: string): Promise<null | FortuneTellerDetailSchema> => {
    const result = await db.query(
      `SELECT description, stage_name, total_score, total_review, profile_picture
            FROM FORTUNE_TELLER
            JOIN USER_TABLE
            ON FORTUNE_TELLER.fortune_teller_id = USER_TABLE.user_id
            WHERE fortune_teller_id = $1;`,
      [fortuneTellerId]
    )

    if (result.rows.length === 0) return null

    return {
      description: result.rows[0].description,
      stageName: result.rows[0].stage_name,
      totalScore: result.rows[0].total_score,
      totalReview: result.rows[0].total_review,
      profilePicture: result.rows[0].profile_picture
    }
  },

  getFortuneTellerDetail: async (fortuneTellerId: string) => {
    try {
      const result = await db.query(
        `SELECT stage_name, description 
        FROM fortune_teller
        WHERE fortune_teller_id = '${fortuneTellerId}'
        `
      )
      if (result.rows.length === 0) return null
      return {
        stageName: result.rows[0].stage_name,
        description: result.rows[0].description
      }
    } catch (err) {
      return null
    }
  },

  updateFortuneTellerDetail: async (fortuneTeller: FortuneTellerAccountDetailSchema) => {
    try {
      const result = await db.query(
        `
          UPDATE fortune_teller
          SET description = $2, stage_name = $3
          WHERE fortune_teller_id = $1
        `,
        [fortuneTeller.fortuneTellerId, fortuneTeller.description, fortuneTeller.stageName]
      )
        return true
    } catch (err) {
      return false
    }
  },
  getStageNameValid: async (fortuneTellerId: string, stageName: string) => {
    try {
      const stageNameValid = await db.query(
        `
        SELECT stage_name 
        FROM fortune_teller
        WHERE stage_name = $2 AND fortune_teller_id != $1
        `,
        [fortuneTellerId, stageName]
      )
      if (stageNameValid.rows.length === 0) return true
      return false
    } catch (err) {
      return false
    }
  }

}
