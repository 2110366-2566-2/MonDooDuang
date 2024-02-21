import RootLayout from "../../common/components/RootLayout/RootLayout"
import { AuthProvider } from "../../common/providers/AuthProvider"
import FortuneTellerDetailPage from "./FortuneTellerDetailPage"

export default function FortuneTellerDetailApp() {
  return (
    <RootLayout>
      <AuthProvider>
        <FortuneTellerDetailPage />
      </AuthProvider>
    </RootLayout>
  )
}
