export type AppointmentStatus =
  | "CREATED"
  | "WAITING_FOR_PAYMENT"
  | "WAITING_FOR_EVENT"
  | "EVENT_COMPLETED"
  | "PAYMENT_COMPLETED"
  | "SUSPENDED"
  | "REFUNDED"
  | "NO_PAYMENT_CANCELED"
  | "FORTUNE_TELLER_CANCELED"
  | "CUSTOMER_CANCELED"
  | "NO_FRAUD_DETECTED"
  | "FORTUNE_TELLER_DECLINED"

export interface AppointmentSchema {
  status: AppointmentStatus
  packageId: string
  customerId: string
  fortuneTellerId: string
  appointmentDate: string
}
