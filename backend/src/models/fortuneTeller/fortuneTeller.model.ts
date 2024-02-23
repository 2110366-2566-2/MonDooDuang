export interface FortuneTellerSchema {
  isVerified: boolean
  description: string
  identityCardNumber: string
  stageName: string
  identityCardCopy: string
  totalScore: number
  totalReview: number
}

export type status = "PENDING" | "ACCEPTED" | "REJECTED"

export interface FortuneTellerRegisterSchema {
  fortuneTellerId: string
  identityCardNumber: string
  identityCardCopy: string
}

export interface RequestSchema {
  fortuneTellerId: string
  status: status
}

export interface FortuneTellerAccountDetailSchema {
  fortuneTellerId: string
  stageName: string
  description: string
}
