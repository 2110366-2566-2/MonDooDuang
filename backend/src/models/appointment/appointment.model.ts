type AppointmentStatus = "CREATED" | "WAITING_FOR_PAYMENT" |
"WAITING_FOR_EVENT" | "EVENT_COMPLETED" | "PAYMENT_COMPLETED"
| "CANCELED" | "SUSPENED" | "REFUNDED"

export interface AppointmentSchema {
  status: AppointmentStatus
  packageId: string
  customerId: string
  fortuneTellerId: string
  appointmentDate: string
}
