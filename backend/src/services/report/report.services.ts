import { ReportSchema } from "../../models/report/report.model"
import { reportRepository } from "../../repositories/report.repository"

export const reportService = {
  createReport: async (report: ReportSchema) => {
    report.status = "PENDING"

    const isSuccess = await reportRepository.createReport(report)
    return isSuccess
  },

  getReporteeId: async (conversationId: string, reporterId: string) => {
    const reporteeId = await reportRepository.getReporteeId(conversationId, reporterId)
    return reporteeId
  }
}
