import Stripe from "stripe"
import { environment } from "../../configs/environment"
import { stripe } from "../../configs/stripe"
import { appointmentRepository } from "../../repositories/appointment.repository"
import { paymentRepository } from "../../repositories/payment.repository"

export const paymentService = {
  createPaymentIntentTHB: async (amount: number) => {
    // In strip 1000 is 10.00 THB, and minimum amount is 10.00 THB
    if (amount < 1000) {
      throw new Error("Invalid amount")
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "thb",
      payment_method_types: ["card", "promptpay"]
    })
    return paymentIntent
  },
  getPublicKey: () => {
    return environment.stripe.publicKey
  },
  confirmPaymentAndUpdateDB: async (paymentIntent: string, appointmentId: string) => {
    try {
      const paymentIntentDetail = await stripe.paymentIntents.retrieve(paymentIntent)
      if (paymentIntentDetail.status === "succeeded") {
        let paymentMethodId = paymentIntentDetail.payment_method as string

        // Rechecking PaymentMethodId Type
        const paymentMethod = paymentIntentDetail.payment_method
        if (typeof paymentMethod !== "string" && paymentMethod !== null) {
          const stripePaymentMethod = paymentIntentDetail.payment_method as Stripe.PaymentMethod
          paymentMethodId = stripePaymentMethod.id
        }

        // Retrieving Payment Type
        const paymentMethodType = await stripe.paymentMethods.retrieve(paymentMethodId)

        // Insert New Payment Row
        const createPaymentResult = await paymentRepository.createPayment({
          method: paymentMethodType.type === "card" ? "CREDIT_CARD" : "PROMPT_PAY",
          status: "FROM_CUSTOMER",
          amount: paymentIntentDetail.amount / 100,
          appointmentId
        })

        // Update Appointment Status
        const updateAppointmentResult = await appointmentRepository.updateAppointmentStatus(
          appointmentId,
          "WAITING_FOR_EVENT"
        )

        if (!createPaymentResult) {
          throw new Error("Cant create payment")
        }

        if (!updateAppointmentResult) {
          throw new Error("Cant update appointment")
        }

        return true
      }
      return false
    } catch (err: any) {
      const error = err as Error
      throw new Error(error.message ?? "Cant confirm payment intent")
    }
  }
}
