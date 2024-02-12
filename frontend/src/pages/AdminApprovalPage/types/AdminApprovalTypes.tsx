type FortuneTellerRequest = {
  requestId: string
  fullName: string
  stagename: string
  phoneNumber: string
  identityCardNumber: string
  profilePic: string
  approvalPic: string
}

type ConfirmType = "APPROVE" | "REJECT"
type ConfirmProps = {
  fortuneTeller: string
  type: ConfirmType
  isVisible: boolean
  onClose: () => void
  onConfirm: () => void
}
