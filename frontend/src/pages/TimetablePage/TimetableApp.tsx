import RootLayout from "../../common/components/RootLayout/RootLayout"
import { AuthProvider } from "../../common/providers/AuthProvider"
import TimetablePage from "./TimetablePage"

export default function TimetableApp() {
  return (
    <RootLayout>
      {/* <AuthProvider> */}
      <TimetablePage />
      {/* </AuthProvider> */}
    </RootLayout>
  )
}
