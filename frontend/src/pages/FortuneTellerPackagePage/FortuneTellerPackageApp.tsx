import { AuthProvider } from "../../common/providers/AuthProvider"
import RootLayout from "../../common/components/RootLayout/RootLayout"
import FortuneTellerPackagePage from "./FortuneTellerPackagePage"

export default function FortuneTellerPackageApp() {
  return (
    <RootLayout>
      <AuthProvider>
        <FortuneTellerPackagePage />
      </AuthProvider>
    </RootLayout>
  )
}
