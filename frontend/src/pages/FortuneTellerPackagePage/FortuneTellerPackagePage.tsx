import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../common/providers/AuthProvider"
import { useParams } from "react-router-dom"
import Logo from "../../assets/FortuneTellerPackageAssets/Logo.svg"
import PackageForm from "./components/PackageForm/PackageForm"

export default function FortuneTellerPackagePage() {
  const { userId, userType } = useContext(AuthContext)
  const params = useParams<{ packageid: string | undefined }>()

  const navigate = useNavigate()
  if (userType !== "FORTUNE_TELLER") {
    navigate("/search")
    return
  }

  return (
    <div className="z-50 flex flex-col items-center relative">
      <img className="z-50 flex flex-col items-center mt-7 absolute" src={Logo} />
      <div className="bg-transparent -z-[78] rounded-3xl border my-20 h-5/6 w-11/12 ">
        <PackageForm fortuneTellerId={userId} packageId={params.packageid} />
      </div>
    </div>
  )
}
