export type RequestStatus = "PENDING" | "ACCEPTED" | "REJECTED"
export interface RequestSchema {
  requestId: string
  fortuneTellerId: string
  stageName: string
  identityCardNumber: string
  fullName: string
  phoneNumber: string
  approvalPic: string | null
  profilePic: string | null
}
