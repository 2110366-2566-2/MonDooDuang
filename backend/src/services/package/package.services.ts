import { PackageSchema } from "../../models/package/package.model"
import { packageRepository } from "../../repositories/package.repository"


export const packageService = {
  createPackage: async (packageFortuneTeller: PackageSchema) => {
    const isSuccess = await packageRepository.createPackage(packageFortuneTeller)
    return { success: isSuccess, message: (isSuccess) ? "success" : "error to create package" } 
    
  }
}