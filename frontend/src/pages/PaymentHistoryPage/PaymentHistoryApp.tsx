import RootLayout from "../../common/components/RootLayout/RootLayout"
import { AuthProvider } from "../../common/providers/AuthProvider"
import PaymentHistoryPage from "./PaymentHistoryPage"

export default function PaymentHistoryApp() {
  return (
    <RootLayout>
      <AuthProvider>
        <PaymentHistoryPage />
      </AuthProvider>
    </RootLayout>
  )
}
