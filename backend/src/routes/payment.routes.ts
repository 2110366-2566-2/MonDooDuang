import express from "express"
import { paymentController } from "../controllers/payment/payment.controller"

const router = express.Router()
router.post("/create-payment-intent", paymentController.createPaymentIntentTHB)
router.get("/public-key", paymentController.getPublicKey)

export default router
