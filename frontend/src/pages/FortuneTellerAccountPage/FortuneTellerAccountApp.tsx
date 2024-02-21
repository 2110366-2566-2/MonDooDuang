import { AuthProvider } from "../../common/providers/AuthProvider"
import FortuneTellerAccountPage from "./FortuneTellerAccountPage"

export default function FortuneTellerAccountApp() {
  return (
    <AuthProvider>
      <FortuneTellerAccountPage />
    </AuthProvider>
  )
}
