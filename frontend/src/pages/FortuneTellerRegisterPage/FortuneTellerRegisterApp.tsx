import FortuneTellerRegisterPage from "./FortuneTellerRegisterPage"
import { AuthProvider } from "../../common/providers/AuthProvider"
import RootLayout from "../../common/components/RootLayout/RootLayout"

export default function FortuneTellerRegisterApp() {
  return (
    //Add providers as needed
    <RootLayout>
      <AuthProvider>
        <FortuneTellerRegisterPage />
      </AuthProvider>
    </RootLayout>
  )
}
