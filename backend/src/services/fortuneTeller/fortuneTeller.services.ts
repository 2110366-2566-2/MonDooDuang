import { FortuneTellerDetailSchema } from "../../models/fortuneTeller/fortuneTeller.models"
import { fortuneTellerRepository } from "../../repositories/fortuneTeller.repository"

export const fortuneTellerService = {
  updateFortuneTellerDetail: async (fortuneTeller: FortuneTellerDetailSchema) => {
    const isSuccess = await fortuneTellerRepository.updateFortuneTellerDetail(fortuneTeller)
    return { success: isSuccess, message: (isSuccess) ? "success" : "error to update fortune teller detail" }
  },

  getFortuneTellerDetail: async (fortuneTellerId: string) => {
    const data = await fortuneTellerRepository.getFortuneTellerDetail(fortuneTellerId)
    return data
  }

}
