import PaymentPage from "./PaymentPage"

export default function PaymentApp({ stripePromise }: { stripePromise: any }) {
  return (
    <>
      <PaymentPage stripePromise={stripePromise} />
    </>
  )
}
