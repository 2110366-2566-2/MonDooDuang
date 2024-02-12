import { Response, Request } from "express"
import { PackageSchema } from "../../models/package/package.model"
import { packageService } from "../../services/package/package.services"


const createPackage = async (req: Request, res: Response) => {
  const packageFortune: PackageSchema = {
    specialityType: req.body.SpecialityType,
    description: req.body.description,
    duration: req.body.duration,
    price: req.body.price,
    fortunetellerId: req.body.fortunetellerId
   
  }

  const result = await packageService.createPackage(packageFortune)
  const isSuccess = result.success

  if (!isSuccess) { return res.status(400).json(result) }

  res.status(201).json(result)
}

// const getReporteeId = async (req: Request, res: Response) => {
//   const conversationId = req.params.conversationId
//   const reporterId = req.params.userId

//   const reporteeId = await reportService.getReporteeId(conversationId, reporterId)

//   if (reporteeId === null) { return res.status(400).json({ success: false }) }

//   res.status(200).json({ success: true, data: reporteeId })
// }

export const packageController = {
  createPackage,
//   getReporteeId
}