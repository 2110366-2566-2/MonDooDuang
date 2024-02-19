import RootLayout from "../../common/components/RootLayout/RootLayout"
import { AuthProvider } from "../../common/providers/AuthProvider"
import AppointmentPage from "./AppointmentPage"

export default function AppointmentApp() {
  return (
    <RootLayout>
      <AuthProvider>
        <AppointmentPage />
      </AuthProvider>
    </RootLayout>
  )
}
