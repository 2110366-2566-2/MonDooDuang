import { db } from "../configs/pgdbConnection"
import { FortuneTellerSchema } from "../models/fortuneTeller/fortuneTeller.model"
import { FortuneTellerDetailSchema } from "../models/fortuneTellerDetail/fortuneTellerDetail.model"

export const fortuneTellerRepository = {
  getFortuneTellerById: async (fortuneTellerId: string): Promise<null | FortuneTellerDetailSchema> => {
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
