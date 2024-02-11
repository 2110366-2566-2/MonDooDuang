import Breadcrumb from "./components/Breadcrumb/Breadcrumb"
import FortuneTellerDetails from "./components/FortuneTellerDetails/FortuneTellerDetails"
import Packages from "./components/Packages/Packages"
import Background from "../../assets/background.png"
import Reviews from "./components/Reviews/Reviews"
import RecommendedFortuneTellers from "./components/RecommendedFortuneTeller/RecommendedFortuneTellers"

export default function FortuneTellerDetailPage() {

  return (
    <div className="bg-black text-white bg-cover bg-no-repeat"
    style={{ backgroundImage: `url(${Background})` }} >
      <Breadcrumb></Breadcrumb>
      <div className="px-16">
        <div className="flex flex-row flex-wrap justify-center space-x-16 w-full">
          <FortuneTellerDetails></FortuneTellerDetails>
          <Packages></Packages>
        </div>
        <Reviews></Reviews>
        <RecommendedFortuneTellers></RecommendedFortuneTellers>
      </div>
    </div>
  )
}
