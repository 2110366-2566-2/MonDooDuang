import { reviewRepository } from "../../repositories/review.repository"
import { CreateReviewSchema } from "../../models/review/review.model"

export const reviewService = {
  createReview: async (review: CreateReviewSchema) => {
    const isSuccess = await reviewRepository.createReview(review)
    return { success: isSuccess, message: (isSuccess) ? "success" : "error to create review" }
  }
}
