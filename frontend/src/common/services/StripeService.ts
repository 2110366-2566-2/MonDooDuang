import { environment } from "../constants/environment"

export const StripeService = {
  getPublishableKey: async (): Promise<string> => {
    const response = await fetch(`${environment.backend.url}/payment/public-key`)
    const { publishableKey } = await response.json()
    return publishableKey
  },
  createPaymentIntent: async (amount: number): Promise<string> => {
    const response = await fetch(`${environment.backend.url}/payment/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount
      })
    })
    const { clientSecret } = await response.json()
    return clientSecret
  }
}
