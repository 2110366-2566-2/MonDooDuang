import { stripe } from "../../configs/stripe"

export const paymentService = {
  createPaymentIntentTHB: async (amount: number) => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "thb"
    })
    return paymentIntent
  }
}
