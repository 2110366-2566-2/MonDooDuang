import { useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { StripeService } from "../../common/services/StripeService"
import NavBar from "../../common/components/NavBar/NavBar"
import { AuthContext } from "../../common/providers/AuthProvider"
import { CircularProgress } from "@mui/material"

export default function PaymentCompletedPage() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const paymentIntent = queryParams.get("payment_intent")
  const conversationId = queryParams.get("conversationId")

  const { userId, userType, username } = useContext(AuthContext)

  useEffect(() => {
    const confirmPayment = async (paymentIntent: string, conversationId: string) => {
      try {
        const result = await StripeService.confirmPayment(paymentIntent)
        if (result) {
          window.location.href = `/conversation/${conversationId}`
        }
      } catch (error) {
        console.error("Payment failed: ", error)
      }
    }

    if (paymentIntent && conversationId) {
      confirmPayment(paymentIntent, conversationId)
    }
  }, [paymentIntent, conversationId])

  return (
    <>
      <NavBar
        isFortuneTeller={userType === "FORTUNE_TELLER"}
        menuFocus={"conversation"}
        username={username}
        userId={userId}
      />
      <div className="flex w-full pt-[180px] justify-center items-center">
        <CircularProgress size={80} />
      </div>
    </>
  )
}
