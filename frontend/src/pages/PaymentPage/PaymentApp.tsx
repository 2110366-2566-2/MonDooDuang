import NavBar from "../../common/components/NavBar/NavBar"
import RootLayout from "../../common/components/RootLayout/RootLayout"
import PaymentPage from "./PaymentPage"

export default function PaymentApp({ stripePromise }: { stripePromise: any }) {
  return (
    <RootLayout>
      <NavBar isFortuneTeller={true} menuFocus={"search"} username={"Payment"} />
      <PaymentPage stripePromise={stripePromise} />
    </RootLayout>
  )
}
