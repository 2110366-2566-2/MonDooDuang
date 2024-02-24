import RootLayout from "../../common/components/RootLayout/RootLayout"
import { AuthProvider } from "../../common/providers/AuthProvider"
import FortuneTellerDetailPage from "./FortuneTellerDetailPage"
import { useParams } from "react-router-dom"

export default function FortuneTellerDetailApp() {
  const params = useParams()
  
  return (
    <RootLayout>
      <AuthProvider>
        <FortuneTellerDetailPage fid={params.fid} />
      </AuthProvider>
    </RootLayout>
  )
}
