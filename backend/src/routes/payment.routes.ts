import express from "express"
import { paymentController } from "../controllers/payment/payment.controller"

const router = express.Router()
router.post("/create-payment-intent", paymentController.createPaymentIntentTHB)

export default router
