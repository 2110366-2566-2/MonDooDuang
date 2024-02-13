import { Response, Request } from "express"
import { FortuneTellerDetailSchema } from "../../models/fortuneTeller/fortuneTeller.models"
import { fortuneTellerService } from "../../services/fortuneTeller/fortuneTeller.services"

const updateFortuneTellerDetail = async (req: Request, res: Response) => {
  const fortuneTellerDetail: FortuneTellerDetailSchema = {
    fortuneTellerId: req.body.fortuneTellerId,
    stageName: req.body.stageName,
    description: req.body.description
  }
  const result = await fortuneTellerService.updateFortuneTellerDetail(fortuneTellerDetail)
  const isSuccess = result.success

  if (!isSuccess) { return res.status(400).json(result) }

  res.status(200).json(result)
}

const getFortuneTellerDetail = async (req: Request, res: Response) => {
  const fortuneTellerId: string = req.params.fortuneTellerId
  const result = await fortuneTellerService.getFortuneTellerDetail(fortuneTellerId)
  if (!result) { return res.status(400).json({ message: "record not found", data: result }) }
  return res.status(200).json({ data: result })
}

export const fortuneTelllerController = {
  updateFortuneTellerDetail,
  getFortuneTellerDetail
}
