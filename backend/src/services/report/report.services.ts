import { ReportSchema } from "../../models/report/report.model"
import { reportRepository } from "../../repositories/report.repository"
import { s3Service } from "../infra/s3.services"

export const reportService = {
  createReport: async (report: ReportSchema) => {
    if (report.description === null || report.description.trim().length === 0) {
      return { success: false, message: "No report description to be submitted" }
    }
    report.description = report.description.trim()

    report.status = "PENDING"

    if (report.reportType === "MONEY_SUSPENSION") {
      return await reportService.createMoneySuspensionReport(report)
    }

    if (report.reportType === "INAPPROPRIATE_BEHAVIOR") {
      report.appointmentId = null

      if (report.reporteeId === null || report.reporteeId.trim().length === 0) { return { success: false, message: "No reportee to be reported" } }
    }

    if (report.reportType === "SYSTEM_ERROR") {
      report.appointmentId = null
      report.reporteeId = null
    }

    const isSuccess = await reportRepository.createReport(report)
    return { success: isSuccess, message: (isSuccess) ? "success" : "error to submit report" }
  },

  createMoneySuspensionReport: async (report: ReportSchema) => {
    if (report.reporteeId === null || report.reporteeId.trim().length === 0) { return { success: false, message: "No appointment to be reported" } }

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
    if(reports === null){return null;}
    const updatedRequests = await Promise.all(reports.map(async (report) => {
      const fortuneTellerId = report.reporteeId?.toString() ?? ""
      const profilePicData = await s3Service.downloadProfilePicture(fortuneTellerId as string)
      if (profilePicData && profilePicData.ContentType !== undefined && profilePicData.ContentType !== null) {
        report.reporteeProfile = "data:image/jpg;base64," + profilePicData.Body?.toString("base64")
      }
      return report
    }))
    return updatedRequests
  }
}
