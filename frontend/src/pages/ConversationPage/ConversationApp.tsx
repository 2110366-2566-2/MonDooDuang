import RootLayout from "../../common/components/RootLayout/RootLayout"
import { AuthProvider } from "../../common/providers/AuthProvider"
import ConversationPage from "./ConversationPage"

export default function ConversationApp() {
  return (
    <RootLayout>
      <AuthProvider>
        <ConversationPage />
      </AuthProvider>
    </RootLayout>
  )
}
