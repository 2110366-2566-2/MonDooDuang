import { useContext, useState } from "react"
import ExampleModal from "./components/ExampleModal"
import { AuthContext } from "../../common/providers/AuthProvider"
import NavBar from "../../common/components/NavBar/NavBar"

export default function ExamplePage() {
  const [isExampleModalOpen, setIsExampleModalOpen] = useState(false)
  const userData = useContext(AuthContext)

  return (
    <>
      <NavBar
        isFortuneTeller={userData.userType === "FORTUNE_TELLER"}
        menuFocus={"search"}
        username={userData.username}
      />
      <button
        onClick={() => setIsExampleModalOpen(true)}
        className="text-white text-2xl font-noto-sans-eng bg-slate-500 rounded-full p-8 mb-10"
      >
        Example Modal Here!
      </button>
      <div className="h-[200vh] w-1/3 bg-white">Scroll page test</div>

      {/* Important !!! Please do place the Modal at most bottom element !!! */}
      <ExampleModal
        isVisible={isExampleModalOpen}
        onClose={() => setIsExampleModalOpen(false)}
        message={
          "You can Pass any props and create any Button for your modal, Please also try clicking or scrolling outside the modal!!!"
        }
      />
    </>
  )
}
