import RootLayout from "../../common/components/RootLayout/RootLayout"
import PaymentPage from "./PaymentPage"

export default function PaymentApp({ stripePromise }: { stripePromise: any }) {
  return (
    <RootLayout>
      <PaymentPage stripePromise={stripePromise} />
    </RootLayout>
  )
}
