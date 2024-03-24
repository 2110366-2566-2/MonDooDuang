import { ReportStatus, ReportInfoSchema, ReportSchema } from "../models/report/report.model"
import { db } from "../configs/pgdbConnection"

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
        WITH now_datetime AS ( SELECT NOW() at time zone 'utc' at time zone 'Etc/GMT+7' )

        SELECT appointment_id
        FROM APPOINTMENT A, now_datetime
        WHERE A.customer_id = $1
        AND A.fortune_teller_id = $2
        AND A.status IN ('WAITING_FOR_EVENT','EVENT_COMPLETED')
        AND A.appointment_date <= now_datetime.timezone 
        AND now_datetime.timezone <= A.appointment_date + INTERVAL '1 DAY';
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
  },
  updateReportStatus: async (reportId: string, status: ReportStatus) => {
    try {
      await db.query(
        `UPDATE REPORT
      SET status = $1
      WHERE report_id = $2;
      `, [status, reportId]
      )
      return { isSuccess: true, reportId }
    } catch (err) {
      console.error(err)
      return { isSuccess: false }
    }
  },
  getAllReport: async () => {
    const result = await db.query(
      `SELECT 
      r.report_id,
      r.report_type,
      r.reporter_id,
      r.appointment_id,
      CASE 
        WHEN r.report_type = 'SYSTEM_ERROR' THEN NULL
          ELSE r.reportee_id 
      END AS reportee_id,
      r.description,
      CONCAT(u1.fname, ' ', u1.lname) AS reporter_full_name,
      u2.profile_picture,
      CASE 
          WHEN r.report_type = 'SYSTEM_ERROR' THEN NULL
          ELSE CONCAT(u2.fname, ' ', u2.lname)
      END AS reportee_full_name
        
          
      FROM REPORT r
      JOIN USER_TABLE u1 ON r.reporter_id = u1.user_id
      LEFT JOIN USER_TABLE u2 ON r.reportee_id = u2.user_id
      WHERE r.status = 'PENDING' AND (r.report_type = 'SYSTEM_ERROR' OR u2.is_banned = false)
      ORDER BY r.created_at; `
    )
    if (result.rows.length === 0) return null
    const reports: ReportInfoSchema[] = result.rows.map((row) => ({
      reportId: row.report_id,
      reportType: row.report_type,
      reporterId: row.reporter_id,
      reporteeId: row.reportee_id,
      description: row.description,
      reporterName: row.reporter_full_name,
      reporteeName: row.reportee_full_name,
      reporteeProfile: row.profile_picture,
      appointmentId: row.appointment_id
    }))
    return reports
  }
}
