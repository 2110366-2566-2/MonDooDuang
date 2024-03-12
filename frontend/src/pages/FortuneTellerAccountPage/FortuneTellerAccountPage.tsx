import { useContext } from "react"
import { AuthContext } from "../../common/providers/AuthProvider"
import { useNavigate } from "react-router-dom"
import FortuneTellerForm from "./components/FortuneTellerForm/FortuneTellerForm"
import Logo from "../../assets/FortuneTellerAccountAssets/Logo.svg"
export default function FortuneTellerAccountPage() {
  const { userId, userType } = useContext(AuthContext)

  const navigate = useNavigate()
  if (userType !== "FORTUNE_TELLER") {
    navigate("/search")
    return
  }
  return (
    <div className="z-50 flex flex-col items-center relative">
      <img className="z-50 flex flex-col items-center mt-7 absolute" src={Logo} />
      <div className="bg-transparent -z-[78] rounded-3xl border my-20 w-11/12 ">
        <FortuneTellerForm fortuneTellerId={userId}></FortuneTellerForm>
      </div>
    </div>
  )
}
