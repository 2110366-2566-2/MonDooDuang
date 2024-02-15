import { Request, Response } from "express"
import { fortuneTellerService } from "../../services/fortuneTeller/fortuneTeller.services"
import { FortuneTellerRegisterSchema, RequestSchema } from "../../models/fortuneTeller/fortuneTeller.model"

const createFortuneTellerRegister = async (req: Request, res:Response)=>{
  const fortuneTeller: FortuneTellerRegisterSchema = {
  fortunetellerid: req.body.fortunetellerid,
  identitycardnumber: req.body.identitycardnumber,
  identitycardcopy: req.body.identitycardcopy,
  }
  
  const result = await fortuneTellerService.createFortuneTellerRegister(fortuneTeller)

  if(!result.success) return res.status(400).json(result)
      res.status(201).json({success:true})
  
}

const createFortuneTellerRequest= async (req: Request, res:Response)=>{
  const request: RequestSchema ={
      fortune_teller_id:  req.body.fortunetellerid,
      status: "PENDING"
  }

  const result = await fortuneTellerService.createRequest(request)

  if(!result.success) return res.status(400).json(result)
  res.status(201).json(result)
}


const updateFortuneTellerRegister = async (req: Request, res: Response) => {
  const fortuneTeller: FortuneTellerRegisterSchema = {
    fortunetellerid: req.body.fortunetellerid,
    identitycardnumber: req.body.identitycardnumber,
    identitycardcopy: req.body.identitycardcopy
  }
  const result_1 = await fortuneTellerService.updateFortuneTellerRegister(fortuneTeller)

  if(!result_1.success) return res.status(400).json(result_1)

  const request: RequestSchema ={
    fortune_teller_id:  req.body.fortunetellerid,
    status: "PENDING"
  }

  const result_2 = await fortuneTellerService.updateFortuneTellerRequest(request)

  if(!result_2.success) return res.status(400).json(result_2)
  res.status(200).json({success: true})
}

const getFortuneTellerValid = async (req: Request, res: Response) =>{
  const fortunetellerid:string = req.body.fortunetellerid

  const result = await fortuneTellerService.getFortuneTellerValid(fortunetellerid);

  return res.status(200).json(result);
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
  createFortuneTellerRegister,
  createFortuneTellerRequest,
  updateFortuneTellerRegister,
  getFortuneTellerValid,
  getFortuneTellerDisplayInfoById,
  getPackageByFortuneTellerId,
  getReviewByFortuneTellerId,
  getRecommendPackage
}
