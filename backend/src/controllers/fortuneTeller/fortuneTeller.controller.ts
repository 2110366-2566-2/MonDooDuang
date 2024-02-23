import { Request, Response } from "express"
import { fortuneTellerService } from "../../services/fortuneTeller/fortuneTeller.services"
import { FortuneTellerRegisterSchema, RequestSchema, FortuneTellerAccountDetailSchema } from "../../models/fortuneTeller/fortuneTeller.model"
import { PackageSchema, PackageWithIdSchema } from "../../models/package/package.model"

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

  return res.status(200).json({ success: true, data: result })
}

const getFortuneTellerDetail = async (req: Request, res: Response) => {
  const fortuneTellerId: string = req.params.fortuneTellerId
  const fortuneTellerDetail = await fortuneTellerService.getFortuneTellerDetail(fortuneTellerId)
  if (!fortuneTellerDetail) { return res.status(400).json({ success: false, message: `Fortune teller with Id ${fortuneTellerId} is not found` }) }
  res.status(200).json({ success: true, data: fortuneTellerDetail })
}

const updateFortuneTellerDetail = async (req: Request, res: Response) => {
  const fortuneTeller: FortuneTellerAccountDetailSchema = {
    fortuneTellerId: req.params.fortuneTellerId,
    description: req.body.description,
    stageName: req.body.stageName
  }
  const updateDetail = await fortuneTellerService.updateFortuneTellerDetail(fortuneTeller)
  if (!updateDetail) return res.status(400).json(updateDetail)
  return res.status(200).json({success : true})
}

const getStageNameValid = async (req: Request, res: Response) => {
  const fortuneTellerId = req.body.fortuneTellerId
  const stageName = req.body.stageName
  const stageNameValid = await fortuneTellerService.getStageNameValid(fortuneTellerId, stageName)
  return res.status(200).json({ success: true, data: stageNameValid })
}

const getFortuneTellerDisplayInfoById = async (req: Request, res: Response) => {
  const fortuneTellerId = req.params.fortuneTellerId
  const fortuneTellerData = await fortuneTellerService.getFortuneTellerDisplayInfoById(fortuneTellerId)

  if (fortuneTellerData === null) { return res.status(400).json({ success: false, message: `Fortune teller with Id ${fortuneTellerId} is not found` }) }

  res.status(200).json({ success: true, data: fortuneTellerData })
}

const createPackage = async (req: Request, res: Response) => {
  const packageFortuneTeller: PackageSchema = {
    speciality: req.body.speciality,
    description: req.body.description,
    duration: req.body.duration,
    price: req.body.price,
    fortuneTellerId: req.body.fortuneTellerId
   
  }

  const result = await fortuneTellerService.createPackage(packageFortuneTeller)
  const isSuccess = result.success

  if (!isSuccess) { return res.status(400).json(result) }

  res.status(201).json(result)
}

const getPackageByFortuneTellerId = async (req: Request, res: Response) => {
  const fortuneTellerId = req.params.fortuneTellerId
  const packageData = await fortuneTellerService.getPackageByFortuneTellerId(fortuneTellerId)

  if (packageData === null) { return res.status(400).json({ success: false, message: `Package of fortune teller with Id ${fortuneTellerId} is not found` }) }

  res.status(200).json({ success: true, data: packageData })
}

const getPackageIncludeIdByFortuneTellerId = async (req: Request, res: Response) => {
  const fortuneTellerId = req.params.fortuneTellerId
  const packageData = await fortuneTellerService.getPackageIncludeIdByFortuneTellerId(fortuneTellerId)

  if (packageData === null) { return res.status(400).json({ success: false, message: `Package and Package id of fortune teller with Id ${fortuneTellerId} is not found` }) }

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

const getPackageData = async (req: Request, res: Response) => {
  const packageId = req.params.packageId
  const packageData = await fortuneTellerService.getPackageData(packageId)

  res.status(200).json({ success: true, data : packageData })
}

const updatePackage = async (req: Request, res: Response) => {
  const packageData: PackageWithIdSchema = {
    packageId: req.params.packageId,
    speciality: req.body.speciality,
    description: req.body.description,
    duration: req.body.duration,
    price: req.body.price,
  }
  const result = await fortuneTellerService.updatePackage(packageData)
  const isSuccess = result.success 
  if (!isSuccess) return res.status(400).json(result)
  return res.status(200).json({success : true})
  
}

const deletePackage = async (req: Request, res: Response) => {
  const packageId = req.params.packageId

  const result = await fortuneTellerService.deletePackage(packageId)
  const isSuccess = result.success


  if (!isSuccess) { return res.status(400).json(result) }

  res.status(201).json(result)
}

export const fortuneTellerController = {
  createFortuneTeller,
  createFortuneTellerRequest,
  updateFortuneTeller,
  getFortuneTellerValid,
  getFortuneTellerDetail,
  updateFortuneTellerDetail,
  getStageNameValid,
  getFortuneTellerDisplayInfoById,
  createPackage,
  getPackageByFortuneTellerId,
  getPackageIncludeIdByFortuneTellerId,
  getReviewByFortuneTellerId,
  getRecommendPackage,
  getPackageData,
  updatePackage,
  deletePackage
}
