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

  res.status(201).json(result)
}

const getFortuneTellerDetail = async (req: Request, res: Response) => {
  const fortuneTellerId = req.body.fortuneTellerId
  const result = await fortuneTellerService.getFortuneTellerDetail(fortuneTellerId)
  const isSuccess = result.success

  if (!isSuccess) { return res.status(400).json(result) }

  res.status(201).json(result)
}


export const fortuneTelllerController = {
  updateFortuneTellerDetail,
  getFortuneTellerDetail
}