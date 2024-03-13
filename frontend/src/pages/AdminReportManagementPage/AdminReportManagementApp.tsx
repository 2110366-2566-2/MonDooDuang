import RootLayout from "../../common/components/RootLayout/RootLayout"
import { AuthProvider } from "../../common/providers/AuthProvider"
import AdminReportManagementPage from "./AdminReportManagementPage"

export default function AdminReportManagementApp() {
  return (
    <RootLayout>
      <AuthProvider>
        <AdminReportManagementPage />
      </AuthProvider>
    </RootLayout>
  )
}
