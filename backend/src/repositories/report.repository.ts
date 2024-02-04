import { db } from "../configs/pgdbConnnection"
import { ReportSchema } from "../models/report/report.model"

export const reportRepository = {
  createReport: async (report: ReportSchema) => {
    const reportVal = Array.from(Object.entries(report), ([key, value]) => value)

    try {
      await db.query(
        `
            INSERT INTO REPORT (Description, ReportType, Status, AppointmentId, ReporterId, ReporteeId)
            VALUES($1, $2, $3, $4, $5, $6);
        `,
        reportVal
      )
      return true
    } catch (err) {
      return false
    }
  },
  getReporteeId: async (conversationId: string, reporterId: string) => {
    const result = await db.query(
      `SELECT FortuneTellerId, CustomerId
      FROM CONVERSATION
      WHERE ConversationId = $1;`,
      [conversationId]
    )

    if (result.rows.length == 0) return null

    if (result.rows[0].fortunetellerid == reporterId) 
      return result.rows[0].customerid
    return result.rows[0].fortunetellerid
  }
}