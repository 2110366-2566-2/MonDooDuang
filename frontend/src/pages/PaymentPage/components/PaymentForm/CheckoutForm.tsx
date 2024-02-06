import { PaymentElement } from "@stripe/react-stripe-js"
import { useState } from "react"
import { useStripe, useElements } from "@stripe/react-stripe-js"
import "./CheckoutForm.css"

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsProcessing(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/payment/completed`
      }
    })

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message ?? "")
    } else {
      setMessage("An unexpected error occurred.")
    }

    setIsProcessing(false)
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        className="w-full bg-blue-500 text-white mt-4 p-2 rounded-md"
        disabled={isProcessing || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">{isProcessing ? "Processing ... " : "Pay now"}</span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}
