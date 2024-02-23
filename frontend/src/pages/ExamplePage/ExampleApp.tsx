import RootLayout from "../../common/components/RootLayout/RootLayout"
import { AuthProvider } from "../../common/providers/AuthProvider"
import ExamplePage from "./ExamplePage"

export default function ExampleApp() {
  return (
    <RootLayout>
      <AuthProvider>
        <ExamplePage />
      </AuthProvider>
    </RootLayout>
  )
}
