import { useContext } from "react"
import NavBar from "../../common/components/NavBar/NavBar"
import RootLayout from "../../common/components/RootLayout/RootLayout"
import { AuthContext, AuthProvider } from "../../common/providers/AuthProvider"
import PaymentCompletedPage from "./PaymentCompletedPage"

export default function PaymentCompletedApp() {
  const { userId, userType, username } = useContext(AuthContext)
  return (
    <RootLayout>
      <AuthProvider>
        <NavBar
          isFortuneTeller={userType === "FORTUNE_TELLER"}
          menuFocus={"search"}
          username={username}
          userId={userId}
        />
        <PaymentCompletedPage />
      </AuthProvider>
    </RootLayout>
  )
}
