import RootLayout from "../../common/components/RootLayout/RootLayout"
import Form from "./components/Form/Form"
import Logo from "../../assets/FortuneTellerAccountAssets/Logo.svg"
export default function FortuneTellerAccountPage() {
  const mockFortuneTellerId = "4e4894f4-6524-4937-8b7d-23d45b0e0c75"

  return (
    <RootLayout>
      <div className="z-50 flex flex-col items-center relative">
        <img className="z-50 flex flex-col items-center mt-7 absolute" src={Logo} />
        <div className="bg-transparent -z-[78] rounded-3xl border my-20 w-11/12 ">
          <Form fortuneTellerId={mockFortuneTellerId}></Form>
        </div>
      </div>
    </RootLayout>
  )
}
