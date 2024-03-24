export type AdminPaymentType = {
  appointmentId: string
  price: number
  customerName: string
  fortuneTellerName: string
  profilePicture: string
  bankName: string
  accountNumber: string
}

export type PaymentConfirmProps = {
  fullName: string
  bankName: string
  accountNumber: string
  isVisible: boolean
  onClose: () => void
  onConfirm: () => void
}