import RootLayout from "../../common/components/RootLayout/RootLayout"
import { AuthProvider } from "../../common/providers/AuthProvider"
import AdminPaymentPage from "./AdminPaymentPage"

export default function AdminPaymentApp() {
  return (
    <RootLayout>
      <AuthProvider>
        <AdminPaymentPage />
      </AuthProvider>
    </RootLayout>
  )
}
