import RootLayout from "../../common/components/RootLayout/RootLayout"
import { AuthProvider } from "../../common/providers/AuthProvider"
import PaymentCompletedPage from "./PaymentCompletedPage"

export default function PaymentCompletedApp() {
  return (
    <RootLayout>
      <AuthProvider>
        <PaymentCompletedPage />
      </AuthProvider>
    </RootLayout>
  )
}
