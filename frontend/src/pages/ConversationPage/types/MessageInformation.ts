export type senderType = "SELF" | "OTHER" | "SYSTEM"

export interface MessageInformation {
  message: string
  sender: senderType
  isRead: boolean
  timeSent: number
}
