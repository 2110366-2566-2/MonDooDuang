import { Request, Response } from "express"
import { fortuneTellerService } from "../../services/fortuneTeller/fortuneTeller.services"

const getFortuneTellerbyId = async (req: Request, res: Response) => {
  const fortuneTellerId = req.params.fortuneTellerId
  const fortuneTellerData = await fortuneTellerService.getFortuneTellerById(fortuneTellerId)

  if (fortuneTellerData === null) { return res.status(400).json({ success: false }) }

  res.status(200).json({ success: true, data: fortuneTellerData })
}

const getPackageByFortuneTellerId = async (req: Request, res: Response) => {
  const fortuneTellerId = req.params.fortuneTellerId
  const packageData = await fortuneTellerService.getPackageByFortuneTellerId(fortuneTellerId)

  if (packageData === null) { return res.status(400).json({ success: false }) }

  res.status(200).json({ success: true, data: packageData })
}

const getReviewByFortuneTellerId = async (req: Request, res: Response) => {
  const fortuneTellerId = req.params.fortuneTellerId
  const reviewData = await fortuneTellerService.getReviewByFortuneTellerId(fortuneTellerId)

  if (reviewData === null) { return res.status(400).json({ success: false }) }

  res.status(200).json({ success: true, data: reviewData })
}

const getRecommendPackage = async (req: Request, res: Response) => {
  const data = await fortuneTellerService.getRecommendPackage()

  res.status(200).json({ success: true, data })
}

export const fortuneTellerController = {
  getFortuneTellerbyId,
  getPackageByFortuneTellerId,
  getReviewByFortuneTellerId,
  getRecommendPackage
}
