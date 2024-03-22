import { Response } from "express"
import { paymentService } from "../../services/payment/payment.services"
import { TypedRequestBody } from "../../types/request"

interface IntentAmount {
  amount: number | undefined
}

export const paymentController = {
  createPaymentIntentTHB: async (req: TypedRequestBody<IntentAmount>, res: Response) => {
    const amount = req.body.amount
    if (amount === undefined) {
      res.status(400).send("Invalid amount")
      return
    }
    try {
      const paymentIntent = await paymentService.createPaymentIntentTHB(amount * 100)
      res.status(200).json({ clientSecret: paymentIntent.client_secret })
    } catch (error: Error | any) {
      console.error(
        "createPaymentIntentTHB error: ",
        error?.message ?? "Something went wrong. Please try again later."
      )
      res.status(400).send(error?.message ?? "Something went wrong. Please try again later.")
    }
  },
  getPublicKey: (_: any, res: Response) => {
    const publicKey = paymentService.getPublicKey()
    res.status(200).json({ publishableKey: publicKey })
  },

  confirmPaymentAndUpdateDB: async (
    req: TypedRequestBody<{ paymentIntent: string }>,
    res: Response
  ) => {
    const paymentIntent = req.body.paymentIntent
    try {
      const result = await paymentService.confirmPaymentAndUpdateDB(paymentIntent)
      res.status(200).json({ success: result })
    } catch (error: Error | any) {
      res.status(400).json({
        success: false,
        message: error?.message ?? "Something went wrong. Please try again later."
      })
    }
  }
}
