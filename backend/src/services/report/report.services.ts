import { ReportSchema } from "../../models/report/report.model"
import { reportRepository } from "../../repositories/report.repository"

export const reportService = {
  createReport: async (report: ReportSchema) => {
    report.status = "PENDING"

    if (report.reportType === "MONEY_SUSPENSION") {
      const rowCreateds = await reportRepository.createMoneySuspensionReport(report)

      if (rowCreateds === 0) {
        return { success: false, message: "No appointment to be reported" }
      }

      await reportRepository.updateAppointmentStatus(report.reporteeId, report.reporterId)
      return { success: true, message: "success" }
    }

    const isSuccess = await reportRepository.createReport(report)
    return { success: isSuccess, message: (isSuccess) ? "success" : "error to submit report" }
  },

  getReporteeId: async (conversationId: string, reporterId: string) => {
    const reporteeId = await reportRepository.getReporteeId(conversationId, reporterId)
    return reporteeId
  }
}
