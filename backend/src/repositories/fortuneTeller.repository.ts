import { db } from "../configs/pgdbConnection"
import { FortuneTellerDetailSchema } from "../models/fortuneTeller/fortuneTeller.models"

export const fortuneTellerRepository = {
  getFortuneTellerDetail: async (fortuneTellerId: string) => {
    try {
      const result = await db.query(
        `SELECT stagename, description FROM fortune_teller
        WHERE fortunetellerid = '${fortuneTellerId}'`
      )
      if (result.rows.length === 0) return null
      return {
        stageName: result.rows[0].stagename,
        description: result.rows[0].description
      }
    } catch (err) {
      return null
    }
  }
}
