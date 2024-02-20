import { fortuneTellerRepository } from "../../repositories/fortuneTeller.repository"
import { FortuneTellerDetailSchema } from "../../models/fortuneTeller/fortuneTeller.models"

export const fortuneTellerService = {
  getFortuneTellerDetail: async (fortuneTellerId: string) => {
    const fortuneTellerDetail = await fortuneTellerRepository.getFortuneTellerDetail(fortuneTellerId)
    if ( fortuneTellerDetail === null ) return null
    return {
      stageName: fortuneTellerDetail.stageName,
      description : fortuneTellerDetail.description
    }
  },

  updateFortuneTellerDetail: async (fortuneTeller : FortuneTellerDetailSchema) => {
    const isSuccess = await fortuneTellerRepository.updateFortuneTellerDetail(fortuneTeller)
    return { success: isSuccess, message: (isSuccess) ? "success" : "error to update fortune teller detail" }
  }

}
