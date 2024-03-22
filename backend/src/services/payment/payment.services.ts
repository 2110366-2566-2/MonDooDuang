import { environment } from "../../configs/environment"
import { stripe } from "../../configs/stripe"

export const paymentService = {
  createPaymentIntentTHB: async (amount: number) => {
    if (amount < 10) {
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
  confirmPaymentAndUpdateDB: async (paymentIntent: string) => {
    try {
      const paymentIntentDetail = await stripe.paymentIntents.retrieve(paymentIntent)
      if (paymentIntentDetail.status === "succeeded") {
        // Update the database
        console.log("Update the database with the paymentIntent data")
        return true
      }
      return false
    } catch (err) {
      throw new Error("Cant confirm payment intent")
    }
  }
}
