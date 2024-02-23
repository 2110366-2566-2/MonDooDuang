import NavBar from "../../common/components/NavBar/NavBar"
import RootLayout from "../../common/components/RootLayout/RootLayout"
import { AuthProvider } from "../../common/providers/AuthProvider"
import PaymentPage from "./PaymentPage"

export default function PaymentApp({ stripePromise }: { stripePromise: any }) {
  return (
    <RootLayout>
      <AuthProvider>
        <NavBar isFortuneTeller={false} menuFocus={"search"} username={"Payment"} />
        <PaymentPage stripePromise={stripePromise} />
      </AuthProvider>
    </RootLayout>
  )
}
