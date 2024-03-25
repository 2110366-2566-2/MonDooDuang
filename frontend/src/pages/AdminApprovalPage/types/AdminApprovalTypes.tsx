export type FortuneTellerRequestType = {
  requestId: string
  fullName: string
  stageName: string
  phoneNumber: string
  identityCardNumber: string
  profilePic: string
  approvalPic: string
}

export type ConfirmType = "APPROVE" | "REJECT"
export type ConfirmProps = {
  fullName: string
  type: ConfirmType
  isVisible: boolean
  onClose: () => void
  onConfirm: () => void
}
