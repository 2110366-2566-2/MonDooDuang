import { Response } from "express"
import { paymentService } from "../../services/payment/payment.services"
import { TypedRequestBody } from "../../types/request"

interface IntentAmount {
  amount: number | undefined
}

export const paymentController = {
  createPaymentIntentTHB: async (req: TypedRequestBody<IntentAmount>, res: Response) => {
    const amount = req.body.amount ?? 100
    try {
      const paymentIntent = await paymentService.createPaymentIntentTHB(amount)
      res.send(paymentIntent.client_secret)
    } catch (error: Error | any) {
      res.status(400).send(error?.message ?? "Something went wrong. Please try again later.")
    }
  },
  getPublicKey: (_: any, res: Response) => {
    const publicKey = paymentService.getPublicKey()
    res.send(publicKey)
  }
}
