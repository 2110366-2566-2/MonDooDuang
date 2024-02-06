import Breadcrumb from "./components/Breadcrumb/Breadcrumb"
import FortuneTellerDetails from "./components/FortuneTellerDetails/FortuneTellerDetails"
import Packages from "./components/Packages/Packages"
import Background from "../../assets/background.png"

export default function FortuneTellerDetailPage() {
  return (
    <div className="bg-black text-white bg-cover bg-no-repeat"
    style={{ backgroundImage: `url(${Background})` }} >
      <Breadcrumb></Breadcrumb>
      <div className="flex justify-between w-full px-16">
        <FortuneTellerDetails></FortuneTellerDetails>
        <Packages></Packages>
      </div>
    </div>
  )
}
