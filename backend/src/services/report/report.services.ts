import { ReportSchema } from "../../models/report/report.model"
import { reportRepository } from "../../repositories/report.repository"

export const reportService = {
  createReport: async (report: ReportSchema) => {
    report.status = "PENDING"

    if (report.reportType === "MONEY_SUSPENSION") {
      return await reportService.createMoneySuspensionReport(report)
    }

    const isSuccess = await reportRepository.createReport(report)
    return { success: isSuccess, message: (isSuccess) ? "success" : "error to submit report" }
  },

  createMoneySuspensionReport: async (report: ReportSchema) => {
    // get appointment ids
    const appointmentIds: string[] = await reportRepository.getAppointmentIds(report.reporterId, report.reporteeId)

    if (appointmentIds.length === 0) {
      return { success: false, message: "No appointment to be reported" }
    }

    // create report
    const isSuccess = await reportRepository.createMoneySuspensionReport(report, appointmentIds)

    if (!isSuccess) {
      return { success: false, message: "error to submit report" }
    }

    // update appointment status
    await reportRepository.updateAppointmentStatus(appointmentIds)
    return { success: true, message: "success" }
  },

  getReporteeId: async (conversationId: string, reporterId: string) => {
    const reporteeId = await reportRepository.getReporteeId(conversationId, reporterId)
    return reporteeId
  },

  getAllReport: async () => {
    const reports = await reportRepository.getAllReport()
    return reports
  }
}
