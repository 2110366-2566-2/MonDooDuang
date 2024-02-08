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
  createMoneySuspensionReport: async (report: ReportSchema, appointmentIds: string[]) => {
    try {
      // Create a string $6, $7, ... using in query
      const query = appointmentIds.map((_, i) => `$${i + 6}`).join(", ")

      await db.query(
        `
          INSERT INTO REPORT (description, reporttype, status, appointmentid, reporterid, reporteeid)
          SELECT $1, $2, $3, AppointmentId, $4, $5
          FROM APPOINTMENT
          WHERE AppointmentId IN (${query});
          `,
        [report.description, report.reportType, report.status, report.reporterId, report.reporteeId, ...appointmentIds]
      )
      return true
    } catch (err) {
      console.log(err)
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

    if (result.rows.length === 0) return null

    if (result.rows[0].fortunetellerid === reporterId) { return result.rows[0].customerid }
    return result.rows[0].fortunetellerid
  },
  getAppointmentIds: async (customerId: string, fortuneTellerId: string) => {
    const result = await db.query(
      `
        SELECT AppointmentId
        FROM APPOINTMENT
        WHERE CustomerId = $1
        AND FortuneTellerId = $2
        AND Status = 'EVENT_COMPLETED';
      `,
      [customerId, fortuneTellerId]
    )

    // Turn list of object to list of string
    const appointmentIds = result.rows.map(row => row.appointmentid)

    return appointmentIds
  },
  updateAppointmentStatus: async (appointmentIds: string[]) => {
    const query = appointmentIds.map((_, i) => `$${i + 1}`).join(", ")
    await db.query(
      `
        UPDATE APPOINTMENT
        SET Status = 'SUSPENDED'
        WHERE AppointmentId IN (${query});
      `,
      [...appointmentIds]
    )
  }
}
