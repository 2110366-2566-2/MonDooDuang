import { db } from "../configs/pgdbConnection"
import { FortuneTellerDetailSchema } from "../models/fortuneTeller/fortuneTeller.models"

export const fortuneTellerRepository = {
  updateFortuneTellerDetail: async (fortuneTeller: FortuneTellerDetailSchema) => {
    try {
      await db.query(
        `
            UPDATE FORTUNE_TELLER
            SET STAGENAME = ${fortuneTeller.stageName}, 
            DESCRIPTION =${fortuneTeller.description}
            WHERE FORTUNETELLERID = ${fortuneTeller.fortuneTellerId}
            `
      )
      return true
    } catch (err) {
      return false
    }
  },
  getFortuneTellerDetail: async (fortuneTellerId: string) => {
    try {
      const query = await db.query(
        `SELECT stagename, description FROM fortune_teller
        WHERE fortunetellerid = '${fortuneTellerId}'`
      )
      return query.rows[0]
    } catch (err) {
      return null
    }
  }
}
