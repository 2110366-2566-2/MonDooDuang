import { Response, Request } from "express"
import { PackageSchema } from "../../models/package/package.model"
import { packageService } from "../../services/package/package.services"


const createPackage = async (req: Request, res: Response) => {
  const packageFortuneTeller: PackageSchema = {
    speciality: req.body.speciality,
    description: req.body.description,
    duration: req.body.duration,
    price: req.body.price,
    fortuneTellerId: req.body.fortuneTellerId
   
  }

  const result = await packageService.createPackage(packageFortuneTeller)
  const isSuccess = result.success

  if (!isSuccess) { return res.status(400).json(result) }

  res.status(201).json(result)
}

export const packageController = {
  createPackage
}