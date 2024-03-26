import { reviewRepository } from "../../repositories/review.repository"
import { fortuneTellerRepository } from "../../repositories/fortuneTeller.repository"
import { CreateReviewSchema } from "../../models/review/review.model"

export const reviewService = {
  createReview: async (review: CreateReviewSchema) => {
    const response = await reviewRepository.createReview(review)
    if (!response) return { success: false, message: "error to create review" }

    const updateReviewScore = await fortuneTellerRepository.updateReviewScore(review.fortuneTellerId, review.score)
    if (!updateReviewScore) {
      return { success: false, message: "error to update score" }
    }

    return { success: true, message: "success to create review and score" }
  }
}
