import { db } from "../configs/pgdbConnection"
import { ReportSchema } from "../models/report/report.model"

export const reportRepository = {
  createReport: async (report: ReportSchema) => {
    try {
      await db.query(
        `
            INSERT INTO REPORT (description, report_type, status, appointment_id, reporter_id, reportee_id)
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
          INSERT INTO REPORT (description, report_type, status, appointment_id, reporter_id, reportee_id)
          SELECT $1, $2, $3, appointment_id, $4, $5
          FROM APPOINTMENT
          WHERE appointment_id IN (${query});
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
      `SELECT fortune_teller_id, customer_id
      FROM CONVERSATION
      WHERE conversation_id = $1;`,
      [conversationId]
    )

    if (result.rows.length === 0) return null

    if (result.rows[0].fortune_teller_id === reporterId) { return result.rows[0].customer_id }
    return result.rows[0].fortune_teller_id
  },
  getAppointmentIds: async (customerId: string, fortuneTellerId: string) => {
    const result = await db.query(
      `
        SELECT appointment_id
        FROM APPOINTMENT
        WHERE customer_id = $1
        AND fortune_teller_id = $2
        AND status = 'EVENT_COMPLETED';
      `,
      [customerId, fortuneTellerId]
    )

    // Turn list of object to list of string
    const appointmentIds = result.rows.map(row => row.appointment_id)

    return appointmentIds
  },
  updateAppointmentStatus: async (appointmentIds: string[]) => {
    const query = appointmentIds.map((_, i) => `$${i + 1}`).join(", ")
    await db.query(
      `
        UPDATE APPOINTMENT
        SET status = 'SUSPENDED'
        WHERE appointment_id IN (${query});
      `,
      [...appointmentIds]
    )
  }
}
