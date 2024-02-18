import { db } from "../configs/pgdbConnection"
import { FortuneTellerSchema } from "../models/fortuneTeller/fortuneTeller.model"
import { FortuneTellerDetailSchema } from "../models/fortuneTellerDetail/fortuneTellerDetail.model"

export const fortuneTellerRepository = {
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
  }
}
