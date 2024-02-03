import stripeConfig from "stripe"
import { environment } from "./environment"

export const stripe = new stripeConfig(environment.stripe.publicKey)
