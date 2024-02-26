import { db } from "../configs/pgdbConnection"
import { ShowedReviewSchema } from "../models/fortuneTellerDetail/showedReview.model"
import { CreateReviewSchema } from "../models/review/review.model"

export const reviewRepository = {
  createReview: async (review: CreateReviewSchema) => {
    try {
      await db.query(
        `
            INSERT INTO REVIEW (review_message, score, customer_id, fortune_teller_id, appointment_id)
            VALUES($1, $2, $3, $4, $5);
        `,
        [review.reviewMessage, review.score, review.customerId, review.fortuneTellerId, review.appointmentId,]
      )
      return true
    } catch (err) {
      return false
    }
  }, 

  getReviewByFortuneTellerId: async (fortuneTellerId: string): Promise< null | ShowedReviewSchema[] > => {
    const result = await db.query(
      `SELECT review_message, score, review.created_at, fname, lname  FROM REVIEW
            JOIN USER_TABLE
            ON REVIEW.customer_id = USER_TABLE.user_id
            WHERE fortune_teller_id = $1
            ORDER BY review.created_at DESC;`,
      [fortuneTellerId]
    )

    if (result.rows.length === 0) return null

    const reviews: ShowedReviewSchema[] = result.rows.map(row => ({

      reviewMessage: row.review_message,
      score: row.score,
      created_at: row.created_at,
      fName: row.fname,
      lName: row.lname

    }))

    return reviews
  }
}
