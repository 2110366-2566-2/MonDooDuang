import RootLayout from "../../common/components/RootLayout/RootLayout"
import { AuthProvider } from "../../common/providers/AuthProvider"
import AdminApprovalPage from "./AdminApprovalPage"

export default function AdminApprovalApp() {
  return (
    <RootLayout>
      <AuthProvider>
        <AdminApprovalPage />
      </AuthProvider>
    </RootLayout>
  )
}
