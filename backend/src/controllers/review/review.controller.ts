import { Response, Request } from "express"
import { reviewService } from "../../services/review/review.services"
import { CreateReviewSchema } from "../../models/review/review.model"

const createReview = async (req: Request, res: Response) => {
    const report: CreateReviewSchema = {
      reviewMessage: req.body.reviewMessage,
      score: req.body.score,
      customerId: req.body.customerId,
      fortuneTellerId: req.body.fortuneTellerId,
      appointmentId: req.body.appointmentId,
    }

    const result = await reviewService.createReview(report)
    const isSuccess = result.success

    if (!isSuccess) { return res.status(400).json(result) }

    res.status(201).json(result)
}

export const reviewController = {
    createReview
}
