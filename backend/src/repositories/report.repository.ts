import { db } from "../configs/pgdbConnection"
import { ReportSchema } from "../models/report/report.model"

export const reportRepository = {
  createReport: async (report: ReportSchema) => {
    try {
      await db.query(
        `
            INSERT INTO REPORT (Description, ReportType, Status, AppointmentId, ReporterId, ReporteeId)
            VALUES($1, $2, $3, $4, $5, $6);
        `,
        [report.description, report.reportType, report.status, report.appointmentId, report.reporterId, report.reporteeId]
      )
      return true
    } catch (err) {
      return false
    }
  },
  createMoneySuspensionReport: async (report: ReportSchema) => {
    const result = await db.query(
      `
        INSERT INTO REPORT (description, reporttype, status, appointmentid, reporterid, reporteeid)
        SELECT $1, $2, $3, AppointmentId, $4, $5
        FROM APPOINTMENT
        WHERE FortuneTellerId = $5
        AND CustomerId = $4
        AND Status = 'EVENT_COMPLETED'`,
      [report.description, report.reportType, report.status, report.reporterId, report.reporteeId]
    )

    return result.rowCount
  },
  getReporteeId: async (conversationId: string, reporterId: string) => {
    const result = await db.query(
      `SELECT FortuneTellerId, CustomerId
      FROM CONVERSATION
      WHERE ConversationId = $1;`,
      [conversationId]
    )

    if (result.rows.length === 0) return null

    if (result.rows[0].fortunetellerid === reporterId) { return result.rows[0].customerid }
    return result.rows[0].fortunetellerid
  },
  updateAppointmentStatus: async (fortuneTellerId: string, customerId: string) => {
    const result = await db.query(
      `
        UPDATE APPOINTMENT
        SET Status= 'SUSPENDED'
        WHERE FortuneTellerId = $1
        AND CustomerId = $2
        AND Status = 'EVENT_COMPLETED';
      `,
      [fortuneTellerId, customerId]
    )
    return
  }
}
