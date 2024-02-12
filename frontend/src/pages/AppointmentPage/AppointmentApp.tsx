import NavBar from "../../common/components/NavBar/NavBar"
import RootLayout from "../../common/components/RootLayout/RootLayout"
import AppointmentPage from "./AppointmentPage"

export default function AppointmentApp() {
  return (
    //Add providers as needed
    <RootLayout>
       <NavBar isFortuneTeller={true} menuFocus={"search"} username={"Username"} />
      <AppointmentPage />
    </RootLayout>
  )
}
