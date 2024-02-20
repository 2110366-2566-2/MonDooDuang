import { Request, Response } from "express"
import { fortuneTellerService } from "../../services/fortuneTeller/fortuneTeller.services"
import { FortuneTellerRegisterSchema, RequestSchema } from "../../models/fortuneTeller/fortuneTeller.model"

const createFortuneTeller = async (req: Request, res: Response) => {
  const fortuneTeller: FortuneTellerRegisterSchema = {
    fortuneTellerId: req.body.fortuneTellerId,
    identityCardNumber: req.body.identityCardNumber,
    identityCardCopy: req.body.identityCardCopy
  }

  const result = await fortuneTellerService.createFortuneTeller(fortuneTeller)

  if (!result.success) return res.status(400).json(result)
  res.status(201).json({ success: true })
}

const createFortuneTellerRequest = async (req: Request, res: Response) => {
  const request: RequestSchema = {
    fortuneTellerId: req.body.fortuneTellerId,
    status: "PENDING"
  }

  const result = await fortuneTellerService.createFortuneTellerRequest(request)

  if (!result.success) return res.status(400).json(result)
  res.status(201).json(result)
}

const updateFortuneTeller = async (req: Request, res: Response) => {
  const fortuneTeller: FortuneTellerRegisterSchema = {
    fortuneTellerId: req.body.fortuneTellerId,
    identityCardNumber: req.body.identityCardNumber,
    identityCardCopy: req.body.identityCardCopy
  }
  const resultOne = await fortuneTellerService.updateFortuneTeller(fortuneTeller)

  if (!resultOne.success) return res.status(400).json(resultOne)

  const request: RequestSchema = {
    fortuneTellerId: req.body.fortuneTellerId,
    status: "PENDING"
  }

  const resultTwo = await fortuneTellerService.updateFortuneTellerRequest(request)

  if (!resultTwo.success) return res.status(400).json(resultTwo)
  res.status(200).json({ success: true })
}

const getFortuneTellerValid = async (req: Request, res: Response) => {
  const fortuneTellerId: string = req.body.fortuneTellerId

  const result = await fortuneTellerService.getFortuneTellerValid(fortuneTellerId)

  return res.status(200).json({succes : true, data : result})
}

const getFortuneTellerDisplayInfoById = async (req: Request, res: Response) => {
  const fortuneTellerId = req.params.fortuneTellerId
  const fortuneTellerData = await fortuneTellerService.getFortuneTellerDisplayInfoById(fortuneTellerId)

  if (fortuneTellerData === null) { return res.status(400).json({ success: false, message: `Fortune teller with Id ${fortuneTellerId} is not found` }) }

  res.status(200).json({ success: true, data: fortuneTellerData })
}

const getPackageByFortuneTellerId = async (req: Request, res: Response) => {
  const fortuneTellerId = req.params.fortuneTellerId
  const packageData = await fortuneTellerService.getPackageByFortuneTellerId(fortuneTellerId)

  if (packageData === null) { return res.status(400).json({ success: false, message: `Package of fortune teller with Id ${fortuneTellerId} is not found` }) }

  res.status(200).json({ success: true, data: packageData })
}

const getReviewByFortuneTellerId = async (req: Request, res: Response) => {
  const fortuneTellerId = req.params.fortuneTellerId
  const reviewData = await fortuneTellerService.getReviewByFortuneTellerId(fortuneTellerId)

  if (reviewData === null) { return res.status(400).json({ success: false, message: `Review of fortune teller with Id ${fortuneTellerId} is not found` }) }

  res.status(200).json({ success: true, data: reviewData })
}

const getRecommendPackage = async (req: Request, res: Response) => {
  const data = await fortuneTellerService.getRecommendPackage()

  res.status(200).json({ success: true, data })
}

export const fortuneTellerController = {
  createFortuneTeller,
  createFortuneTellerRequest,
  updateFortuneTeller,
  getFortuneTellerValid,
  getFortuneTellerDisplayInfoById,
  getPackageByFortuneTellerId,
  getReviewByFortuneTellerId,
  getRecommendPackage
}
