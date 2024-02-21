import { AuthProvider } from "../../common/providers/AuthProvider"
import ConversationPage from "./ConversationPage"

export default function ConversationApp() {
  return (
    <AuthProvider>
      <ConversationPage />
    </AuthProvider>
  )
}
