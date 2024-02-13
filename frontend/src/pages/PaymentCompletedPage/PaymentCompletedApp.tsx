import NavBar from "../../common/components/NavBar/NavBar"
import RootLayout from "../../common/components/RootLayout/RootLayout"
import PaymentCompletedPage from "./PaymentCompletedPage"

export default function PaymentCompletedApp() {
  return (
    <RootLayout>
      <NavBar isFortuneTeller={false} menuFocus={"search"} username={"Payment"} />
      <PaymentCompletedPage />
    </RootLayout>
  )
}
