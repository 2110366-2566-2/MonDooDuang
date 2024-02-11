import { db } from "../configs/pgdbConnection"
import { ShowedReviewSchema } from "../models/fortuneTellerDetail/showedReview.model";

export const reviewRepository = {
    getReviewByFortuneTellerId: async (fortuneTellerId: string): Promise< null | ShowedReviewSchema[] > =>{
        const result = await db.query(
            `SELECT reviewMessage, score, review.created_at, fname, lname  FROM REVIEW
            JOIN USER_TABLE
            ON REVIEW.customerId = USER_TABLE.userID
            WHERE FortuneTellerId = $1
            ORDER BY review.created_at DESC;`,
            [fortuneTellerId]
        )

        if (result.rows.length === 0) return null

        const reviews: ShowedReviewSchema[] = result.rows.map(row => ({

            reviewMessage : row.reviewmessage,
            score : row.score,
            created_at : row.created_at,
            fName : row.fname,
            lName : row.lname

        }));

        return reviews;
    }
}