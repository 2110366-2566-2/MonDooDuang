import { db } from "../configs/pgdbConnection"
import { ReviewSchema } from "../models/review/review.model";

export const packageRepository = {
    getPackageByFortuneTellerId: async (fortuneTellerId: string): Promise< null | ReviewSchema[] > =>{
        const result = await db.query(
            `SELECT * FROM PACKAGE 
            WHERE FortuneTellerId = $1
            ORDER BY speciality, price DESC;`,
            [fortuneTellerId]
        )

        if (result.rows.length === 0) return null

        const reviews: ReviewSchema[] = result.rows.map(row => ({

            reviewMessage : row.reviewMessage,
            score : row.score,
            customerId : row.customerId,
            fortuneTellerId : row.fortuneTellerId,
            appointmentId : row.appointmentId,
            created_at : row.created_at,
            updated_at : row.updated_at

        }));

        return reviews;
    }
}