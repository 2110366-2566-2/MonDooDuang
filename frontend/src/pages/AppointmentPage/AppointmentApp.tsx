import { useParams } from "react-router-dom"
import RootLayout from "../../common/components/RootLayout/RootLayout"
import { AuthProvider } from "../../common/providers/AuthProvider"
import AppointmentPage from "./AppointmentPage"

export default function AppointmentApp() {
  const params = useParams()
  return (
    <RootLayout>
      <AuthProvider>
        <AppointmentPage fid={params.fid} pid={params.pid}/>
      </AuthProvider>
    </RootLayout>
  )
}
