export interface ReviewSchema {
  reviewMessage: string
  score: number
  customerId: string
  fortuneTellerId: string
  appointmentId: string
  created_at: number
  updated_at: number
}

export interface CreateReviewSchema {
  reviewMessage: string,
  score: number,
  customerId: string,
  fortuneTellerId: string,
  appointmentId: string,
}
