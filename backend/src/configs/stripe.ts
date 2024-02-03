import StripeConfig from "stripe"
import { environment } from "./environment"

export const stripe = new StripeConfig(environment.stripe.publicKey)
