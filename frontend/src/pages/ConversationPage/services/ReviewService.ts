import { environment } from "../../../common/constants/environment"

export const ReviewService = {
  createReview: async(
      reviewMessage: string,
      score: number,
      customerId: string,
      fortuneTellerId: string,
      appointmentId: string
    ) => {
    const res = await fetch(`${environment.backend.url}/review/create-review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        reviewMessage,
        score,
        customerId,
        fortuneTellerId,
        appointmentId
      })
    })
    const data = await res.json()
    return { isSuccess: data.success, message: data.message }
  }
}