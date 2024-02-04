import { environment } from "../../configs/environment"
import { stripe } from "../../configs/stripe"

export const paymentService = {
  createPaymentIntentTHB: async (amount: number) => {
    if (amount < 10) {
      throw new Error("Invalid amount")
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "thb"
    })
    return paymentIntent
  },
  getPublicKey: () => {
    return environment.stripe.publicKey
  }
}