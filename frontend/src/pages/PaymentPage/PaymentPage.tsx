import { Elements } from "@stripe/react-stripe-js"
import PriceInput from "./components/PriceInput/PriceInput"
import { useState } from "react"
import CheckoutForm from "./components/PaymentForm/CheckoutForm"
import { StripeService } from "../../common/services/StripeService"

export default function PaymentPage({ stripePromise }: { stripePromise: any }) {
  const [amount, setAmount] = useState(0)
  const [clientSecret, setClientSecret] = useState("")

  const handlePriceConfirm = async (amount: number) => {
    setClientSecret(await StripeService.createPaymentIntent(amount))
  }

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <h1>Payment Page</h1>
      <PriceInput setAmount={setAmount} amount={amount} />
      <button
        onClick={() => handlePriceConfirm(amount)}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
        font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
        focus:outline-none dark:focus:ring-blue-800"
      >
        Pay
      </button>
      {stripePromise && clientSecret !== "" && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}
