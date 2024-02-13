import { FortuneTellerDetailSchema } from "../../models/fortuneTeller/fortuneTeller.models"
import { fortuneTellerRepository } from "../../repositories/fortuneTeller.repository"


export const fortuneTellerService = {
    updateFortuneTellerDetail: async (fortuneTeller : FortuneTellerDetailSchema) =>{
      const isSuccess = await fortuneTellerRepository.updateFortuneTellerDetail(fortuneTeller)
      return { success: isSuccess, message: (isSuccess) ? "success" : "error to update fortune teller detail" } 
    },

    getFortuneTellerDetail: async (fortuneTellerId: string) => {
        const isSuccess = await fortuneTellerRepository.getFortuneTellerDetail(fortuneTellerId)
      return { success: isSuccess, message: (isSuccess) ? "success" : "error to get fortune teller detail" } 
    }

    
}