import { Response, Request } from "express"
import { ReportSchema } from "../../models/report/report.model"
import { reportService } from "../../services/report/report.services"

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

  const isSuccess = await reportService.createReport(report)
  
  if (!isSuccess) 
    return res.status(400).json({ success: isSuccess })

  res.status(201).json({ success: isSuccess })
}

export const reportController = {
  createReport
}
