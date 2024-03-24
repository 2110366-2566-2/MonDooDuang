import express from "express"
import { paymentController } from "../controllers/payment/payment.controller"

const router = express.Router()
router.post("/create-payment-intent", paymentController.createPaymentIntentTHB)
router.get("/public-key", paymentController.getPublicKey)
router.post("/confirm-payment", paymentController.confirmPaymentAndUpdateDB)

export default router
