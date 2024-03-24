import { useContext } from "react"
import { AuthContext } from "../../common/providers/AuthProvider"
import FormRegister from "./components/Form/FormRegister"
import LogoIcon from "./components/Icon/LogoIcon"
import { useNavigate } from "react-router-dom"

export default function FortuneTellerRegisterPage() {
  const { userId, userType } = useContext(AuthContext)
  const navigate = useNavigate()
  if (userType !== "CUSTOMER") {
    navigate("/search")
    return
  }

  return (
    <div className="z-50 flex flex-col items-center relative text-white font-noto-sans">
      <LogoIcon />
      <div className="bg-transparent bg-black -z-[78] rounded-3xl border my-20 w-11/12 ">
        <h1 className="font-semibold text-4xl text-center mt-24">ยืนยันตัวตน</h1>
        <div className="ml-36 pb-12">
          <FormRegister userId={userId} />
        </div>
      </div>
    </div>
  )
}
