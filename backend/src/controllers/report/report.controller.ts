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

const getReporteeId = async (req: Request, res:Response) =>{
  const conversationId = req.params.conversationId
  const reporterId = req.params.userId
  
  const reporteeId = await reportService.getReporteeId(conversationId, reporterId)

  if (!reporteeId)  
    return res.status(400).json({success: false})
  
  res.status(200).json({success:true, data: reporteeId})
}

export const reportController = {
  createReport,
  getReporteeId
}
