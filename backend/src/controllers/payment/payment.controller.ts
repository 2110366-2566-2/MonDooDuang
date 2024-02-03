import { Response } from "express"
import { paymentService } from "../../services/payment/payment.services"
import { TypedRequestBody } from "../../types/request"

interface IntentAmount {
  amount: number
}

export const paymentController = {
  createPaymentIntentTHB: async (req: TypedRequestBody<IntentAmount>, res: Response) => {
    const amount = req.body.amount
    const paymentIntent = await paymentService.createPaymentIntentTHB(amount)
    res.send(paymentIntent.client_secret)
  }
}
