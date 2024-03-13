import { useContext, useEffect, useState } from "react"
import ExampleModal from "./components/ExampleModal"
import { AuthContext } from "../../common/providers/AuthProvider"
import NavBar from "../../common/components/NavBar/NavBar"
import { ExampleService } from "./services/ExampleService"

export default function ExamplePage() {
  const [isExampleModalOpen, setIsExampleModalOpen] = useState(false)
  const { userId, userType, username, token } = useContext(AuthContext)

  useEffect(() => {
    const fetchAllTests = async () => {
      const customer = ExampleService.testCustomer(token)
      const fortuneTeller = ExampleService.testFortuneTeller(token)
      const admin = ExampleService.testAdmin(token)
      const results = await Promise.all([customer, fortuneTeller, admin])
      console.log("results", results)
      console.log("userType", userType)
    }
    fetchAllTests()
  }, [userType, token])

  return (
    <>
      <NavBar
        isFortuneTeller={userType === "FORTUNE_TELLER"}
        menuFocus={"search"}
        username={username}
        userId={userId}
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
