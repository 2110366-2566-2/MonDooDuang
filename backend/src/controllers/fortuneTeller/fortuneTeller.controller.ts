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
  
  export const fortuneTellerController = {
    getFortuneTellerbyId,
    getPackageByFortuneTellerId
  }
  