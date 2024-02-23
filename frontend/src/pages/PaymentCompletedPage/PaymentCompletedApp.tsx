import NavBar from "../../common/components/NavBar/NavBar"
import RootLayout from "../../common/components/RootLayout/RootLayout"
import { AuthProvider } from "../../common/providers/AuthProvider"
import PaymentCompletedPage from "./PaymentCompletedPage"

export default function PaymentCompletedApp() {
  return (
    <RootLayout>
      <AuthProvider>
        <NavBar isFortuneTeller={false} menuFocus={"search"} username={"Payment"} />
        <PaymentCompletedPage />
      </AuthProvider>
    </RootLayout>
  )
}
