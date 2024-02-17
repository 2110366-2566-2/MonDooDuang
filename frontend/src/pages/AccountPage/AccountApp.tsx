import { AuthProvider } from "../../common/providers/AuthProvider"
import AccountPage from "./AccountPage"

export default function AccountApp() {
  return (
    <AuthProvider>
      <AccountPage />
    </AuthProvider>
  )
}
