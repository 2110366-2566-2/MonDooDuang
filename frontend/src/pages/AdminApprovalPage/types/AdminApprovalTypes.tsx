type FortuneTellerRequest = {
  id: string
  username: string
  stagename: string
  phoneNumber: string
  ssn: string
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
