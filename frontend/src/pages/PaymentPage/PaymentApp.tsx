import { useContext } from "react"
import NavBar from "../../common/components/NavBar/NavBar"
import RootLayout from "../../common/components/RootLayout/RootLayout"
import { AuthContext, AuthProvider } from "../../common/providers/AuthProvider"
import PaymentPage from "./PaymentPage"

export default function PaymentApp({ stripePromise }: { stripePromise: any }) {
  const { userId, userType, username } = useContext(AuthContext)
  return (
    <RootLayout>
      <AuthProvider>
        <NavBar
          isFortuneTeller={userType === "FORTUNE_TELLER"}
          menuFocus={"search"}
          username={username}
          userId={userId}
        />
        <PaymentPage stripePromise={stripePromise} />
      </AuthProvider>
    </RootLayout>
  )
}
