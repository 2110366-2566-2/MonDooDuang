import { Response, Request } from "express"
import { fortuneTellerService } from "../../services/fortuneTeller/fortuneTeller.services"
import { FortuneTellerDetailSchema } from "../../models/fortuneTeller/fortuneTeller.models"

const getFortuneTellerDetail = async (req: Request, res: Response) => {
  const fortuneTellerId: string = req.params.fortuneTellerId
  const fortuneTellerDetail = await fortuneTellerService.getFortuneTellerDetail(fortuneTellerId)
  if (!fortuneTellerDetail) { return res.status(400).json({ success: false, message: `Fortune teller with Id ${fortuneTellerId} is not found` }) }
  res.status(200).json({ success: true, data: fortuneTellerDetail })
}


const updateFortuneTellerDetail = async (req: Request, res: Response) => {
  const fortuneTeller: FortuneTellerDetailSchema = {
    fortuneTellerId: req.params.fortuneTellerId,
    description: req.body.description,
    stageName: req.body.stageName,
  }
  const updateDetail = await fortuneTellerService.updateFortuneTellerDetail(fortuneTeller)
  if (!updateDetail) return res.status(400).json(updateDetail)
  return res.status(200).json({success : true})
}

export const fortuneTelllerController = {
  getFortuneTellerDetail,
  updateFortuneTellerDetail
}
