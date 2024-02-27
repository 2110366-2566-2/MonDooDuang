import { AuthProvider } from "../../common/providers/AuthProvider"
import RootLayout from "../../common/components/RootLayout/RootLayout"
import FortuneTellerAccountPage from "./FortuneTellerAccountPage"

export default function FortuneTellerAccountApp() {
  return (
    <RootLayout>
      <AuthProvider>
        <FortuneTellerAccountPage />
      </AuthProvider>
    </RootLayout>
  )
}
