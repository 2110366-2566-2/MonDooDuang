import { fortuneTellerRepository } from "../../repositories/fortuneTeller.repository"

export const fortuneTellerService = {
  getFortuneTellerDetail: async (fortuneTellerId: string) => {
    const fortuneTellerDetail = await fortuneTellerRepository.getFortuneTellerDetail(fortuneTellerId)
    if ( fortuneTellerDetail === null ) return null
    return {
      stageName: fortuneTellerDetail.stageName,
      description : fortuneTellerDetail.description
    }
  }

}
