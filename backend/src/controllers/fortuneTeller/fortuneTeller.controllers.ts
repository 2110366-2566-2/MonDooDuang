import { Response, Request } from "express"
import { fortuneTellerService } from "../../services/fortuneTeller/fortuneTeller.services"

const getFortuneTellerDetail = async (req: Request, res: Response) => {
  const fortuneTellerId: string = req.params.fortuneTellerId
  const fortuneTellerDetail = await fortuneTellerService.getFortuneTellerDetail(fortuneTellerId)
  if (!fortuneTellerDetail) { return res.status(400).json({ success: false, message: `Fortune teller with Id ${fortuneTellerId} is not found` }) }
  res.status(200).json({ success: true, data: fortuneTellerDetail })
}

export const fortuneTelllerController = {
  getFortuneTellerDetail
}
