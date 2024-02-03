import { Request, Response } from "express"
import { paymentService } from "../../services/payment/payment.services"

export const paymentController = {
  createPaymentIntentTHB: async (req: Request, res: Response) => {
    const amount = req.body.amount
    const paymentIntent = await paymentService.createPaymentIntentTHB(amount)
    res.send(paymentIntent.client_secret)
  }
}
