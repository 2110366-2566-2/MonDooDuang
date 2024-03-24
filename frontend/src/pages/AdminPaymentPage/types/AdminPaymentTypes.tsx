export type AdminPaymentType = {
  appointmentId: string
  price: number
  customerName: string
  fortuneTellerName: string
  profilePicture: string
  bankName: string
  accountNumber: string
  phoneNumber: string
}

export type PaymentConfirmProps = {
  fullName: string
  bankName: string
  accountNumber: string
  amount: string
  phoneNumber: string
  isVisible: boolean
  onClose: () => void
  onConfirm: () => void
}

export type PaymentQRProps = {
  phoneNumber: string
  amount: number
}