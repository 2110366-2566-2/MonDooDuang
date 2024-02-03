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
  }
}
