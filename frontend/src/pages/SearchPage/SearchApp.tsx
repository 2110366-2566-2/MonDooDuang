import RootLayout from "../../common/components/RootLayout/RootLayout"
import { AuthProvider } from "../../common/providers/AuthProvider"
import SearchPage from "./SearchPage"

export default function SearchApp() {
  return (
    <RootLayout>
      {/* <AuthProvider> */}
      <SearchPage />
      {/* </AuthProvider> */}
    </RootLayout>
  )
}
