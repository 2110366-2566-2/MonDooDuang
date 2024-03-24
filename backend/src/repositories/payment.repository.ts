import { db } from "../configs/pgdbConnection"
import { CreatePaymentSchema } from "../models/payment/payment.model"

export const paymentRepository = {
  createPayment: async (payment: CreatePaymentSchema) => {
    try {
      await db.query(
        `
        INSERT INTO PAYMENT (method, status, amount, appointment_id)
        VALUES ($1,$2,$3,$4)
        `,
        [payment.method, payment.status, payment.amount, payment.appointmentId]
      )
      return true
    } catch (err) {
      return false
    }
  }
}
