import Breadcrumb from "./components/Breadcrumb/Breadcrumb"
import FortuneTellerDetails from "./components/FortuneTellerDetails/FortuneTellerDetails"
import Packages from "./components/Packages/Packages"
import Reviews from "./components/Reviews/Reviews"
import RecommendedFortuneTellers from "./components/RecommendedFortuneTeller/RecommendedFortuneTellers"
import Footer from "./components/Footer/Footer"
import NavBar from "../../common/components/NavBar/NavBar"

import { useContext } from "react"
import { AuthContext } from "../../common/providers/AuthProvider"

export default function FortuneTellerDetailPage() {
  const { userType, username } = useContext(AuthContext)

  return (
    <>
      <NavBar
        isFortuneTeller={userType === "FORTUNE_TELLER"}
        menuFocus={"search"}
        username={username}
      />
      <div className="text-white">
        <div className="px-6">
          <Breadcrumb></Breadcrumb>
        </div>
        <div className="px-6  text-[20px] font-light space-y-[64px] pt-4">
          <div className="flex flex-row flex-wrap justify-center space-x-16 w-full items-center">
            <FortuneTellerDetails></FortuneTellerDetails>
            <Packages></Packages>
          </div>
          <Reviews></Reviews>
          <RecommendedFortuneTellers />
          <Footer></Footer>
        </div>
      </div>
    </>
  )
}
