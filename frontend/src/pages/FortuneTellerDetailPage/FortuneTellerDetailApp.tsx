import NavBar from "../../common/components/NavBar/NavBar"
import RootLayout from "../../common/components/RootLayout/RootLayout"
import FortuneTellerDetailPage from "./FortuneTellerDetailPage"

export default function FortuneTellerDetailApp() {
  return (
    //Add providers as needed
    <RootLayout>
    <NavBar isFortuneTeller={true} menuFocus={"search"} username={"Username"} />
    <FortuneTellerDetailPage />
  </RootLayout>
  )
}
