import { Response, Request } from "express"
import { ReportSchema, ReportStatus } from "../../models/report/report.model"
import { reportService } from "../../services/report/report.services"
import { AppointmentStatus } from "../../models/appointment/appointment.model"

const createReport = async (req: Request, res: Response) => {
  // Map request to schema
  const report: ReportSchema = {
    description: req.body.description,
    reportType: req.body.reportType,
    status: req.body.status,
    appointmentId: req.body.appointmentId,
    reporterId: req.body.reporterId,
    reporteeId: req.body.reporteeId
  }

  const result = await reportService.createReport(report)
  const isSuccess = result.success

  if (!isSuccess) { return res.status(400).json(result) }

  res.status(201).json(result)
}

const getReporteeId = async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId
  const reporterId = req.params.userId

  const reporteeId = await reportService.getReporteeId(conversationId, reporterId)

  if (reporteeId === null) { return res.status(400).json({ success: false }) }

  res.status(200).json({ success: true, data: reporteeId })
}

const getAllReport = async (req: Request, res: Response) => {
  const reports = await reportService.getAllReport()

  if (reports === null) { return res.status(400).json({ success: false }) }

  res.status(200).json({ success: true, data: reports })
}

const updateReport = async (req: Request, res: Response) => {
  const { reportId, status }: { reportId: string, status: ReportStatus } = req.body
  const result = await reportService.updateReportStatus(reportId, status)
  if (result.success) return res.status(200).json(result)
  res.status(400).json(result)
}

const updateReportAndAppointment = async (req: Request, res: Response) => {
  const { reportId, reportStatus, appointmentId, appointmentStatus }: { reportId: string, reportStatus: ReportStatus, appointmentId: string, appointmentStatus: AppointmentStatus } = req.body
  const result = await reportService.updateReportAndAppointmentStatus(reportId, reportStatus, appointmentId, appointmentStatus)
  if (result.success) return res.status(200).json(result)
  res.status(400).json(result)
}

const updateReportAndBan = async (req: Request, res: Response) => {
  const { reportId, reportStatus, userId }: { reportId: string, reportStatus: ReportStatus, userId: string } = req.body
  const result = await reportService.updateReportAndBan(reportId, reportStatus, userId)
  if (result.success) return res.status(200).json(result)
  res.status(400).json(result)
}

export const reportController = {
  createReport,
  getReporteeId,
  getAllReport,
  updateReport,
  updateReportAndAppointment,
  updateReportAndBan
}
