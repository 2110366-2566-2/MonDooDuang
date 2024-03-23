import { Elements } from "@stripe/react-stripe-js"
import { useContext, useEffect, useState } from "react"
import CheckoutForm from "./components/PaymentForm/CheckoutForm"
import { StripeService } from "../../common/services/StripeService"
import { Appearance } from "@stripe/stripe-js"
import { useParams } from "react-router-dom"
import NavBar from "../../common/components/NavBar/NavBar"
import { AuthContext } from "../../common/providers/AuthProvider"

const appearance: Appearance = {
  theme: "night",
  variables: {
    colorText: "#ffffff",
    fontFamily: "Noto sans, sans-serif"
  }
}

export default function PaymentPage({ stripePromise }: { stripePromise: any }) {
  const { userId, userType, username } = useContext(AuthContext)
  const { cid, aid, price } = useParams()
  const [clientSecret, setClientSecret] = useState("")

  const amount = Number(price)

  useEffect(() => {
    const handlePriceConfirm = async (amount: number) => {
      setClientSecret(await StripeService.createPaymentIntent(amount))
    }
    handlePriceConfirm(amount)
  }, [amount])

  return (
    <>
      <NavBar
        isFortuneTeller={userType === "FORTUNE_TELLER"}
        menuFocus={"conversation"}
        username={username}
        userId={userId}
      />
      <div className="flex flex-col w-full items-center pb-16 ">
        <div className="text-white pb-4 font-noto-sans text-xl font-thin">
          - ราคา {amount} บาท -
        </div>
        {stripePromise && clientSecret !== "" && cid && aid && (
          <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
            <CheckoutForm clientSecret={clientSecret} conversationId={cid} appointmentId={aid} />
          </Elements>
        )}
      </div>
    </>
  )
}
