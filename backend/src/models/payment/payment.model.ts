export type PaymentMethodEnum = "BANK" | "CREDIT_CARD" | "PROMPT_PAY"
export type PaymentStatusEnum = "FROM_CUSTOMER" | "TO_FORTUNE_TELLER" | "REFUND"

export interface PaymentSchema {
  packageId: string
  method: PaymentMethodEnum
  status: PaymentStatusEnum
  amount: number
  appointmentId: string
  createdAt: Date
  updatedAt: Date
}

export type CreatePaymentSchema = Omit<PaymentSchema, "packageId" | "createdAt" | "updatedAt">
