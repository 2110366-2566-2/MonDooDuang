import { AuthProvider } from "../../common/providers/AuthProvider"
import SearchPage from "./SearchPage"

export default function SearchApp() {
  return (
    <AuthProvider>
      <SearchPage />
    </AuthProvider>
  )
}
