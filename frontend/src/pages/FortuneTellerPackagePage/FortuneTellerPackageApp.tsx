import { AuthProvider } from "../../common/providers/AuthProvider"
import FortuneTellerPackagePage from "./FortuneTellerPackagePage"

export default function FortuneTellerPackageApp() {
  return (
    <AuthProvider>
      <FortuneTellerPackagePage />
    </AuthProvider>
  )
}
