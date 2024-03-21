export type RequestStatus = "PENDING" | "ACCEPTED" | "REJECTED"
export interface RequestSchema {
    requestId: string,
    fortuneTellerId: string,
    stagename: string,
    identityCardNumber: string,
    fullName: string,
    phoneNumber: string,
    approvalPic: string,
    profilePic: string | null
}