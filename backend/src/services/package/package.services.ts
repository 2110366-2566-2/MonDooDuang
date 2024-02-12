import { PackageSchema } from "../../models/package/package.model"
import { reportRepository  } from "../../repositories/package.repository"


export const packageService = {
  createPackage: async (packageFortune: PackageSchema) => {
    const isSuccess = await reportRepository.createPackage(packageFortune)
    return { success: isSuccess, message: (isSuccess) ? "success" : "error to create package" } 
    
  }
}