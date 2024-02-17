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
  fortunetellerid: string
  identitycardnumber: string
  identitycardcopy: string
}

export interface RequestSchema {
  fortune_teller_id: string
  status: status
}
