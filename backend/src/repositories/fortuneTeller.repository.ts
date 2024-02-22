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
  },

  updateFortuneTellerDetail: async (fortuneTeller: FortuneTellerDetailSchema) => {
    try {
          const result = await db.query(
            `
            UPDATE fortune_teller
            SET description = $2, stagename = $3
            WHERE fortunetellerid = $1
            `,
            [fortuneTeller.fortuneTellerId, fortuneTeller.description, fortuneTeller.stageName]
          )
        return true
    }catch (err) {
      return false
    }
  },
  
  getStageNameValid: async (fortuneTellerId: String, stageName: String) => {
    try {
      const stageNameValid = await db.query(
        `
        SELECT stagename 
        FROM fortune_teller
        WHERE stagename = $2 AND fortunetellerid != $1
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