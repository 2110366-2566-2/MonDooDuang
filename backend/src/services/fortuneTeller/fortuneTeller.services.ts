import { fortuneTellerRepository } from "../../repositories/fortuneTeller.repository"
import { packageRepository } from "../../repositories/package.repository"
import { reviewRepository } from "../../repositories/review.repository"
import { FortuneTellerRegisterSchema, RequestSchema } from "../../models/fortuneTeller/fortuneTeller.model"

export const fortuneTellerService = {

  createFortuneTeller: async (fortuneTeller: FortuneTellerRegisterSchema) => {
    const isSuccess = await fortuneTellerRepository.createFortuneTeller(fortuneTeller)

    return { success: isSuccess, message: (isSuccess) ? "success" : "error to create register" }
  },

  updateFortuneTeller: async (fortuneTeller: FortuneTellerRegisterSchema) => {
    const isSuccess = await fortuneTellerRepository.updateFortuneTeller(fortuneTeller)
    return { success: isSuccess, message: (isSuccess) ? "success" : "error to update fortune teller register" }
  },

  createFortuneTellerRequest: async (request: RequestSchema) => {
    const isSuccess = await fortuneTellerRepository.createFortuneTellerRequest(request)

    return { success: isSuccess, message: (isSuccess) ? "success" : "error to create request" }
  },

  updateFortuneTellerRequest: async (request: RequestSchema) => {
    const isSuccess = await fortuneTellerRepository.updateFortuneTellerRequest(request)
    return { success: isSuccess, message: (isSuccess) ? "success" : "error to update fortune teller request" }
  },

  getFortuneTellerValid: async (fortuneTellerId: string) => {
    const data = await fortuneTellerRepository.getFortuneTellerValid(fortuneTellerId)
    return data
  },

  getFortuneTellerDisplayInfoById: async (fortuneTellerId: string) => {
    const fortuneTeller = await fortuneTellerRepository.getFortuneTellerDisplayInfoById(fortuneTellerId)

    if (fortuneTeller === null) return null

    return {
      stageName: fortuneTeller.stageName,
      averageStar: fortuneTeller.totalReview === 0 ? 0 : (fortuneTeller.totalScore / fortuneTeller.totalReview).toFixed(1),
      description: fortuneTeller.description,
      profilePicture: fortuneTeller.profilePicture
    }
  },

  getPackageByFortuneTellerId: async (fortuneTellerId: string) => {
    const result = await packageRepository.getPackageByFortuneTellerId(fortuneTellerId)

    if (result === null) return null

    return result
  },

  getReviewByFortuneTellerId: async (fortuneTellerId: string) => {
    const review = await reviewRepository.getReviewByFortuneTellerId(fortuneTellerId)

    if (review === null) return null

    return review
  },

  getRecommendPackage: async () => {
    const recommendData = await packageRepository.getRecommendPackage()
    return recommendData
  }
}
