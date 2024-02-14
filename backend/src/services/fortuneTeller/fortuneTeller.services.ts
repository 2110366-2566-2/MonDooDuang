import { fortuneTellerRepository } from "../../repositories/fortuneTeller.repository"
import { packageRepository } from "../../repositories/package.repository"
import { reviewRepository } from "../../repositories/review.repository"

export const fortuneTellerService = {
  getFortuneTellerDisplayInfoById: async (fortuneTellerId: string) => {
    const fortuneTeller = await fortuneTellerRepository.getFortuneTellerDisplayInfoById(fortuneTellerId)

    if (fortuneTeller === null) return null

    return {
      stageName: fortuneTeller.stageName,
      averageStar: fortuneTeller.totalReview === 0 ? 0 : (fortuneTeller.totalScore / fortuneTeller.totalReview),
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
